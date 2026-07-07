import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { AssistantChat } from "@/components/ai/assistant-chat";

export const metadata: Metadata = {
  description:
    "Get expert AI-powered beauty advice — bridal makeup, hairstyle recommendations, skincare guidance, and occasion styling from BeautiAssist.",
  title: "AI Beauty Assistant | BeautiBridge",
};

export default function AssistantPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <AssistantChat />
      </main>
    </>
  );
}
