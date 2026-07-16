"use client";

import { useState } from "react";
import { Bell, Globe, Lock, Trash2, Key } from "lucide-react";
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

export function SettingsPanel() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(false);
  const [language, setLanguage] = useState("en");
  const [privacyMode, setPrivacyMode] = useState(false);

  function handleChangePassword() {
    alert("Change password wizard is mocked. Password reset link is sent to your email.");
  }

  function handleDeleteAccount() {
    if (
      confirm("Are you sure you want to delete your account? This action is irreversible!") &&
      confirm("Do you absolutely want to delete all bookings, history, and user settings?")
    ) {
      alert("Account deletion request has been submitted.");
    }
  }

  return (
    <StaggerContainer className="space-y-6 max-w-3xl">
      <div className="border-b border-border pb-3">
        <h2 className="text-xl font-bold text-foreground">Settings & Preferences</h2>
        <p className="text-xs text-muted-foreground mt-1">Configure your personal account preferences</p>
      </div>

      {/* Preferences Section */}
      <FadeUp className="premium-card p-5 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
          <Bell className="size-4 text-primary" /> Preferences
        </h3>
        <div className="flex flex-col">
          <ToggleSwitch
            checked={darkMode}
            onChange={setDarkMode}
            label="Dark Mode"
            description="Toggle the interface color theme"
          />
          <ToggleSwitch
            checked={emailNotifs}
            onChange={setEmailNotifs}
            label="Email Notifications"
            description="Receive booking updates and announcements"
          />
          <ToggleSwitch
            checked={pushNotifs}
            onChange={setPushNotifs}
            label="Push Notifications"
            description="Receive real-time alerts in this browser"
          />
          <ToggleSwitch
            checked={privacyMode}
            onChange={setPrivacyMode}
            label="Private Profile"
            description="Hide appointment history from recommendations"
          />
        </div>
      </FadeUp>

      {/* Language Section */}
      <FadeUp className="premium-card p-5 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
          <Globe className="size-4 text-primary" /> System Settings
        </h3>
        <div className="space-y-1.5 text-xs">
          <label htmlFor="language-select" className="font-semibold text-muted-foreground">Select Language</label>
          <select
            id="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            <option value="en">English (India)</option>
            <option value="hi">Hindi (हिन्दी)</option>
            <option value="kn">Kannada (ಕನ್ನಡ)</option>
            <option value="te">Telugu (తెలుగు)</option>
          </select>
        </div>
      </FadeUp>

      {/* Account Security & Hazard Zone */}
      <FadeUp className="premium-card p-5 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 border-b border-border pb-2">
          <Lock className="size-4 text-primary" /> Security & Account
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-muted/30 border border-border">
            <div className="space-y-1 text-xs">
              <span className="font-semibold text-foreground block">Change Password</span>
              <span className="text-muted-foreground block">Update your login security credentials</span>
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
              <span className="font-semibold text-destructive block">Delete Account</span>
              <span className="text-muted-foreground block">Permanently close and purge all details</span>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="rounded-full bg-destructive/10 hover:bg-destructive/15 px-4 py-2 text-xs font-semibold text-destructive transition-all flex items-center gap-1.5"
            >
              <Trash2 className="size-3.5" /> Delete Account
            </button>
          </div>
        </div>
      </FadeUp>
    </StaggerContainer>
  );
}
