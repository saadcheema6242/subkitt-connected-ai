"use client"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"

export default function Home() {
  const [plans, setPlans] = useState<any[]>([])
  const [isAnnual, setIsAnnual] = useState(false)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "plans"), (snapshot) => {
      setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [])

  const filteredPlans = plans.filter(p => p.duration === (isAnnual ? "annually" : "monthly"))

  return (
    <main className="min-h-screen flex flex-col bg-background">
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
            <FeatureCard icon="shield" title="Encrypted Sync" desc="Zero-knowledge encryption for your cloud workflows." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_XyCHm7xGfUuD33d9R4000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH" />
            <FeatureCard icon="psychology" title="Intent AI" desc="Predicts your next command with 94% accuracy." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_XyCHm7xGfUuD33d9R4000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH" />
            <FeatureCard icon="grid_view" title="Omni-Channel" desc="One interface for Slack, GitHub, AWS, and local files." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_XyCHm7xGfUuD33d9R4000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH" />
          </div>
        </div>
      </section>

      {/* Pricing Section (Dynamic & Filtered) */}
      <section className="py-24 relative overflow-hidden bg-surface-container-low/20">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-15 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcUNGh7rbGAyeiC2GUrrgWsTvgx-lLahXi5iKC6ednK6iHJELjZnIsFqaYT3lRtCuyhoN0g8Ax4pL0zEn1BAuMOu_CGNdnhmo9LG-2C1q9-6WrHr7kUCd0MN8MPo8Qg7rXQULxcW96gUSul5jRH2nJJKIMmQW_uoOR26sCfS7BoLBw1CFmIKxpYyTzijHA4hqU3b-F4jJ8LhE7xxg8ENu7E8WQfDqqdZ5A2kOzv1JHPWD2lvVLV4FmGw_eYVcplYUx3lrVbR8AFHs" alt="Pricing Background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-headline font-extrabold text-white tracking-tighter mb-8">Scale your <span className="text-primary-variant">Ambition.</span></h2>

            {/* Pricing Toggle */}
            <div className="inline-flex items-center gap-6 bg-surface-container-high/40 p-2 rounded-2xl border border-white/5 backdrop-blur-xl mb-12">
              <button onClick={() => setIsAnnual(false)} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${!isAnnual ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:text-white'}`}>Monthly</button>
              <button onClick={() => setIsAnnual(true)} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${isAnnual ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:text-white'}`}>Annually</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPlans.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-surface-container-high/20 rounded-3xl border border-outline-variant/10">
                <p className="text-on-surface-variant italic">Waiting for admin to deploy core licenses...</p>
              </div>
            ) : (
              filteredPlans.map((plan) => (
                <PricingCard key={plan.id} title={plan.name} price={`$${plan.price}`} subtitle={`/ ${plan.duration}`} icon={plan.icon} popular={plan.isPopular}>
                  <p className="text-on-surface-variant text-sm mb-8 leading-relaxed italic border-l-2 border-primary/20 pl-4">{plan.description}</p>
                  <div className="space-y-3 mb-8">
                    {plan.features?.slice(0, 3).map((f: string, i: number) => (
                      <div key={i} className="flex items-center gap-3 text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span> {f}
                      </div>
                    ))}
                  </div>
                  <Link href="/login" className="block w-full text-center bg-primary-container text-white py-5 rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all active:scale-95">
                    {plan.buttonText || 'Acquire License'}
                  </Link>
                </PricingCard>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function FeatureCard({ icon, title, desc, img }: any) {
  return (
    <div className="bg-surface-container-high/40 backdrop-blur-md rounded-2xl p-8 border border-outline-variant/10 hover:bg-surface-container-high transition-all group">
      <div className="w-14 h-14 rounded-xl bg-primary-container/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-primary text-3xl">{icon}</span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-on-surface-variant text-base mb-6 leading-relaxed opacity-80">{desc}</p>
      <img className="w-full h-32 object-cover rounded-xl opacity-20 grayscale group-hover:opacity-40 transition-opacity" src={img} alt={title} />
    </div>
  )
}

function PricingCard({ title, price, subtitle, children, icon, popular }: any) {
  return (
    <div className={`relative p-10 rounded-[2.5rem] border ${popular ? 'bg-surface-container-high border-primary/40 shadow-[0_0_60px_rgba(37,99,235,0.1)]' : 'bg-surface-container border-outline-variant/10'} transition-all hover:-translate-y-3 group`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-6 py-1.5 rounded-full tracking-widest uppercase shadow-xl">Master License</div>
      )}
      <div className="flex items-center gap-4 mb-8">
        <span className="material-symbols-outlined text-4xl text-primary">{icon || 'bolt'}</span>
        <h3 className="text-white font-headline font-extrabold text-2xl tracking-tight group-hover:text-primary transition-colors">{title}</h3>
      </div>
      <div className="flex items-end gap-1 mb-10">
        <span className="text-5xl font-extrabold text-white tracking-tighter">{price}</span>
        <span className="text-on-surface-variant text-sm mb-2 font-mono opacity-60">{subtitle}</span>
      </div>
      <div className="space-y-4 mb-10 text-on-surface-variant text-sm">
        {children}
      </div>
    </div>
  )
}
