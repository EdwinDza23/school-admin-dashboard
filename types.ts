
export enum Role {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  CONTENT_EDITOR = 'CONTENT_EDITOR',
  ADMISSIONS_VIEWER = 'ADMISSIONS_VIEWER',
}

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  status: 'Upcoming' | 'Ongoing' | 'Past';
}

export enum AchievementCategory {
  ACADEMIC = 'Academic',
  SPORTS = 'Sports',
}

export interface Achievement {
  id: string;
  photoUrl?: string;
  studentName: string;
  classSection: string;
  category: AchievementCategory;
  title: string;
  competitionName: string;
  year: string;
  rank: string;
  description: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishDate: string;
  authorName: string;
  authorRole: string;
  authorImageUrl?: string;
  category: string;
  additionalCategories: string[];
  readTime: string;
  coverImageUrl: string;
  content: string; // Store as string, can be parsed into paragraphs
  isPublished: boolean;
}

export interface GalleryImage {
  id: string;
  url: string;
  category: string;
}

export interface AdmissionSubmission {
  id: string;
  studentName: string;
  parentName: string;
  grade: string;
  email: string;
  phone: string;
  submittedAt: string;
  status: string;
  details: Record<string, string>;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  isActive: boolean;
  order: number;
}

export interface HeroConfig {
  heading: string;
  subtext: string;
  backgroundImageUrl: string;
}
