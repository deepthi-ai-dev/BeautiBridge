"use client";

import { useState, useTransition } from "react";
import { Camera, User, Mail, Phone, Calendar, MapPin, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { completeUserProfileAction } from "@/features/auth/actions";

interface ProfileFormProps {
  user?: any;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [birthday, setBirthday] = useState(user?.dob || "");
  const [city, setCity] = useState(user?.city || "");
  const [address, setAddress] = useState(user?.address || "");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    startTransition(async () => {
      const res = await completeUserProfileAction({
        name,
        phone,
        city,
        dob: birthday,
        address,
      });

      if (res.status === "error") {
        setErrorMsg(res.message);
      } else {
        alert("Profile changes saved successfully!");
      }
    });
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

          {/* City */}
          <div className="space-y-1.5">
            <label htmlFor="city-input" className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
              <MapPin className="size-3.5" /> City
            </label>
            <input
              id="city-input"
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
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
        {errorMsg && <p className="text-destructive text-sm text-right px-4">{errorMsg}</p>}
        <FadeUp className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-primary hover:bg-plum-600 px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-all flex items-center disabled:opacity-50"
          >
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            Save Changes
          </button>
        </FadeUp>
      </form>
    </StaggerContainer>
  );
}
