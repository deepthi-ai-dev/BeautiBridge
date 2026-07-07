export type ReviewAuthor = {
  name: string;
  avatar: string;
  location: string;
};

export type Review = {
  id: string;
  author: ReviewAuthor;
  rating: number;
  date: string;
  service: string;
  body: string;
  helpful: number;
};

export type ServicePackage = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  isPopular?: boolean;
  includes: string[];
};

export type DaySlot = {
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  status: "available" | "booked" | "off";
  slots?: string[];
};

export type ArtistProfile = {
  weeklyAvailability: DaySlot[];
  servicePackages: ServicePackage[];
  reviews: Review[];
  highlights: string[];
  certifications: string[];
  instagramHandle?: string;
};
