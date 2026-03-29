"use client"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Link from "next/link"
import { useEffect, useState } from "react"
import { db } from "../../lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"

export default function PricingPage() {
    const [plans, setPlans] = useState<any[]>([])

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "plans"), (snapshot) => {
            setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        return () => unsub()
    }, [])

    return (
        <main className="min-h-screen flex flex-col pt-36 bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[614px] flex flex-col items-center justify-center pt-44 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Minimal Workspace"
                        className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1IWNJwEkU9ntarj5yS34JLr1onnsrReTCiremDU3_aWPPiy0qeP_AZewpLc4xhrJU9JjeOsBQAGTBq7hxmj9tY7jz5-UKjfFONX72jLBuiGviDEeaBC5bOZjlPq4O7I49ujQZG07879mK_7QV94hN3dsPd_JZHBy-ZzLYMJOuhyxGeXPYw00MWIbSijgCUadpGHI-dOOC0tu7zTQSaW2tza7PjXD6nWDUTVommvdo6SRNbbDpdgWUqw_OYXh3x8cIWAHyQ8nkQ2I"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Simple <span className="text-primary">Pricing.</span><br />Full Power.
                    </h1>
                    <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-12 font-body">
                        Transparent plans designed for creators, teams, and enterprises. Choose the scale that fits your vision.
                    </p>
                </div>
            </section>

            {/* Dynamic Pricing Cards */}
            <section className="relative px-6 py-24 -mt-24">
                <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
                    <img alt="Bokeh Lights" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdrs2-823_e4pNlGMitR9SdKoCKJQE0D-zAN0eKihaAj6j2XJ2TTBUydOhyCYXIwjn-5dNMRoZivcFbKprrGm-VzRUE8E3-EBosPb9Bl-UFFE7sMNOHuLR82xPNDjtL1dhzOMWNT23jCzUszqlWNJHxttFGw24rxwtr_Rx0QJkyaUHjiQnb9J72b_hiV4MUJClL1JtJod5xiRKhLljeBu2HDRnaiwlwqHBuzlzqL8vImPpPsS3F-mo3g3vdGyyV2tuCJO5pM9Pi6Q" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.length === 0 ? (
                        <div className="col-span-full py-24 text-center bg-surface-container-high/20 rounded-[3rem] border border-outline-variant/10 backdrop-blur-xl">
                            <span className="material-symbols-outlined text-5xl text-primary/40 mb-4 animate-pulse">cloud_off</span>
                            <h2 className="text-2xl font-headline font-bold text-white mb-2">No active plans detected</h2>
                            <p className="text-on-surface-variant italic">Systems are waiting for admin to deploy new core licenses.</p>
                        </div>
                    ) : (
                        plans.map((plan) => (
                            <PricingCard
                                key={plan.id}
                                title={plan.name}
                                desc={plan.description}
                                price={plan.price}
                                img={plan.imgUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuBMKaRV6xiTe6rQ2avXwanO_r2H5bpE5HAMBPTtqIC49MHRlEVMA1GKgskbz_cttdx0cQV92PnIEmK5INbkMhidL917WQokZqcy1JeKlDd1DIkGcNERFhu3h8WlvCzvnIOLk1iiQnLigonqYG0I0UQ9DJXgPmp3MJK2ZJekLRlxGYuFAXedhfaAkMZtR06PjRs3vK6xl0RdpoV5d-irG-nFPWHvX77tOpmB8WlPWtePT_-bgVSQKnYwiQDJrYWkrzHKOq1RPU1KvVU"}
                            >
                                <PricingFeature text="Lifetime access to platform" />
                                <PricingFeature text="Unlimited cloud synchronization" />
                                <PricingFeature text="Priority security indexing" />
                            </PricingCard>
                        ))
                    )}
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative rounded-[2rem] overflow-hidden group aspect-[3/4]">
                    <img alt="Person at computer" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlV_bp7jy_GsngmOWFEygFYFTeVr4o6VYFW6IVOIWWjooehls8tLLjgoGtkJk_fj1h7-BUanUnQ3M1Ma4HWn2HJ8C4BRkecHwSsXeIEXbsUejj5C5WC5TVIvPkNOPavY0EbjqVVtmFJoctSB8CMNHZWCPYl1LkGucfqd5WyA5FGIMMsDD66GI2IgwcbKSBImxDqdwHL3_siHSAhI2e-sPX5SA8o9O3k-WeKw42UyRaUOfZleJScOL-6_4AFyh4zqgdPjWwT0ay0Kw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                </div>
                <div>
                    <h2 className="font-headline text-4xl font-bold mb-12 text-white">Common <span className="text-primary">Questions</span></h2>
                    <div className="space-y-6">
                        <FAQItem question="Can I cancel my subscription anytime?" answer="Yes, you can cancel your subscription at any time through your dashboard. You will maintain access until the end of your billing cycle." />
                        <FAQItem question="What payment methods do you accept?" answer="We accept all major credit cards, PayPal, and cryptocurrency via Stripe integration." />
                        <FAQItem question="Is there a limit on file uploads?" answer="Depends on your license tier, but most Pro plans include unlimited encrypted storage." />
                        <FAQItem question="Do you offer educational discounts?" answer="Yes! Contact our support team with your student ID to claim your 50% discount." />
                        <FAQItem question="How secure is my data on SubKitt?" answer="Your data is encrypted end-to-end using AES-256 standards before it ever leaves your device." />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function PricingCard({ title, desc, price, children, popular, img }: any) {
    return (
        <div className={`group p-8 rounded-[2rem] bg-surface-container-low border ${popular ? 'border-2 border-primary-container relative shadow-[0_0_50px_rgba(124,58,237,0.15)] transform md:-translate-y-4' : 'border-outline-variant/20'} hover:border-primary-container/40 hover:bg-surface-container-high transition-all duration-500 flex flex-col h-full`}>
            {popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Most Popular</div>}
            <div className={`mb-8 w-24 h-24 rounded-2xl ${popular ? 'bg-primary-container/20' : 'bg-surface-container-lowest'} flex items-center justify-center overflow-hidden`}>
                <img alt={title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" src={img} />
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-on-surface-variant text-sm mb-6 flex-grow">{desc}</p>
            <div className="mb-8">
                <span className="text-4xl font-headline font-bold text-white">${price}</span>
                <span className="text-on-surface-variant text-sm ml-1 italic opacity-60">/ lifetime</span>
            </div>
            <ul className="space-y-4 mb-10">
                {children}
            </ul>
            <Link href="/login" className={`w-full py-4 rounded-xl text-center ${popular ? 'bg-primary-container text-white shadow-[0_10px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_30px_rgba(124,58,237,0.5)]' : 'border border-white/20 text-white hover:bg-white hover:text-black'} font-bold transition-all duration-300`}>
                Deploy Now
            </Link>
        </div>
    )
}

function PricingFeature({ text }: any) {
    return (
        <li className="flex items-center gap-3 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
            {text}
        </li>
    )
}

function FAQItem({ question, answer }: any) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="bg-surface-container-low rounded-2xl p-6 border-b border-outline-variant/10">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <h4 className="font-bold text-white tracking-wide">{question}</h4>
                <span className={`material-symbols-outlined text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </div>
            {isOpen && answer && <p className="mt-4 text-on-surface-variant text-sm border-t border-white/5 pt-4 leading-relaxed italic">{answer}</p>}
        </div>
    )
}
