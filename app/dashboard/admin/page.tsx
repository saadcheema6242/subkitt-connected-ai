"use client"

import { useEffect, useState } from "react"
import { auth, db, storage } from "../../../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation"
import { collection, onSnapshot, updateDoc, doc, addDoc, serverTimestamp, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

const ICONS = ["bolt", "shield", "psychology", "grid_view", "rocket_launch", "terminal", "settings_suggest", "auto_mode", "cloud_sync", "memory"]

export default function AdminDashboardPage() {
    const [user, loading] = useAuthState(auth)
    const [purchases, setPurchases] = useState<any[]>([])
    const [plans, setPlans] = useState<any[]>([])
    const [usersList, setUsersList] = useState<any[]>([])
    const [activeTab, setActiveTab] = useState<"plans" | "customers" | "users" | "financials">("plans")
    const [editingPlan, setEditingPlan] = useState<any>(null)
    const router = useRouter()

    const [newPlan, setNewPlan] = useState({
        name: "", price: "", description: "",
        features: "", buttonText: "Get Started",
        icon: "bolt", duration: "monthly", isPopular: false
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
            const unsubUsers = onSnapshot(collection(db, "users"), (snapshot) => {
                setUsersList(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })
            return () => { unsubPurchases(); unsubPlans(); unsubUsers(); }
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
                alert("Updated.")
            } else {
                await addDoc(collection(db, "plans"), { ...planData, timestamp: serverTimestamp() })
                alert("Deployed.")
            }
            setNewPlan({ name: "", price: "", description: "", features: "", buttonText: "Get Started", icon: "bolt", duration: "monthly", isPopular: false })
            setFile(null); setEditingPlan(null);
        } catch (err: any) { alert(err.message) }
        finally { setUploadLoading(false) }
    }

    const editPlan = (plan: any) => {
        setEditingPlan(plan)
        setNewPlan({
            name: plan.name, price: String(plan.price), description: plan.description,
            features: plan.features?.join(", ") || "", buttonText: plan.buttonText || "Get Started",
            icon: plan.icon || "bolt", duration: plan.duration || "monthly", isPopular: !!plan.isPopular
        })
        setActiveTab("plans")
    }

    const updatePurchaseStatus = async (purchase: any, status: "approved" | "declined") => {
        try {
            const plan = plans.find(p => p.id === purchase.planId)
            await updateDoc(doc(db, "purchases", purchase.id), {
                status,
                fileUrl: status === "approved" ? (plan?.fileUrl || "") : "",
                approvedAt: serverTimestamp()
            })
            alert(`Purchase ${status}.`)
        } catch (err: any) { alert(err.message) }
    }

    const deletePlan = async (id: string) => {
        if (!confirm("Delete?")) return
        await deleteDoc(doc(db, "plans", id))
    }

    const totalRevenue = purchases.filter(p => p.status === 'approved').reduce((acc, p) => acc + (Number(p.amount) || 0), 0)

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono">Loading Admin Hub...</div>

    return (
        <main className="min-h-screen bg-background text-white pt-32 pb-20 px-6 max-w-6xl mx-auto flex flex-col">
            <Header />

            <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-white/5 pb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-headline font-bold text-white tracking-tight uppercase">Dashboard Control</h1>
                    <p className="text-on-surface-variant text-xs mt-1 opacity-60 italic">Core oversight system active.</p>
                </div>
            </div>

            {/* MINIMAL NAVBAR */}
            <nav className="flex gap-1 mb-8 bg-surface-container-low p-1 rounded-2xl border border-white/5 w-fit">
                <TabBtn active={activeTab === "plans"} onClick={() => setActiveTab("plans")} icon="inventory_2" label="Plans" />
                <TabBtn active={activeTab === "customers"} onClick={() => setActiveTab("customers")} icon="account_balance_wallet" label="Sales" />
                <TabBtn active={activeTab === "users"} onClick={() => setActiveTab("users")} icon="groups" label="Users" />
                <TabBtn active={activeTab === "financials"} onClick={() => setActiveTab("financials")} icon="analytics" label="Stats" />
            </nav>

            <div className="flex-grow">
                {activeTab === "plans" && (
                    <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
                        <section className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Deployed Tiers ({plans.length})</h2>
                            <div className="grid gap-3">
                                {plans.map(p => (
                                    <div key={p.id} className="bg-surface-container-low p-5 rounded-2xl border border-white/5 flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-3">
                                            <span className="material-symbols-outlined text-xl text-primary">{p.icon}</span>
                                            <div>
                                                <h3 className="font-bold">{p.name}</h3>
                                                <p className="text-on-surface-variant text-[10px]">${p.price} • {p.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={() => editPlan(p)} className="p-2 bg-white/5 rounded-lg text-white hover:text-primary transition-all"><span className="material-symbols-outlined text-sm">edit</span></button>
                                            <button onClick={() => deletePlan(p.id)} className="p-2 bg-red-500/10 rounded-lg text-red-500 hover:bg-red-500/20"><span className="material-symbols-outlined text-sm">delete</span></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="bg-surface-container-high/40 p-10 rounded-[2.5rem] border border-white/5 h-fit text-sm">
                            <h2 className="text-lg font-bold mb-6">{editingPlan ? "Edit Spec" : "Add Plan"}</h2>
                            <form onSubmit={handleCreateOrUpdatePlan} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-on-surface-variant ml-1">Name</label>
                                        <input type="text" value={newPlan.name} onChange={e => setNewPlan({ ...newPlan, name: e.target.value })} required className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-on-surface-variant ml-1">Price ($)</label>
                                        <input type="number" value={newPlan.price} onChange={e => setNewPlan({ ...newPlan, price: e.target.value })} required className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-on-surface-variant ml-1">Duration</label>
                                        <select value={newPlan.duration} onChange={e => setNewPlan({ ...newPlan, duration: e.target.value })} className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3">
                                            <option value="monthly" className="bg-background">Monthly</option>
                                            <option value="annually" className="bg-background">Annually</option>
                                        </select>
                                    </div>
                                    <div className="space-y-1 flex flex-col pt-5">
                                        <button type="button" onClick={() => setNewPlan({ ...newPlan, isPopular: !newPlan.isPopular })} className={`p-3 rounded-xl border text-[10px] font-bold transition-all ${newPlan.isPopular ? 'bg-primary border-primary' : 'border-white/10 text-on-surface-variant'}`}>
                                            {newPlan.isPopular ? "MOST POPULAR: YES" : "MOST POPULAR: NO"}
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-on-surface-variant ml-1">Icons</label>
                                    <div className="flex flex-wrap gap-2 p-3 bg-surface-container-lowest border border-white/5 rounded-xl">
                                        {ICONS.map(i => (
                                            <button key={i} type="button" onClick={() => setNewPlan({ ...newPlan, icon: i })} className={`p-1 rounded-md ${newPlan.icon === i ? 'bg-primary' : 'text-on-surface-variant'}`}>
                                                <span className="material-symbols-outlined text-sm">{i}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-on-surface-variant ml-1">Features</label>
                                    <textarea value={newPlan.features} onChange={e => setNewPlan({ ...newPlan, features: e.target.value })} className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3 h-20" placeholder="List, features, here" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-on-surface-variant ml-1">Button Text</label>
                                    <input type="text" value={newPlan.buttonText} onChange={e => setNewPlan({ ...newPlan, buttonText: e.target.value })} className="w-full bg-surface-container-lowest border border-white/5 rounded-xl px-4 py-3" />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-on-surface-variant ml-1">EXE File</label>
                                    <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-[10px] bg-white/5 p-4 rounded-xl border-dashed border border-white/10" />
                                </div>
                                <button disabled={uploadLoading} className="w-full bg-primary text-white py-4 rounded-xl font-bold mt-4 hover:opacity-80 transition-all disabled:opacity-40">
                                    {uploadLoading ? "Processing..." : (editingPlan ? "Update" : "Launch")}
                                </button>
                                {editingPlan && <button type="button" onClick={() => { setEditingPlan(null); setNewPlan({ name: "", price: "", description: "", features: "", buttonText: "Get Started", icon: "bolt", duration: "monthly", isPopular: false }) }} className="w-full text-xs text-on-surface-variant hover:text-white mt-2">Cancel</button>}
                            </form>
                        </section>
                    </div>
                )}

                {activeTab === "customers" && (
                    <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-300">
                        <section className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-yellow-500">Pending Requests ({purchases.filter(p => p.status === 'pending').length})</h2>
                            <div className="bg-surface-container-low rounded-2xl border border-white/10 overflow-hidden">
                                {purchases.filter(p => p.status === 'pending').map(p => (
                                    <div key={p.id} className="p-6 border-b border-white/5 flex justify-between items-center text-sm">
                                        <div>
                                            <p className="font-bold">{p.userEmail}</p>
                                            <p className="text-[10px] text-on-surface-variant/60">{p.planName} • ${p.amount}</p>
                                        </div>
                                        <div className="flex gap-1">
                                            <button onClick={() => updatePurchaseStatus(p, "approved")} className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-[10px] hover:opacity-80">Confirm</button>
                                            <button onClick={() => updatePurchaseStatus(p, "declined")} className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-[10px] hover:opacity-80">Decline</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-green-500">History Ledger</h2>
                            <div className="bg-surface-container-low rounded-2xl border border-white/10 overflow-hidden text-sm">
                                {purchases.filter(p => p.status !== 'pending').map(p => (
                                    <div key={p.id} className="p-6 border-b border-white/5 flex justify-between items-center opacity-60">
                                        <p>{p.userEmail} <br /><span className="text-[10px] font-bold">{p.planName}</span></p>
                                        <span className={`text-[9px] font-bold uppercase ${p.status === 'approved' ? 'text-green-400' : 'text-red-400'}`}>{p.status}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                )}

                {activeTab === "users" && (
                    <section className="animate-in fade-in duration-300">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">User Registry ({usersList.length})</h2>
                        <div className="bg-surface-container-low rounded-3xl border border-white/10 overflow-hidden text-sm">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-[10px] font-bold uppercase text-on-surface-variant">
                                    <tr>
                                        <th className="px-6 py-4">Account Email</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4">Registered Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersList.map((u) => (
                                        <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                            <td className="px-6 py-4 font-medium">{u.email}</td>
                                            <td className="px-6 py-4 text-[10px]"><span className="bg-green-500/10 text-green-400 px-2 py-1 rounded-full border border-green-500/20 font-bold uppercase">Authorized</span></td>
                                            <td className="px-6 py-4 text-xs opacity-60">{u.createdAt ? new Date(u.createdAt.seconds * 1000).toLocaleDateString() : "Old System"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                {activeTab === "financials" && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                        <div className="bg-surface-container-high/60 p-8 rounded-3xl border border-white/5 text-center">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-2">Total Profits</p>
                            <h3 className="text-4xl font-headline font-extrabold text-white tracking-tighter">${totalRevenue}</h3>
                        </div>
                        <div className="bg-surface-container-high/60 p-8 rounded-3xl border border-white/5 text-center">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-2">Sales Volume</p>
                            <h3 className="text-4xl font-headline font-extrabold text-white tracking-tighter">{purchases.filter(p => p.status === 'approved').length}</h3>
                        </div>
                        <div className="bg-surface-container-high/60 p-8 rounded-3xl border border-white/5 text-center">
                            <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-2">Registered Base</p>
                            <h3 className="text-4xl font-headline font-extrabold text-white tracking-tighter">{usersList.length}</h3>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    )
}

function TabBtn({ active, onClick, icon, label }: any) {
    return (
        <button onClick={onClick} className={`px-5 py-2 rounded-xl flex items-center gap-2 font-bold mb-0 text-[11px] transition-all ${active ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:bg-white/5 hover:text-white'}`}>
            <span className="material-symbols-outlined text-sm">{icon}</span>
            {label}
        </button>
    )
}
