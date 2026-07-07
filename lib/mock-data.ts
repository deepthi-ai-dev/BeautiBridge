// ============================================================
// CUSTOMER MOCK DATA
// ============================================================

export type BookingStatus = "upcoming" | "confirmed" | "pending" | "cancelled" | "completed";
export type NotificationCategory = "booking" | "system" | "promo" | "ai";

export interface MockBooking {
  id: string;
  artistName: string;
  artistSpecialty: string;
  artistInitials: string;
  artistColor: string;
  service: string;
  date: string;
  time: string;
  status: BookingStatus;
  price: number;
  location: string;
}

export interface MockFavoriteArtist {
  id: string;
  name: string;
  slug: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  initials: string;
  color: string;
  location: string;
  startingPrice: number;
}

export interface MockNotification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  isRead: boolean;
  time: string;
}

export interface MockAiHistory {
  id: string;
  title: string;
  preview: string;
  date: string;
  messageCount: number;
}

export interface MockActivity {
  id: string;
  type: "booking" | "review" | "favorite" | "ai";
  description: string;
  time: string;
}

export const MOCK_UPCOMING_BOOKINGS: MockBooking[] = [
  {
    artistColor: "from-salmon-300 to-primary",
    artistInitials: "PK",
    artistName: "Priya Kapoor",
    artistSpecialty: "Bridal Specialist",
    date: "2025-08-15",
    id: "bk-001",
    location: "Koramangala, Bangalore",
    price: 4500,
    service: "Bridal Makeup & Hair",
    status: "confirmed",
    time: "10:00 AM",
  },
  {
    artistColor: "from-gold-400 to-salmon-400",
    artistInitials: "AR",
    artistName: "Ananya Reddy",
    artistSpecialty: "Makeup Artist",
    date: "2025-08-22",
    id: "bk-002",
    location: "Indiranagar, Bangalore",
    price: 2800,
    service: "Party Makeup",
    status: "pending",
    time: "02:30 PM",
  },
];

export const MOCK_BOOKING_HISTORY: MockBooking[] = [
  {
    artistColor: "from-teal-400 to-plum-700",
    artistInitials: "NS",
    artistName: "Nisha Sharma",
    artistSpecialty: "Hair Stylist",
    date: "2025-07-01",
    id: "bk-003",
    location: "HSR Layout, Bangalore",
    price: 1800,
    service: "Hair Styling",
    status: "completed",
    time: "11:00 AM",
  },
  {
    artistColor: "from-salmon-300 to-primary",
    artistInitials: "MJ",
    artistName: "Meena Joshi",
    artistSpecialty: "Skincare Expert",
    date: "2025-06-18",
    id: "bk-004",
    location: "JP Nagar, Bangalore",
    price: 2200,
    service: "Facial & Skincare",
    status: "completed",
    time: "03:00 PM",
  },
  {
    artistColor: "from-gold-400 to-salmon-400",
    artistInitials: "PK",
    artistName: "Priya Kapoor",
    artistSpecialty: "Bridal Specialist",
    date: "2025-05-30",
    id: "bk-005",
    location: "Koramangala, Bangalore",
    price: 5500,
    service: "Reception Makeup",
    status: "completed",
    time: "09:30 AM",
  },
  {
    artistColor: "from-teal-400 to-plum-700",
    artistInitials: "RP",
    artistName: "Rekha Pillai",
    artistSpecialty: "Nail Artist",
    date: "2025-05-10",
    id: "bk-006",
    location: "Whitefield, Bangalore",
    price: 900,
    service: "Nail Art",
    status: "cancelled",
    time: "04:00 PM",
  },
];

export const MOCK_FAVORITE_ARTISTS: MockFavoriteArtist[] = [
  {
    color: "from-salmon-300 to-primary",
    id: "art-001",
    initials: "PK",
    location: "Koramangala, Bangalore",
    name: "Priya Kapoor",
    slug: "priya-m",
    rating: 4.9,
    reviewCount: 128,
    specialty: "Bridal Specialist",
    startingPrice: 3500,
  },
  {
    color: "from-gold-400 to-salmon-400",
    id: "art-002",
    initials: "AR",
    location: "Indiranagar, Bangalore",
    name: "Ananya Reddy",
    slug: "ananya-r",
    rating: 4.8,
    reviewCount: 94,
    specialty: "Makeup Artist",
    startingPrice: 2000,
  },
  {
    color: "from-teal-400 to-plum-700",
    id: "art-003",
    initials: "NS",
    location: "HSR Layout, Bangalore",
    name: "Nisha Sharma",
    slug: "nisha-k",
    rating: 4.7,
    reviewCount: 73,
    specialty: "Hair Stylist",
    startingPrice: 1500,
  },
  {
    color: "from-plum-600 to-plum-900",
    id: "art-004",
    initials: "MJ",
    location: "JP Nagar, Bangalore",
    name: "Meena Joshi",
    slug: "meena-j",
    rating: 4.9,
    reviewCount: 156,
    specialty: "Skincare Expert",
    startingPrice: 1800,
  },
];

export const MOCK_NOTIFICATIONS: MockNotification[] = [
  {
    category: "booking",
    id: "notif-001",
    isRead: false,
    message: "Priya Kapoor confirmed your Bridal Makeup booking for Aug 15.",
    time: "2 hours ago",
    title: "Booking Confirmed",
  },
  {
    category: "promo",
    id: "notif-002",
    isRead: false,
    message: "Get 20% off on your next booking this weekend only.",
    time: "5 hours ago",
    title: "Special Offer",
  },
  {
    category: "ai",
    id: "notif-003",
    isRead: true,
    message: "Your BeautiAssist conversation on bridal looks is ready.",
    time: "1 day ago",
    title: "AI Consultation Ready",
  },
  {
    category: "system",
    id: "notif-004",
    isRead: true,
    message: "Your account details have been successfully updated.",
    time: "2 days ago",
    title: "Profile Updated",
  },
  {
    category: "booking",
    id: "notif-005",
    isRead: true,
    message: "Reminder: Nisha Sharma appointment tomorrow at 11 AM.",
    time: "3 days ago",
    title: "Appointment Reminder",
  },
];

export const MOCK_AI_HISTORY: MockAiHistory[] = [
  {
    date: "2025-07-06",
    id: "ai-001",
    messageCount: 12,
    preview: "Recommend a bridal makeup look for a traditional South Indian wedding...",
    title: "Bridal Makeup Ideas",
  },
  {
    date: "2025-07-03",
    id: "ai-002",
    messageCount: 8,
    preview: "What skincare routine should I follow for oily skin in monsoon...",
    title: "Monsoon Skincare Routine",
  },
  {
    date: "2025-06-28",
    id: "ai-003",
    messageCount: 15,
    preview: "Suggest trending hairstyles for a reception night...",
    title: "Reception Hairstyles",
  },
  {
    date: "2025-06-20",
    id: "ai-004",
    messageCount: 6,
    preview: "Budget party makeup ideas under ₹3000...",
    title: "Budget Party Makeup",
  },
];

export const MOCK_ACTIVITIES: MockActivity[] = [
  {
    description: "Booked Priya Kapoor for Bridal Makeup on Aug 15",
    id: "act-001",
    time: "2 hours ago",
    type: "booking",
  },
  {
    description: "Saved Ananya Reddy to favorites",
    id: "act-002",
    time: "1 day ago",
    type: "favorite",
  },
  {
    description: "Left a 5★ review for Nisha Sharma",
    id: "act-003",
    time: "3 days ago",
    type: "review",
  },
  {
    description: "Started AI consultation on bridal makeup looks",
    id: "act-004",
    time: "5 days ago",
    type: "ai",
  },
];

// ============================================================
// ARTIST MOCK DATA
// ============================================================

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type SlotStatus = "available" | "booked" | "blocked";

export interface MockAppointment {
  id: string;
  customerName: string;
  customerInitials: string;
  service: string;
  date: string;
  time: string;
  duration: string;
  status: AppointmentStatus;
  price: number;
}

export interface MockArtistService {
  id: string;
  name: string;
  duration: string;
  price: number;
  bookings: number;
  isPopular: boolean;
}

export interface MockCalendarSlot {
  time: string;
  status: SlotStatus;
  customerName?: string;
  service?: string;
}

export interface MockEarningsMonth {
  month: string;
  revenue: number;
  bookings: number;
}

export interface MockArtistReview {
  id: string;
  customerName: string;
  customerInitials: string;
  rating: number;
  review: string;
  service: string;
  date: string;
}

export interface MockPortfolioItem {
  id: string;
  title: string;
  category: string;
  gradient: string;
}

export interface MockAvailabilityDay {
  day: string;
  shortDay: string;
  isAvailable: boolean;
  slots: string[];
}

export const MOCK_APPOINTMENTS: MockAppointment[] = [
  {
    customerInitials: "DP",
    customerName: "Deepika Patel",
    date: "2025-08-07",
    duration: "3 hrs",
    id: "apt-001",
    price: 5500,
    service: "Bridal Makeup & Hair",
    status: "confirmed",
    time: "09:00 AM",
  },
  {
    customerInitials: "RV",
    customerName: "Riya Verma",
    date: "2025-08-07",
    duration: "1.5 hrs",
    id: "apt-002",
    price: 2500,
    service: "Party Makeup",
    status: "confirmed",
    time: "01:00 PM",
  },
  {
    customerInitials: "SK",
    customerName: "Sneha Kumar",
    date: "2025-08-08",
    duration: "2 hrs",
    id: "apt-003",
    price: 3800,
    service: "Reception Makeup",
    status: "pending",
    time: "10:30 AM",
  },
  {
    customerInitials: "AM",
    customerName: "Aisha Malik",
    date: "2025-08-09",
    duration: "1 hr",
    id: "apt-004",
    price: 1800,
    service: "Hair Styling",
    status: "pending",
    time: "03:00 PM",
  },
];

export const MOCK_ARTIST_SERVICES: MockArtistService[] = [
  {
    bookings: 48,
    duration: "3-4 hours",
    id: "svc-001",
    isPopular: true,
    name: "Bridal Makeup & Hair",
    price: 5500,
  },
  {
    bookings: 32,
    duration: "2-3 hours",
    id: "svc-002",
    isPopular: false,
    name: "Reception Makeup",
    price: 3800,
  },
  {
    bookings: 61,
    duration: "1.5 hours",
    id: "svc-003",
    isPopular: true,
    name: "Party Makeup",
    price: 2500,
  },
  {
    bookings: 24,
    duration: "1 hour",
    id: "svc-004",
    isPopular: false,
    name: "Hair Styling",
    price: 1800,
  },
  {
    bookings: 15,
    duration: "30 mins",
    id: "svc-005",
    isPopular: false,
    name: "Touch-up Session",
    price: 800,
  },
];

export const MOCK_CALENDAR_SLOTS: MockCalendarSlot[] = [
  { service: "Bridal Makeup", status: "booked", customerName: "Deepika P.", time: "09:00 AM" },
  { status: "available", time: "10:00 AM" },
  { status: "available", time: "11:00 AM" },
  { status: "blocked", time: "12:00 PM" },
  { service: "Party Makeup", status: "booked", customerName: "Riya V.", time: "01:00 PM" },
  { status: "available", time: "02:00 PM" },
  { status: "available", time: "03:00 PM" },
  { status: "available", time: "04:00 PM" },
  { status: "blocked", time: "05:00 PM" },
];

export const MOCK_EARNINGS_MONTHLY: MockEarningsMonth[] = [
  { bookings: 18, month: "Feb", revenue: 42000 },
  { bookings: 22, month: "Mar", revenue: 55000 },
  { bookings: 20, month: "Apr", revenue: 48000 },
  { bookings: 28, month: "May", revenue: 71000 },
  { bookings: 32, month: "Jun", revenue: 84000 },
  { bookings: 38, month: "Jul", revenue: 98000 },
];

export const MOCK_ARTIST_REVIEWS: MockArtistReview[] = [
  {
    customerInitials: "DP",
    customerName: "Deepika Patel",
    date: "2025-07-01",
    id: "rev-001",
    rating: 5,
    review: "Absolutely stunning bridal look! Priya understood exactly what I wanted and exceeded my expectations. Highly recommend!",
    service: "Bridal Makeup & Hair",
  },
  {
    customerInitials: "RV",
    customerName: "Riya Verma",
    date: "2025-06-28",
    id: "rev-002",
    rating: 5,
    review: "Amazing work for my party look. Long-lasting, flawless finish. Will definitely book again!",
    service: "Party Makeup",
  },
  {
    customerInitials: "SK",
    customerName: "Swathi Krishnan",
    date: "2025-06-20",
    id: "rev-003",
    rating: 4,
    review: "Great experience overall. The makeup was beautiful and professional. Minor delay in timing.",
    service: "Reception Makeup",
  },
  {
    customerInitials: "AM",
    customerName: "Aisha Mehta",
    date: "2025-06-12",
    id: "rev-004",
    rating: 5,
    review: "Priya is a true artist! The hair styling was perfect for my engagement. Got so many compliments!",
    service: "Hair Styling",
  },
];

export const MOCK_PORTFOLIO: MockPortfolioItem[] = [
  { category: "Bridal", gradient: "from-salmon-300 via-primary to-plum-800", id: "port-001", title: "South Indian Bride" },
  { category: "Reception", gradient: "from-gold-400 via-salmon-400 to-primary", id: "port-002", title: "Reception Glam" },
  { category: "Party", gradient: "from-teal-400 via-plum-600 to-plum-900", id: "port-003", title: "Night Party Look" },
  { category: "Bridal", gradient: "from-plum-600 via-salmon-300 to-gold-400", id: "port-004", title: "Engagement Look" },
  { category: "Hair", gradient: "from-beige-200 via-salmon-300 to-primary", id: "port-005", title: "Bridal Updo" },
  { category: "Editorial", gradient: "from-plum-900 via-teal-400 to-gold-400", id: "port-006", title: "Editorial Shoot" },
];

export const MOCK_AVAILABILITY: MockAvailabilityDay[] = [
  { day: "Monday", isAvailable: true, shortDay: "Mon", slots: ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"] },
  { day: "Tuesday", isAvailable: true, shortDay: "Tue", slots: ["10:00 AM", "01:00 PM", "03:00 PM"] },
  { day: "Wednesday", isAvailable: true, shortDay: "Wed", slots: ["09:00 AM", "11:00 AM", "02:00 PM"] },
  { day: "Thursday", isAvailable: false, shortDay: "Thu", slots: [] },
  { day: "Friday", isAvailable: true, shortDay: "Fri", slots: ["10:00 AM", "12:00 PM", "03:00 PM", "05:00 PM"] },
  { day: "Saturday", isAvailable: true, shortDay: "Sat", slots: ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"] },
  { day: "Sunday", isAvailable: false, shortDay: "Sun", slots: [] },
];
