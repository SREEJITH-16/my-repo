// Content data model — the single source of truth for all editable portfolio
// content. The public site renders straight from this shape; the /admin CMS
// edits a JSON file that conforms to it.

export interface Profile {
  name: string;
  headline: string;
  location: string;
  tagline: string;
  bio: string[];
  education: {
    degree: string;
    institution: string;
    campus: string;
    duration: string;
    expectedGraduation: string;
  };
  interests: string[];
  goal: string;
  email: string;
  collegeEmail: string;
  phone: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  portraitUrl: string;
  stats: { label: string; value: string }[];
}

export interface SemesterRecord {
  semester: string;
  period: string;
  sgpa: number;
}

export interface Academic {
  cgpa: number;
  semestersCompleted: number;
  expectedGraduation: string;
  degree: string;
  institution: string;
  campus: string;
  duration: string;
  semesters: SemesterRecord[];
  schooling: {
    level: string;
    board: string;
    school: string;
    year: string;
    percentage: number;
  }[];
}

export interface Skill {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Project {
  id: string;
  index: string;
  name: string;
  description: string;
  tech: string[];
  github?: string | undefined;
  liveDemo?: string | undefined;
  featured: boolean;
  needsContent?: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  current: boolean;
  location: string;
  description: string;
  tags: string[];
}

export interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  image?: string | undefined;
  link?: string | undefined;
}

export interface Activity {
  id: string;
  title: string;
  organization: string;
  role: string;
  date: string;
  description: string;
  link?: string | undefined;
}

export interface PortfolioContent {
  profile: Profile;
  academic: Academic;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  certificates: Certificate[];
  activities: Activity[];
}
