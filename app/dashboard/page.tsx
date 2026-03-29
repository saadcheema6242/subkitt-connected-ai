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

    const handlePurchase = async (plan: any) => {
        if (!user) return

        // Simulate purchase entry
        const purchaseRef = await addDoc(collection(db, "purchases"), {
            userId: user.uid,
            userEmail: user.email,
            planId: plan.id,
            planName: plan.name,
            status: "pending",
            timestamp: serverTimestamp()
        })

        // Notify admin via API
        try {
            await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: user.email,
                    planName: plan.name,
                    price: plan.price,
                    type: 'admin'
                })
            });
        } catch (e) {
            console.error("Admin notification failed", e);
        }

        // Add Firestore notification
        await addDoc(collection(db, "notifications"), {
            userId: user.uid,
            userEmail: user.email,
            message: `New purchase request for ${plan.name}`,
            timestamp: serverTimestamp(),
            read: false
        })

        alert(`Purchase initiated for ${plan.name}. Please wait for admin approval.`)
    }

    if (loading) return <div>Loading...</div>

    return (
        <main className="min-h-screen flex flex-col pt-24 px-8 max-w-7xl mx-auto w-full">
            <Header />

            <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-headline font-bold text-white mb-2">Welcome, {user?.email?.split("@")[0]}</h1>
                    <p className="text-on-surface-variant font-body">Manage your subscriptions and downloads.</p>
                </div>
                <div className="flex gap-4">
                    {isAdmin && (
                        <button
                            onClick={() => router.push("/dashboard/admin")}
                            className="bg-primary/20 text-primary border border-primary/30 px-6 py-2 rounded-xl font-bold hover:bg-primary/30 transition-all"
                        >
                            Admin Dashboard
                        </button>
                    )}
                    <button
                        onClick={() => auth.signOut()}
                        className="border border-outline-variant text-white px-6 py-2 rounded-xl font-bold hover:bg-white/5 transition-all"
                    >
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">shopping_cart</span> Available Plans
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {plans.map((plan: any) => (
                            <div key={plan.id} className="bg-surface-container-high/40 p-6 rounded-2xl border border-outline-variant/10 hover:border-primary-container/40 transition-all">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                                    <span className="text-primary font-bold text-2xl">${plan.price}</span>
                                </div>
                                <p className="text-on-surface-variant text-sm mb-6">{plan.description}</p>
                                <button
                                    onClick={() => handlePurchase(plan)}
                                    className="w-full bg-primary-container text-white py-3 rounded-xl font-bold hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] transition-all"
                                >
                                    Buy Now
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-8">
                    <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">download</span> My Downloads
                    </h2>

                    <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/10 min-h-[400px]">
                        {purchases.length > 0 ? (
                            <ul className="space-y-4">
                                {purchases.map((purchase: any) => (
                                    <li key={purchase.id} className="bg-surface-container-high/30 p-4 rounded-xl border border-outline-variant/10">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-bold text-white">{purchase.planName}</span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${purchase.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                                {purchase.status.toUpperCase()}
                                            </span>
                                        </div>
                                        {purchase.status === 'approved' && (
                                            <button
                                                onClick={() => window.open(purchase.fileUrl, "_blank")}
                                                className="w-full bg-green-500/20 text-green-400 py-2 rounded-lg font-bold text-sm hover:bg-green-500/30 transition-all mt-2"
                                            >
                                                Download EXE
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center py-10">
                                <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-4">folder_open</span>
                                <p className="text-on-surface-variant text-sm">No active plans. Buy a plan to see downloads here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
