import { Sparkles, UserRound, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { FadeUp } from "@/lib/motion";

const suggestions = [
  "Bridal makeup under INR 3000 in Vizag",
  "Party hairstyling this weekend",
  "Nail art for an engagement ceremony",
] as const;

const matches = [
  { name: "Ananya R.", price: "INR 2,800", rating: "4.9", role: "Bridal MUA", available: true },
  { name: "Priya M.", price: "INR 2,950", rating: "4.8", role: "Bridal MUA", available: true },
] as const;

export function AiAdvantageSection() {
  return (
    <section className="section-y bg-beige-100" id="ai-assistant">
      <div className="page-container grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeUp>
          <p className="section-label">The AI advantage</p>
          <h2 className="text-primary mt-4 text-4xl font-semibold leading-tight">
            Ask for what you want. Naturally.
          </h2>
          <p className="text-muted-foreground mt-5 max-w-xl text-base leading-8">
            No filters to fight with. Type a request the way you&apos;d say it
            to a friend, and BeautiBridge instantly understands your occasion,
            style, budget, and location.
          </p>

          {/* Feature highlights */}
          <div className="mt-8 grid gap-3">
            {[
              { icon: Sparkles, text: "Natural language understanding" },
              { icon: Zap, text: "Instant personalized matches" },
              { icon: UserRound, text: "Powered by verified real artists" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex size-7 items-center justify-center rounded-lg bg-secondary/15">
                  <Icon className="size-3.5 text-secondary" />
                </div>
                <span className="text-sm font-medium text-foreground/80">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <Badge
                className="px-4 py-2 text-xs"
                key={suggestion}
                variant="cream"
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </FadeUp>

        {/* Chat preview card */}
        <FadeUp>
          <Card className="bg-card/90 shadow-premium mx-auto max-w-xl rounded-[2rem] p-7 backdrop-blur border border-border/60">
            {/* Chat header */}
            <div className="border-border/60 flex items-center gap-3 border-b pb-4">
              <span className="bg-gradient-to-br from-salmon-300 to-primary text-white grid size-11 place-items-center rounded-2xl shadow-soft">
                <Sparkles className="size-5" />
              </span>
              <div>
                <h3 className="text-primary font-bold text-sm">BeautiBridge Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  <p className="text-muted-foreground text-[11px] font-medium">
                    Online · replies instantly
                  </p>
                </div>
              </div>
            </div>

            {/* Chat messages */}
            <div className="mt-5 grid gap-4">
              {/* User message */}
              <div className="bg-primary text-primary-foreground ml-auto max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
                Find bridal makeup under INR 3000 in Vizag for Saturday morning
              </div>

              {/* AI response */}
              <div className="bg-muted/60 text-foreground max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed border border-border/40">
                Lovely! I found 2 top-rated bridal artists in Vizag available
                Saturday morning, both within your budget. ✨
              </div>

              {/* Artist matches */}
              {matches.map((match) => (
                <div
                  className="border-border/60 bg-card flex items-center justify-between rounded-xl border px-4 py-3 shadow-sm"
                  key={match.name}
                >
                  <div className="flex items-center gap-3">
                    <span className="bg-beige-200 grid size-9 place-items-center rounded-xl">
                      <UserRound className="text-secondary size-4" />
                    </span>
                    <div>
                      <p className="text-primary font-semibold text-sm">{match.name}</p>
                      <p className="text-muted-foreground text-[11px]">
                        {match.role} · ★ {match.rating}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-accent font-bold text-sm">{match.price}</p>
                    <p className="text-[10px] text-emerald-600 font-medium">Available</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </FadeUp>
      </div>
    </section>
  );
}
