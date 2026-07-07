import type { Metadata } from "next";
import { SettingsPanel } from "@/components/dashboard/customer/settings-panel";

export const metadata: Metadata = {
  title: "Settings | BeautiBridge",
};

export default function SettingsPage() {
  return <SettingsPanel />;
}
