"use client";

import { useState, useTransition, useEffect } from "react";
import {
  Camera,
  Award,
  Globe,
  Link as LinkIcon,
  Sparkles,
  Loader2,
  User,
  Phone,
  MapPin,
  IndianRupee,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { AvatarInitials } from "@/components/dashboard/ui-helpers";
import { FadeUp, StaggerContainer, PopIn } from "@/lib/motion";
import { updateArtistProfileAction } from "@/features/artist/actions";
import { CITIES } from "@/features/artists/types";

// ─── Inline Toast ────────────────────────────────────────────────────────────
type ToastState = { type: "success" | "error"; message: string } | null;

function InlineToast({ toast, onDismiss }: { toast: ToastState; onDismiss: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, 4500);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";
  return (
    <PopIn
      className={`flex items-start gap-3 rounded-xl px-4 py-3 text-sm font-medium border ${
        isSuccess
          ? "bg-emerald-50 border-emerald-200 text-emerald-800"
          : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      {isSuccess ? (
        <CheckCircle2 className="size-4.5 shrink-0 mt-0.5 text-emerald-600" />
      ) : (
        <XCircle className="size-4.5 shrink-0 mt-0.5 text-red-500" />
      )}
      <span className="flex-1">{toast.message}</span>
      <button type="button" onClick={onDismiss} className="text-current opacity-60 hover:opacity-100 transition-opacity ml-2">
        ✕
      </button>
    </PopIn>
  );
}

// ─── Specialty pill list ─────────────────────────────────────────────────────
const SPECIALTY_OPTIONS = [
  { key: "bridal", label: "👰 Bridal" },
  { key: "party", label: "🎉 Party" },
  { key: "hair", label: "💇 Hair" },
  { key: "nails", label: "💅 Nails" },
  { key: "skincare", label: "✨ Skincare" },
  { key: "editorial", label: "📸 Editorial" },
];

// ─── City options (exclude "All Cities" sentinel) ───────────────────────────
const CITY_OPTIONS = CITIES.filter((c) => c !== "All Cities");

// ─── User type accepted by the form ─────────────────────────────────────────
type UserProfile = {
  name?: string | null;
  phone?: string | null;
  city?: string | null;
  dob?: string | null;
  address?: string | null;
  experience?: string | null;
  about?: string | null;
  languages?: string | null;
  instagram?: string | null;
  facebook?: string | null;
  pricing?: number | null;
  specialties?: string | null;
};

// ─── Field row helper ────────────────────────────────────────────────────────
function FieldRow({
  icon: Icon,
  label,
  children,
  span2 = false,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div className={`space-y-1.5 ${span2 ? "sm:col-span-2" : ""}`}>
      <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
        <Icon className="size-3.5" /> {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors";

// ─── Main component ──────────────────────────────────────────────────────────
export function ArtistProfileForm({ user }: { user: UserProfile }) {
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<ToastState>(null);

  // Form state
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [city, setCity] = useState(user?.city ?? "");
  const [about, setAbout] = useState(user?.about ?? "");
  const [experience, setExperience] = useState(user?.experience ?? "");
  const [languages, setLanguages] = useState(user?.languages ?? "");
  const [pricing, setPricing] = useState<number>(user?.pricing ?? 0);
  const [instagram, setInstagram] = useState(user?.instagram ?? "");
  const [facebook, setFacebook] = useState(user?.facebook ?? "");

  // Specialties as a set of selected keys
  const parsedSpecialties = new Set(
    user?.specialties ? user.specialties.split(",").map((s) => s.trim()) : [],
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState<Set<string>>(parsedSpecialties);

  function toggleSpecialty(key: string) {
    setSelectedSpecialties((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  // Derive display initials from name
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("") || "?";

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setToast(null);

    startTransition(async () => {
      const res = await updateArtistProfileAction({
        name: name.trim() || undefined,
        phone: phone.trim() || undefined,
        city: city || undefined,
        about: about.trim() || undefined,
        specialties: Array.from(selectedSpecialties).join(",") || undefined,
        languages: languages.trim() || undefined,
        experience: experience.trim() || undefined,
        pricing: pricing > 0 ? pricing : undefined,
        instagram: instagram.trim() || undefined,
        facebook: facebook.trim() || undefined,
      });

      if (res.status === "error") {
        setToast({ type: "error", message: res.message });
      } else {
        setToast({ type: "success", message: "✨ Profile saved! Your public listing has been updated." });
      }
    });
  }

  return (
    <StaggerContainer className="space-y-6 max-w-3xl">
      {/* Page header */}
      <FadeUp className="border-b border-border pb-3">
        <h2 className="text-xl font-bold text-foreground">Studio Profile</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Configure your public artist bio, specialties, rates, and social links
        </p>
      </FadeUp>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ── Avatar banner ─────────────────────────────────────────────────── */}
        <FadeUp className="flex flex-col sm:flex-row items-center gap-5 p-5 rounded-2xl bg-gradient-to-br from-primary/5 via-card to-secondary/10 border border-border shadow-soft">
          <div className="relative">
            <AvatarInitials
              initials={initials}
              gradient="from-gold-400 to-salmon-400"
              size="lg"
            />
            <button
              type="button"
              onClick={() => alert("Photo upload coming soon!")}
              className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1.5 rounded-full hover:bg-plum-600 transition-colors shadow-soft"
              title="Change Profile Photo"
            >
              <Camera className="size-3.5" />
            </button>
          </div>
          <div className="text-center sm:text-left space-y-0.5">
            <h3 className="font-bold text-foreground text-base leading-tight">
              {name || "Your Name"}
            </h3>
            <p className="text-xs text-muted-foreground">
              {Array.from(selectedSpecialties).map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(" · ") || "Artist"}{" "}
              {city ? `· ${city}` : ""}
            </p>
            <button
              type="button"
              onClick={() => alert("Portfolio banner upload coming soon")}
              className="text-[11px] font-semibold text-primary hover:underline"
            >
              Upload custom portfolio banner
            </button>
          </div>
        </FadeUp>

        {/* ── Core identity fields ───────────────────────────────────────────── */}
        <FadeUp className="premium-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-foreground border-b border-border pb-2 flex items-center gap-1.5">
            <User className="size-4 text-primary" /> Basic Information
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldRow icon={User} label="Display Name">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Kapoor"
                className={inputCls}
              />
            </FieldRow>

            <FieldRow icon={Phone} label="Phone Number">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className={inputCls}
              />
            </FieldRow>

            <FieldRow icon={MapPin} label="City">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputCls}
              >
                <option value="">— Select your city —</option>
                {CITY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </FieldRow>

            <FieldRow icon={IndianRupee} label="Starting Price (₹)">
              <input
                type="number"
                min={0}
                step={100}
                value={pricing}
                onChange={(e) => setPricing(parseInt(e.target.value) || 0)}
                placeholder="e.g. 2500"
                className={inputCls}
              />
            </FieldRow>

            <FieldRow icon={Sparkles} label="Professional Bio / About" span2>
              <textarea
                rows={4}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell potential clients about your style, expertise, and what makes your work unique..."
                className={`${inputCls} resize-none leading-relaxed`}
              />
            </FieldRow>
          </div>
        </FadeUp>

        {/* ── Specialties ────────────────────────────────────────────────────── */}
        <FadeUp className="premium-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-foreground border-b border-border pb-2 flex items-center gap-1.5">
            <Sparkles className="size-4 text-primary" /> Specialty Badges
          </h3>
          <p className="text-xs text-muted-foreground">
            Select all that apply — these appear on your public profile card.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {SPECIALTY_OPTIONS.map(({ key, label }) => {
              const active = selectedSpecialties.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleSpecialty(key)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${
                    active
                      ? "bg-primary text-primary-foreground border-primary shadow-soft"
                      : "bg-transparent text-muted-foreground border-border hover:bg-muted hover:border-primary/40"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          {/* Comma-separated input as an alternative */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[10px] font-semibold text-muted-foreground">
              Or enter custom specialties (comma-separated)
            </label>
            <input
              type="text"
              value={Array.from(selectedSpecialties).join(", ")}
              onChange={(e) =>
                setSelectedSpecialties(
                  new Set(
                    e.target.value
                      .split(",")
                      .map((s) => s.trim().toLowerCase())
                      .filter(Boolean),
                  ),
                )
              }
              placeholder="e.g. bridal, hair, nails"
              className={inputCls}
            />
          </div>
        </FadeUp>

        {/* ── Professional details ────────────────────────────────────────────── */}
        <FadeUp className="premium-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-foreground border-b border-border pb-2 flex items-center gap-1.5">
            <Award className="size-4 text-primary" /> Professional Details
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldRow icon={Award} label="Years of Experience">
              <input
                type="number"
                min={0}
                max={50}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 5"
                className={inputCls}
              />
            </FieldRow>

            <FieldRow icon={Globe} label="Spoken Languages">
              <input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                placeholder="e.g. Hindi, English, Tamil"
                className={inputCls}
              />
            </FieldRow>
          </div>
        </FadeUp>

        {/* ── Social links ────────────────────────────────────────────────────── */}
        <FadeUp className="premium-card p-5 space-y-4">
          <h3 className="text-sm font-bold text-foreground border-b border-border pb-2 flex items-center gap-1.5">
            <LinkIcon className="size-4 text-primary" /> Connected Channels
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FieldRow icon={LinkIcon} label="Instagram Username">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none">@</span>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="yourhandle"
                  className={`${inputCls} pl-8`}
                />
              </div>
            </FieldRow>

            <FieldRow icon={LinkIcon} label="Facebook Page Handle">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm select-none">@</span>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="yourpage"
                  className={`${inputCls} pl-8`}
                />
              </div>
            </FieldRow>
          </div>
        </FadeUp>

        {/* ── Toast feedback ────────────────────────────────────────────────── */}
        <InlineToast toast={toast} onDismiss={() => setToast(null)} />

        {/* ── Submit ───────────────────────────────────────────────────────── */}
        <FadeUp className="flex justify-end pt-2 border-t border-border">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-primary hover:bg-plum-600 px-7 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Save Profile
              </>
            )}
          </button>
        </FadeUp>
      </form>
    </StaggerContainer>
  );
}
