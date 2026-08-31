export type Media = {
  kind: "image" | "gallery" | "video" | "diagram";
  src?: string;
  sources?: string[];
  alt: string;
  caption: string;
  poster?: string;
};

export type ContentSection = {
  heading?: string;
  paragraphs?: string[];
  questions?: string[];
};

export type WorkEntry = {
  slug: string;
  title: string;
  summary: string;
  status: string;
  role: string;
  featured: boolean;
  topics: string[];
  evidenceLevel: string;
  confidentialityNote?: string;
  aiInvolvement: string;
  revisionDate: string;
  currentLimits?: string;
  nextTest?: string;
  media?: Media;
  sections: ContentSection[];
};

export type ProjectEntry = {
  slug: string;
  title: string;
  summary: string;
  status: string;
  featured: boolean;
  hasDetailPage: boolean;
  topics: string[];
  evidenceLevel: string;
  aiInvolvement: string;
  revisionDate: string;
  currentLimits?: string;
  nextTest?: string;
  repository?: string;
  media?: Media;
  sections: ContentSection[];
};
