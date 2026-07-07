"use client";

import { useState } from "react";
import { DollarSign, Calendar, TrendingUp, Sparkles, Award } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { MOCK_EARNINGS_MONTHLY, type MockEarningsMonth } from "@/lib/mock-data";
import { FadeUp, StaggerContainer } from "@/lib/motion";

export function EarningsPanel() {
  const [earnings] = useState<MockEarningsMonth[]>(MOCK_EARNINGS_MONTHLY);

  const totalRevenue = earnings.reduce((acc, cur) => acc + cur.revenue, 0);
  const totalBookings = earnings.reduce((acc, cur) => acc + cur.bookings, 0);
  const avgEarnings = totalBookings > 0 ? Math.round(totalRevenue / totalBookings) : 0;

  const maxRevenue = Math.max(...earnings.map((e) => e.revenue), 1);

  return (
    <StaggerContainer className="space-y-6">
      <div className="border-b border-border pb-3">
        <h2 className="text-xl font-bold text-foreground">Earnings & Analytics</h2>
        <p className="text-xs text-muted-foreground mt-1">Financial performance and session statistics overview</p>
      </div>

      {/* Stats Cards Row */}
      <FadeUp className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={DollarSign}
          label="Total Revenue"
          value={`₹${totalRevenue.toLocaleString("en-IN")}`}
          iconColor="text-accent"
          iconBg="bg-accent/10"
        />
        <StatCard
          icon={Calendar}
          label="Total Appointments"
          value={totalBookings}
          iconColor="text-primary"
          iconBg="bg-primary/10"
        />
        <StatCard
          icon={TrendingUp}
          label="Average Ticket Size"
          value={`₹${avgEarnings.toLocaleString("en-IN")}`}
          iconColor="text-teal-400"
          iconBg="bg-teal-400/10"
        />
      </FadeUp>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Horizontal Bar Chart */}
        <FadeUp className="premium-card p-5 md:col-span-2 space-y-4">
          <h3 className="font-semibold text-foreground text-sm border-b border-border pb-2 flex items-center gap-1.5">
            <TrendingUp className="size-4.5 text-primary" /> Monthly Revenue Trend
          </h3>
          
          <div className="space-y-4 pt-2">
            {earnings.map((item) => {
              const pct = (item.revenue / maxRevenue) * 100;
              return (
                <div key={item.month} className="flex items-center gap-3 text-xs">
                  <span className="w-8 font-semibold text-muted-foreground text-right">{item.month}</span>
                  <div className="flex-1 h-5 bg-muted rounded-lg overflow-hidden relative border border-border/10">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-lg transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-16 text-right font-bold text-foreground">
                    ₹{item.revenue.toLocaleString("en-IN")}
                  </span>
                </div>
              );
            })}
          </div>
        </FadeUp>

        {/* Business Highlights & popular service */}
        <FadeUp className="premium-card p-5 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-foreground text-sm border-b border-border pb-2 flex items-center gap-1.5">
              <Award className="size-4.5 text-primary" /> Business Highlights
            </h3>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3 text-xs">
                <span className="text-base mt-0.5">🌟</span>
                <div>
                  <h4 className="font-bold text-foreground">Top Performing Service</h4>
                  <p className="text-muted-foreground mt-0.5">Bridal Makeup & Hair represents 56% of this quarter&apos;s net revenue.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <span className="text-base mt-0.5">📈</span>
                <div>
                  <h4 className="font-bold text-foreground">Growth Rate</h4>
                  <p className="text-muted-foreground mt-0.5">Month-on-Month earnings grew by 14% this month, hitting record booking slots.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/15 flex items-start gap-2.5 text-xs text-amber-700 dark:text-gold-400">
            <Sparkles className="size-4 text-accent shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Recommendation</p>
              <p className="mt-0.5 opacity-90">Open 2 additional weekend evening slots to capture the peak wedding guest makeup demand next month.</p>
            </div>
          </div>
        </FadeUp>
      </div>
    </StaggerContainer>
  );
}
