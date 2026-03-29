"use client"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { auth, db } from "../../lib/firebase"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { useAuthState } from "react-firebase-hooks/auth"

export default function PricingPage() {
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

    const filteredPlans = plans.filter(plan => plan.duration === (isAnnual ? "annually" : "monthly"))

    return (
        <main className="min-h-screen flex flex-col pt-36 bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[400px] flex flex-col items-center justify-center px-6 overflow-hidden">
                <div className="relative z-10 text-center max-w-4xl mx-auto py-12">
                    <h1 className="font-headline text-4xl md:text-7xl font-bold tracking-tight mb-8 text-white">
                        Simple <span className="text-primary">Pricing.</span>
                    </h1>

                    {/* Pricing Toggle */}
                    <div className="inline-flex items-center gap-4 bg-surface-container-high/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-xl">
                        <button onClick={() => setIsAnnual(false)} className={`px-8 py-2.5 rounded-xl font-bold text-xs transition-all ${!isAnnual ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-white'}`}>Monthly</button>
                        <button onClick={() => setIsAnnual(true)} className={`px-8 py-2.5 rounded-xl font-bold text-xs transition-all ${isAnnual ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-white'}`}>Annually</button>
                    </div>
                </div>
            </section>

            {/* Dynamic Pricing Cards */}
            <section className="relative px-6 py-12">
                <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredPlans.length === 0 ? (
                        <div className="col-span-full py-20 text-center bg-surface-container-high/20 rounded-3xl border border-white/5">
                            <p className="text-on-surface-variant text-sm italic">Nothing here yet.</p>
                        </div>
                    ) : (
                        filteredPlans.map((plan) => (
                            <PricingCard
                                key={plan.id}
                                title={plan.name}
                                desc={plan.description}
                                price={plan.price}
                                icon={plan.icon}
                                popular={plan.isPopular}
                                buttonText={plan.buttonText}
                                duration={plan.duration}
                                alreadyOwned={hasPlan(plan.id)}
                            >
                                {plan.features?.map((f: string, i: number) => (
                                    <PricingFeature key={i} text={f} />
                                ))}
                            </PricingCard>
                        ))
                    )}
                </div>
            </section>

            <Footer />
        </main>
    )
}

function PricingCard({ title, desc, price, icon, children, popular, buttonText, duration, alreadyOwned }: any) {
    return (
        <div className={`p-8 rounded-[2rem] bg-surface-container-low border ${popular ? 'border-primary ring-1 ring-primary/20' : 'border-white/5'} flex flex-col h-full overflow-hidden transition-all hover:border-primary/50 group`}>
            <div className="mb-8 flex items-center gap-4">
                <span className="material-symbols-outlined text-3xl text-primary">{icon || 'bolt'}</span>
                <h3 className="font-bold text-xl text-white">{title}</h3>
            </div>

            <div className="mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">${price}</span>
                <span className="text-on-surface-variant text-[10px] font-mono italic opacity-60">/ {duration}</span>
            </div>

            <ul className="space-y-3 mb-10 flex-grow">
                {children}
            </ul>

            {alreadyOwned ? (
                <Link href="/dashboard" className="w-full py-4 rounded-xl text-center font-bold text-xs bg-green-500/10 text-green-400 border border-green-500/20">
                    You already buy the plan
                </Link>
            ) : (
                <Link href="/login" className={`w-full py-4 rounded-xl text-center font-bold text-xs transition-all ${popular ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black'}`}>
                    {buttonText || 'Get Started'}
                </Link>
            )}
        </div>
    )
}

function PricingFeature({ text }: any) {
    return (
        <li className="flex items-center gap-3 text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span>
            <span>{text}</span>
        </li>
    )
}
