
import { 
  LayoutDashboard, 
  Calendar, 
  Trophy, 
  FileText, 
  Image as ImageIcon, 
  Users, 
  UserSquare2, 
  Monitor 
} from 'lucide-react';
import { Role, Event, Achievement, AchievementCategory, BlogPost, GalleryImage, AdmissionSubmission, Staff, HeroConfig } from './types';

export const COLORS = {
  primary: '#F7F9FC', // App BG
  card: '#FFFFFF',    // Card BG
  modal: '#FFFFFF',   // Modal BG
  accent: '#2563EB',  // Calm Blue
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626',
  text: '#0F172A',
  secondary: '#334155',
  muted: '#64748B'
};

export const GALLERY_CATEGORIES = [
  'Academics',
  'Sports',
  'Events',
  'Campus'
];

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, roles: [Role.SYSTEM_ADMIN, Role.CONTENT_EDITOR, Role.ADMISSIONS_VIEWER] },
  { id: 'events', label: 'Events', icon: <Calendar size={20} />, roles: [Role.SYSTEM_ADMIN, Role.CONTENT_EDITOR] },
  { id: 'achievements', label: 'Achievements', icon: <Trophy size={20} />, roles: [Role.SYSTEM_ADMIN, Role.CONTENT_EDITOR] },
  { id: 'blogs', label: 'Blog Posts', icon: <FileText size={20} />, roles: [Role.SYSTEM_ADMIN, Role.CONTENT_EDITOR] },
  { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} />, roles: [Role.SYSTEM_ADMIN, Role.CONTENT_EDITOR] },
  { id: 'admissions', label: 'Admissions', icon: <Users size={20} />, roles: [Role.SYSTEM_ADMIN, Role.ADMISSIONS_VIEWER] },
  { id: 'staff', label: 'Staff List', icon: <UserSquare2 size={20} />, roles: [Role.SYSTEM_ADMIN] },
  { id: 'hero', label: 'Hero Section', icon: <Monitor size={20} />, roles: [Role.SYSTEM_ADMIN, Role.CONTENT_EDITOR] },
];

export const MOCK_EVENTS: Event[] = [
  { id: '1', title: 'Annual Day 2024', description: 'Grand celebration of school culture', date: '2024-12-20', status: 'Upcoming' },
  { id: '2', title: 'Science Exhibition', description: 'Innovative projects by students', date: '2024-05-15', status: 'Past' },
  { id: '3', title: 'Sports Meet', description: 'Inter-house athletic competition', date: '2024-11-10', status: 'Ongoing' },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  {
    id: '1',
    studentName: 'Aarav Sharma',
    classSection: '10th B',
    category: AchievementCategory.ACADEMIC,
    title: 'State Merit List',
    competitionName: 'SSC Board Exams',
    year: '2024',
    rank: '1st',
    description: 'Secured 98.5% in State Board Examinations.',
    isFeatured: true,
    isActive: true,
    photoUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=400&h=400&fit=crop',
  },
  {
    id: '2',
    studentName: 'Priya Patel',
    classSection: '8th A',
    category: AchievementCategory.SPORTS,
    title: 'National Gold Medal',
    competitionName: 'U-14 Athletics',
    year: '2023',
    rank: 'Gold',
    description: 'Won gold in 100m sprint.',
    isFeatured: true,
    isActive: true,
    photoUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=400&h=400&fit=crop',
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of STEM Education',
    excerpt: 'Exploring how technology integration is reshaping the classroom experience for students.',
    publishDate: '2024-03-01',
    authorName: 'Dr. Sarah Smith',
    authorRole: 'Science Head',
    category: 'Education',
    additionalCategories: ['Technology', 'STEM'],
    readTime: '5 min',
    coverImageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2070&auto=format&fit=crop',
    content: 'Teaching science in the modern age requires a focus on interdisciplinary approaches...',
    isPublished: true,
  }
];

export const MOCK_GALLERY: GalleryImage[] = [
  // Campus
  { id: 'c1', url: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800&auto=format&fit=crop', category: 'Campus' },
  { id: 'c2', url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop', category: 'Campus' },
  { id: 'c3', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop', category: 'Campus' },
  // Academics
  { id: 'cl1', url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop', category: 'Academics' },
  { id: 'cl2', url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop', category: 'Academics' },
  // Sports
  { id: 's1', url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop', category: 'Sports' },
  { id: 's2', url: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop', category: 'Sports' },
  { id: 's3', url: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=800&auto=format&fit=crop', category: 'Sports' },
  // Events
  { id: 'cp1', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop', category: 'Events' },
  { id: 'cp2', url: 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?q=80&w=800&auto=format&fit=crop', category: 'Events' },
  { id: 'ad1', url: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=800&auto=format&fit=crop', category: 'Events' },
  { id: 'ad2', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop', category: 'Events' },
];

export const MOCK_ADMISSIONS: AdmissionSubmission[] = [
  {
    id: '1',
    studentName: 'Rohan Mehta',
    parentName: 'Sanjay Mehta',
    grade: 'Grade 5',
    email: 'sanjay@example.com',
    phone: '9876543210',
    submittedAt: '2024-03-10T10:30:00Z',
    status: 'New',
    details: { 
      gender: 'Male',
      dob: '2014-05-12',
      previousSchool: 'Sunrise Public School',
      relationship: 'Father',
      occupation: 'Software Engineer',
      address: '123 Main St, Near Bridge',
      city: 'Honnavar',
      state: 'Karnataka',
      pincode: '581334',
      remarks: 'Rohan is very keen on sports and coding.'
    }
  },
  {
    id: '2',
    studentName: 'Ananya Iyer',
    parentName: 'Lakshmi Iyer',
    grade: 'Grade 1',
    email: 'lakshmi.i@example.com',
    phone: '9845012345',
    submittedAt: '2024-03-11T09:15:00Z',
    status: 'New',
    details: { 
      gender: 'Female',
      dob: '2018-08-22',
      previousSchool: 'Little Angels Playhome',
      relationship: 'Mother',
      occupation: 'Architect',
      address: 'Flat 402, Green Meadows',
      city: 'Honnavar',
      state: 'Karnataka',
      pincode: '581334',
      remarks: 'She enjoys painting and storytelling.'
    }
  }
];

export const MOCK_HERO: HeroConfig = {
  heading: 'Academic Excellence Starts Here',
  subtext: 'Our departments are constantly evolving to provide students with the tools they need for a digital future.',
  backgroundImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop',
};
