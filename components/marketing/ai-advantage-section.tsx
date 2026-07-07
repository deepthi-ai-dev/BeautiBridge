import { Sparkles, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/lib/motion";

const suggestions = [
  "Bridal makeup under INR 3000 in Vizag",
  "Party hairstyling this weekend",
] as const;

const matches = [
  { name: "Ananya R.", price: "INR 2,800", rating: "4.9", role: "Bridal MUA" },
  { name: "Priya M.", price: "INR 2,950", rating: "4.8", role: "Bridal MUA" },
] as const;

export function AiAdvantageSection() {
  return (
    <section className="section-y bg-beige-100" id="ai-assistant">
      <div className="page-container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeUp>
          <p className="text-secondary text-xs font-semibold tracking-[0.42em] uppercase">
            The AI advantage
          </p>
          <h2 className="text-primary mt-5 text-4xl font-semibold">
            Ask for what you want. Naturally.
          </h2>
          <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8">
            No filters to fight with. Type a request the way you&apos;d say it
            to a friend, and BeautiBridge instantly understands your occasion,
            style, budget, and location.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            {suggestions.map((suggestion) => (
              <Badge
                className="px-5 py-3 text-sm"
                key={suggestion}
                variant="cream"
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </FadeUp>
        <FadeUp>
          <Card className="bg-card/80 shadow-premium mx-auto max-w-xl rounded-[2rem] p-8 backdrop-blur">
            <div className="border-border flex items-center gap-4 border-b pb-5">
              <span className="bg-primary text-primary-foreground grid size-12 place-items-center rounded-full">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h3 className="text-primary font-semibold">
                  BeautiBridge Assistant
                </h3>
                <p className="text-secondary text-xs">
                  Online - replies instantly
                </p>
              </div>
            </div>
            <div className="mt-6 grid gap-5">
              <div className="bg-beige-200 text-primary ml-auto max-w-[80%] rounded-2xl p-4 text-sm">
                Find bridal makeup under INR 3000 in Vizag for Saturday morning
              </div>
              <div className="bg-salmon-300/60 text-primary max-w-[82%] rounded-2xl p-4 text-sm">
                Lovely. I found 2 top-rated bridal artists in Vizag available
                Saturday morning, both within your budget.
              </div>
              {matches.map((match) => (
                <div
                  className="border-border bg-card flex items-center justify-between rounded-2xl border p-4"
                  key={match.name}
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-beige-100 grid size-10 place-items-center rounded-full">
                      <UserRound className="text-secondary size-4" />
                    </span>
                    <div>
                      <p className="text-primary font-semibold">{match.name}</p>
                      <p className="text-muted-foreground text-xs">
                        {match.role} - {match.rating} - Vizag
                      </p>
                    </div>
                  </div>
                  <p className="text-accent font-semibold">{match.price}</p>
                </div>
              ))}
            </div>
          </Card>
        </FadeUp>
      </div>
    </section>
  );
}
