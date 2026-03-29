"use client"

import { useState, useEffect } from "react"
import { auth, db } from "../../lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import { useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isRegistering, setIsRegistering] = useState(false)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, authLoading] = useAuthState(auth)
    const router = useRouter()

    const ADMIN_EMAIL = "muhammadsaadc49@gmail.com"

    // Instant redirect if already logged in
    useEffect(() => {
        if (user && !authLoading) {
            router.replace(user.email === ADMIN_EMAIL ? "/dashboard/admin" : "/dashboard")
        }
    }, [user, authLoading, router])

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        setLoading(true)

        try {
            let userCredential;
            if (isRegistering) {
                userCredential = await createUserWithEmailAndPassword(auth, email, password)
                // Save user to Firestore
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email: userCredential.user.email,
                    createdAt: serverTimestamp(),
                    role: "user"
                })
            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password)
            }

            // Redirection is handled by the useEffect above
        } catch (err: any) {
            setError(err.message)
            setLoading(false)
        }
    }

    if (authLoading || (user && !authLoading)) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-white font-mono">Redirecting...</div>
    }

    return (
        <main className="min-h-screen flex flex-col">
            <Header />

            <section className="flex-grow flex items-center justify-center pt-32 pb-20 px-4">
                <div className="max-w-md w-full bg-surface-container-high/40 backdrop-blur-xl p-8 rounded-3xl border border-outline-variant/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent"></div>

                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-headline font-extrabold text-white mb-2">
                            {isRegistering ? "Create Account" : "Welcome Back"}
                        </h1>
                        <p className="text-on-surface-variant font-body">
                            {isRegistering ? "Start your SubKitt journey today." : "Login to manage your workflows."}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-white uppercase tracking-wider">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-container transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="space-y-2 relative">
                            <label className="text-sm font-bold text-white uppercase tracking-wider">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-container transition-colors"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-10 text-on-surface-variant hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">
                                    {showPassword ? "visibility" : "visibility_off"}
                                </span>
                            </button>
                        </div>

                        {error && <p className="text-red-400 text-sm font-medium">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-container text-white py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all disabled:opacity-50"
                        >
                            {loading ? "Please wait..." : (isRegistering ? "Sign Up" : "Login")}
                        </button>
                    </form>

                    <div className="mt-8 text-center space-y-4">
                        <button
                            onClick={() => setIsRegistering(!isRegistering)}
                            className="text-primary hover:text-white transition-colors text-sm font-medium"
                        >
                            {isRegistering ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                        </button>
                        <br />
                        <button
                            onClick={async () => {
                                if (!email) { setError("Please enter email first"); return }
                                try {
                                    await sendPasswordResetEmail(auth, email)
                                    alert("Reset link sent to your email!")
                                } catch (err: any) { setError(err.message) }
                            }}
                            className="text-on-surface-variant hover:text-white transition-colors text-xs"
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
