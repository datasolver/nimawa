import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { db } from './src/server/db';
import { GoogleGenAI } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to ensure emails folder exists
const EMAILS_DIR = path.join(process.cwd(), 'data', 'emails');
if (!fs.existsSync(EMAILS_DIR)) {
  fs.mkdirSync(EMAILS_DIR, { recursive: true });
}

// Custom simulated email dispatcher
function sendSimulatedEmail(to: string, subject: string, htmlContent: string) {
  const emailId = `mail_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const emailData = {
    id: emailId,
    to,
    subject,
    body: htmlContent,
    timestamp: new Date().toISOString()
  };
  fs.writeFileSync(
    path.join(EMAILS_DIR, `${emailId}.json`),
    JSON.stringify(emailData, null, 2),
    'utf-8'
  );
  console.log(`[EMAIL DISPATCH] Sent to: ${to} | Subject: ${subject}`);
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// 1. Auth Endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.getUserByEmail(email);

  if (user && user.passwordHash === password) {
    db.logAction(user.email, 'Logged into admin panel');
    // Simple response with session info
    return res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      token: `mock-jwt-token-for-${user.id}-${Date.now()}`
    });
  }

  res.status(401).json({ success: false, message: 'Invalid email or password' });
});

// 2. Members Endpoints
app.post('/api/members/register', (req, res) => {
  try {
    const newMember = db.createMember(req.body);

    // Send confirmation emails
    sendSimulatedEmail(
      newMember.email,
      'Welcome to NiMAWA - Membership Registration Completed',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #064e3b; color: #f59e0b; padding: 24px; text-align: center;">
          <h2 style="margin: 0; font-size: 24px;">Assalamu Alaykum, ${newMember.firstName}!</h2>
          <p style="margin: 4px 0 0 0; color: #ffffff;">Welcome to the Nigerian Muslims' Association of Western Australia</p>
        </div>
        <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
          <p>Dear Brother/Sister ${newMember.firstName} ${newMember.lastName},</p>
          <p>Alhamdulillah, we have successfully received your membership application. Our executive committee is excited to welcome you into our community.</p>
          <p><strong>Your Registration ID:</strong> ${newMember.id}</p>
          <p><strong>Details Provided:</strong></p>
          <ul style="padding-left: 20px;">
            <li><strong>Email:</strong> ${newMember.email}</li>
            <li><strong>Phone:</strong> ${newMember.phone}</li>
            <li><strong>State of Origin:</strong> ${newMember.stateOfOrigin}</li>
            <li><strong>Quran Academy Interest:</strong> ${newMember.quranClassInterest ? 'Yes' : 'No'}</li>
          </ul>
          <p>We will keep you updated with community gatherings, classes, and special projects. If you have any questions or require support in settling, please do not hesitate to contact our Welfare team.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 14px; color: #64748b; text-align: center;">NiMAWA - Building Faith, Community, and Unity among Nigerian Muslims in Western Australia</p>
        </div>
      </div>
      `
    );

    // Notify Admins
    sendSimulatedEmail(
      'admin@nimawa.org.au',
      `New Membership Registration: ${newMember.firstName} ${newMember.lastName}`,
      `
      <p>Assalamu Alaykum Admin,</p>
      <p>A new membership registration form has been submitted by <strong>${newMember.firstName} ${newMember.lastName}</strong> (${newMember.email}).</p>
      <p>Please check the Admin Dashboard to review the full details.</p>
      `
    );

    res.json({ success: true, member: newMember });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.get('/api/members', (req, res) => {
  res.json({ success: true, members: db.getMembers() });
});

app.delete('/api/members/:id', (req, res) => {
  const { id } = req.params;
  db.deleteMember(id);
  res.json({ success: true });
});

// 3. Volunteers Endpoints
app.post('/api/volunteers/register', (req, res) => {
  try {
    const newVolunteer = db.createVolunteer(req.body);

    sendSimulatedEmail(
      newVolunteer.email,
      'Thank you for volunteering with NiMAWA!',
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #064e3b; color: #f59e0b; padding: 24px; text-align: center;">
          <h2 style="margin: 0;">Jazakallah Khair, ${newVolunteer.fullName}!</h2>
          <p style="margin: 4px 0 0 0; color: #ffffff;">Thank you for stepping up to serve your community</p>
        </div>
        <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
          <p>Dear ${newVolunteer.fullName},</p>
          <p>We have received your volunteer application. The Prophet (PBUH) said: <em>"The best of people are those that bring most benefit to the rest of mankind."</em></p>
          <p>Our Volunteer Coordinator will review your skills (<strong>${newVolunteer.skills.join(', ')}</strong>) and availability, and contact you prior to our upcoming events.</p>
          <p>Thank you again for your dedication.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 14px; color: #64748b; text-align: center;">NiMAWA Volunteer Network</p>
        </div>
      </div>
      `
    );

    res.json({ success: true, volunteer: newVolunteer });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.get('/api/volunteers', (req, res) => {
  res.json({ success: true, volunteers: db.getVolunteers() });
});

app.delete('/api/volunteers/:id', (req, res) => {
  db.deleteVolunteer(req.params.id);
  res.json({ success: true });
});

// 4. Events Endpoints
app.get('/api/events', (req, res) => {
  res.json({ success: true, events: db.getEvents() });
});

app.post('/api/events', (req, res) => {
  const newEvent = db.createEvent(req.body);
  res.json({ success: true, event: newEvent });
});

app.put('/api/events/:id', (req, res) => {
  const updated = db.updateEvent(req.params.id, req.body);
  if (updated) {
    res.json({ success: true, event: updated });
  } else {
    res.status(404).json({ success: false, message: 'Event not found' });
  }
});

app.delete('/api/events/:id', (req, res) => {
  db.deleteEvent(req.params.id);
  res.json({ success: true });
});

// 5. Event Registrations
app.post('/api/event-registrations/register', (req, res) => {
  try {
    const reg = db.createEventRegistration(req.body);

    // Send Ticket with simulated QR Code
    sendSimulatedEmail(
      reg.email,
      `Your Ticket for ${reg.eventTitle}`,
      `
      <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 2px dashed #064e3b; border-radius: 12px; overflow: hidden; background-color: #fafaf9;">
        <div style="background-color: #064e3b; color: #ffffff; padding: 20px; text-align: center;">
          <span style="background-color: #f59e0b; color: #064e3b; padding: 4px 8px; border-radius: 9999px; font-weight: bold; font-size: 12px; text-transform: uppercase;">ENTRY TICKET</span>
          <h3 style="margin: 8px 0 0 0; color: #f59e0b;">${reg.eventTitle}</h3>
        </div>
        <div style="padding: 20px; color: #1e293b;">
          <p style="margin: 0 0 12px 0;"><strong>Ticket Holder:</strong> ${reg.fullName}</p>
          <p style="margin: 0 0 12px 0;"><strong>Email:</strong> ${reg.email}</p>
          <p style="margin: 0 0 12px 0;"><strong>Ticket Code:</strong> <code style="background-color: #e2e8f0; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-family: monospace;">${reg.ticketCode}</code></p>
          
          <div style="text-align: center; margin: 24px 0;">
            <!-- Simulated elegant vector QR box -->
            <div style="display: inline-block; padding: 12px; background: white; border: 1px solid #cbd5e1; border-radius: 8px;">
              <div style="width: 120px; height: 120px; background: repeating-conic-gradient(from 45deg, #0f172a 0% 25%, transparent 0% 50%) 50% / 15px 15px; border: 4px solid #064e3b;"></div>
              <p style="font-size: 10px; color: #64748b; margin: 8px 0 0 0;">SCAN TO VERIFY ENTRY</p>
            </div>
          </div>
          
          <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">Please present this email or Ticket Code at the welcome desk for check-in.</p>
        </div>
      </div>
      `
    );

    res.json({ success: true, registration: reg });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.get('/api/event-registrations', (req, res) => {
  res.json({ success: true, registrations: db.getEventRegistrations() });
});

app.delete('/api/event-registrations/:id', (req, res) => {
  db.deleteEventRegistration(req.params.id);
  res.json({ success: true });
});

// 6. News Articles
app.get('/api/news', (req, res) => {
  res.json({ success: true, articles: db.getNewsArticles() });
});

app.post('/api/news', (req, res) => {
  const newArticle = db.createNewsArticle(req.body);
  res.json({ success: true, article: newArticle });
});

app.put('/api/news/:id', (req, res) => {
  const updated = db.updateNewsArticle(req.params.id, req.body);
  if (updated) {
    res.json({ success: true, article: updated });
  } else {
    res.status(404).json({ success: false, message: 'Article not found' });
  }
});

app.delete('/api/news/:id', (req, res) => {
  db.deleteNewsArticle(req.params.id);
  res.json({ success: true });
});

// 7. Gallery
app.get('/api/gallery', (req, res) => {
  res.json({ success: true, items: db.getGalleryItems() });
});

app.post('/api/gallery', (req, res) => {
  const item = db.createGalleryItem(req.body);
  res.json({ success: true, item });
});

app.delete('/api/gallery/:id', (req, res) => {
  db.deleteGalleryItem(req.params.id);
  res.json({ success: true });
});

// 8. Announcements
app.get('/api/announcements', (req, res) => {
  res.json({ success: true, announcements: db.getAnnouncements() });
});

app.post('/api/announcements', (req, res) => {
  const ann = db.createAnnouncement(req.body);
  res.json({ success: true, announcement: ann });
});

app.put('/api/announcements/:id', (req, res) => {
  const updated = db.updateAnnouncement(req.params.id, req.body);
  if (updated) {
    res.json({ success: true, announcement: updated });
  } else {
    res.status(404).json({ success: false, message: 'Announcement not found' });
  }
});

app.delete('/api/announcements/:id', (req, res) => {
  db.deleteAnnouncement(req.params.id);
  res.json({ success: true });
});

// 9. Contact Messages
app.post('/api/contact', (req, res) => {
  const newMessage = db.createContactMessage(req.body);
  res.json({ success: true, message: newMessage });
});

app.get('/api/contact', (req, res) => {
  res.json({ success: true, messages: db.getContactMessages() });
});

app.put('/api/contact/:id', (req, res) => {
  const updated = db.updateContactMessage(req.params.id, req.body);
  if (updated) {
    // If the admin is replying, send a simulated email back to the enquirer
    if (req.body.status === 'Replied' && req.body.replyContent) {
      sendSimulatedEmail(
        updated.email,
        `Re: ${updated.subject}`,
        `
        <div style="font-family: Arial, sans-serif; color: #334155; line-height: 1.6; max-width: 600px; margin: auto;">
          <p>Dear ${updated.name},</p>
          <p>Thank you for contacting NiMAWA. We have reviewed your inquiry regarding <strong>"${updated.subject}"</strong>. Here is our response:</p>
          
          <blockquote style="border-left: 4px solid #064e3b; padding-left: 16px; margin: 20px 0; font-style: italic; color: #1e293b;">
            ${req.body.replyContent.replace(/\n/g, '<br/>')}
          </blockquote>
          
          <p>If you have any further questions, please feel free to reply to this email or submit a new contact form on our website.</p>
          <p>Jazakallah Khair,</p>
          <p><strong>NiMAWA Admin Office</strong></p>
        </div>
        `
      );
    }
    res.json({ success: true, message: updated });
  } else {
    res.status(404).json({ success: false, message: 'Message not found' });
  }
});

app.delete('/api/contact/:id', (req, res) => {
  db.deleteContactMessage(req.params.id);
  res.json({ success: true });
});

// 10. Donations
app.post('/api/donations', (req, res) => {
  try {
    const donation = db.createDonation(req.body);

    sendSimulatedEmail(
      donation.donorEmail,
      `Official Donation Receipt: ${donation.receiptNumber}`,
      `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #064e3b; color: #f59e0b; padding: 24px; text-align: center;">
          <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Donation Receipt</h3>
          <p style="margin: 4px 0 0 0; color: #ffffff;">Nigerian Muslims' Association of Western Australia</p>
        </div>
        <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
          <p>Assalamu Alaykum, <strong>${donation.donorName}</strong></p>
          <p>Thank you for your generous contribution of <strong>$${donation.amount}</strong> to NiMAWA. We have successfully registered your donation towards the <strong>${donation.target}</strong>.</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Receipt Number:</td>
                <td style="padding: 6px 0; text-align: right; font-weight: bold; color: #0f172a;">${donation.receiptNumber}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Donation Date:</td>
                <td style="padding: 6px 0; text-align: right; color: #0f172a;">${new Date(donation.createdAt).toLocaleDateString()}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Donation Amount:</td>
                <td style="padding: 6px 0; text-align: right; font-size: 18px; font-weight: bold; color: #16a34a;">$${donation.amount}.00 AUD</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Funding Target:</td>
                <td style="padding: 6px 0; text-align: right; color: #0f172a;">${donation.target}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b; font-weight: bold;">Payment Method:</td>
                <td style="padding: 6px 0; text-align: right; color: #0f172a;">${donation.paymentMethod}</td>
              </tr>
            </table>
          </div>
          
          <p>Your contribution plays an essential role in keeping our community united and driving forward our landmark Islamic Center Acquisition goals. The Prophet (PBUH) said: <em>"Charity does not decrease wealth."</em> [Sahih Muslim]</p>
          <p>Please keep this email as your official receipt for tax or record purposes.</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="font-size: 12px; color: #64748b; text-align: center;">NiMAWA Finance Office | Perth, WA</p>
        </div>
      </div>
      `
    );

    res.json({ success: true, donation });
  } catch (err: any) {
    res.status(400).json({ success: false, message: err.message });
  }
});

app.get('/api/donations', (req, res) => {
  res.json({ success: true, donations: db.getDonations() });
});

// 11. Newsletter
app.post('/api/newsletter/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ success: false, message: 'Email is required' });
  }

  const added = db.addNewsletterSubscriber(email);
  if (added) {
    sendSimulatedEmail(
      email,
      'Subscribed to NiMAWA Newsletter',
      `
      <p>Assalamu Alaykum,</p>
      <p>Thank you for subscribing to the NiMAWA mailing list. We will send you news, prayer reminders, monthly event flyers, and community announcements directly to your inbox.</p>
      <p>Jazakallah Khair,</p>
      <p>NiMAWA Communication Team</p>
      `
    );
    res.json({ success: true, message: 'Successfully subscribed to our newsletter' });
  } else {
    res.json({ success: true, message: 'You are already subscribed to our newsletter' });
  }
});

app.get('/api/newsletter/subscribers', (req, res) => {
  res.json({ success: true, subscribers: db.getNewsletterSubscribers() });
});

app.get('/api/newsletter/export-csv', (req, res) => {
  const subs = db.getNewsletterSubscribers();
  const csvContent = 'Email\n' + subs.join('\n');
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=nimawa_newsletter_subscribers.csv');
  res.status(200).send(csvContent);
});

// 12. Audit Logs and Outbox
app.get('/api/audit-logs', (req, res) => {
  res.json({ success: true, logs: db.getAuditLogs() });
});

app.get('/api/mail-outbox', (req, res) => {
  try {
    const files = fs.readdirSync(EMAILS_DIR);
    const emails = files
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const content = fs.readFileSync(path.join(EMAILS_DIR, f), 'utf-8');
        return JSON.parse(content);
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    res.json({ success: true, emails });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 13. FAQs
app.get('/api/faqs', (req, res) => {
  res.json({ success: true, faqs: db.getFAQs() });
});

// 14. Gemini AI Article / Announcement Assistant
app.post('/api/ai/suggest', async (req, res) => {
  try {
    const { topic, type } = req.body;
    if (!topic) {
      return res.status(400).json({ success: false, message: 'Topic is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      // Fallback if no real API key is configured yet
      return res.json({
        success: true,
        text: `[AI Suggestion Draft for ${topic}] (Please add a valid GEMINI_API_KEY to see real AI generation)

Assalamu Alaykum community,

We are excited to share news regarding ${topic}. This is a milestone event for our association in Western Australia. We encourage all members, volunteers, and supporters to participate actively.

Key Highlights:
- Dynamic spiritual remindings for families.
- Traditional Nigerian and Halal refreshments.
- Interactive youth and kids programs.

Keep an eye on our Announcements panel for venue bookings and ticketing. Jazakallah Khair.`
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    let prompt = '';
    if (type === 'announcement') {
      prompt = `Write a short, engaging, professional Islamic announcement of about 2 sentences for the Nigerian Muslims' Association of Western Australia (NiMAWA) regarding the topic: "${topic}". Start with a welcoming greeting like Assalamu Alaykum or Alhamdulillah. Make it warm and inviting.`;
    } else {
      prompt = `Write a beautiful, professional, and inspiring newsletter/blog article draft for the Nigerian Muslims' Association of Western Australia (NiMAWA) regarding "${topic}". Include an elegant headline, brief summary, and 3 paragraphs of spiritual/community focused content. Start with Islamic praise (Bismillah, Alhamdulillah) and sound community oriented. Keep it under 250 words total.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    const text = response.text || '';
    res.json({ success: true, text });
  } catch (err: any) {
    console.error('Gemini AI Generation Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ----------------------------------------------------
// VITE OR STATIC FILE MIDDLEWARE
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SERVER] NiMAWA application running on port ${PORT}`);
  });
}

startServer();
