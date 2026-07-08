"use client";

import { useState, useTransition } from "react";
import { Camera, User, Award, Globe, Link as LinkIcon, Sparkles, Loader2 } from "lucide-react";
import { AvatarInitials } from "@/components/dashboard/ui-helpers";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { updateArtistProfileAction } from "@/features/artist/actions";

export function ArtistProfileForm({ user }: { user: { name?: string | null, phone?: string | null, city?: string | null, dob?: string | null, address?: string | null, experience?: string | null, about?: string | null, languages?: string | null, pricing?: number | null, instagram?: string | null, facebook?: string | null, specialties?: string | null } }) {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [about, setAbout] = useState(
    user?.about || ""
  );
  const [experience, setExperience] = useState(user?.experience || "");
  const [languages, setLanguages] = useState(user?.languages || "");
  const [pricing, setPricing] = useState(user?.pricing || 0);
  const [instagram, setInstagram] = useState(user?.instagram || "");
  const [facebook, setFacebook] = useState(user?.facebook || "");
  
  const parsedSpecialties = user?.specialties ? user.specialties.split(",") : ["bridal", "party"];
  const [specialties, setSpecialties] = useState({
    bridal: parsedSpecialties.includes("bridal"),
    hair: parsedSpecialties.includes("hair"),
    nails: parsedSpecialties.includes("nails"),
    party: parsedSpecialties.includes("party"),
    skincare: parsedSpecialties.includes("skincare"),
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    const activeSpecialties = Object.entries(specialties)
      .filter(([_, isActive]) => isActive)
      .map(([key]) => key)
      .join(",");

    startTransition(async () => {
      const res = await updateArtistProfileAction({
        name: user?.name,
        phone: user?.phone,
        city: user?.city,
        dob: user?.dob,
        address: user?.address,
        about,
        experience: String(experience),
        languages,
        pricing: Number(pricing),
        instagram,
        facebook,
        specialties: activeSpecialties,
      });

      if (res.status === "error") {
        setErrorMsg(res.message);
      } else {
        alert("Artist profile configuration saved successfully!");
      }
    });
  }

  function toggleSpecialty(key: keyof typeof specialties) {
    setSpecialties((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <StaggerContainer className="space-y-6">
      <div className="border-b border-border pb-3">
        <h2 className="text-xl font-bold text-foreground">Studio Profile</h2>
        <p className="text-xs text-muted-foreground mt-1">Configure your public artist bio, specialties, rates, and links</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Avatar Banner */}
        <FadeUp className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-card border border-border">
          <div className="relative">
            <AvatarInitials initials="PK" gradient="from-gold-400 to-salmon-400" size="lg" />
            <button
              type="button"
              onClick={() => alert("Photo upload is mocked.")}
              className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1.5 rounded-full hover:bg-plum-600 transition-colors shadow-soft"
              title="Change Profile Photo"
            >
              <Camera className="size-3.5" />
            </button>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-semibold text-foreground text-sm">Priya Kapoor</h3>
            <p className="text-xs text-muted-foreground">Bridal Makeup Artist · Koramangala, Bangalore</p>
            <button
              type="button"
              onClick={() => alert("Upload logo coming soon")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Upload custom portfolio banner
            </button>
          </div>
        </FadeUp>

        {/* Input Fields Grid */}
        <FadeUp className="grid gap-4 sm:grid-cols-2">
          {/* About Bio */}
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="about-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="size-3.5" /> Professional Bio / About
            </label>
            <textarea
              id="about-input"
              rows={4}
              required
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none leading-relaxed"
            />
          </div>

          {/* Experience */}
          <div className="space-y-1.5">
            <label htmlFor="experience-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Award className="size-3.5" /> Years of Experience
            </label>
            <input
              id="experience-input"
              type="number"
              required
              min={0}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Languages */}
          <div className="space-y-1.5">
            <label htmlFor="languages-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Globe className="size-3.5" /> Spoken Languages
            </label>
            <input
              id="languages-input"
              type="text"
              required
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Specialties Checkboxes */}
          <div className="space-y-2 sm:col-span-2">
            <span className="text-xs font-semibold text-muted-foreground block">Specialty Badges</span>
            <div className="flex flex-wrap gap-2.5">
              {(Object.keys(specialties) as Array<keyof typeof specialties>).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleSpecialty(key)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition-all ${
                    specialties[key]
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-muted-foreground border-border hover:bg-muted"
                  }`}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing starting from */}
          <div className="space-y-1.5">
            <label htmlFor="pricing-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              Starting Price (₹)
            </label>
            <input
              id="pricing-input"
              type="number"
              required
              min={0}
              value={pricing}
              onChange={(e) => setPricing(parseInt(e.target.value) || 0)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Social Links */}
          <div className="space-y-4 sm:col-span-2">
            <span className="text-xs font-semibold text-muted-foreground block border-t border-border pt-4">
              Connected Channels
            </span>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label htmlFor="instagram-input" className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                  <LinkIcon className="size-3.5" /> Instagram Username
                </label>
                <input
                  id="instagram-input"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="facebook-input" className="text-[10px] font-semibold text-muted-foreground flex items-center gap-1">
                  <LinkIcon className="size-3.5" /> Facebook Page Handle
                </label>
                <input
                  id="facebook-input"
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Submit */}
        {errorMsg && <p className="text-destructive text-sm text-right px-4">{errorMsg}</p>}
        <FadeUp className="flex justify-end pt-2 border-t border-border">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-primary hover:bg-plum-600 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all flex items-center disabled:opacity-50"
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Save Profile Config
          </button>
        </FadeUp>
      </form>
    </StaggerContainer>
  );
}
