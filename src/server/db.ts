import fs from 'fs';
import path from 'path';
import {
  User,
  Member,
  Volunteer,
  EventModel,
  EventRegistration,
  NewsArticle,
  GalleryItem,
  Announcement,
  ContactMessage,
  Donation,
  FAQItem
} from '../types';

interface DatabaseSchema {
  users: Array<User & { passwordHash: string }>;
  members: Member[];
  volunteers: Volunteer[];
  events: EventModel[];
  eventRegistrations: EventRegistration[];
  newsArticles: NewsArticle[];
  galleryItems: GalleryItem[];
  announcements: Announcement[];
  contactMessages: ContactMessage[];
  donations: Donation[];
  newsletterSubscribers: string[];
  auditLogs: Array<{ id: string; user: string; action: string; timestamp: string }>;
}

const DB_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DB_DIR, 'db.json');

// Helper function to check if a folder exists and create it
function ensureDirectoryExistence(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

const DEFAULT_DB: DatabaseSchema = {
  users: [
    {
      id: 'usr_1',
      email: 'admin@nimawa.org.au',
      name: 'Dr. Jamiu Ekundayo',
      role: 'Super Admin',
      passwordHash: 'admin123' // Plaintext or simple verification for reliability
    },
    {
      id: 'usr_2',
      email: 'coordinator@nimawa.org.au',
      name: 'Brother Rasheed',
      role: 'Volunteer Coordinator',
      passwordHash: 'volunteer123'
    },
    {
      id: 'usr_3',
      email: 'editor@nimawa.org.au',
      name: 'Sister Zainab',
      role: 'Editor',
      passwordHash: 'editor123'
    }
  ],
  members: [
    {
      id: 'mem_1',
      firstName: 'Abdul-Hameed',
      lastName: 'Olayinka',
      gender: 'Male',
      dob: '1988-04-12',
      maritalStatus: 'Married',
      email: 'hameed@example.com',
      phone: '+61 412 345 678',
      address: '15 Islamic Center Way',
      city: 'Perth',
      state: 'WA',
      occupation: 'Software Developer',
      profession: 'Information Technology',
      stateOfOrigin: 'Lagos State',
      isRevert: false,
      mosqueAttended: 'Perth Mosque',
      quranClassInterest: true,
      spouseName: 'Mariam Olayinka',
      childrenDetails: 'Aishah (4), Ibrahim (2)',
      emergencyContactName: 'Yusuf Olayinka',
      emergencyContactRelation: 'Brother',
      emergencyContactPhone: '+61 498 765 432',
      createdAt: new Date('2026-01-15').toISOString()
    }
  ],
  volunteers: [
    {
      id: 'vol_1',
      fullName: 'Suleiman Adesina',
      email: 'suleiman@example.com',
      phone: '+61 455 667 788',
      skills: ['Event Planning', 'Teaching', 'Logistics'],
      availability: 'Weekends and Friday evenings',
      interests: 'Ramadan Joint Iftar setup and youth mentoring',
      experience: 'Coordinated local community food drives in Nigeria',
      backgroundConsent: true,
      createdAt: new Date('2026-03-22').toISOString()
    }
  ],
  events: [
    {
      id: 'evt_1',
      title: 'NiMAWA Monthly Gathering & Halaqah',
      date: '2026-07-26', // Always last Sunday of the month (e.g. July 26, 2026)
      venue: 'TBA',
      time: '10:00 AM - 3:00 PM',
      speaker: 'TBA',
      description: 'Join us for our regular monthly gathering for a spiritual reminder, community bonding, updates on NiMAWA projects, and delicious Nigerian refreshments. Attendance is highly encouraged for all family members.',
      category: 'Monthly Gathering',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'evt_2',
      title: 'Annual Ramadan Joint Iftar 2026',
      date: '2027-02-14', // Ramadan around Feb 2027
      venue: 'TBA',
      time: '17:30 - 20:30',
      speaker: 'TBA',
      description: 'The blessed community joint Iftar event where we gather to break our fast, perform Maghrib, Isha, and Taraweeh prayers together, and listen to inspiring Ramadan reflections. Sponsors and volunteers are warmly welcomed.',
      category: 'Ramadan',
      imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1000'
    },
    {
      id: 'evt_3',
      title: 'Joint Eid-ul-Adha Celebration 2026',
      date: '2027-05-16', //Sunday, May 16, 2027
      venue: 'TBA',
      time: '08:00 - 16:00',
      speaker: 'TBA',
      description: 'Celebrate Eid-ul-Adha with the Nigerian Muslim community in WA. The event starts with Eid Prayers exactly at 8:30 AM, followed by sermons, sacrificial distribution guide, children bouncy castles, traditional Nigerian Islamic dishes, family sports, and lots of social networking.',
      category: 'Eid',
      imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&q=80&w=1000'
    }
  ],
  eventRegistrations: [
    {
      id: 'ereg_1',
      eventId: 'evt_1',
      eventTitle: 'NiMAWA Monthly Gathering & Halaqah',
      fullName: 'Mustapha Bello',
      email: 'mustapha@example.com',
      phone: '+61 400 111 222',
      ticketCode: 'TKT-EVT1-MB82',
      createdAt: new Date('2026-07-01T10:30:00Z').toISOString()
    }
  ],
  newsArticles: [
    {
      id: 'news_1',
      title: 'NiMAWA Islamic Center Project Updates',
      content: 'Alhamdulillah! The NiMAWA Executive Board is pleased to provide a progressive update regarding our ongoing effort to acquire a dedicated community hub and Islamic Center in Western Australia. We have successfully secured initial voluntary commitments and have begun active engagement with professional property consultants to identify suitable zones in Perth Southern Suburbs.\n\nOur target is to establish a multipurpose space that will host our Islamic Halaqahs, children Quran classes, social gatherings, youth events, and serve as a central support station for newly arriving Nigerian Muslims in WA.\n\nWe request your continued Duas and financial support. Every dollar contributed brings us closer to securing a landmark that our generation and the future generation will benefit from, InshaAllah.',
      summary: 'Progress report on the search and fundraising drive for our proposed NiMAWA community hub and Islamic Center in Western Australia.',
      category: 'Community Project',
      author: 'NiMAWA Secretariat',
      createdAt: new Date('2026-06-15').toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=1000',
      status: 'Published'
    },
    {
      id: 'news_2',
      title: 'Welcoming New Families to Western Australia',
      content: 'In alignment with our values of Faith, Community, and Unity, the NiMAWA Welfare Committee has successfully launched the "New Settler Reception Program." This initiative is designed to offer critical support, accommodation guides, orientation on local schools, mosques, halal avenues, and administrative integrations for newly arriving Nigerian Muslim families, international students, and skilled professionals in Perth.\n\nIf you are arriving soon, or if you know a family that just arrived, please connect with our Welfare Committee at welfare@nimawa.org.au or via our Contact Form. Together, let us make Perth feel like home for our brothers and sisters!',
      summary: 'The NiMAWA Welfare Committee launches a support program to assist newly arriving Nigerian Muslim families and students settle smoothly in Western Australia.',
      category: 'Welfare',
      author: 'Welfare Coordinator',
      createdAt: new Date('2026-05-10').toISOString(),
      imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1000',
      status: 'Published'
    }
  ],
  galleryItems: [
    {
      id: 'gal_1',
      title: 'Beautiful Gathering at Hossack Park',
      album: 'Eid Celebrations',
      mediaUrl: 'https://images.unsplash.com/photo-1597935258735-e254c1839512?auto=format&fit=crop&q=80&w=800',
      type: 'image',
      createdAt: new Date('2026-01-05').toISOString()
    },
    {
      id: 'gal_2',
      title: 'Ramadan Joint Iftar Community Dinner',
      album: 'Ramadan 2026',
      mediaUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=800',
      type: 'image',
      createdAt: new Date('2026-03-14').toISOString()
    },
    {
      id: 'gal_3',
      title: 'Online Quran Academy Children Graduation',
      album: 'Quran Academy',
      mediaUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
      type: 'image',
      createdAt: new Date('2026-04-20').toISOString()
    }
  ],
  announcements: [
    {
      id: 'ann_1',
      title: 'Assalamu Alaykum! NiMAWA Quran Class Registrations are now Active',
      content: 'Registration is officially open for the Term 3 Online Quran Classes for kids, youths, and adults. Please sign up today!',
      type: 'success',
      isActive: true,
      createdAt: new Date('2026-07-10').toISOString()
    },
    {
      id: 'ann_2',
      title: 'Urgent: Sponsor an Iftar Tray for the upcoming Ramadan Joint Iftar',
      content: 'We need community members to sponsor Iftar food trays. Each tray feeds 5 brothers/sisters and costs only $50. Sponsor on our Donate page.',
      type: 'info',
      isActive: true,
      createdAt: new Date('2026-07-05').toISOString()
    }
  ],
  contactMessages: [
    {
      id: 'msg_1',
      name: 'Sherifdeen Owoeye',
      email: 'sherif@example.com',
      subject: 'Inquiry about Quran classes for Adult Beginners',
      message: 'Assalamu Alaykum, I want to inquire if there is a separate beginner class for adults who want to learn how to read the Quran from scratch? If yes, what is the schedule and pricing? Jazakallah Khair.',
      status: 'Unread',
      createdAt: new Date('2026-07-09T15:20:00Z').toISOString()
    }
  ],
  donations: [
    {
      id: 'don_1',
      donorName: 'Anonymous Brother',
      donorEmail: 'donor@example.com',
      amount: 250,
      type: 'One-time',
      target: 'Islamic Center Acquisition Fund',
      paymentMethod: 'Bank Transfer',
      message: 'May Allah accept it from us as a Sadaqah Jariyah. Amin.',
      receiptNumber: 'REC-202607-0941',
      createdAt: new Date('2026-07-08T11:45:00Z').toISOString()
    },
    {
      id: 'don_2',
      donorName: 'Sister Fatimah',
      donorEmail: 'fatimah@example.com',
      amount: 50,
      type: 'Monthly',
      target: 'General Community Welfare',
      paymentMethod: 'Credit Card',
      message: 'Monthly donation for welfare.',
      receiptNumber: 'REC-202607-1102',
      createdAt: new Date('2026-07-11T04:30:00Z').toISOString()
    }
  ],
  newsletterSubscribers: [
    'jamiuekundayo@gmail.com',
    'community@nimawa.org.au'
  ],
  auditLogs: [
    {
      id: 'log_1',
      user: 'admin@nimawa.org.au',
      action: 'System initialized with pre-seeded data',
      timestamp: new Date().toISOString()
    }
  ]
};

class DB {
  private data: DatabaseSchema;

  constructor() {
    this.data = { ...DEFAULT_DB };
    this.load();
  }

  private load() {
    try {
      ensureDirectoryExistence(DB_DIR);
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(fileContent);
      } else {
        this.save();
      }
    } catch (e) {
      console.error('Error loading database:', e);
      this.data = { ...DEFAULT_DB };
    }
  }

  private save() {
    try {
      ensureDirectoryExistence(DB_DIR);
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving database:', e);
    }
  }

  // --- Users Operations ---
  getUsers() {
    return this.data.users;
  }

  getUserByEmail(email: string) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  // --- Members Operations ---
  getMembers() {
    return this.data.members;
  }

  createMember(member: Omit<Member, 'id' | 'createdAt'>) {
    const newMember: Member = {
      ...member,
      id: `mem_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString()
    };
    this.data.members.unshift(newMember);
    this.save();
    this.logAction('System', `New member registered: ${member.firstName} ${member.lastName}`);
    return newMember;
  }

  deleteMember(id: string) {
    this.data.members = this.data.members.filter(m => m.id !== id);
    this.save();
  }

  // --- Volunteers Operations ---
  getVolunteers() {
    return this.data.volunteers;
  }

  createVolunteer(volunteer: Omit<Volunteer, 'id' | 'createdAt'>) {
    const newVolunteer: Volunteer = {
      ...volunteer,
      id: `vol_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString()
    };
    this.data.volunteers.unshift(newVolunteer);
    this.save();
    this.logAction('System', `New volunteer registered: ${volunteer.fullName}`);
    return newVolunteer;
  }

  deleteVolunteer(id: string) {
    this.data.volunteers = this.data.volunteers.filter(v => v.id !== id);
    this.save();
  }

  // --- Events Operations ---
  getEvents() {
    return this.data.events;
  }

  getEventById(id: string) {
    return this.data.events.find(e => e.id === id);
  }

  createEvent(event: Omit<EventModel, 'id'>) {
    const newEvent: EventModel = {
      ...event,
      id: `evt_${Date.now()}_${Math.floor(Math.random() * 1000)}`
    };
    this.data.events.push(newEvent);
    this.save();
    return newEvent;
  }

  updateEvent(id: string, updatedFields: Partial<EventModel>) {
    const index = this.data.events.findIndex(e => e.id === id);
    if (index !== -1) {
      this.data.events[index] = { ...this.data.events[index], ...updatedFields };
      this.save();
      return this.data.events[index];
    }
    return null;
  }

  deleteEvent(id: string) {
    this.data.events = this.data.events.filter(e => e.id !== id);
    this.data.eventRegistrations = this.data.eventRegistrations.filter(r => r.eventId !== id);
    this.save();
  }

  // --- Event Registrations Operations ---
  getEventRegistrations() {
    return this.data.eventRegistrations;
  }

  createEventRegistration(registration: Omit<EventRegistration, 'id' | 'createdAt' | 'ticketCode'>) {
    const ticketCode = `TKT-${registration.eventId.substring(0, 5).toUpperCase()}-${registration.fullName.substring(0, 2).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;
    const newReg: EventRegistration = {
      ...registration,
      id: `ereg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      ticketCode,
      createdAt: new Date().toISOString()
    };
    this.data.eventRegistrations.unshift(newReg);
    this.save();
    this.logAction('System', `Registered ${registration.fullName} for event: ${registration.eventTitle}`);
    return newReg;
  }

  deleteEventRegistration(id: string) {
    this.data.eventRegistrations = this.data.eventRegistrations.filter(r => r.id !== id);
    this.save();
  }

  // --- News Articles Operations ---
  getNewsArticles() {
    return this.data.newsArticles;
  }

  getNewsById(id: string) {
    return this.data.newsArticles.find(n => n.id === id);
  }

  createNewsArticle(article: Omit<NewsArticle, 'id' | 'createdAt'>) {
    const newArticle: NewsArticle = {
      ...article,
      id: `news_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString()
    };
    this.data.newsArticles.unshift(newArticle);
    this.save();
    return newArticle;
  }

  updateNewsArticle(id: string, updatedFields: Partial<NewsArticle>) {
    const index = this.data.newsArticles.findIndex(n => n.id === id);
    if (index !== -1) {
      this.data.newsArticles[index] = { ...this.data.newsArticles[index], ...updatedFields };
      this.save();
      return this.data.newsArticles[index];
    }
    return null;
  }

  deleteNewsArticle(id: string) {
    this.data.newsArticles = this.data.newsArticles.filter(n => n.id !== id);
    this.save();
  }

  // --- Gallery Items Operations ---
  getGalleryItems() {
    return this.data.galleryItems;
  }

  createGalleryItem(item: Omit<GalleryItem, 'id' | 'createdAt'>) {
    const newItem: GalleryItem = {
      ...item,
      id: `gal_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString()
    };
    this.data.galleryItems.unshift(newItem);
    this.save();
    return newItem;
  }

  deleteGalleryItem(id: string) {
    this.data.galleryItems = this.data.galleryItems.filter(i => i.id !== id);
    this.save();
  }

  // --- Announcements Operations ---
  getAnnouncements() {
    return this.data.announcements;
  }

  createAnnouncement(announcement: Omit<Announcement, 'id' | 'createdAt'>) {
    const newAnnouncement: Announcement = {
      ...announcement,
      id: `ann_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString()
    };
    this.data.announcements.unshift(newAnnouncement);
    this.save();
    return newAnnouncement;
  }

  updateAnnouncement(id: string, updatedFields: Partial<Announcement>) {
    const index = this.data.announcements.findIndex(a => a.id === id);
    if (index !== -1) {
      this.data.announcements[index] = { ...this.data.announcements[index], ...updatedFields };
      this.save();
      return this.data.announcements[index];
    }
    return null;
  }

  deleteAnnouncement(id: string) {
    this.data.announcements = this.data.announcements.filter(a => a.id !== id);
    this.save();
  }

  // --- Contact Messages Operations ---
  getContactMessages() {
    return this.data.contactMessages;
  }

  createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) {
    const newMessage: ContactMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      status: 'Unread',
      createdAt: new Date().toISOString()
    };
    this.data.contactMessages.unshift(newMessage);
    this.save();
    return newMessage;
  }

  updateContactMessage(id: string, updatedFields: Partial<ContactMessage>) {
    const index = this.data.contactMessages.findIndex(m => m.id === id);
    if (index !== -1) {
      this.data.contactMessages[index] = { ...this.data.contactMessages[index], ...updatedFields };
      this.save();
      return this.data.contactMessages[index];
    }
    return null;
  }

  deleteContactMessage(id: string) {
    this.data.contactMessages = this.data.contactMessages.filter(m => m.id !== id);
    this.save();
  }

  // --- Donations Operations ---
  getDonations() {
    return this.data.donations;
  }

  createDonation(donation: Omit<Donation, 'id' | 'createdAt' | 'receiptNumber'>) {
    const receiptNumber = `REC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDonation: Donation = {
      ...donation,
      id: `don_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      receiptNumber,
      createdAt: new Date().toISOString()
    };
    this.data.donations.unshift(newDonation);
    this.save();
    this.logAction('System', `Donation of $${donation.amount} received from ${donation.donorName}`);
    return newDonation;
  }

  // --- Newsletter Subscribers Operations ---
  getNewsletterSubscribers() {
    return this.data.newsletterSubscribers;
  }

  addNewsletterSubscriber(email: string) {
    const normalized = email.trim().toLowerCase();
    if (normalized && !this.data.newsletterSubscribers.includes(normalized)) {
      this.data.newsletterSubscribers.push(normalized);
      this.save();
      return true;
    }
    return false;
  }

  removeNewsletterSubscriber(email: string) {
    const normalized = email.trim().toLowerCase();
    this.data.newsletterSubscribers = this.data.newsletterSubscribers.filter(e => e !== normalized);
    this.save();
  }

  // --- FAQ Operations ---
  getFAQs() {
    // Return some standard FAQs
    const defaultFAQs: FAQItem[] = [
      {
        id: 'faq_1',
        question: 'What is NiMAWA?',
        answer: 'NiMAWA stands for Nigerian Muslims\' Association of Western Australia. We are a registered non-profit organisation community representing Nigerian Muslims in Western Australia, dedicated to promoting faith, community development, and unity.',
        category: 'General'
      },
      {
        id: 'faq_2',
        question: 'How do I become a registered member of NiMAWA?',
        answer: 'You can register online by clicking the "Register" or "Join Us" button on the menu. Simply fill in the comprehensive membership form. After registration, our membership team will verify your details and welcome you formally to the association.',
        category: 'Membership'
      },
      {
        id: 'faq_3',
        question: 'Are there Quran classes for adults and children?',
        answer: 'Yes! Our Online Quran Academy offers classes for children, youth, and adult beginners. Classes focus on Arabic letter recognition, proper tajweed rules, and memorisation. Check the Quran Class page for scheduling and sign up details.',
        category: 'Services'
      },
      {
        id: 'faq_4',
        question: 'How does the association fund its operations?',
        answer: 'NiMAWA runs entirely on membership contributions, generous donations, and sponsorship of specific events (like Joint Ramadan Iftars or Eid Celebrations). All financial support is directed to community projects, rent for venues, and welfare services.',
        category: 'Donations'
      }
    ];
    return defaultFAQs;
  }

  // --- Logging Operations ---
  getAuditLogs() {
    return this.data.auditLogs;
  }

  logAction(user: string, action: string) {
    const newLog = {
      id: `log_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      user,
      action,
      timestamp: new Date().toISOString()
    };
    this.data.auditLogs.unshift(newLog);
    this.save();
    return newLog;
  }
}

export const db = new DB();
