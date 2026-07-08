"use client";

import { motion } from "framer-motion";
import { ArtistCard } from "@/components/marketplace/artist-card";
import { staggerContainerVariants } from "@/lib/motion";
import type { Artist } from "@/features/artists/types";

type ArtistGridProps = {
  artists: Artist[];
  onPreview?: (artist: Artist) => void;
  /** Changing this key forces Framer Motion to re-mount the grid and replay the stagger animation on every page change. */
  pageKey?: number | string;
};

export function ArtistGrid({ artists, onPreview, pageKey }: ArtistGridProps) {
  return (
    <motion.div
      // A fresh key forces a full re-mount, resetting all Framer Motion state
      // so the stagger entrance plays correctly on every page.
      key={pageKey}
      animate="show"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
      initial="hidden"
      variants={staggerContainerVariants}
    >
      {artists.map((artist) => (
        <ArtistCard artist={artist} key={artist.id} onPreview={onPreview} />
      ))}
    </motion.div>
  );
}
