"use client"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { auth, db } from "../lib/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Home() {
  const [plans, setPlans] = useState<any[]>([])
  const [purchases, setPurchases] = useState<any[]>([])
  const [user] = useAuthState(auth)
  const [isAnnual, setIsAnnual] = useState(false)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "plans"), (snapshot) => {
      setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "purchases"), where("userId", "==", user.uid))
      const unsub = onSnapshot(q, (snapshot) => {
        setPurchases(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      })
      return () => unsub()
    }
  }, [user])

  const hasPlan = (planId: string) => {
    return purchases.some(p => p.planId === planId && p.status === 'approved')
  }

  const filteredPlans = plans.filter(p => p.duration === (isAnnual ? "annually" : "monthly"))

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center pt-32 overflow-hidden px-8 max-w-6xl mx-auto w-full">
        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-[10px] font-bold text-primary tracking-widest uppercase mb-4">
            System Online
          </div>
          <h1 className="font-headline text-5xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-4">
            Everything <br /> <span className="text-primary underline decoration-primary/20 underline-offset-8">Synced.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-xl font-body leading-relaxed opacity-60">
            A single, cinematic terminal to coordinate your files, workflows, and datasets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/download" className="bg-primary text-white border border-primary px-8 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-80 transition-all text-center">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section (Dynamic & Filtered) */}
      <section className="py-24 max-w-6xl mx-auto px-8 w-full border-t border-white/5">
        <div className="text-center mb-16 px-4">
          <h2 className="text-4xl md:text-6xl font-headline font-bold text-white tracking-tight mb-8">Built to <span className="text-primary">Scale.</span></h2>

          {/* Pricing Toggle */}
          <div className="inline-flex items-center gap-4 bg-surface-container-high/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl mb-12">
            <button onClick={() => setIsAnnual(false)} className={`px-8 py-2.5 rounded-xl font-bold text-xs transition-all ${!isAnnual ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:text-white'}`}>Monthly</button>
            <button onClick={() => setIsAnnual(true)} className={`px-8 py-2.5 rounded-xl font-bold text-xs transition-all ${isAnnual ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:text-white'}`}>Annually</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPlans.length === 0 ? (
            <div className="col-span-full py-20 text-center bg-surface-container-high/20 rounded-3xl border border-white/5">
              <p className="text-on-surface-variant text-sm italic">Nothing deployed here yet.</p>
            </div>
          ) : (
            filteredPlans.map((plan) => (
              <div key={plan.id} className={`p-8 rounded-[2rem] bg-surface-container-low border ${plan.isPopular ? 'border-primary ring-1 ring-primary/20' : 'border-white/5'} flex flex-col h-full overflow-hidden transition-all hover:border-primary/50 group h-fit`}>
                <div className="mb-8 flex items-center gap-4">
                  <span className="material-symbols-outlined text-3xl text-primary">{plan.icon || 'bolt'}</span>
                  <h3 className="font-bold text-xl text-white">{plan.name}</h3>
                </div>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">${plan.price}</span>
                  <span className="text-on-surface-variant text-[10px] font-mono italic opacity-60">/ {plan.duration}</span>
                </div>
                <p className="text-on-surface-variant text-xs mb-8 italic opacity-60">{plan.description}</p>
                <ul className="space-y-3 mb-10 flex-grow">
                  {plan.features?.slice(0, 3).map((f: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-[10px] text-on-surface-variant">
                      <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span> {f}
                    </li>
                  ))}
                </ul>
                {hasPlan(plan.id) ? (
                  <Link href="/dashboard" className="block w-full text-center bg-green-500/10 text-green-400 border border-green-500/20 py-4 rounded-xl font-bold text-xs">
                    You already buy the plan
                  </Link>
                ) : (
                  <Link href="/login" className={`block w-full text-center py-4 rounded-xl font-bold text-xs transition-all ${plan.isPopular ? 'bg-primary text-white' : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black'}`}>
                    {plan.buttonText || 'Deploy Now'}
                  </Link>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
