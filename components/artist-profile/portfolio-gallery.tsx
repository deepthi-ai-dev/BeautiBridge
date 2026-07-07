"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { fadeUpVariants, staggerContainerVariants } from "@/lib/motion";

type PortfolioGalleryProps = {
  images: string[];
  artistName: string;
};

export function PortfolioGallery({
  images,
  artistName,
}: Readonly<PortfolioGalleryProps>) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  function openLightbox(idx: number) {
    setLightboxIndex(idx);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function prev() {
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }

  function next() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }

  if (images.length === 0) return null;

  return (
    <section aria-label="Portfolio gallery">
      <motion.div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3"
        initial="hidden"
        variants={staggerContainerVariants}
        viewport={{ amount: 0.1, once: true }}
        whileInView="show"
      >
        {images.map((src, idx) => (
          <motion.button
            aria-label={`View portfolio image ${idx + 1}`}
            className="group relative aspect-square overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            key={idx}
            onClick={() => openLightbox(idx)}
            type="button"
            variants={fadeUpVariants}
          >
            <Image
              alt={`${artistName} portfolio ${idx + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              src={src}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/25 group-hover:opacity-100">
              <ZoomIn className="size-7 text-white drop-shadow-lg" />
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <>
            <motion.div
              animate={{ opacity: 1 }}
              aria-hidden
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={closeLightbox}
              transition={{ duration: 0.22 }}
            />
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              aria-label="Portfolio lightbox"
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              exit={{ opacity: 0, scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.95 }}
              role="dialog"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Close */}
              <button
                aria-label="Close lightbox"
                className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                onClick={closeLightbox}
                type="button"
              >
                <X className="size-5" />
              </button>

              {/* Image */}
              <div className="relative max-h-[80dvh] w-full max-w-2xl overflow-hidden rounded-2xl">
                <Image
                  alt={`${artistName} portfolio ${lightboxIndex + 1}`}
                  className="h-full w-full object-contain"
                  height={800}
                  src={images[lightboxIndex]}
                  width={800}
                />
              </div>

              {/* Prev / Next */}
              {images.length > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    className="absolute left-4 grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:left-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      prev();
                    }}
                    type="button"
                  >
                    ‹
                  </button>
                  <button
                    aria-label="Next image"
                    className="absolute right-4 grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-16"
                    onClick={(e) => {
                      e.stopPropagation();
                      next();
                    }}
                    type="button"
                  >
                    ›
                  </button>
                </>
              )}

              {/* Counter */}
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-1.5 text-sm text-white backdrop-blur-sm">
                {lightboxIndex + 1} / {images.length}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
