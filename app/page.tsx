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
            <FeatureCard icon="shield" title="Encrypted Sync" desc="Zero-knowledge encryption for your cloud workflows." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_XyCHm7xGfUuD33d9R4000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH" />
            <FeatureCard icon="psychology" title="Intent AI" desc="Predicts your next command with 94% accuracy." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_XyCHm7xGfUuD33d9R4000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH" />
            <FeatureCard icon="grid_view" title="Omni-Channel" desc="One interface for Slack, GitHub, AWS, and local files." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAYF_XyCHm7xGfUuD33d9R4000yBvV6kI48XJ_uH000yBvV6kI48XJ_uH" />
          </div>
        </div>
      </section>

      {/* Case Studies Restored */}
      <section className="py-24 bg-surface relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-white leading-tight">Mastering <br /> Complexity.</h2>
              <p className="text-on-surface-variant mt-6 text-lg">Real-world systems optimized by the SubKitt autonomous core.</p>
            </div>
            <Link href="/features" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
              View all capabilities <span className="material-symbols-outlined">arrow_right_alt</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CaseStudyCard
              title="Automated Data Pipeline"
              client="Visionary Tech"
              desc="Reduced manual processing time by 82% using logic chaining and AI summarization."
              tag="DATAVIZ"
            />
            <CaseStudyCard
              title="DevOps Orchestration"
              client="Nexus Cloud"
              desc="Consolidated 14 disparate tools into a single terminal window with 100% cloud sync."
              tag="INFRA"
            />
          </div>
        </div>
      </section>

      {/* Workflow Chains */}
      <section className="py-24 relative overflow-hidden bg-surface-container-low/30">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-12 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_0GHbR5jS9vXndG0D-gTWdBx5Pax1TN6lAQP3AsA97kKSCWO_7I-ym0Ld67KtuVNSMvIhHcLachpmOlkgvjoF4Zyz8i0BcmGNXtSurraYIUoXos1a5vCENxoGJWJ8R-YpUkhg9_rl1G5icsktKL8taQXK2UaSYQ2dMlVr2n_CyfhGASPAx6gi5iFw-F5lZrAo0crKZh_GOPrBKoU-qyaqSOlEw9mMb8Js_qlGyBbB_qk_-vTmwhBTZPVTlRuNL2w7cZLeyP-LWEc" alt="Chains Background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-5xl font-headline font-extrabold text-white">Chain Actions. <br /> Build Workflows.</h2>
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
            <div className="bg-[#0E0E13] rounded-2xl border border-primary/20 p-8 font-mono text-sm overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 mb-8 text-on-surface-variant/40 text-[10px] tracking-wider">
                <span>WORKFLOW_EDITOR</span>
                <span className="w-px h-3 bg-white/10"></span>
                <span>prod_v1.sh</span>
              </div>
              <div className="space-y-8">
                <EditorStep num={1} code="read_calendar --today" color="primary-fixed" />
                <div className="ml-4 h-12 w-0.5 bg-gradient-to-b from-primary-container to-secondary-container opacity-40"></div>
                <EditorStep num={2} code="ai summarize_events $calendar_output" color="white" bgColor="secondary-container" />
                <div className="ml-4 h-12 w-0.5 bg-gradient-to-b from-secondary-container to-primary opacity-40"></div>
                <EditorStep num={3} code="slack send --to #daily-brief --msg $ai_summary" color="primary-fixed" bgColor="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Restored */}
      <section className="py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard
            quote="The speed is terrifying. In a good way. My productivity has quadrupled."
            author="Sarah Jenkins"
            role="Principal Engineer @ CloudFlare"
          />
          <TestimonialCard
            quote="Finally, a terminal that understands my intent. It's like having a senior dev in my CLI."
            author="Marcus Chen"
            role="Full Stack Dev @ Stripe"
          />
          <TestimonialCard
            quote="Encrypted sync meant I could finally trust my workflows across my entire fleet."
            author="David Kim"
            role="Security Lead @ Brex"
          />
        </div>
      </section>

      {/* Pricing Section (Dynamic) */}
      <section className="py-24 relative overflow-hidden bg-surface-container-low/20">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-15 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcUNGh7rbGAyeiC2GUrrgWsTvgx-lLahXi5iKC6ednK6iHJELjZnIsFqaYT3lRtCuyhoN0g8Ax4pL0zEn1BAuMOu_CGNdnhmo9LG-2C1q9-6WrHr7kUCd0MN8MPo8Qg7rXQULxcW96gUSul5jRH2nJJKIMmQW_uoOR26sCfS7BoLBw1CFmIKxpYyTzijHA4hqU3b-F4jJ8LhE7xxg8ENu7E8WQfDqqdZ5A2kOzv1JHPWD2lvVLV4FmGw_eYVcplYUx3lrVbR8AFHs" alt="Pricing Background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-headline font-extrabold text-white">Scale your <span className="text-primary-variant">Ambition.</span></h2>
            <p className="text-on-surface-variant mt-4 font-body text-lg italic">Choose the core license that powers your workflow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.length === 0 ? (
              <div className="col-span-full py-20 text-center bg-surface-container-high/20 rounded-3xl border border-outline-variant/10">
                <p className="text-on-surface-variant italic">Waiting for admin to deploy core licenses...</p>
              </div>
            ) : (
              plans.map((plan) => (
                <PricingCard key={plan.id} title={plan.name} price={`$${plan.price}`} subtitle="/ lifetime">
                  <p className="text-on-surface-variant text-sm mb-8 leading-relaxed italic border-l-2 border-primary/20 pl-4">{plan.description}</p>
                  <Link href="/login" className="block w-full text-center bg-primary-container text-white py-5 rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all active:scale-95">
                    Acquire License
                  </Link>
                </PricingCard>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-32 bg-surface-container-lowest relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-8 space-y-12">
          <h2 className="text-6xl md:text-8xl font-headline font-extrabold text-white tracking-tighter">JOIN THE <br />REVOLUTION.</h2>
          <p className="text-xl text-on-surface-variant opacity-80">Synchronize your creative ambition with technical reality today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/download" className="bg-primary-container text-white px-16 py-6 rounded-2xl font-bold text-xl shadow-[0_0_50px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform inline-flex items-center justify-center">
              Download Core
            </Link>
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

function CaseStudyCard({ title, client, desc, tag }: any) {
  return (
    <div className="bg-surface-container-low p-8 rounded-3xl border border-white/5 hover:border-primary/40 transition-all group cursor-default">
      <div className="flex justify-between mb-8">
        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary px-3 py-1 bg-primary/10 rounded-full">{tag}</span>
        <span className="text-on-surface-variant text-xs font-mono">{client}</span>
      </div>
      <h3 className="text-2xl font-headline font-bold text-white mb-4 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-on-surface-variant leading-relaxed">{desc}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, role }: any) {
  return (
    <div className="bg-surface-container-high/20 p-8 rounded-3xl border border-white/5 relative group">
      <span className="material-symbols-outlined text-primary/20 text-6xl absolute top-4 right-4 group-hover:text-primary/40 transition-colors">format_quote</span>
      <p className="text-white text-lg font-medium leading-relaxed mb-8 italic relative z-10">"{quote}"</p>
      <div className="pt-6 border-t border-white/5">
        <div className="text-white font-bold">{author}</div>
        <div className="text-on-surface-variant text-xs mt-1">{role}</div>
      </div>
    </div>
  )
}

function EditorStep({ num, code, color, bgColor }: any) {
  return (
    <div className="flex items-center gap-6 group">
      <div className={`w-10 h-10 rounded-xl ${bgColor ? `bg-${bgColor}/20` : 'bg-surface-container-high'} border border-${color}/20 flex items-center justify-center font-bold text-sm text-${color} group-hover:scale-110 shadow-lg transition-transform`}>
        {num}
      </div>
      <div className="bg-surface-container-high/60 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/5 font-mono text-sm flex-grow hover:border-primary/40 transition-all">
        <span className={`text-${color} opacity-40 mr-3`}>$</span>
        <span className="text-white text-opacity-90">{code}</span>
      </div>
    </div>
  )
}

function PricingCard({ title, price, subtitle, children, popular }: any) {
  return (
    <div className={`relative p-10 rounded-[2.5rem] border ${popular ? 'bg-surface-container-high border-primary/40 shadow-[0_0_60px_rgba(37,99,235,0.1)]' : 'bg-surface-container border-outline-variant/10'} transition-all hover:-translate-y-3 group`}>
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-6 py-1.5 rounded-full tracking-widest uppercase shadow-xl">Master License</div>
      )}
      <h3 className="text-white font-headline font-extrabold text-2xl mb-2 tracking-tight group-hover:text-primary transition-colors">{title}</h3>
      <div className="flex items-end gap-1 mb-10">
        <span className="text-5xl font-extrabold text-white tracking-tighter">{price}</span>
        <span className="text-on-surface-variant text-sm mb-2 font-mono opacity-60">{subtitle}</span>
      </div>
      <div className="space-y-4 mb-10">
        {children}
      </div>
    </div>
  )
}
