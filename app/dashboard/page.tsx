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

            const q = query(collection(db, "purchases"), where("userId", "==", user.uid))
            const unsubscribe = onSnapshot(q, (snapshot) => {
                setPurchases(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })

            const plansQ = collection(db, "plans")
            const unsubscribePlans = onSnapshot(plansQ, (snapshot) => {
                setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })

            return () => { unsubscribe(); unsubscribePlans(); }
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
            alert(`Payment Initiated! Verification pending.`)
        }, 2000)
    }

    const hasPlan = (planId: string) => {
        return purchases.some(p => p.planId === planId && p.status === 'approved')
    }

    const handleDownload = (purchase: any) => {
        if (!purchase.fileUrl || purchase.fileUrl === "") {
            alert("Contact the person, he cannot add exer file yet")
        } else {
            window.open(purchase.fileUrl, "_blank")
        }
    }

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono">Loading...</div>

    return (
        <main className="min-h-screen flex flex-col pt-32 px-6 max-w-6xl mx-auto w-full bg-background">
            <Header />

            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 border-b border-white/5 pb-8">
                <div>
                    <h1 className="text-4xl font-headline font-bold text-white mb-2">Workspace</h1>
                    <p className="text-on-surface-variant text-sm opacity-60">Identity: {user?.email}</p>
                </div>
                <div className="flex gap-3">
                    {isAdmin && (
                        <button onClick={() => router.push("/dashboard/admin")} className="bg-primary text-white px-6 py-2 rounded-xl font-bold text-sm hover:opacity-80 transition-all flex items-center gap-2">
                            Admin Control
                        </button>
                    )}
                    <button onClick={() => auth.signOut()} className="bg-white/5 text-white px-6 py-2 rounded-xl font-bold text-sm hover:bg-white/10 transition-all border border-white/5">Sign Out</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                {/* Active Licenses */}
                <div className="lg:col-span-5 space-y-8">
                    <h2 className="text-xl font-headline font-bold text-white flex items-center gap-3">
                        Active Licenses
                    </h2>
                    <div className="grid gap-4">
                        {purchases.length === 0 ? (
                            <div className="bg-surface-container-low p-10 rounded-2xl border border-white/5 text-center text-on-surface-variant text-xs italic">No active licenses.</div>
                        ) : (
                            purchases.map((p) => (
                                <div key={p.id} className="bg-surface-container-high/40 p-6 rounded-2xl border border-white/10 flex justify-between items-center group">
                                    <div>
                                        <h3 className="text-white font-bold">{p.planName}</h3>
                                        <div className={`text-[10px] mt-1 font-bold uppercase tracking-widest ${p.status === 'approved' ? 'text-green-400' : 'text-yellow-400 animate-pulse'}`}>
                                            {p.status}
                                        </div>
                                    </div>
                                    {p.status === 'approved' ? (
                                        <button onClick={() => handleDownload(p)} className="bg-white text-black px-5 py-2 rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all">
                                            Download
                                        </button>
                                    ) : (
                                        <div className="text-[9px] text-on-surface-variant italic">Pending...</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Marketplace */}
                <div className="lg:col-span-7 space-y-8">
                    <h2 className="text-xl font-headline font-bold text-white flex items-center gap-3">Marketplace</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {plans.map((plan) => {
                            const alreadyOwned = hasPlan(plan.id)
                            return (
                                <div key={plan.id} className="bg-surface-container-high/30 p-8 rounded-3xl border border-white/5 transition-all flex flex-col justify-between group h-full relative overflow-hidden h-fit">
                                    <div>
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="material-symbols-outlined text-2xl text-primary">{plan.icon || 'bolt'}</span>
                                            <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                                        </div>
                                        <p className="text-on-surface-variant text-xs mb-6 opacity-80">{plan.description}</p>
                                    </div>
                                    <div className="pt-6 border-t border-white/5 space-y-4">
                                        <div className="text-2xl font-bold text-white">${plan.price} <span className="text-[10px] text-on-surface-variant font-medium">/ {plan.duration}</span></div>
                                        {alreadyOwned ? (
                                            <button disabled className="w-full bg-green-500/20 text-green-400 border border-green-500/30 py-3 rounded-xl font-bold text-xs cursor-default">
                                                You already buy the plan
                                            </button>
                                        ) : (
                                            <button onClick={() => setShowStripe(plan)} className="w-full bg-primary text-white py-3 rounded-xl font-bold text-xs hover:opacity-80 transition-all">
                                                {plan.buttonText || 'Buy Now'}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* MINIMAL STRIPE MODAL */}
            {showStripe && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
                        <div className="bg-[#635bff] p-10 text-white relative">
                            <button onClick={() => setShowStripe(null)} className="absolute top-6 right-6 opacity-60 hover:opacity-100"><span className="material-symbols-outlined">close</span></button>
                            <h2 className="text-3xl font-bold">${showStripe.price}.00</h2>
                            <p className="opacity-80 text-sm mt-1">{showStripe.name}</p>
                        </div>
                        <div className="p-10">
                            <form onSubmit={handleStripeCheckout} className="space-y-6">
                                <div className="space-y-4">
                                    <input type="text" placeholder="Card number" required className="w-full border-b-2 border-slate-100 py-3 outline-none text-slate-800" />
                                    <div className="flex gap-4">
                                        <input type="text" placeholder="MM / YY" required className="w-1/2 border-b-2 border-slate-100 py-3 outline-none text-slate-800" />
                                        <input type="text" placeholder="CVC" required className="w-1/2 border-b-2 border-slate-100 py-3 outline-none text-slate-800" />
                                    </div>
                                    <input type="text" placeholder="Cardholder Name" required className="w-full border-b-2 border-slate-100 py-3 outline-none text-slate-800" />
                                </div>
                                <button disabled={isCheckingOut} className="w-full bg-[#0a2540] text-white py-4 rounded-xl font-bold shadow-lg hover:opacity-90 transition-all">
                                    {isCheckingOut ? "Processing..." : `Pay $${showStripe.price}`}
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
