import type { Metadata } from "next";
import { AiHistory } from "@/components/dashboard/customer/ai-history";

export const metadata: Metadata = {
  title: "AI History | BeautiBridge",
};

export default function AiHistoryPage() {
  return <AiHistory />;
}
