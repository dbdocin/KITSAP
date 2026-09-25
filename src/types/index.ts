export type ProjectCategory =
  | "YouTube"
  | "Reels"
  | "Commercial"
  | "Corporate"
  | "Podcast"
  | "Events";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  client?: string;
  year?: string;
  description: string;
  thumbnail: string;
  aspect: "landscape" | "portrait" | "square"; // drives grid rhythm
  heroMedia?: string;
  videoUrl?: string; // YouTube/Vimeo embed URL
  gallery?: string[];
  services: string[];
  deliverables: string[];
  featured: boolean;
  isPlaceholder?: boolean;
}

export interface Service {
  slug: string;
  number: string; // "01"
  title: string;
  shortDescription: string;
  description: string;
  includes: string[];
  deliverables: string[];
  useCases: string[];
  image: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  isPlaceholder?: boolean;
}

export interface Faq {
  question: string;
  answer: string;
}
