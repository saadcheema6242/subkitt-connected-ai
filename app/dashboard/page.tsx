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
            alert(`Payment Initiated! Once verified by our financial terminal, your access for ${showStripe.name} will be active.`)
        }, 2500)
    }

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono">Synchronizing Neural Link...</div>

    return (
        <main className="min-h-screen flex flex-col pt-44 px-8 max-w-7xl mx-auto w-full bg-background">
            <Header />

            <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-8 border-l-4 border-primary pl-10 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
                <div>
                    <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-white mb-3 tracking-tighter uppercase leading-[0.75] group-hover:tracking-normal transition-all duration-700">Digital <br /> Workspace.</h1>
                    <p className="text-on-surface-variant font-body text-xl italic opacity-60">Identity: <span className="text-primary font-bold not-italic">{user?.email}</span></p>
                </div>
                <div className="flex gap-4">
                    {isAdmin && (
                        <button onClick={() => router.push("/dashboard/admin")} className="bg-primary-container text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all">
                            <span className="material-symbols-outlined">shield_person</span> Security Console
                        </button>
                    )}
                    <button onClick={() => auth.signOut()} className="bg-surface-container-high text-white border border-white/5 px-10 py-4 rounded-2xl font-bold hover:bg-white hover:text-black transition-all">Sign Off</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
                {/* Active Infrastructure */}
                <div className="lg:col-span-5 space-y-12">
                    <h2 className="text-3xl font-headline font-bold text-white flex items-center gap-4 border-b border-white/5 pb-6">
                        <span className="material-symbols-outlined text-primary text-4xl">verified_user</span> System Licenses
                    </h2>
                    <div className="grid gap-6">
                        {purchases.length === 0 ? (
                            <div className="bg-surface-container-high/20 p-16 rounded-[3rem] border border-white/5 text-center text-on-surface-variant italic opacity-40">Zero systems deployed in your sector.</div>
                        ) : (
                            purchases.map((p) => (
                                <div key={p.id} className="bg-surface-container-high/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/10 relative overflow-hidden shadow-xl group">
                                    <div className={`absolute top-0 right-0 w-2 h-full ${p.status === 'approved' ? 'bg-green-400' : 'bg-yellow-400/50'}`}></div>
                                    <div className="flex justify-between items-center mb-8">
                                        <div>
                                            <h3 className="text-white font-extrabold text-2xl tracking-tight">{p.planName}</h3>
                                            <p className="text-on-surface-variant text-[10px] uppercase font-bold tracking-widest mt-1 italic">License ID: {p.id.slice(0, 8)}</p>
                                        </div>
                                        <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border ${p.status === 'approved' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 animate-pulse'}`}>
                                            {p.status}
                                        </span>
                                    </div>
                                    {p.status === 'approved' ? (
                                        <a href={p.fileUrl} target="_blank" className="w-full bg-white text-black py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary-container hover:text-white transition-all shadow-lg active:scale-95">
                                            <span className="material-symbols-outlined">rocket_launch</span> Access Core
                                        </a>
                                    ) : (
                                        <div className="text-[10px] text-yellow-400/60 font-mono bg-yellow-400/5 p-5 rounded-2xl text-center border border-yellow-400/10 tracking-[0.2em] italic">AWAITING FINANCIAL TERMINAL APPROVAL</div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* System Marketplace */}
                <div className="lg:col-span-7 space-y-12">
                    <h2 className="text-3xl font-headline font-bold text-white flex items-center gap-4 border-b border-white/5 pb-6">
                        <span className="material-symbols-outlined text-primary text-4xl">inventory</span> Infrastructure Market
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {plans.map((plan) => (
                            <div key={plan.id} className="bg-surface-container-high/30 p-10 rounded-[3.5rem] border border-white/5 hover:border-primary/40 transition-all flex flex-col justify-between group h-full relative overflow-hidden hover:bg-surface-container-high/50">
                                {plan.isPopular && <div className="absolute top-8 right-8 text-[10px] font-bold text-primary-variant uppercase tracking-widest bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">Optimal Performance</div>}
                                <div>
                                    <div className="flex items-center gap-5 mb-8">
                                        <span className="material-symbols-outlined text-5xl text-primary group-hover:scale-110 transition-transform">{plan.icon || 'bolt'}</span>
                                        <div>
                                            <h3 className="text-2xl font-headline font-extrabold text-white tracking-tight leading-none">{plan.name}</h3>
                                            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mt-1 opacity-40">System Node</p>
                                        </div>
                                    </div>
                                    <p className="text-on-surface-variant text-sm mb-10 leading-relaxed italic border-l-2 border-white/5 pl-6">{plan.description}</p>
                                    <ul className="space-y-4 mb-12">
                                        {plan.features?.slice(0, 4).map((f: string, i: number) => (
                                            <li key={i} className="flex items-center gap-4 text-xs text-on-surface-variant font-medium">
                                                <span className="material-symbols-outlined text-green-400 text-lg">check_circle</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="pt-10 border-t border-white/5 flex flex-col gap-6">
                                    <div className="flex items-end gap-1">
                                        <span className="text-5xl font-extrabold text-white tracking-tighter">${plan.price}</span>
                                        <span className="text-on-surface-variant text-sm mb-2 italic opacity-40">/ {plan.duration}</span>
                                    </div>
                                    <button onClick={() => setShowStripe(plan)} className="w-full bg-primary-container text-white py-5 rounded-2xl font-bold text-lg hover:shadow-[0_15px_40px_rgba(37,99,235,0.4)] transition-all animate-pulse">
                                        {plan.buttonText || 'Deploy Core'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CINEMATIC STRIPE MODAL */}
            {showStripe && (
                <div className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-500">
                    <div className="bg-[#f0f4f8] w-full max-w-2xl rounded-[4rem] overflow-hidden shadow-[0_50px_150px_rgba(0,0,0,0.8)] relative animate-in scale-in duration-700">
                        {/* High Fidelity Stripe Header */}
                        <div className="bg-[#635bff] p-16 text-white relative">
                            <button onClick={() => setShowStripe(null)} className="absolute top-10 right-10 text-white/40 hover:text-white transition-all transform hover:rotate-90">
                                <span className="material-symbols-outlined text-4xl">close</span>
                            </button>
                            <div className="flex items-center gap-4 mb-8 opacity-60">
                                <span className="material-symbols-outlined text-3xl">terminal</span>
                                <span className="text-xs font-bold tracking-[0.4em] uppercase">SubKitt Secure Payload</span>
                            </div>
                            <h2 className="text-6xl font-headline font-extrabold tracking-tighter">${showStripe.price}.00</h2>
                            <p className="opacity-80 text-xl font-medium mt-2">{showStripe.name} Activation Fee</p>
                        </div>

                        {/* High Fidelity Stripe Body */}
                        <div className="p-16">
                            <form onSubmit={handleStripeCheckout} className="space-y-10">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b7c93] ml-1">Encrypted Card Stream</label>
                                        <div className="bg-white border-2 border-slate-200 rounded-[2rem] p-8 shadow-inner flex flex-col gap-6">
                                            <input type="text" placeholder="💳 Card number" required className="w-full text-2xl outline-none font-medium placeholder:opacity-30" />
                                            <div className="flex gap-8 border-t-2 border-slate-50 mt-2 pt-6">
                                                <input type="text" placeholder="📅 MM / YY" required className="w-1/2 text-2xl outline-none font-medium placeholder:opacity-30" />
                                                <input type="text" placeholder="🔒 CVC" required className="w-1/2 text-2xl outline-none font-medium placeholder:opacity-30" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6b7c93] ml-1">Identity Label</label>
                                        <input type="text" placeholder="Full name on instrument" required className="w-full bg-white border-2 border-slate-200 rounded-[2rem] p-8 text-2xl outline-none shadow-inner font-medium placeholder:opacity-30" />
                                    </div>
                                </div>
                                <button disabled={isCheckingOut} className="w-full bg-[#0a2540] text-white py-8 rounded-[2rem] font-bold text-2xl hover:bg-black hover:scale-[1.02] transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-4">
                                    {isCheckingOut ? (
                                        <>
                                            <span className="animate-spin material-symbols-outlined text-3xl">sync</span>
                                            AUTHENTICATING...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">shield</span>
                                            PAY ${showStripe.price}.00
                                        </>
                                    )}
                                </button>
                                <div className="flex items-center justify-center gap-2 text-[#6b7c93] text-xs font-bold uppercase tracking-widest opacity-60">
                                    <span className="material-symbols-outlined text-sm">lock</span> 🛡️ End-to-End Encryption Active
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </main>
    )
}
