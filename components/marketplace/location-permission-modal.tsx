"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Navigation, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type LocationPermissionModalProps = {
  isOpen: boolean;
  onAllow: () => void;
  onDeny: () => void;
  onClose: () => void;
};

export function LocationPermissionModal({
  isOpen,
  onAllow,
  onDeny,
  onClose,
}: LocationPermissionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            animate={{ opacity: 1 }}
            aria-hidden
            className="fixed inset-0 z-[60] bg-plum-950/60 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            animate={{ opacity: 1, scale: 1, y: 0 }}
            aria-label="Location permission request"
            aria-modal="true"
            className="fixed inset-x-4 top-1/2 z-[61] mx-auto max-w-sm -translate-y-1/2 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            role="dialog"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-beige-300/40 bg-white shadow-[0_32px_80px_rgb(84,40,67,0.18)]">
              {/* Close button */}
              <button
                aria-label="Dismiss location request"
                className="absolute top-4 right-4 z-10 grid size-8 place-items-center rounded-full text-plum-400 transition-colors hover:bg-plum-50 hover:text-plum-900"
                onClick={onClose}
                type="button"
              >
                <X className="size-4" />
              </button>

              {/* Decorative gradient header */}
              <div className="relative overflow-hidden bg-gradient-to-br from-salmon-400/20 via-plum-100/30 to-gold-300/20 px-6 pb-6 pt-8">
                <div className="absolute -top-8 -right-8 size-32 rounded-full bg-salmon-300/20 blur-3xl" />
                <div className="absolute -bottom-4 -left-4 size-24 rounded-full bg-plum-300/15 blur-2xl" />

                {/* Animated icon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  className="relative mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-salmon-400 to-plum-600 shadow-lg"
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Navigation className="size-7 text-white" />
                  {/* Ping ring */}
                  <span className="absolute inset-0 animate-ping rounded-2xl bg-salmon-400/30" />
                </motion.div>

                <h2 className="text-center text-xl font-bold text-plum-900">
                  Find Artists Near You
                </h2>
                <p className="mt-1.5 text-center text-sm leading-relaxed text-plum-700/70">
                  Allow location access to discover verified beauty artists and salons in your area.
                </p>
              </div>

              {/* Content */}
              <div className="px-6 py-5 space-y-4">
                {/* Benefits list */}
                <ul className="space-y-2.5">
                  {[
                    { icon: MapPin, text: "See artists sorted by distance" },
                    { icon: Navigation, text: "Discover nearby salons on the map" },
                    { icon: AlertCircle, text: "BeautiBridge artists always shown first" },
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm text-plum-800">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-salmon-50">
                        <Icon className="size-3.5 text-salmon-500" />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>

                {/* Privacy note */}
                <p className="rounded-xl border border-beige-200 bg-beige-50 px-3 py-2 text-xs text-plum-600/80 leading-relaxed">
                  🔒 Your location is only used to fetch nearby artists and is never stored.
                </p>

                {/* CTAs */}
                <div className="flex flex-col gap-2.5 pt-1">
                  <Button
                    className="w-full rounded-xl font-semibold"
                    id="location-allow-btn"
                    onClick={onAllow}
                    variant="primary"
                  >
                    <Navigation className="size-4" />
                    Allow Location Access
                  </Button>
                  <button
                    className="w-full py-2 text-sm font-medium text-plum-500 transition-colors hover:text-plum-800"
                    id="location-deny-btn"
                    onClick={onDeny}
                    type="button"
                  >
                    Skip, show all artists
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
