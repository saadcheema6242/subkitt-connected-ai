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
        // Simulate Stripe API delay
        setTimeout(async () => {
            // Create purchase request in Firestore
            await addDoc(collection(db, "purchases"), {
                userId: user.uid,
                userEmail: user.email,
                planId: showStripe.id,
                planName: showStripe.name,
                status: "pending", // Admin must approve
                timestamp: serverTimestamp(),
                amount: showStripe.price,
                currency: "USD",
                paymentMethod: "Stripe"
            })

            // Notify admin
            try {
                await fetch('/api/notify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userEmail: user.email,
                        planName: showStripe.name,
                        price: showStripe.price,
                        type: 'admin'
                    })
                });
            } catch (e) { }

            setIsCheckingOut(false)
            setShowStripe(null)
            alert(`Payment Successful! Your access for ${showStripe.name} is being provisioned. Please wait for the admin to verify the transaction.`)
        }, 2000)
    }

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono">Initializing System Core...</div>

    return (
        <main className="min-h-screen flex flex-col pt-44 px-8 max-w-7xl mx-auto w-full bg-background">
            <Header />

            <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-6">
                <div>
                    <h1 className="text-5xl font-headline font-extrabold text-white mb-3 tracking-tighter">Welcome, {user?.email?.split("@")[0]}</h1>
                    <p className="text-on-surface-variant font-body text-lg italic opacity-75">"Synchronizing your creative ambition with technical reality."</p>
                </div>
                <div className="flex gap-4">
                    {isAdmin && (
                        <button
                            onClick={() => router.push("/dashboard/admin")}
                            className="bg-primary-container text-white border border-primary/30 px-8 py-3 rounded-2xl font-bold hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined">shield_person</span> Admin Control
                        </button>
                    )}
                    <button
                        onClick={() => auth.signOut()}
                        className="bg-surface-container-high text-white px-8 py-3 rounded-2xl font-bold hover:bg-white/10 transition-all border border-white/5"
                    >
                        Sign Out
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
                {/* My Active Gear (Purchased) */}
                <div className="lg:col-span-4 space-y-8">
                    <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">download_done</span> Your Licenses
                    </h2>
                    <div className="space-y-4">
                        {purchases.length === 0 ? (
                            <div className="bg-surface-container-low p-10 rounded-3xl border border-outline-variant/10 text-center text-on-surface-variant italic">
                                No active licenses found. <br /> Browse available gear.
                            </div>
                        ) : (
                            purchases.map((p) => (
                                <div key={p.id} className="bg-surface-container-high/40 p-6 rounded-2xl border border-outline-variant/15 relative overflow-hidden group">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-white font-bold">{p.planName}</h3>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${p.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                            {p.status}
                                        </span>
                                    </div>
                                    {p.status === 'approved' ? (
                                        <a href={p.fileUrl} className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all">
                                            <span className="material-symbols-outlined">download</span> Download EXE
                                        </a>
                                    ) : (
                                        <div className="text-[11px] text-on-surface-variant font-mono bg-surface-container-lowest p-3 rounded-lg text-center opacity-60">ADMIN VERIFICATION PENDING</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Marketplace (All Plans) */}
                <div className="lg:col-span-8 space-y-8">
                    <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">shopping_bag</span> Gear Store
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {plans.map((plan) => (
                            <div key={plan.id} className="bg-surface-container-high/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-outline-variant/20 hover:border-primary/40 transition-all flex flex-col justify-between group h-full">
                                <div>
                                    <h3 className="text-2xl font-headline font-extrabold text-white mb-2">{plan.name}</h3>
                                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6">{plan.description}</p>
                                </div>
                                <div className="pt-6 border-t border-white/5 space-y-6">
                                    <div className="flex items-end gap-1">
                                        <span className="text-3xl font-bold text-white">${plan.price}</span>
                                        <span className="text-on-surface-variant text-xs mb-1">/ lifetime</span>
                                    </div>
                                    <button
                                        onClick={() => setShowStripe(plan)}
                                        className="w-full bg-primary-container text-white py-4 rounded-2xl font-bold hover:shadow-[0_0_25px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2"
                                    >
                                        Upgrade Now
                                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MOCK STRIPE MODAL */}
            {showStripe && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#f6f9fc] w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-300">
                        {/* Stripe Header */}
                        <div className="bg-[#6772e5] p-10 text-white relative">
                            <button onClick={() => setShowStripe(null)} className="absolute top-6 right-6 opacity-60 hover:opacity-100">
                                <span className="material-symbols-outlined">close</span>
                            </button>
                            <div className="flex items-center gap-3 mb-4 opacity-80">
                                <span className="material-symbols-outlined text-xl">blur_on</span>
                                <span className="text-sm font-bold tracking-[0.2em] uppercase">SubKitt AI Pay</span>
                            </div>
                            <h2 className="text-4xl font-headline font-bold">${showStripe.price}.00</h2>
                            <p className="opacity-80 mt-1">One-time license for {showStripe.name}</p>
                        </div>

                        {/* Stripe Body */}
                        <div className="p-10 text-[#424770] font-manrope">
                            <form onSubmit={handleStripeCheckout} className="space-y-6">
                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b7c93] mb-2 block">Card Information</label>
                                    <div className="bg-white border rounded-xl p-4 shadow-sm space-y-4">
                                        <input type="text" placeholder="Card number" required className="w-full text-lg outline-none placeholder:text-[#cfd7df]" />
                                        <div className="flex gap-4 border-t pt-4">
                                            <input type="text" placeholder="MM / YY" required className="w-1/2 text-lg outline-none placeholder:text-[#cfd7df]" />
                                            <input type="text" placeholder="CVC" required className="w-1/2 text-lg outline-none placeholder:text-[#cfd7df]" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#6b7c93] mb-2 block">Cardholder Name</label>
                                    <input type="text" placeholder="Full name on card" required className="w-full bg-white border rounded-xl p-4 text-lg outline-none placeholder:text-[#cfd7df] shadow-sm" />
                                </div>
                                <button
                                    disabled={isCheckingOut}
                                    className="w-full bg-[#32325d] text-white py-5 rounded-xl font-bold text-lg hover:bg-[#242447] transition-all shadow-lg flex items-center justify-center gap-3"
                                >
                                    {isCheckingOut ? (
                                        <>Proccessing...</>
                                    ) : (
                                        <>Pay Now</>
                                    )}
                                </button>
                                <p className="text-center text-[10px] text-[#6b7c93]">Your transaction is secured by Stripe. Encryption active.</p>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    )
}
