"use client";

import { useState } from "react";
import { Bell, ShieldCheck, Trash2, Key, Star } from "lucide-react";
import { FadeUp, StaggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

function ToggleSwitch({ checked, onChange, label, description }: ToggleSwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-b-0">
      <div className="space-y-0.5">
        <span className="text-xs font-semibold text-foreground block">{label}</span>
        {description && <span className="text-[10px] text-muted-foreground block">{description}</span>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5.5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block size-4.5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            checked ? "translate-x-4.5" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}

export function ArtistSettings() {
  const [bookingAlerts, setBookingAlerts] = useState(true);
  const [reviewAlerts, setReviewAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  const [autoAccept, setAutoAccept] = useState(false);
  const [showPublic, setShowPublic] = useState(true);

  function handleChangePassword() {
    alert("Change password wizard is mocked. Reset link has been sent to your registered email.");
  }

  function handleDeactivate() {
    if (
      confirm("Are you sure you want to deactivate your artist profile? This will hide your listing from search.") &&
      confirm("Any active client bookings must be completed or cancelled before deactivation.")
    ) {
      alert("Artist profile deactivation request submitted.");
    }
  }

  return (
    <StaggerContainer className="space-y-6 max-w-3xl">
      <div className="border-b border-border pb-3">
        <h2 className="text-xl font-bold text-foreground">Studio Settings</h2>
        <p className="text-xs text-muted-foreground mt-1">Configure workspace rules, notifications, and credentials</p>
      </div>

      {/* Notification preferences */}
      <FadeUp className="premium-card p-5 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
          <Bell className="size-4 text-primary" /> Notifications
        </h3>
        <div className="flex flex-col">
          <ToggleSwitch
            checked={bookingAlerts}
            onChange={setBookingAlerts}
            label="New Booking Alerts"
            description="Receive immediate notifications on new appointment requests"
          />
          <ToggleSwitch
            checked={reviewAlerts}
            onChange={setReviewAlerts}
            label="Review & Star Updates"
            description="Get notified when clients leave feedback or star ratings"
          />
          <ToggleSwitch
            checked={marketingEmails}
            onChange={setMarketingEmails}
            label="Business Tips & Promos"
            description="Get seasonal trends newsletters and discount offers updates"
          />
        </div>
      </FadeUp>

      {/* Business preferences */}
      <FadeUp className="premium-card p-5 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
          <ShieldCheck className="size-4 text-primary" /> Booking Rules
        </h3>
        <div className="flex flex-col">
          <ToggleSwitch
            checked={autoAccept}
            onChange={setAutoAccept}
            label="Instant Booking Acceptance"
            description="Automatically accept scheduling requests matching your calendar slots"
          />
          <ToggleSwitch
            checked={showPublic}
            onChange={setShowPublic}
            label="Public Profile Listing"
            description="Make your portfolio visible to guest marketplace search engines"
          />
        </div>
      </FadeUp>

      {/* Account Security & Hazard Zone */}
      <FadeUp className="premium-card p-5 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
          <Key className="size-4 text-primary" /> Security & Account
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-muted/30 border border-border">
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-foreground block">Change Password</span>
              <span className="text-muted-foreground block">Update your studio login password</span>
            </div>
            <button
              onClick={handleChangePassword}
              className="rounded-full bg-primary hover:bg-plum-600 px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition-all flex items-center gap-1.5"
            >
              <Key className="size-3.5" /> Update Password
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/10">
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-destructive block">Deactivate Studio Profile</span>
              <span className="text-muted-foreground block">Temporarily suspend listing without deleting history</span>
            </div>
            <button
              onClick={handleDeactivate}
              className="rounded-full bg-destructive/10 hover:bg-destructive/15 px-4 py-2 text-xs font-semibold text-destructive transition-all flex items-center gap-1.5"
            >
              <Trash2 className="size-3.5" /> Deactivate Profile
            </button>
          </div>
        </div>
      </FadeUp>
    </StaggerContainer>
  );
}
