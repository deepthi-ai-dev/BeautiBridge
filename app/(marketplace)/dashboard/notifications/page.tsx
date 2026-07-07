import type { Metadata } from "next";
import { NotificationsPanel } from "@/components/dashboard/customer/notifications-panel";

export const metadata: Metadata = {
  title: "Notifications | BeautiBridge",
};

export default function NotificationsPage() {
  return <NotificationsPanel />;
}
