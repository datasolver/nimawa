export interface User {
  id: string;
  email: string;
  role: 'Super Admin' | 'Administrator' | 'Editor' | 'Volunteer Coordinator';
  name: string;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  dob: string;
  maritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed';
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  occupation: string;
  profession: string;
  stateOfOrigin: string;
  isRevert: boolean;
  mosqueAttended: string;
  quranClassInterest: boolean;
  spouseName?: string;
  childrenDetails?: string;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  createdAt: string;
}

export interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  skills: string[];
  availability: string;
  interests: string;
  experience: string;
  backgroundConsent: boolean;
  createdAt: string;
}

export interface EventModel {
  id: string;
  title: string;
  date: string;
  venue: string;
  time: string;
  speaker: string;
  description: string;
  category: 'Monthly Gathering' | 'Ramadan' | 'Eid' | 'General';
  imageUrl?: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string;
  ticketCode: string;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  imageUrl?: string;
  author: string;
  createdAt: string;
  status: 'Published' | 'Draft';
}

export interface GalleryItem {
  id: string;
  title: string;
  album: string;
  mediaUrl: string;
  type: 'image' | 'video';
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'success';
  isActive: boolean;
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Replied' | 'Archived';
  replyContent?: string;
  createdAt: string;
}

export interface Donation {
  id: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  type: 'One-time' | 'Monthly';
  target: string;
  paymentMethod: string;
  message?: string;
  receiptNumber: string;
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface PrayerTimesData {
  fajr: string;
  sunrise: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
  hijriDate: string;
  gregorianDate: string;
}
