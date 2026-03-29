"use client"

import { useEffect, useState } from "react"
import { auth, db, storage } from "../../../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation"
import { collection, onSnapshot, updateDoc, doc, addDoc, serverTimestamp, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const ICONS = [
    "bolt", "shield", "psychology", "grid_view", "rocket_launch",
    "terminal", "settings_suggest", "auto_mode", "cloud_sync", "memory"
]

export default function AdminDashboardPage() {
    const [user, loading] = useAuthState(auth)
    const [purchases, setPurchases] = useState<any[]>([])
    const [plans, setPlans] = useState<any[]>([])
    const [editingPlan, setEditingPlan] = useState<any>(null)
    const router = useRouter()

    const [newPlan, setNewPlan] = useState({
        name: "",
        price: "",
        description: "",
        features: "", // Comma separated
        buttonText: "Get Started",
        icon: "bolt",
        duration: "monthly",
        isPopular: false
    })
    const [file, setFile] = useState<File | null>(null)
    const [uploadLoading, setUploadLoading] = useState(false)

    const ADMIN_EMAIL = "muhammadsaadc49@gmail.com"

    useEffect(() => {
        if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
            router.push("/dashboard")
            return
        }

        if (user) {
            const unsubPurchases = onSnapshot(collection(db, "purchases"), (snapshot) => {
                setPurchases(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })
            const unsubPlans = onSnapshot(collection(db, "plans"), (snapshot) => {
                setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })
            return () => { unsubPurchases(); unsubPlans(); }
        }
    }, [user, loading, router])

    const handleCreateOrUpdatePlan = async (e: React.FormEvent) => {
        e.preventDefault()
        setUploadLoading(true)

        try {
            let fileUrl = editingPlan?.fileUrl || ""

            if (file) {
                const fileRef = ref(storage, `plans/${Date.now()}_${file.name}`)
                await uploadBytes(fileRef, file)
                fileUrl = await getDownloadURL(fileRef)
            }

            const planData = {
                ...newPlan,
                features: newPlan.features.split(",").map(f => f.trim()).filter(f => f !== ""),
                price: Number(newPlan.price),
                fileUrl,
                updatedAt: serverTimestamp()
            }

            if (editingPlan) {
                await updateDoc(doc(db, "plans", editingPlan.id), planData)
                alert("Plan updated successfully!")
            } else {
                await addDoc(collection(db, "plans"), {
                    ...planData,
                    timestamp: serverTimestamp()
                })
                alert("New plan published!")
            }

            setNewPlan({
                name: "", price: "", description: "",
                features: "", buttonText: "Get Started",
                icon: "bolt", duration: "monthly", isPopular: false
            })
            setFile(null)
            setEditingPlan(null)
        } catch (err: any) { alert(err.message) }
        finally { setUploadLoading(false) }
    }

    const editPlan = (plan: any) => {
        setEditingPlan(plan)
        setNewPlan({
            name: plan.name,
            price: String(plan.price),
            description: plan.description,
            features: plan.features?.join(", ") || "",
            buttonText: plan.buttonText || "Get Started",
            icon: plan.icon || "bolt",
            duration: plan.duration || "monthly",
            isPopular: !!plan.isPopular
        })
    }

    const deletePlan = async (id: string) => {
        if (!confirm("Are you sure you want to delete this plan?")) return
        try {
            await deleteDoc(doc(db, "plans", id))
            alert("Plan deleted.")
        } catch (err: any) { alert(err.message) }
    }

    const approvePayment = async (purchase: any) => {
        try {
            const plan = plans.find(p => p.id === purchase.planId)
            await updateDoc(doc(db, "purchases", purchase.id), {
                status: "approved",
                fileUrl: plan?.fileUrl || "",
                approvedAt: serverTimestamp()
            })
            alert("Payment approved.")
        } catch (err: any) { alert(err.message) }
    }

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono">Initializing Admin Hub...</div>

    return (
        <main className="min-h-screen flex flex-col pt-44 px-8 max-w-7xl mx-auto w-full bg-background">
            <Header />

            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-l-4 border-primary pl-6">
                <div>
                    <h1 className="text-6xl font-headline font-extrabold text-white mb-2 tracking-tighter">Plan Forge</h1>
                    <p className="text-on-surface-variant font-body text-lg italic opacity-80">Architecting core licensing tiers for the collective.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-surface-container-high/40 p-5 rounded-3xl border border-white/5 text-center min-w-[140px]">
                        <div className="text-primary text-3xl font-bold">{purchases.filter(p => p.status === 'pending').length}</div>
                        <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1">Pending Approvals</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
                {/* Active Plans List */}
                <div className="lg:col-span-6 space-y-12">
                    <section className="space-y-6">
                        <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">inventory_2</span> Live Infrastructure
                        </h2>
                        <div className="grid gap-6">
                            {plans.map((plan) => (
                                <div key={plan.id} className="bg-surface-container-high/40 p-8 rounded-[2rem] border border-white/10 group relative overflow-hidden">
                                    {plan.isPopular && <div className="absolute top-4 right-4 bg-primary text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest">Popular</div>}
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-center gap-4">
                                            <span className="material-symbols-outlined text-4xl text-primary">{plan.icon}</span>
                                            <div>
                                                <h3 className="text-white font-bold text-xl">{plan.name}</h3>
                                                <p className="text-primary font-bold text-sm">${plan.price} <span className="text-on-surface-variant/60 font-medium italic">/ {plan.duration}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => editPlan(plan)} className="p-2 bg-surface-container-low rounded-xl text-white hover:text-primary transition-all">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                            <button onClick={() => deletePlan(plan.id)} className="p-2 bg-red-500/10 rounded-xl text-red-400 hover:bg-red-500/30 transition-all">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        {plan.features?.map((f: string, i: number) => (
                                            <div key={i} className="flex items-center gap-2 text-xs text-on-surface-variant">
                                                <span className="material-symbols-outlined text-green-400 text-sm">check_circle</span> {f}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Create/Edit Form */}
                <div className="lg:col-span-6">
                    <section className="sticky top-32 space-y-6">
                        <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">{editingPlan ? "edit_note" : "add_box"}</span>
                            {editingPlan ? "Modify Tiers" : "Blueprint Entry"}
                        </h2>
                        <form onSubmit={handleCreateOrUpdatePlan} className="bg-surface-container-high/60 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 space-y-6 shadow-2xl">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">Name</label>
                                    <input type="text" placeholder="Pro Tier" value={newPlan.name} onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })} required className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-primary outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">Price ($)</label>
                                    <input type="number" placeholder="29" value={newPlan.price} onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })} required className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-primary outline-none transition-colors" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">Duration</label>
                                    <select value={newPlan.duration} onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })} className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-primary outline-none transition-colors">
                                        <option value="monthly" className="bg-background">Monthly</option>
                                        <option value="annually" className="bg-background">Annually</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">Popular?</label>
                                    <button type="button" onClick={() => setNewPlan({ ...newPlan, isPopular: !newPlan.isPopular })} className={`w-full py-4 rounded-2xl border transition-all font-bold text-xs ${newPlan.isPopular ? 'bg-primary border-primary text-white' : 'border-white/10 text-on-surface-variant'}`}>
                                        {newPlan.isPopular ? "ON" : "OFF"}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">Icon Select</label>
                                <div className="flex flex-wrap gap-2 p-4 bg-surface-container-lowest rounded-2xl border border-white/5">
                                    {ICONS.map(icon => (
                                        <button key={icon} type="button" onClick={() => setNewPlan({ ...newPlan, icon })} className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${newPlan.icon === icon ? 'bg-primary text-white' : 'text-on-surface-variant hover:text-white'}`}>
                                            <span className="material-symbols-outlined text-lg">{icon}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">Features (Comma separated)</label>
                                <textarea placeholder="Unlimited Sync, Priority Support, AI Engine" value={newPlan.features} onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })} className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl px-5 py-4 text-white h-24 focus:border-primary outline-none transition-colors resize-none" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">Action Button Text</label>
                                <input type="text" placeholder="Acquire Now" value={newPlan.buttonText} onChange={(e) => setNewPlan({ ...newPlan, buttonText: e.target.value })} className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl px-5 py-4 text-white focus:border-primary outline-none transition-colors" />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">Binary Core (Optional)</label>
                                <input type="file" accept=".exe" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full text-xs text-on-surface-variant bg-surface-container-lowest p-4 rounded-2xl border border-white/5 border-dashed" />
                            </div>

                            <button disabled={uploadLoading} className="w-full bg-primary-container text-white py-5 rounded-2xl font-bold text-lg shadow-[0_10px_40px_rgba(37,99,235,0.4)] hover:shadow-[0_15px_50px_rgba(37,99,235,0.6)] transition-all flex items-center justify-center gap-3">
                                {uploadLoading ? <><span className="animate-spin material-symbols-outlined">sync</span> Processing...</> : <>{editingPlan ? "Update System" : "Deploy Tiers"}</>}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    )
}
