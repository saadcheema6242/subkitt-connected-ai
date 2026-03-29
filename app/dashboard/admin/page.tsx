"use client"

import { useEffect, useState } from "react"
import { auth, db, storage } from "../../../lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/navigation"
import { collection, query, onSnapshot, updateDoc, doc, addDoc, serverTimestamp, getDocs } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import Header from "../../components/Header"
import Footer from "../../components/Footer"

export default function AdminDashboardPage() {
    const [user, loading] = useAuthState(auth)
    const [purchases, setPurchases] = useState<any[]>([])
    const [plans, setPlans] = useState<any[]>([])
    const [notifications, setNotifications] = useState<any[]>([])
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
            const unsubNotifs = onSnapshot(collection(db, "notifications"), (snapshot) => {
                setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
            })
            return () => { unsubPurchases(); unsubPlans(); unsubNotifs(); }
        }
    }, [user, loading, router])

    const handleCreatePlan = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!file) return alert("Please select an EXE file to upload")
        setUploadLoading(true)

        try {
            const fileRef = ref(storage, `plans/${Date.now()}_${file.name}`)
            await uploadBytes(fileRef, file)
            const downloadURL = await getDownloadURL(fileRef)

            await addDoc(collection(db, "plans"), {
                ...newPlan,
                fileUrl: downloadURL,
                timestamp: serverTimestamp()
            })

            setNewPlan({ name: "", price: "", description: "" })
            setFile(null)
            alert("Plan created and file uploaded!")
        } catch (err: any) { alert(err.message) }
        finally { setUploadLoading(false) }
    }

    const approvePayment = async (purchase: any) => {
        try {
            const planDoc = await getDocs(collection(db, "plans"))
            const plan = planDoc.docs.find(d => d.id === purchase.planId)?.data()

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

    if (loading) return <div>Checking status...</div>

    return (
        <main className="min-h-screen flex flex-col pt-24 px-8 max-w-7xl mx-auto w-full">
            <Header />
            <div className="mb-12">
                <h1 className="text-4xl font-headline font-bold text-white mb-2">Admin Panel</h1>
                <p className="text-on-surface-variant font-body">Manage users, plans, and files.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <section className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">payments</span> Pending Approvals
                    </h2>
                    <div className="bg-surface-container-high/40 rounded-2xl border border-outline-variant/10">
                        {purchases.filter(p => p.status === 'pending').map((p) => (
                            <div key={p.id} className="p-6 border-b border-white/5 flex justify-between items-center">
                                <div>
                                    <p className="text-white font-bold">{p.userEmail}</p>
                                    <p className="text-on-surface-variant text-sm">{p.planName}</p>
                                </div>
                                <button onClick={() => approvePayment(p)} className="bg-green-500/20 text-green-400 px-6 py-2 rounded-xl text-sm font-bold">Approve</button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-headline font-bold text-white flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">upload_file</span> New Plan
                    </h2>
                    <form onSubmit={handleCreatePlan} className="bg-surface-container-high/40 p-8 rounded-2xl border border-outline-variant/10 space-y-4">
                        <input type="text" placeholder="Name" value={newPlan.name} onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })} required className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-white" />
                        <input type="number" placeholder="Price" value={newPlan.price} onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })} required className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-white" />
                        <textarea placeholder="Description" value={newPlan.description} onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })} className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-white h-20" />
                        <input type="file" accept=".exe" onChange={(e) => setFile(e.target.files?.[0] || null)} required className="w-full text-sm text-on-surface-variant" />
                        <button disabled={uploadLoading} className="w-full bg-primary-container text-white py-4 rounded-xl font-bold">{uploadLoading ? "Uploading..." : "Publish Plan"}</button>
                    </form>
                </section>
            </div>
            <Footer />
        </main>
    )
}
