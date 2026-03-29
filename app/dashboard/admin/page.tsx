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
                alert("Plan updated!")
            } else {
                await addDoc(collection(db, "plans"), { ...planData, timestamp: serverTimestamp() })
                alert("Plan deployed!")
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

    const deletePlan = async (id: string) => {
        if (!confirm("Delete plan?")) return
        await deleteDoc(doc(db, "plans", id))
    }

    const updatePurchaseStatus = async (purchase: any, status: "approved" | "declined") => {
        try {
            const plan = plans.find(p => p.id === purchase.planId)
            await updateDoc(doc(db, "purchases", purchase.id), {
                status,
                fileUrl: status === "approved" ? (plan?.fileUrl || "") : "",
                approvedAt: serverTimestamp()
            })
            alert(`Purchase ${status}!`)
        } catch (err: any) { alert(err.message) }
    }

    const totalRevenue = purchases.filter(p => p.status === 'approved').reduce((acc, p) => acc + (Number(p.amount) || 0), 0)

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono">Loading Terminal...</div>

    return (
        <main className="min-h-screen bg-background text-white pt-44 pb-20 px-8 max-w-7xl mx-auto flex flex-col">
            <Header />

            <div className="flex flex-col md:flex-row justify-between items-start mb-12 border-b border-white/5 pb-12 gap-8">
                <div>
                    <h1 className="text-6xl font-headline font-extrabold tracking-tighter uppercase leading-[0.8]">Command <span className="text-primary-variant animate-pulse">Core.</span></h1>
                    <p className="text-on-surface-variant text-lg mt-4 italic opacity-60">Strategic oversight for the SubKitt infrastructure.</p>
                </div>

                {/* Stats Widgets */}
                <div className="flex flex-wrap gap-4">
                    <StatBox label="Total Users" value={usersList.length} icon="group" color="primary" />
                    <StatBox label="Active Tiers" value={plans.length} icon="inventory_2" color="secondary" />
                    <StatBox label="Revenue" value={`$${totalRevenue}`} icon="payments" color="green-400" />
                </div>
            </div>

            {/* TAB NAVIGATION */}
            <nav className="flex flex-wrap gap-2 mb-12 bg-surface-container-high/40 p-2 rounded-3xl border border-white/5 backdrop-blur-xl w-fit">
                <TabButton active={activeTab === "plans"} onClick={() => setActiveTab("plans")} icon="rocket_launch" label="Plan Forge" />
                <TabButton active={activeTab === "customers"} onClick={() => setActiveTab("customers")} icon="account_balance_wallet" label="Customer Ledger" />
                <TabButton active={activeTab === "users"} onClick={() => setActiveTab("users")} icon="groups" label="User Registry" />
                <TabButton active={activeTab === "financials"} onClick={() => setActiveTab("financials")} icon="analytics" label="Financial Terminal" />
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* CONTENT AREA */}
                <div className="lg:col-span-12">
                    {activeTab === "plans" && (
                        <div className="grid lg:grid-cols-2 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="space-y-6">
                                <h2 className="text-2xl font-headline font-bold flex items-center gap-3">Deployed Systems</h2>
                                <div className="grid gap-4">
                                    {plans.map(p => (
                                        <div key={p.id} className="bg-surface-container-low p-6 rounded-3xl border border-white/5 hover:border-primary/40 transition-all group flex justify-between items-center">
                                            <div className="flex items-center gap-4">
                                                <span className="material-symbols-outlined text-4xl text-primary">{p.icon}</span>
                                                <div>
                                                    <h3 className="font-bold text-lg">{p.name}</h3>
                                                    <p className="text-on-surface-variant text-xs">${p.price} • {p.duration}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button onClick={() => editPlan(p)} className="p-3 bg-white/5 rounded-2xl hover:text-primary transition-all"><span className="material-symbols-outlined">edit</span></button>
                                                <button onClick={() => deletePlan(p.id)} className="p-3 bg-red-500/10 rounded-2xl text-red-400 hover:bg-red-500/20"><span className="material-symbols-outlined">delete</span></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-surface-container-high/60 p-10 rounded-[3rem] border border-white/10 shadow-2xl h-fit">
                                <h2 className="text-2xl font-headline font-bold mb-8">{editingPlan ? "Modify Spec" : "Blueprint Creation"}</h2>
                                <form onSubmit={handleCreateOrUpdatePlan} className="space-y-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Designation</label>
                                            <input type="text" value={newPlan.name} onChange={e => setNewPlan({ ...newPlan, name: e.target.value })} required className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl p-5" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Cost ($)</label>
                                            <input type="number" value={newPlan.price} onChange={e => setNewPlan({ ...newPlan, price: e.target.value })} required className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl p-5" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Icon Pack</label>
                                            <div className="flex flex-wrap gap-2 p-4 bg-surface-container-lowest border border-white/5 rounded-2xl">
                                                {ICONS.map(i => (
                                                    <button key={i} type="button" onClick={() => setNewPlan({ ...newPlan, icon: i })} className={`p-2 rounded-lg transition-all ${newPlan.icon === i ? 'bg-primary' : 'text-on-surface-variant hover:text-white'}`}>
                                                        <span className="material-symbols-outlined text-sm">{i}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Lifecycle</label>
                                                <select value={newPlan.duration} onChange={e => setNewPlan({ ...newPlan, duration: e.target.value })} className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl p-5">
                                                    <option value="monthly" className="bg-background">Monthly</option>
                                                    <option value="annually" className="bg-background">Annually</option>
                                                </select>
                                            </div>
                                            <button type="button" onClick={() => setNewPlan({ ...newPlan, isPopular: !newPlan.isPopular })} className={`w-full p-4 rounded-2xl border font-bold text-xs transition-all ${newPlan.isPopular ? 'bg-primary border-primary' : 'border-white/5 text-on-surface-variant'}`}>
                                                {newPlan.isPopular ? "MOST POPULAR ACTIVE" : "STANDARD TIER"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Feature Chips (Comma Separated)</label>
                                        <textarea value={newPlan.features} onChange={e => setNewPlan({ ...newPlan, features: e.target.value })} className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl p-5 h-24" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Action Button Text</label>
                                        <input type="text" value={newPlan.buttonText} onChange={e => setNewPlan({ ...newPlan, buttonText: e.target.value })} className="w-full bg-surface-container-lowest border border-white/5 rounded-2xl p-5" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-primary uppercase tracking-widest ml-1">Software Core (.EXE)</label>
                                        <input type="file" accept=".exe" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-xs bg-surface-container-lowest p-6 rounded-2xl border border-white/5 border-dashed" />
                                    </div>
                                    <button disabled={uploadLoading} className="w-full bg-primary-container p-6 rounded-2xl font-bold text-xl shadow-[0_0_40px_rgba(37,99,235,0.4)] disabled:opacity-40">
                                        {uploadLoading ? "Deploying..." : (editingPlan ? "Verify & Update" : "Initiate Launch")}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    {activeTab === "customers" && (
                        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <section className="space-y-6">
                                    <h2 className="text-2xl font-headline font-bold text-yellow-400 flex items-center gap-3">Pending Requests</h2>
                                    <div className="bg-surface-container-low rounded-[2rem] border border-white/5 overflow-hidden">
                                        {purchases.filter(p => p.status === 'pending').length === 0 ? (
                                            <div className="p-20 text-center text-on-surface-variant italic">No pending transactions. Monitoring active.</div>
                                        ) : (
                                            purchases.filter(p => p.status === 'pending').map(p => (
                                                <div key={p.id} className="p-8 border-b border-white/5 hover:bg-white/[0.02] flex justify-between items-center group">
                                                    <div>
                                                        <h4 className="text-white font-bold text-lg">{p.userEmail}</h4>
                                                        <p className="text-on-surface-variant text-sm mt-1">{p.planName} • <span className="text-primary font-bold font-mono">${p.amount}</span></p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => updatePurchaseStatus(p, "approved")} className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all">Confirm</button>
                                                        <button onClick={() => updatePurchaseStatus(p, "declined")} className="bg-surface-container-highest text-red-400 px-6 py-3 rounded-xl font-bold hover:bg-red-500/20">Decline</button>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </section>
                                <section className="space-y-6">
                                    <h2 className="text-2xl font-headline font-bold text-green-400 flex items-center gap-3">Active Ledger</h2>
                                    <div className="bg-surface-container-low rounded-[2rem] border border-white/5 overflow-hidden max-h-[600px] overflow-y-auto">
                                        {purchases.filter(p => p.status === 'approved').map(p => (
                                            <div key={p.id} className="p-8 border-b border-white/5 flex justify-between items-center opacity-70 hover:opacity-100 transition-opacity">
                                                <div>
                                                    <h4 className="text-white font-bold">{p.userEmail}</h4>
                                                    <p className="text-on-surface-variant text-xs">{p.planName} • Verified</p>
                                                </div>
                                                <span className="text-green-400 font-bold font-mono">+${p.amount}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}

                    {activeTab === "users" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-headline font-bold flex items-center gap-3">Registered Fleet</h2>
                            <div className="bg-surface-container-low rounded-[3rem] border border-white/5 overflow-hidden shadow-2xl">
                                <table className="w-full text-left">
                                    <thead className="bg-surface-container-highest border-b border-white/5">
                                        <tr>
                                            <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-primary">Identity (Email)</th>
                                            <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-primary">Status</th>
                                            <th className="p-8 text-[10px] font-bold uppercase tracking-widest text-primary">Onboarding Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usersList.map((u, i) => (
                                            <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                                <td className="p-8 font-bold text-lg">{u.email}</td>
                                                <td className="p-8">
                                                    <span className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-[10px] font-bold uppercase">Authorized</span>
                                                </td>
                                                <td className="p-8 text-on-surface-variant text-sm italic">{u.createdAt ? new Date(u.createdAt.seconds * 1000).toLocaleDateString() : "Historical"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "financials" && (
                        <div className="grid lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="lg:col-span-8 space-y-12">
                                <h2 className="text-4xl font-headline font-extrabold tracking-tighter">Financial Pulse</h2>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="bg-surface-container-high/60 p-10 rounded-[3rem] border border-white/10 flex flex-col justify-between">
                                        <span className="material-symbols-outlined text-green-400 text-6xl mb-6">point_of_sale</span>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">Gross Profit</p>
                                            <h3 className="text-6xl font-headline font-extrabold mt-2 tracking-tighter">${totalRevenue}</h3>
                                        </div>
                                    </div>
                                    <div className="bg-surface-container-high/60 p-10 rounded-[3rem] border border-white/10 flex flex-col justify-between">
                                        <span className="material-symbols-outlined text-primary text-6xl mb-6">shopping_cart_checkout</span>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant">Total Transactions</p>
                                            <h3 className="text-6xl font-headline font-extrabold mt-2 tracking-tighter">{purchases.filter(p => p.status === 'approved').length}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-surface-container-low p-12 rounded-[3.5rem] border border-white/5 overflow-hidden">
                                    <h3 className="text-xl font-bold mb-8">System Allocation (Plan Popularity)</h3>
                                    <div className="space-y-6">
                                        {plans.map(p => {
                                            const count = purchases.filter(purch => purch.planId === p.id && purch.status === 'approved').length
                                            const percentage = (count / (purchases.filter(purch => purch.status === 'approved').length || 1)) * 100
                                            return (
                                                <div key={p.id} className="space-y-2">
                                                    <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                                                        <span>{p.name}</span>
                                                        <span>{count} Units Sold</span>
                                                    </div>
                                                    <div className="w-full h-3 bg-surface-container-lowest rounded-full overflow-hidden">
                                                        <div className="h-full bg-primary" style={{ width: `${percentage}%` }}></div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="lg:col-span-4 bg-primary/5 rounded-[3rem] border border-primary/20 p-10 flex flex-col justify-center items-center text-center space-y-6">
                                <span className="material-symbols-outlined text-8xl text-primary animate-pulse">monitoring</span>
                                <h3 className="text-2xl font-headline font-bold">Strategy Vision</h3>
                                <p className="text-on-surface-variant text-sm italic">"Financial optimization is the bedrock of industrial automation."</p>
                                <div className="w-full pt-10 border-t border-white/5">
                                    <div className="text-primary font-bold text-lg">Next Quarter Target</div>
                                    <div className="text-4xl font-headline font-extrabold mt-2">$250,000</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </main>
    )
}

function StatBox({ label, value, icon, color }: any) {
    return (
        <div className="bg-surface-container-high/20 p-6 rounded-3xl border border-white/5 flex items-center gap-6 min-w-[220px] group hover:bg-white/[0.03] transition-all">
            <div className={`w-14 h-14 rounded-2xl bg-${color}/10 border border-${color}/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <span className={`material-symbols-outlined text-3xl text-${color}`}>{icon}</span>
            </div>
            <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant">{label}</div>
                <div className="text-3xl font-headline font-extrabold text-white tracking-tighter">{value}</div>
            </div>
        </div>
    )
}

function TabButton({ active, onClick, icon, label }: any) {
    return (
        <button onClick={onClick} className={`px-8 py-4 rounded-2xl flex items-center gap-3 font-bold transition-all ${active ? 'bg-primary text-white shadow-xl scale-105' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}`}>
            <span className="material-symbols-outlined text-lg">{icon}</span>
            {label}
        </button>
    )
}
