import type { ArtistProfile } from "./profile-types";

/**
 * Extended mock profile data keyed by artist slug.
 * Used exclusively in Phase 5 — Artist Profile page.
 */
export const MOCK_PROFILES: Record<string, ArtistProfile> = {
  "ananya-r": {
    highlights: [
      "8+ years bridal expertise",
      "500+ brides served",
      "Airbrush & HD certified",
      "Home visits available",
    ],
    certifications: [
      "CIDESCO International Certification",
      "MAC Professional Artistry",
      "Airbrush Makeup by Dinair",
    ],
    instagramHandle: "ananya.r.bridal",
    servicePackages: [
      {
        id: "s1",
        name: "Bridal Glow",
        description:
          "Complete bridal makeup with skin prep, HD foundation, and setting spray.",
        duration: "3–4 hrs",
        price: 2800,
        includes: [
          "Skin prep & priming",
          "HD airbrush foundation",
          "Eye & lip artistry",
          "Setting spray & touch-up kit",
        ],
      },
      {
        id: "s2",
        name: "Bridal Premium",
        description:
          "Our most popular all-day bridal package including hair styling.",
        duration: "5–6 hrs",
        price: 4500,
        isPopular: true,
        includes: [
          "Everything in Bridal Glow",
          "Bridal updo / hairstyling",
          "False lashes",
          "2 on-site touch-ups",
          "Complimentary mehendi consultation",
        ],
      },
      {
        id: "s3",
        name: "Engagement Look",
        description:
          "Light, radiant makeup perfect for engagement and reception evenings.",
        duration: "2–3 hrs",
        price: 1800,
        includes: [
          "Natural skin prep",
          "Dewy finish makeup",
          "Soft smoky or natural eye",
          "Setting mist",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: {
          name: "Sowmya V.",
          avatar: "/images/marketing/hero-makeup.svg",
          location: "Visakhapatnam",
        },
        rating: 5,
        date: "2025-11-12",
        service: "Bridal Premium",
        body: "Ananya is an absolute magician! My bridal look was exactly what I had dreamed of — flawless, long-lasting and incredibly beautiful. She made me feel so calm and at ease throughout the whole process. Would give 10 stars if I could!",
        helpful: 47,
      },
      {
        id: "r2",
        author: {
          name: "Preethi A.",
          avatar: "/images/marketing/bridal-look.svg",
          location: "Hyderabad",
        },
        rating: 5,
        date: "2025-10-05",
        service: "Engagement Look",
        body: "Got the engagement look done and received compliments all night. The makeup stayed put for over 12 hours without any touch-ups. Ananya listens carefully and delivers exactly what you envision.",
        helpful: 29,
      },
      {
        id: "r3",
        author: {
          name: "Ramya S.",
          avatar: "/images/marketing/nail-art.svg",
          location: "Vijayawada",
        },
        rating: 5,
        date: "2025-09-20",
        service: "Bridal Glow",
        body: "I've tried many makeup artists but Ananya is in a league of her own. Her skin prep routine alone transformed my skin. The airbrush foundation looked like my real skin but 10x better!",
        helpful: 18,
      },
    ],
    weeklyAvailability: [
      { day: "Mon", status: "available", slots: ["10:00 AM", "2:00 PM"] },
      { day: "Tue", status: "available", slots: ["11:00 AM", "3:00 PM"] },
      { day: "Wed", status: "booked" },
      { day: "Thu", status: "available", slots: ["9:00 AM", "1:00 PM", "4:00 PM"] },
      { day: "Fri", status: "booked" },
      { day: "Sat", status: "booked" },
      { day: "Sun", status: "off" },
    ],
  },
  "kavya-s": {
    highlights: [
      "10 years in the industry",
      "Celebrity & editorial clientele",
      "Vogue & Harper's Bazaar work",
      "On-location & studio setups",
    ],
    certifications: [
      "VLCC Professional Makeup Certification",
      "Schwarzkopf Color Expert",
      "L'Oréal Professionnel Certified",
    ],
    instagramHandle: "kavya.makeup.art",
    servicePackages: [
      {
        id: "s1",
        name: "Natural Glam",
        description:
          "Light, breathable look that enhances your natural features perfectly.",
        duration: "1.5–2 hrs",
        price: 1800,
        includes: [
          "Skin prep & SPF base",
          "Lightweight dewy foundation",
          "Subtle eye & lip colour",
          "Finishing powder & blush",
        ],
      },
      {
        id: "s2",
        name: "Editorial Look",
        description:
          "Bold editorial and fashion-forward makeup for shoots and events.",
        duration: "3–4 hrs",
        price: 3500,
        isPopular: true,
        includes: [
          "Concept consultation",
          "Full face HD makeup",
          "Bold eye / avant-garde design",
          "Prosthetics & body paint (on request)",
          "Professional touch-up supplies",
        ],
      },
      {
        id: "s3",
        name: "Party Glam",
        description: "Head-turning party look with a smoky eye or glitter finish.",
        duration: "2 hrs",
        price: 2200,
        includes: [
          "Full face foundation & contour",
          "Dramatic eye look",
          "False lashes",
          "Long-wear lip colour",
        ],
      },
    ],
    reviews: [
      {
        id: "r1",
        author: {
          name: "Divya M.",
          avatar: "/images/marketing/hero-makeup.svg",
          location: "Bangalore",
        },
        rating: 5,
        date: "2025-12-01",
        service: "Editorial Look",
        body: "Kavya worked with me for a magazine cover shoot and the results were extraordinary. She understood my vision immediately and elevated it beyond what I imagined. A true professional.",
        helpful: 62,
      },
      {
        id: "r2",
        author: {
          name: "Shruti P.",
          avatar: "/images/marketing/bridal-look.svg",
          location: "Mysore",
        },
        rating: 5,
        date: "2025-11-15",
        service: "Party Glam",
        body: "Booked Kavya for my 30th birthday party. I received compliments non-stop and the makeup lasted the entire night including the dance floor! Her product knowledge is unmatched.",
        helpful: 34,
      },
      {
        id: "r3",
        author: {
          name: "Anu K.",
          avatar: "/images/marketing/nail-art.svg",
          location: "Bangalore",
        },
        rating: 4,
        date: "2025-10-28",
        service: "Natural Glam",
        body: "Great experience overall. Kavya did a beautiful natural look for my cousin's wedding. Only reason for 4 stars is appointment was slightly delayed, but the result was worth the wait!",
        helpful: 21,
      },
    ],
    weeklyAvailability: [
      { day: "Mon", status: "available", slots: ["10:00 AM", "3:00 PM"] },
      { day: "Tue", status: "booked" },
      { day: "Wed", status: "available", slots: ["11:00 AM", "2:00 PM"] },
      { day: "Thu", status: "available", slots: ["9:00 AM", "4:00 PM"] },
      { day: "Fri", status: "available", slots: ["10:00 AM"] },
      { day: "Sat", status: "booked" },
      { day: "Sun", status: "booked" },
    ],
  },
};

/** Returns profile data for a slug, falling back to generic placeholder data */
export function getProfileBySlug(slug: string): ArtistProfile {
  return (
    MOCK_PROFILES[slug] ?? {
      highlights: [
        "Certified beauty professional",
        "Home & studio visits",
        "Premium products only",
        "Satisfaction guaranteed",
      ],
      certifications: ["Certified Makeup Artist", "Professional Beauty Diploma"],
      servicePackages: [
        {
          id: "s1",
          name: "Starter Session",
          description: "Perfect introduction to my signature style.",
          duration: "1–2 hrs",
          price: 1200,
          includes: [
            "Skin prep",
            "Foundation & concealer",
            "Eye & lip finish",
            "Setting spray",
          ],
        },
        {
          id: "s2",
          name: "Premium Session",
          description: "Full glam experience with high-end products.",
          duration: "2–3 hrs",
          price: 2400,
          isPopular: true,
          includes: [
            "Everything in Starter",
            "Full contour & highlight",
            "False lashes",
            "Touch-up kit",
          ],
        },
      ],
      reviews: [
        {
          id: "r1",
          author: {
            name: "Priya S.",
            avatar: "/images/marketing/hero-makeup.svg",
            location: "Local client",
          },
          rating: 5,
          date: "2025-10-10",
          service: "Premium Session",
          body: "An incredible experience from start to finish. My look was perfect and received compliments all evening. Highly recommended!",
          helpful: 15,
        },
        {
          id: "r2",
          author: {
            name: "Anisha R.",
            avatar: "/images/marketing/bridal-look.svg",
            location: "Local client",
          },
          rating: 5,
          date: "2025-09-05",
          service: "Starter Session",
          body: "Professional, punctual, and talented. The makeup lasted all day without any touch-ups needed. Will book again!",
          helpful: 9,
        },
      ],
      weeklyAvailability: [
        { day: "Mon", status: "available", slots: ["10:00 AM", "2:00 PM"] },
        { day: "Tue", status: "available", slots: ["11:00 AM"] },
        { day: "Wed", status: "booked" },
        { day: "Thu", status: "available", slots: ["9:00 AM", "3:00 PM"] },
        { day: "Fri", status: "available", slots: ["10:00 AM", "2:00 PM"] },
        { day: "Sat", status: "booked" },
        { day: "Sun", status: "off" },
      ],
    }
  );
}
