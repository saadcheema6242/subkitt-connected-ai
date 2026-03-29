"use client"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { db } from "../../lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"

export default function PricingPage() {
    const [plans, setPlans] = useState<any[]>([])
    const [isAnnual, setIsAnnual] = useState(false)

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "plans"), (snapshot) => {
            setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        return () => unsub()
    }, [])

    const filteredPlans = plans.filter(plan => plan.duration === (isAnnual ? "annually" : "monthly"))

    return (
        <main className="min-h-screen flex flex-col pt-36 bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[500px] flex flex-col items-center justify-center px-6 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20 filter grayscale contrast-125">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1IWNJwEkU9ntarj5yS34JLr1onnsrReTCiremDU3_aWPPiy0qeP_AZewpLc4xhrJU9JjeOsBQAGTBq7hxmj9tY7jz5-UKjfFONX72jLBuiGviDEeaBC5bOZjlPq4O7I49ujQZG07879mK_7QV94hN3dsPd_JZHBy-ZzLYMJOuhyxGeXPYw00MWIbSijgCUadpGHI-dOOC0tu7zTQSaW2tza7PjXD6nWDUTVommvdo6SRNbbDpdgWUqw_OYXh3x8cIWAHyQ8nkQ2I" alt="Hero Background" />
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto py-24">
                    <h1 className="font-headline text-5xl md:text-8xl font-extrabold tracking-tighter mb-8 text-white leading-[0.9]">
                        Tiered <span className="text-primary-variant animate-pulse">Intelligence.</span>
                    </h1>
                    <p className="text-on-surface-variant text-lg md:text-2xl max-w-2xl mx-auto mb-16 font-body opacity-80 decoration-primary-container italic">
                        Select the core licensing duration that synchronizes with your operational scale.
                    </p>

                    {/* Pricing Toggle */}
                    <div className="inline-flex items-center gap-6 bg-surface-container-high/40 p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
                        <button onClick={() => setIsAnnual(false)} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${!isAnnual ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:text-white'}`}>Monthly</button>
                        <button onClick={() => setIsAnnual(true)} className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${isAnnual ? 'bg-primary text-white shadow-lg' : 'text-on-surface-variant hover:text-white'}`}>Annually</button>
                    </div>
                </div>
            </section>

            {/* Dynamic Pricing Cards */}
            <section className="relative px-6 py-24">
                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {filteredPlans.length === 0 ? (
                        <div className="col-span-full py-24 text-center bg-surface-container-high/20 rounded-[3rem] border border-white/5 backdrop-blur-xl">
                            <h2 className="text-2xl font-headline font-bold text-white mb-2 italic">Systems Offline</h2>
                            <p className="text-on-surface-variant">No tiers deployed for this specific duration.</p>
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

function PricingCard({ title, desc, price, icon, children, popular, buttonText, duration }: any) {
    return (
        <div className={`group p-10 rounded-[3rem] bg-surface-container-low border ${popular ? 'border-2 border-primary relative shadow-[0_0_50px_rgba(37,99,235,0.1)] transform md:-translate-y-4' : 'border-white/5'} hover:border-primary/40 transition-all duration-700 flex flex-col h-full overflow-hidden`}>
            {popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-xl">Most Popular</div>}

            <div className="mb-10 flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl ${popular ? 'bg-primary/20' : 'bg-surface-container-highest'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-4xl text-primary">{icon || 'bolt'}</span>
                </div>
                <div>
                    <h3 className="font-headline text-2xl font-bold text-white">{title}</h3>
                    <p className="text-on-surface-variant text-xs italic">Core System Entry</p>
                </div>
            </div>

            <div className="mb-10">
                <span className="text-5xl font-headline font-extrabold text-white tracking-tighter">${price}</span>
                <span className="text-on-surface-variant text-sm ml-2 font-mono italic">/ {duration}</span>
            </div>

            <p className="text-on-surface-variant text-sm mb-10 leading-relaxed italic opacity-80">{desc}</p>

            <ul className="space-y-4 mb-12 flex-grow">
                {children}
            </ul>

            <Link href="/login" className={`w-full py-5 rounded-2xl text-center font-bold text-lg shadow-2xl transition-all duration-500 active:scale-95 ${popular ? 'bg-primary text-white hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]' : 'bg-surface-container-highest text-white border border-white/5 hover:bg-white hover:text-black'}`}>
                {buttonText || 'Deploy Core'}
            </Link>
        </div>
    )
}

function PricingFeature({ text }: any) {
    return (
        <li className="flex items-center gap-4 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span>
            <span className="group-hover:text-white transition-colors">{text}</span>
        </li>
    )
}
