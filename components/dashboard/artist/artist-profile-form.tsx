"use client";

import { useState } from "react";
import { Camera, User, Award, Globe, Link as LinkIcon, Sparkles } from "lucide-react";
import { AvatarInitials } from "@/components/dashboard/ui-helpers";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function ArtistProfileForm() {
  const [about, setAbout] = useState(
    "Award-winning bridal specialist with 5+ years of experience crafting flawless, premium makeovers for weddings, fashion shoots, and high-profile parties. Passionate about enhancing your natural radiance."
  );
  const [experience, setExperience] = useState(5);
  const [languages, setLanguages] = useState("English, Hindi, Kannada");
  const [pricing, setPricing] = useState(2500);
  const [instagram, setInstagram] = useState("priya_makeup_glam");
  const [facebook, setFacebook] = useState("priya.kapoor.makeovers");
  
  const [specialties, setSpecialties] = useState({
    bridal: true,
    hair: true,
    nails: false,
    party: true,
    skincare: false,
  });

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    alert("Artist profile configuration saved successfully!");
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
              onChange={(e) => setExperience(parseInt(e.target.value) || 0)}
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
        <FadeUp className="flex justify-end pt-2 border-t border-border">
          <button
            type="submit"
            className="rounded-full bg-primary hover:bg-plum-600 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all"
          >
            Save Profile Config
          </button>
        </FadeUp>
      </form>
    </StaggerContainer>
  );
}
