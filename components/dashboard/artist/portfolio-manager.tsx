"use client";

import { useState } from "react";
import { Plus, Trash2, Move, Image as ImageIcon } from "lucide-react";
import { MOCK_PORTFOLIO, type MockPortfolioItem } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function PortfolioManager() {
  const [portfolio, setPortfolio] = useState<MockPortfolioItem[]>(MOCK_PORTFOLIO);

  function handleAddPhoto() {
    alert("Photo upload is mocked. Real file uploads will be implemented in a later phase.");
  }

  function handleRemove(id: string, title: string) {
    if (confirm(`Remove "${title}" from your portfolio?`)) {
      setPortfolio((prev) => prev.filter((item) => item.id !== id));
      alert("Portfolio photo removed.");
    }
  }

  function handleReorder() {
    alert("Reorder functionality is mocked. Drag & Drop sorting will be enabled in a future release.");
  }

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">Portfolio Gallery</h2>
          <p className="text-xs text-muted-foreground mt-1">
            {portfolio.length} Photo{portfolio.length !== 1 ? "s" : ""} published to your public profile
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReorder}
            className="rounded-full border border-border bg-card hover:bg-muted text-primary px-4 py-2 text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <Move className="size-3.5" /> Reorder Images
          </button>
          <button
            onClick={handleAddPhoto}
            className="rounded-full bg-primary hover:bg-plum-600 text-primary-foreground px-4 py-2 text-xs font-semibold shadow-soft transition-all flex items-center gap-1.5"
          >
            <Plus className="size-3.5" /> Add Photo
          </button>
        </div>
      </div>

      {portfolio.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-2 bg-card border border-border rounded-2xl">
          <ImageIcon className="size-10 text-muted-foreground" />
          <p className="text-base font-semibold text-foreground">Portfolio is empty</p>
          <p className="text-sm text-muted-foreground">Upload beauty session shoots to wow potential clients.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((item, i) => (
            <FadeUp
              key={item.id}
              className="premium-card overflow-hidden group relative flex flex-col justify-end min-h-[220px]"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {/* Photo Representation Div (Gradient Box) */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90 transition-transform duration-300 group-hover:scale-105`} />
              
              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-between z-10">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    aria-label="Remove image"
                    onClick={() => handleRemove(item.id, item.title)}
                    className="rounded-xl bg-destructive/90 hover:bg-destructive p-2 text-white transition-colors"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="inline-block rounded bg-primary/80 px-2 py-0.5 text-[9px] font-bold text-primary-foreground uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="font-semibold text-white text-sm truncate">{item.title}</h4>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      )}
    </StaggerContainer>
  );
}
