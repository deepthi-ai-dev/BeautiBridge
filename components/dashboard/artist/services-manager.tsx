"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { MOCK_ARTIST_SERVICES, type MockArtistService } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function ServicesManager() {
  const [services, setServices] = useState<MockArtistService[]>(MOCK_ARTIST_SERVICES);

  function handleAdd() {
    alert("Add service form is mocked. In next phase you will be able to customize session details.");
  }

  function handleEdit(name: string) {
    alert(`Editing service details for: ${name}`);
  }

  function handleDelete(id: string, name: string) {
    if (confirm(`Remove the service "${name}"? This will disable new client bookings for this session type.`)) {
      setPortfolio(services.filter((s) => s.id !== id));
      alert("Service removed.");
    }
  }

  // Helper because the original setPortfolio was a typo from subagent context, let's declare it properly
  const setPortfolio = (updated: MockArtistService[]) => setServices(updated);

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Pricing & Services</h2>
          <p className="text-xs text-muted-foreground mt-1">Manage session types, durations, and rate listings</p>
        </div>

        <button
          onClick={handleAdd}
          className="rounded-full bg-primary hover:bg-plum-600 text-primary-foreground px-4 py-2 text-xs font-semibold shadow-soft transition-all flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="size-3.5" /> Add Service
        </button>
      </div>

      <div className="grid gap-3">
        {services.map((svc, i) => (
          <FadeUp
            key={svc.id}
            className="premium-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                S
              </div>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-foreground text-sm truncate">{svc.name}</h3>
                  {svc.isPopular && (
                    <span className="inline-flex items-center gap-1 rounded bg-teal-400/20 text-teal-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                      Popular
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <span>Duration: {svc.duration}</span>
                  <span>·</span>
                  <span>{svc.bookings} Bookings completed</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 border-border pt-3 sm:pt-0 shrink-0">
              <div className="sm:text-right">
                <span className="text-[10px] text-muted-foreground block">Session Rate</span>
                <span className="text-base font-bold text-foreground">
                  ₹{svc.price.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  aria-label="Edit service"
                  onClick={() => handleEdit(svc.name)}
                  className="text-muted-foreground hover:text-primary hover:bg-muted p-1.5 rounded-lg border border-border bg-card transition-colors"
                >
                  <Edit2 className="size-4" />
                </button>
                <button
                  aria-label="Delete service"
                  onClick={() => handleDelete(svc.id, svc.name)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 p-1.5 rounded-lg border border-border bg-card transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </StaggerContainer>
  );
}
