"use client"

import { useEffect, useState } from "react"
import { auth, db, storage } from "../../../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation"
import { collection, onSnapshot, updateDoc, doc, addDoc, serverTimestamp, getDocs, deleteDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function AdminDashboardPage() {
    const [user, loading] = useAuthState(auth)
    const [purchases, setPurchases] = useState<any[]>([])
    const [plans, setPlans] = useState<any[]>([])
    const [editingPlan, setEditingPlan] = useState<any>(null)
    const router = useRouter()

    const [newPlan, setNewPlan] = useState({ name: "", price: "", description: "" })
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

            if (editingPlan) {
                await updateDoc(doc(db, "plans", editingPlan.id), {
                    ...newPlan,
                    fileUrl,
                    updatedAt: serverTimestamp()
                })
                alert("Plan updated successfully!")
            } else {
                await addDoc(collection(db, "plans"), {
                    ...newPlan,
                    fileUrl,
                    timestamp: serverTimestamp()
                })
                alert("New plan published!")
            }

            setNewPlan({ name: "", price: "", description: "" })
            setFile(null)
            setEditingPlan(null)
        } catch (err: any) { alert(err.message) }
        finally { setUploadLoading(false) }
    }

    const editPlan = (plan: any) => {
        setEditingPlan(plan)
        setNewPlan({ name: plan.name, price: plan.price, description: plan.description })
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

            // Notify user via Email API
            await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userEmail: purchase.userEmail,
                    planName: purchase.planName,
                    price: plan?.price || 0,
                    type: 'user'
                })
            });

            alert("Payment approved. User notified.")
        } catch (err: any) { alert(err.message) }
    }

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono">Verifying Admin Credentials...</div>

    return (
        <main className="min-h-screen flex flex-col pt-44 px-8 max-w-7xl mx-auto w-full bg-background">
            <Header />

            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <h1 className="text-5xl font-headline font-extrabold text-white mb-2 tracking-tighter">Command Center</h1>
                    <p className="text-on-surface-variant font-body text-lg italic opacity-80 decoration-primary cursor-default hover:not-italic transition-all">"With great power comes great automation."</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-surface-container-high/40 p-4 rounded-2xl border border-outline-variant/10 text-center min-w-[120px]">
                        <div className="text-primary text-2xl font-bold">{purchases.filter(p => p.status === 'pending').length}</div>
                        <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Pending</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
                {/* Left Side: Pending & Active Plans */}
                <div className="lg:col-span-7 space-y-12">
                    <section className="space-y-6">
                        <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">payments</span> Revenue Queue
                        </h2>
                        <div className="bg-surface-container-low rounded-3xl border border-outline-variant/10 overflow-hidden">
                            {purchases.filter(p => p.status === 'pending').length === 0 ? (
                                <div className="p-12 text-center text-on-surface-variant italic">No pending requests. Systems optimal.</div>
                            ) : (
                                purchases.filter(p => p.status === 'pending').map((p) => (
                                    <div key={p.id} className="p-6 border-b border-white/5 flex justify-between items-center hover:bg-white/[0.02] transition-colors">
                                        <div>
                                            <p className="text-white font-bold">{p.userEmail}</p>
                                            <p className="text-on-surface-variant text-sm">{p.planName} • {new Date(p.timestamp?.seconds * 1000).toLocaleDateString()}</p>
                                        </div>
                                        <button onClick={() => approvePayment(p)} className="bg-primary-container text-white px-6 py-2 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(37,99,235,0.2)] hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] transition-all">Approve</button>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">inventory_2</span> Active Fleet (Plans)
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {plans.map((plan) => (
                                <div key={plan.id} className="bg-surface-container-high/40 p-6 rounded-2xl border border-outline-variant/10 group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                                            <p className="text-primary font-bold text-sm">${plan.price}</p>
                                        </div>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => editPlan(plan)} className="p-2 bg-surface-container-highest rounded-lg text-white hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                            <button onClick={() => deletePlan(plan.id)} className="p-2 bg-red-500/10 rounded-lg text-red-400 hover:bg-red-500/20 transition-all">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-on-surface-variant text-xs line-clamp-2 mb-4">{plan.description}</p>
                                    <a href={plan.fileUrl} target="_blank" className="text-[10px] font-mono text-primary/60 hover:text-primary flex items-center gap-1">
                                        <span className="material-symbols-outlined text-xs">link</span> Source EXE
                                    </a>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Side: Edit/Create Form */}
                <div className="lg:col-span-5">
                    <section className="sticky top-32 space-y-6">
                        <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">{editingPlan ? "edit_note" : "add_box"}</span>
                            {editingPlan ? "Modify Plan" : "Deploy New Plan"}
                        </h2>
                        <form onSubmit={handleCreateOrUpdatePlan} className="bg-surface-container-high/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-outline-variant/20 space-y-5 shadow-2xl relative overflow-hidden">
                            {editingPlan && (
                                <div className="absolute top-0 right-0 p-4">
                                    <button type="button" onClick={() => { setEditingPlan(null); setNewPlan({ name: "", price: "", description: "" }) }} className="text-on-surface-variant hover:text-white">
                                        <span className="material-symbols-outlined">close</span>
                                    </button>
                                </div>
                            )}
                            <div>
                                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">System Designation</label>
                                <input type="text" placeholder="e.g. SubKitt Sentinel" value={newPlan.name} onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })} required className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl px-5 py-4 text-white focus:border-primary-container outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">License Cost ($)</label>
                                <input type="number" placeholder="99" value={newPlan.price} onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })} required className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl px-5 py-4 text-white focus:border-primary-container outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">Feature Brief</label>
                                <textarea placeholder="Describe the capabilities..." value={newPlan.description} onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })} className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-2xl px-5 py-4 text-white h-32 focus:border-primary-container outline-none transition-colors resize-none" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest ml-1 mb-2 block">Binary Core (.EXE)</label>
                                <div className="relative group/file">
                                    <input type="file" accept=".exe" onChange={(e) => setFile(e.target.files?.[0] || null)} className="absolute inset-x-0 inset-y-0 opacity-0 cursor-pointer z-10" />
                                    <div className="bg-surface-container-lowest border-2 border-dashed border-outline-variant/30 rounded-2xl p-6 text-center group-hover/file:border-primary-container/50 transition-all">
                                        <span className="material-symbols-outlined text-3xl text-primary/40 mb-2">upload_file</span>
                                        <p className="text-xs text-on-surface-variant">{file ? file.name : editingPlan ? "Replace existing EXE (Optional)" : "Drop software core here"}</p>
                                    </div>
                                </div>
                            </div>
                            <button disabled={uploadLoading} className="w-full bg-primary-container text-white py-5 rounded-2xl font-bold text-lg shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_40px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-3">
                                {uploadLoading ? (
                                    <>
                                        <span className="animate-spin material-symbols-outlined">sync</span> Syncing to Orbit...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">{editingPlan ? "save_as" : "rocket_launch"}</span>
                                        {editingPlan ? "Apply Changes" : "Initiate Deployment"}
                                    </>
                                )}
                            </button>
                        </form>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    )
}
