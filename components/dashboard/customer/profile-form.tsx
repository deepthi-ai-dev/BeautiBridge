"use client";

import { useState } from "react";
import { Camera, User, Mail, Phone, Calendar, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeUp, StaggerContainer } from "@/lib/motion";

interface ProfileFormProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user?.name || "Jahnvi Sharma");
  const [email, setEmail] = useState(user?.email || "jahnvi.sharma@example.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [birthday, setBirthday] = useState("1996-04-12");
  const [gender, setGender] = useState("female");
  const [address, setAddress] = useState("5th Block, Koramangala, Bangalore, Karnataka - 560095");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    alert("Profile changes saved successfully!");
  }

  function handlePhotoChange() {
    alert("Photo upload is mocked. Real file uploads will be implemented in a later phase.");
  }

  const initials = name.slice(0, 2).toUpperCase() || "U";

  return (
    <StaggerContainer className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-xl font-bold text-foreground">Edit Profile</h2>
        <span className="text-xs text-muted-foreground">Manage your personal settings</span>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Avatar Section */}
        <FadeUp className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-2xl bg-card border border-border">
          <div className="relative">
            <Avatar className="size-20 border border-border shadow-soft">
              {user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.image} alt={name} className="aspect-square h-full w-full object-cover" />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {initials}
                </AvatarFallback>
              )}
            </Avatar>
            <button
              type="button"
              onClick={handlePhotoChange}
              className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground p-1.5 rounded-full hover:bg-plum-600 transition-colors shadow-soft"
              title="Change Photo"
            >
              <Camera className="size-3.5" />
            </button>
          </div>
          <div className="text-center sm:text-left space-y-1">
            <h3 className="font-semibold text-foreground text-sm">{name}</h3>
            <p className="text-xs text-muted-foreground">{email}</p>
            <button
              type="button"
              onClick={handlePhotoChange}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Upload custom photo
            </button>
          </div>
        </FadeUp>

        {/* Input Fields Grid */}
        <FadeUp className="grid gap-4 sm:grid-cols-2">
          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="name-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <User className="size-3.5" /> Full Name
            </label>
            <input
              id="name-input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Mail className="size-3.5" /> Email Address
            </label>
            <input
              id="email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label htmlFor="phone-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Phone className="size-3.5" /> Phone Number
            </label>
            <input
              id="phone-input"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Birthday */}
          <div className="space-y-1.5">
            <label htmlFor="birthday-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <Calendar className="size-3.5" /> Date of Birth
            </label>
            <input
              id="birthday-input"
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label htmlFor="gender-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <User className="size-3.5" /> Gender
            </label>
            <select
              id="gender-input"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          {/* Address */}
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="address-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <MapPin className="size-3.5" /> Address
            </label>
            <textarea
              id="address-input"
              rows={3}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
            />
          </div>
        </FadeUp>

        {/* Submit */}
        <FadeUp className="flex justify-end pt-2">
          <button
            type="submit"
            className="rounded-full bg-primary hover:bg-plum-600 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all"
          >
            Save Changes
          </button>
        </FadeUp>
      </form>
    </StaggerContainer>
  );
}
