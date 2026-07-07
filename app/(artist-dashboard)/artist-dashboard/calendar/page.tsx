import type { Metadata } from "next";
import { CalendarView } from "@/components/dashboard/artist/calendar-view";

export const metadata: Metadata = {
  title: "Calendar | BeautiBridge Artist",
};

export default function CalendarPage() {
  return <CalendarView />;
}
