"use client"

import { useEffect, useState } from "react"
import { auth, db } from "../../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation"
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function DashboardPage() {
    const [user, loading] = useAuthState(auth)
    const [plans, setPlans] = useState<any[]>([])
    const [purchases, setPurchases] = useState<any[]>([])
    const [isAdmin, setIsAdmin] = useState(false)
    const [showStripe, setShowStripe] = useState<any>(null)
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const router = useRouter()

    const ADMIN_EMAIL = "muhammadsaadc49@gmail.com"

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
        if (user) {
            setIsAdmin(user.email === ADMIN_EMAIL)

            // Fetch user data/purchases
            const q = query(collection(db, "purchases"), where("userId", "==", user.uid))
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setPurchases(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })

            // Fetch plans
            const plansQ = collection(db, "plans")
            const unsubscribePlans = onSnapshot(plansQ, (snapshot) => {
                setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })

            return () => {
                unsubscribe()
                unsubscribePlans()
            }
        }
    }, [user, loading, router])

    const handleStripeCheckout = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user || !showStripe) return

        setIsCheckingOut(true)
        setTimeout(async () => {
            await addDoc(collection(db, "purchases"), {
                userId: user.uid,
                userEmail: user.email,
                planId: showStripe.id,
                planName: showStripe.name,
                status: "pending",
                timestamp: serverTimestamp(),
                amount: showStripe.price,
                currency: "USD",
                paymentMethod: "Stripe"
            })

            setIsCheckingOut(false)
            setShowStripe(null)
            alert(`Payment Successful! Your access for ${showStripe.name} is being provisioned.`)
        }, 2000)
    }

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono">Initializing System Core...</div>

    return (
        <main className="min-h-screen flex flex-col pt-44 px-8 max-w-7xl mx-auto w-full bg-background">
            <Header />

            <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6 border-l-4 border-primary pl-6">
                <div>
                    <h1 className="text-5xl font-headline font-extrabold text-white mb-3 tracking-tighter uppercase leading-[0.8]">Systems Online, {user?.email?.split("@")[0]}</h1>
                    <p className="text-on-surface-variant font-body text-lg italic opacity-75">Operational status: <span className="text-secondary-container not-italic font-bold">OPTIMAL</span></p>
                </div>
                <div className="flex gap-4">
                    {isAdmin && (
                        <button onClick={() => router.push("/dashboard/admin")} className="bg-primary-container text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
                            <span className="material-symbols-outlined">shield_person</span> Admin Hub
                        </button>
                    )}
                    <button onClick={() => auth.signOut()} className="bg-surface-container-high text-on-surface-variant px-8 py-3 rounded-2xl font-bold hover:bg-white hover:text-black transition-all border border-white/5">Sign Out</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
                {/* Active Gear */}
                <div className="lg:col-span-4 space-y-8">
                    <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">verified</span> Deployment Fleet
                    </h2>
                    <div className="space-y-4">
                        {purchases.length === 0 ? (
                            <div className="bg-surface-container-low p-12 rounded-[2.5rem] border border-white/5 text-center text-on-surface-variant italic">No deployed tech found.</div>
                        ) : (
                            purchases.map((p) => (
                                <div key={p.id} className="bg-surface-container-high/40 p-8 rounded-[2rem] border border-white/10 relative overflow-hidden group hover:border-primary/40 transition-all">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-white font-bold text-xl">{p.planName}</h3>
                                        <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest ${p.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                            {p.status}
                                        </span>
                                    </div>
                                    {p.status === 'approved' ? (
                                        <a href={p.fileUrl} className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all">
                                            <span className="material-symbols-outlined">download</span> Get Core EXE
                                        </a>
                                    ) : (
                                        <div className="text-[10px] text-on-surface-variant/60 font-mono bg-surface-container-lowest p-4 rounded-xl text-center border border-white/5">AUTHENTICATING...</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Marketplace */}
                <div className="lg:col-span-8 space-y-8">
                    <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">dynamic_feed</span> Infrastructure Marketplace
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {plans.map((plan) => (
                            <div key={plan.id} className="bg-surface-container-high/60 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 transition-all flex flex-col justify-between group h-full relative overflow-hidden">
                                {plan.isPopular && <div className="absolute top-6 right-6 text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">Popular</div>}
                                <div>
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="material-symbols-outlined text-4xl text-primary">{plan.icon || 'bolt'}</span>
                                        <h3 className="text-2xl font-headline font-extrabold text-white tracking-tight">{plan.name}</h3>
                                    </div>
                                    <p className="text-on-surface-variant text-sm leading-relaxed mb-8 italic opacity-80">{plan.description}</p>
                                    <ul className="space-y-3 mb-10">
                                        {plan.features?.slice(0, 4).map((f: string, i: number) => (
                                            <li key={i} className="flex items-center gap-3 text-xs text-on-surface-variant">
                                                <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
                                    <div className="flex items-end gap-1">
                                        <span className="text-4xl font-extrabold text-white tracking-tighter">${plan.price}</span>
                                        <span className="text-on-surface-variant text-xs mb-1 italic opacity-60">/ {plan.duration}</span>
                                    </div>
                                    <button onClick={() => setShowStripe(plan)} className="w-full bg-white text-black py-5 rounded-2xl font-bold text-lg hover:bg-primary hover:text-white transition-all shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
                                        {plan.buttonText || 'Upgrade Now'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MOCK STRIPE MODAL (Remains similar but themed) */}
            {showStripe && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-6">
                    <div className="bg-[#f6f9fc] w-full max-w-xl rounded-[3rem] overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.5)] relative animate-in fade-in zoom-in duration-500">
                        <div className="bg-[#6772e5] p-12 text-white relative">
                            <button onClick={() => setShowStripe(null)} className="absolute top-8 right-8 text-white/60 hover:text-white">
                                <span className="material-symbols-outlined text-3xl">close</span>
                            </button>
                            <h2 className="text-5xl font-headline font-bold mb-2">${showStripe.price}.00</h2>
                            <p className="opacity-80 text-lg uppercase tracking-widest font-bold text-xs">{showStripe.name} Deployment</p>
                        </div>
                        <div className="p-12">
                            <form onSubmit={handleStripeCheckout} className="space-y-8">
                                <div className="space-y-4">
                                    <div className="bg-white border-2 border-slate-100 rounded-2xl p-6 shadow-sm">
                                        <input type="text" placeholder="Card number" required className="w-full text-xl outline-none" />
                                        <div className="flex gap-4 border-t-2 mt-6 pt-6">
                                            <input type="text" placeholder="MM / YY" required className="w-1/2 text-xl outline-none" />
                                            <input type="text" placeholder="CVC" required className="w-1/2 text-xl outline-none" />
                                        </div>
                                    </div>
                                    <input type="text" placeholder="Cardholder Name" required className="w-full bg-white border-2 border-slate-100 rounded-2xl p-6 text-xl outline-none shadow-sm" />
                                </div>
                                <button disabled={isCheckingOut} className="w-full bg-[#32325d] text-white py-6 rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-xl">
                                    {isCheckingOut ? "Connecting to Bank..." : `Pay $${showStripe.price}`}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    )
}
