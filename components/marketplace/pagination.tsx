"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Build page number array with ellipsis
  function getPages(): (number | "…")[] {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const pages: (number | "…")[] = [1];
    if (currentPage > 3) pages.push("…");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push("…");
    pages.push(totalPages);
    return pages;
  }

  const pages = getPages();

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-1.5"
    >
      <Button
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        size="icon"
        variant="outline"
      >
        <ChevronLeft className="size-4" />
      </Button>

      {pages.map((p, idx) =>
        p === "…" ? (
          <span
            className="text-muted-foreground grid size-10 place-items-center text-sm"
            key={`ellipsis-${idx}`}
          >
            …
          </span>
        ) : (
          <Button
            aria-current={p === currentPage ? "page" : undefined}
            className={
              p === currentPage
                ? "bg-primary text-primary-foreground border-primary"
                : ""
            }
            key={p}
            onClick={() => onPageChange(p)}
            size="icon"
            variant={p === currentPage ? "primary" : "outline"}
          >
            {p}
          </Button>
        ),
      )}

      <Button
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        size="icon"
        variant="outline"
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
