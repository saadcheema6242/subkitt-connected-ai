"use client"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"

export default function Home() {
  const [plans, setPlans] = useState<any[]>([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "plans"), (snapshot) => {
      setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [])

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-44 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-15 grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvJZl1OJ2r-Xicd97rNnkZi2IHXUyaXQph0ChtRnSsinFsA2j45tf8qhs_yr0BpbyerzUy45bZT5zg-3HAosngUk6-NoXD-N1fYjP286PVKzrIYFXIzptOGoY6mAP8zpifKdunHAGnRVb9wB4W0Kcl4o3PaaU3soZnd-btZsNov7PIlhn8qZPmgZL41n2exLx-qL7-HCmZ-VWhpBBBTZc36LPnq6v8yKkFvCHJQlzOqZJuH1xVZakmfmzLZNyu0x71XASl4aOQZqc"
            alt="Cinematic Hero"
          />
          <div className="absolute inset-0 cinematic-overlay"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full py-24">
          <div className="max-w-4xl space-y-10 group">
            <div className="inline-flex items-center gap-2 bg-primary-container/10 border border-primary-container/20 px-4 py-2 rounded-full mb-4 group-hover:bg-primary-container/20 transition-all cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-bold text-primary tracking-widest uppercase">System Core v2.4.1 Active</span>
            </div>
            <h1 className="font-headline text-7xl md:text-9xl font-extrabold text-white tracking-tighter leading-[0.85] mb-4">
              COMMAND <br /> <span className="text-primary-variant animate-pulse">EVERYTHING.</span>
            </h1>
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl font-body leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
              The first autonomous terminal that synchronizes your applications, datasets, and workflows into a single, cinematic experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link href="/download" className="bg-primary-container text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] transition-all flex items-center justify-center gap-3 active:scale-95">
                Initiate Download
                <span className="material-symbols-outlined font-bold">arrow_forward</span>
              </Link>
              <Link href="/features" className="bg-surface-container-high/40 backdrop-blur-md text-white border border-outline-variant/20 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-surface-container-high transition-all flex items-center justify-center gap-3">
                Core Specs
                <span className="material-symbols-outlined">analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blueprint Grid */}
      <section className="py-24 bg-surface blueprint-bg relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard icon="bolt" title="Sub-ms Latency" desc="Built on a custom Rust core for instant command execution." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_XyCHm7xGfUuD33d9R4000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH" />
            <FeatureCard icon="shield" title="Encrypted Sync" desc="Zero-knowledge encryption for your cloud workflows." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_XyCHm7xGfUuD33d9R4000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH" />
            <FeatureCard icon="psychology" title="Intent AI" desc="Predicts your next command with 94% accuracy." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_XyCHm7xGfUuD33d9R4000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH" />
            <FeatureCard icon="grid_view" title="Omni-Channel" desc="One interface for Slack, GitHub, AWS, and local files." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_XyCHm7xGfUuD33d9R4000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH" />
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-24 px-8 max-w-7xl mx-auto relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-container/10 blur-[120px] rounded-full"></div>
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-white leading-tight">Visualizing <br />Intelligence.</h2>
            <div className="grid grid-cols-2 gap-4">
              <ScheduleCard emoji="☕" type="DAILY" title="Morning Prep" time="08:00 AM" />
              <ScheduleCard emoji="🧹" type="WEEKLY" title="Cache Cleanup" time="Fri, 11:00 PM" active />
              <ScheduleCard emoji="📸" type="MONTHLY" title="Cloud Backup" time="1st, 12:00 AM" />
              <ScheduleCard emoji="💬" type="ACTIVE" title="Auto-Reply" time="Slack Status" />
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline font-bold text-white">Timeline Preview</h3>
              <span className="material-symbols-outlined text-primary">more_horiz</span>
            </div>
            <div className="space-y-8 relative">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-outline-variant/20"></div>
              <TimelineItem status="NOW RUNNING" title="System Optimization" desc="Cleaning browser temporary files..." active />
              <TimelineItem status="UP NEXT (12:00 PM)" title="Lunch Break Protocol" desc="Muting notifications and setting status" />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Chains */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-12 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_0GHbR5jS9vXndG0D-gTWdBx5Pax1TN6lAQP3AsA97kKSCWO_7I-ym0Ld67KtuVNSMvIhHcLachpmOlkgvjoF4Zyz8i0BcmGNXtSurraYIUoXos1a5vCENxoGJWJ8R-YpUkhg9_rl1G5icsktKL8taQXK2UaSYQ2dMlVr2n_CyfhGASPAx6gi5iFw-F5lZrAo0crKZh_GOPrBKoU-qyaqSOlEw9mMb8Js_qlGyBbB_qk_-vTmwhBTZPVTlRuNL2w7cZLeyP-LWEc" alt="Chains Background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-5xl font-headline font-extrabold text-white">Chain Actions. Build Workflows.</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary">link</span>
                <div>
                  <h4 className="text-white font-bold">Logic Chaining</h4>
                  <p className="text-on-surface-variant">Use IF/THEN logic to create complex multi-app dependencies.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary">data_object</span>
                <div>
                  <h4 className="text-white font-bold">Variable Injection</h4>
                  <p className="text-on-surface-variant">Pass output from one command as input to the next automatically.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-[#0E0E13] rounded-2xl border border-primary/20 p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-6 text-on-surface-variant/40 text-xs">
                <span>WORKFLOW_EDITOR</span>
                <span className="w-px h-3 bg-white/10"></span>
                <span>prod_v1.sh</span>
              </div>
              <div className="space-y-6">
                <EditorStep num={1} code="read_calendar --today" color="primary-fixed" />
                <div className="ml-4 h-10 w-0.5 bg-gradient-to-b from-primary-container to-secondary-container"></div>
                <EditorStep num={2} code="ai summarize_events $calendar_output" color="white" bgColor="secondary-container" />
                <div className="ml-4 h-10 w-0.5 bg-gradient-to-b from-secondary-container to-primary"></div>
                <EditorStep num={3} code="slack send --to #daily-brief --msg $ai_summary" color="primary-fixed" bgColor="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Dynamic) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-15 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcUNGh7rbGAyeiC2GUrrgWsTvgx-lLahXi5iKC6ednK6iHJELjZnIsFqaYT3lRtCuyhoN0g8Ax4pL0zEn1BAuMOu_CGNdnhmo9LG-2C1q9-6WrHr7kUCd0MN8MPo8Qg7rXQULxcW96gUSul5jRH2nJJKIMmQW_uoOR26sCfS7BoLBw1CFmIKxpYyTzijHA4hqU3b-F4jJ8LhE7xxg8ENu7E8WQfDqqdZ5A2kOzv1JHPWD2lvVLV4FmGw_eYVcplYUx3lrVbR8AFHs" alt="Pricing Background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-headline font-bold text-white">Pricing for Everyone</h2>
            <p className="text-on-surface-variant mt-4 font-body">Choose the core that fits your vision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-surface-container-high/20 rounded-3xl border border-outline-variant/10">
                <p className="text-on-surface-variant italic">New plans arriving in the dashboard space soon.</p>
              </div>
            ) : (
              plans.map((plan) => (
                <PricingCard key={plan.id} title={plan.name} price={`$${plan.price}`} subtitle="/ lifetime">
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{plan.description}</p>
                  <Link href="/login" className="block w-full text-center bg-primary-container text-white py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                    Get Started
                  </Link>
                </PricingCard>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-32 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-20 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH1pCKdrs_REZMCCiaRIicqUhSwve5sgeRB1GtarjxAjnuvec6EjxPopzy2KJF-4VFwixxlFOd7HlSXskvwqWTp0Izfinuq0wUJTXrw5aMKT3VqvVjCVd6VbRf5n4HZE6K5HYMcUYWAwuOMfdL8-0k2eOKGvNPZ0UMO3KUHVWDqcYud0iGRGGxegSEux8m9EwWGXvnbUUE7GMx0AFVy32Dfb-knEOqGwCKp9Jhy0EeXPTVc4CYIALq66TOpA8bWoN4sdA6peUmWL4" alt="CTA Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center space-y-10">
          <h2 className="text-6xl font-headline font-extrabold text-white">Ready to take control?</h2>
          <p className="text-xl text-on-surface-variant">Join 45,000+ power users and transform your desktop experience today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/download" className="bg-primary-container text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform inline-flex items-center justify-center">
              Download for Windows
            </Link>
            <div className="text-on-surface-variant/40 text-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xs">info</span>
              Also available for macOS and Linux (Beta)
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function FeatureCard({ icon, title, desc, img }: any) {
  return (
    <div className="bg-surface-container-high/40 backdrop-blur-md rounded-xl p-6 border border-outline-variant/10 hover:bg-surface-container-high transition-all group">
      <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-primary">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm mb-4">{desc}</p>
      <img className="w-full h-24 object-cover rounded-lg opacity-40 group-hover:opacity-60 transition-opacity" src={img} alt={title} />
    </div>
  )
}

function ScheduleCard({ emoji, type, title, time, active }: any) {
  return (
    <div className={`p-4 rounded-xl border ${active ? 'bg-primary/10 border-primary/30 shadow-[0_0_20px_rgba(37,99,235,0.15)]' : 'bg-surface-container-low border-white/5'} transition-all hover:scale-105`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-xl">{emoji}</span>
        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${active ? 'bg-primary text-white' : 'bg-white/10 text-on-surface-variant'}`}>{type}</span>
      </div>
      <div className="text-white font-bold text-xs">{title}</div>
      <div className="text-on-surface-variant text-[10px] mt-1">{time}</div>
    </div>
  )
}

function TimelineItem({ status, title, desc, active }: any) {
  return (
    <div className="relative pl-10 group">
      <div className={`absolute left-4 top-1 w-2 h-2 rounded-full transform -translate-x-1/2 z-10 transition-all ${active ? 'bg-primary shadow-[0_0_10px_rgba(37,99,235,0.8)] scale-125' : 'bg-outline-variant/40 group-hover:bg-primary/60'}`}></div>
      <div className="text-[9px] font-bold text-primary tracking-widest mb-1">{status}</div>
      <h4 className="text-white font-bold text-sm">{title}</h4>
      <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">{desc}</p>
    </div>
  )
}

function EditorStep({ num, code, color, bgColor }: any) {
  return (
    <div className="flex items-center gap-4 group">
      <div className={`w-8 h-8 rounded-lg ${bgColor ? `bg-${bgColor}/20` : 'bg-surface-container-high'} border border-${color}/20 flex items-center justify-center font-bold text-xs text-${color} group-hover:scale-110 transition-transform`}>
        {num}
      </div>
      <div className="bg-surface-container-high/40 px-4 py-2 rounded-lg border border-white/5 font-mono text-xs flex-grow hover:border-primary/30 transition-colors">
        <span className={`text-${color} opacity-60 mr-2`}>$</span>
        <span className="text-white">{code}</span>
      </div>
    </div>
  )
}

function PricingCard({ title, price, subtitle, children, popular }: any) {
  return (
    <div className={`relative p-8 rounded-3xl border ${popular ? 'bg-surface-container-high border-primary/40 shadow-[0_0_40px_rgba(37,99,235,0.1)]' : 'bg-surface-container border-outline-variant/10'} transition-all hover:-translate-y-2`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-4 py-1 rounded-full tracking-widest uppercase">Best Value</div>
      )}
      <h3 className="text-white font-bold text-xl mb-2">{title}</h3>
      <div className="flex items-end gap-1 mb-6">
        <span className="text-4xl font-extrabold text-white">{price}</span>
        <span className="text-on-surface-variant text-sm mb-1">{subtitle}</span>
      </div>
      <div className="space-y-4 mb-8">
        {children}
      </div>
    </div>
  )
}

function PricingFeature({ text, bold }: any) {
  return (
    <div className={`flex items-center gap-3 text-sm ${bold ? 'text-white font-bold' : 'text-on-surface-variant'}`}>
      <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
      {text}
    </div>
  )
}
