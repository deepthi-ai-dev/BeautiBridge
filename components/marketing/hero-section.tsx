"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Star, Shield, Users, Search, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/lib/motion";
import { motion } from "framer-motion";

const stats = [
  { label: "Verified Artists", value: "500+" },
  { label: "Cities Served", value: "50+" },
  { label: "Avg. Rating", value: "4.9★" },
] as const;

const trustSignals = [
  { icon: Shield, label: "Verified Profiles" },
  { icon: Users, label: "30k+ Bookings" },
] as const;

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100svh-6rem)] w-full overflow-hidden bg-background pt-8 sm:pt-16 pb-16 lg:pb-0 flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-salmon-300/15 via-background to-background" />
      <div className="absolute top-0 right-0 -z-10 w-full h-[800px] bg-[radial-gradient(circle_at_70%_50%,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent blur-3xl opacity-60" />
      
      {/* Glass gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-background/40 backdrop-blur-[100px]" />

      <div className="page-container relative grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-8">
        
        {/* Left: Copy & Actions */}
        <div className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
          
          <FadeUp>
            {/* Small AI Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent shadow-sm backdrop-blur-md mb-6">
              <Sparkles className="size-3.5" />
              <span>AI-Powered Beauty Matching</span>
            </div>
            
            <h1 className="text-4xl leading-[1.1] font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem]">
              Your flawless look, <br className="hidden lg:block" />
              <span className="bg-gradient-to-r from-primary to-salmon-400 bg-clip-text text-transparent">
                booked in seconds.
              </span>
            </h1>
            
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Discover, compare, and book the city&apos;s finest makeup artists and stylists. 
              Tell our AI what you need, and we&apos;ll handle the rest.
            </p>
          </FadeUp>

          {/* Search Bar / Primary Action */}
          <FadeUp className="mt-10 w-full max-w-lg" transition={{ delay: 0.1 }}>
            <div className="group relative flex w-full items-center gap-3 rounded-full border border-border/50 bg-card/60 p-2 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl transition-all duration-300 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] focus-within:border-primary/50 focus-within:ring-4 focus-within:ring-primary/10">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Search className="size-5" />
              </div>
              <input 
                type="text" 
                placeholder="Find 'Bridal makeup in Mumbai'..." 
                className="w-full bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground/70"
                readOnly
              />
              <Link href="/assistant" className="shrink-0">
                <Button size="lg" className="rounded-full px-6 shadow-soft transition-transform hover:scale-105 active:scale-95 bg-primary text-primary-foreground">
                  Ask AI
                </Button>
              </Link>
            </div>
          </FadeUp>

          {/* Secondary CTAs */}
          <FadeUp className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start" transition={{ delay: 0.2 }}>
            <Link href="/artists">
              <Button variant="outline" size="lg" className="rounded-full border-border/60 bg-card/50 px-8 shadow-sm backdrop-blur-sm transition-all hover:bg-muted">
                Browse Artists
              </Button>
            </Link>
            <Link
              href="/#how-it-works"
              className="group flex items-center gap-2 text-sm font-semibold text-foreground/80 transition-colors hover:text-primary"
            >
              See how it works
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeUp>

          {/* Trust & Stats */}
          <FadeUp className="mt-12 w-full max-w-lg border-t border-border/40 pt-8" transition={{ delay: 0.3 }}>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-2xl font-bold tracking-tight text-foreground">{stat.value}</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 lg:justify-start">
              {trustSignals.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <div className="flex size-6 items-center justify-center rounded-full bg-teal-500/10 text-teal-500">
                    <Icon className="size-3.5" />
                  </div>
                  {label}
                </div>
              ))}
            </div>
          </FadeUp>

        </div>

        {/* Right: Visual Composition */}
        <div className="relative mx-auto mt-12 w-full max-w-[500px] lg:mt-0 lg:max-w-none h-[600px] lg:h-[700px] flex items-center justify-center">
          
          {/* Main Image Container */}
          <FadeUp className="relative z-10 w-full max-w-[400px] aspect-[3/4]" transition={{ delay: 0.2 }}>
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-primary/20 to-transparent blur-2xl transform translate-x-4 translate-y-8" />
            <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-border/40 shadow-2xl bg-card">
              <Image
                alt="Luxury beauty services"
                src="/images/marketing/hero-makeup.svg"
                fill
                priority
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 rounded-[2.5rem] ring-1 ring-inset ring-white/10" />
            </div>
          </FadeUp>

          {/* Floating Review Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[15%] -left-6 sm:-left-12 z-20"
          >
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card/80 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-500">
                <Star className="size-5 fill-current" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Top Rated Artists</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">4.9/5</span> average rating
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating AI Recommendation Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[45%] -right-4 sm:-right-10 z-20"
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
              className="flex w-64 flex-col gap-3 rounded-2xl border border-border/50 bg-card/80 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-accent">
                  <Sparkles className="size-3.5" /> AI Pick
                </div>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              </div>
              <p className="text-sm font-medium leading-snug text-foreground">
                Found 3 bridal artists available this Saturday in your budget.
              </p>
            </motion.div>
          </motion.div>

          {/* Floating Booking Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20 sm:left-auto sm:right-[15%] sm:translate-x-0"
          >
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2 }}
              className="flex items-center gap-4 rounded-2xl border border-border/50 bg-card/80 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <CalendarCheck className="size-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Instant Booking</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Secure your slot today</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
