"use client"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth, db } from "../../lib/firebase"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"

export default function DownloadPage() {
    const [user] = useAuthState(auth)
    const [plans, setPlans] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "plans"), (snapshot) => {
            setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        return () => unsub()
    }, [])

    const handleDownloadClick = () => {
        if (!user) {
            router.push("/login")
        } else {
            router.push("/dashboard")
        }
    }

    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-44 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Windows laptop in dark room"
                        className="w-full h-full object-cover opacity-30 grayscale-[0.5]"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbjvMmGDeoJzPu7vLmmE3a7VDurUrmeZs0MiSTf6VZdBFGsjnmW0-lD0KXK1ojpBeRZJXO6y-SuqSLHWK00xVBTMjuSrnk28qs-P43RbkJOhmooExJAAW-jL8yR0mN4aBU3WFp16XqpiiLeXsOTxlaIVKTDzpll1ojW3v07PBjPuOS-3TNwV1DBvtrnLcH9W2Se4bRVPbFWnpZNyZn6scUC46PQ0sgfEkFOEhpbicjDBKoRUk2sGHrNVOXEPlJJk2wnIQdmq_cGTA"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-8 w-full py-24">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h1 className="font-headline text-6xl md:text-8xl font-extrabold text-white tracking-tighter mb-8 leading-[0.9]">
                                Download <br /> <span className="text-primary">SubKitt Free</span>
                            </h1>
                            <p className="text-xl text-on-surface-variant max-w-lg mb-12 font-light leading-relaxed">
                                Experience the next generation of AI-driven terminal automation. Build, deploy, and scale with cinematic precision.
                            </p>

                            <div className="bg-surface-container-high/40 backdrop-blur-xl p-8 rounded-2xl border border-outline-variant/10 max-w-md shadow-2xl">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-12 h-12 bg-surface-container-highest rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-primary text-3xl">desktop_windows</span>
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-lg">SubKitt for Windows</div>
                                        <div className="flex gap-2 mt-1">
                                            <span className="bg-surface-container-highest text-[10px] px-2 py-0.5 rounded uppercase tracking-widest font-bold text-on-surface-variant">v2.4.1</span>
                                            <span className="text-on-surface-variant text-xs font-mono">142 MB</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleDownloadClick}
                                    className="w-full bg-primary-container text-white py-4 rounded-xl font-bold text-lg hover:bg-primary transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] group"
                                >
                                    Download Now
                                    <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">download</span>
                                </button>
                                <p className="text-center text-on-surface-variant text-[11px] mt-4 font-mono uppercase tracking-widest opacity-60">Compatible with Windows 10 & 11</p>
                            </div>
                        </div>

                        <div className="relative hidden lg:block">
                            <div className="absolute -inset-20 bg-primary-container/20 blur-[120px] rounded-full"></div>
                            <div className="relative bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 rotate-[-2deg] scale-110 shadow-2xl">
                                <img alt="SubKitt UI Mockup" className="rounded-xl w-full border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGfc2mJj-PG7Hb1CmkFVlEOi32qh5r7bymwqVerU2_XShAPaAt52l-BKqIIWFl1KZwcIDdLKRPmDis9-DXwdRz2fipp_4E15rNHSo-aF0G9a74qFIJwqUvX-zveDVhPLDweaw12mE3uALQzffJ3x62QKylJMghx-Mi5QoWdXn6QBVsiNP-Knqb6uh3UWbcohUfVxT6CXhsK2w82YnRQ1m0EmX-0pfNU29AUb4KercxVVl9gek_OzQ5was4ZDB6Nw6cUcztRxKup2g" />
                                <div className="absolute top-0 right-0 -mr-8 mt-12 bg-surface-container-high p-4 rounded-xl border border-outline-variant/10 shadow-xl max-w-[180px]">
                                    <div className="text-[10px] font-mono text-primary mb-2">LIVE METRICS</div>
                                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden mb-2">
                                        <div className="h-full bg-primary w-[75%]"></div>
                                    </div>
                                    <div className="text-[10px] text-on-surface-variant">System Latency: 12ms</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Setup Steps */}
            <section className="py-32 relative bg-surface">
                <div className="max-w-7xl mx-auto px-8">
                    <h2 className="font-headline text-4xl font-bold text-white mb-20 text-center tracking-tight">Three Steps to Intelligence</h2>
                    <div className="grid md:grid-cols-3 gap-12">
                        <DownloadStep num="1" title="Install SubKitt" desc="Launch the installer and follow the guided setup. It takes less than 30 seconds." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAeQiCP0hO-aiBEEId_rtFqF3RX8ZRCEE9j3M1JMkqXlbUdtcWK46Bsm06z0Rp1EbGGACEwKR8Z4eBUPNmQzGXDIcMbQXWGKGvtnR2uK5dG_sTSexDmclDXrnpOcYZ7PHUlsk8bGuEYLXSv9s2azzrxG-jEhnrP9zPkPiP7r-juA2vQzf5AbgGoYGvUCZPSOirawWY57w072FOJaTs4H1R4AwHX0_d_8QMojlF6_gDbWDTdPhpuVXEXeExWakRAXkLxuuc6hyMTpfU" />
                        <DownloadStep num="2" title="Connect API" desc="Paste your secure API key from the dashboard to unlock autonomous capabilities." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAylWitJ6jN2IMjhlzQTLLi4ig6rNw962wu75xghs2KO3JuiLWfM9_SdmK5ZCTd_AI-nDw4B9YAcePFSoqrcs6kjRL0y6HSlsO3w0liiQBcquLuZbe_7C91Y0U-L-NTXhNE-v-ZsNzoRakMsuBPuIVsg9F35Zvfghirh1PaFFZ6tK7fwD6F52p0-YWe8q1Vrx2vOiNAmeICw2BieuD4AsvmTwlvaGRdwdaGycjGn411F6sb-gCIfyqx4xKnqwbjvjvcOHfEuIQq1P8" />
                        <DownloadStep num="3" title="Initiate Command" desc="Type 'sk create project' to watch the AI build your infrastructure instantly." img="https://lh3.googleusercontent.com/aida-public/AB6AXuD4xQbqv4Bv5UG-3CIobY_v345qxOgrh3_Z1DCi_vM8D6d_NPxnryXY9P84p0VP1binqtYN82Fle9B8lpdL7mMhdjXcIYl1tYoAjV3yT8KbkFIYfPndAUqNx5ZO0rOuFjosrDSjun8Iscw1zMnQQRnNENgj6nEFDMm8B636RInSfYiLbxqgvlcFTvYUM3_u8zAnX-dQeCUiX3ygGUpmMNZAguZp57a6ZOLNvgHl80oia9qSjkvyC51BnkeYVD8wYF3EkQhFiCzZf5Q" />
                    </div>
                </div>
            </section>

            {/* System Requirements */}
            <section className="py-32 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="bg-surface-container rounded-3xl overflow-hidden border border-outline-variant/10 flex flex-col md:flex-row items-stretch shadow-2xl">
                        <div className="md:w-1/2 p-12 lg:p-20">
                            <h2 className="font-headline text-4xl font-bold text-white mb-10 tracking-tight">System Requirements</h2>
                            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                <Requirement label="OS" value="Windows 10+ (64-bit)" />
                                <Requirement label="Memory" value="4GB RAM (8GB Rec.)" />
                                <Requirement label="Processor" value="Intel i5 or AMD Ryzen 5" />
                                <Requirement label="Storage" value="250MB Free Space" />
                                <div className="col-span-2">
                                    <Requirement label="Graphics" value="DirectX 11 Compatible GPU for interface acceleration" />
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 relative min-h-[400px]">
                            <img alt="PC with purple lighting" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiQsU2k8ZcaqeytzYcllvphqgdS0ZPn6nZKLcR69xwGmQy78CvK78MMANwCsbDrrp54XCMjKvrRLGqYahYyNBuZRIxrZyMv1Ww_cJPsQ-kukKbFu9UJieLtLS7xftdemeZL8Ka4eqa2WJLrINpZfLoPwWX2pWyFplRxSqRHr_M0u6VvuDqwQH3S7CPMi-DT5FVPPyK0B-mc2ABS79Jru14E5rCVdRD4goyS9H2az52gYGjDhwQHMSBUMqDh8L3vvievrhJtLFapfM" />
                            <div className="absolute inset-0 bg-gradient-to-r from-surface-container to-transparent md:bg-gradient-to-l"></div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function DownloadStep({ num, title, desc, img }: any) {
    return (
        <div className="group">
            <div className="relative mb-8 rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/10 aspect-video flex items-center justify-center">
                <img alt={title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" src={img} />
                <div className="absolute top-4 left-4 bg-primary text-on-primary w-8 h-8 rounded-lg flex items-center justify-center font-bold font-headline">{num}</div>
            </div>
            <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">{desc}</p>
        </div>
    )
}

function Requirement({ label, value }: any) {
    return (
        <div>
            <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-2">{label}</div>
            <div className="text-on-surface font-medium">{value}</div>
        </div>
    )
}
