"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "../../lib/firebase"
import Logo from "./Logo"

export default function Header() {
    const pathname = usePathname()
    const router = useRouter()
    const [user] = useAuthState(auth)

    const navLinks = [
        { name: "Features", href: "/features" },
        { name: "How It Works", href: "/how-it-works" },
        { name: "Pricing", href: "/pricing" },
        { name: "About", href: "/about" },
        { name: "Download", href: "/download" },
    ]

    const handleDownloadClick = () => {
        if (!user) router.push("/login")
        else router.push("/dashboard")
    }

    return (
        <header className="fixed top-0 w-full z-50 bg-[#131318]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(124,58,237,0.06)] border-b border-white/5">
            <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto min-h-24">
                <Logo />

                <div className="hidden md:flex items-center gap-8 font-headline font-bold tracking-tight">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors text-base ${pathname === link.href ? 'text-primary border-b-2 border-primary-container pb-1' : 'text-on-surface-variant hover:text-white'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user && (
                        <Link
                            href="/dashboard"
                            className={`transition-colors text-base ${pathname.startsWith('/dashboard') ? 'text-primary border-b-2 border-primary-container pb-1' : 'text-on-surface-variant hover:text-white'}`}
                        >
                            Dashboard
                        </Link>
                    )}
                </div>

                <div className="flex items-center gap-4">
                    {user ? (
                        <button onClick={() => auth.signOut()} className="text-on-surface-variant hover:text-white text-sm font-bold">Sign Out</button>
                    ) : (
                        <Link href="/login" className="text-on-surface-variant hover:text-white text-sm font-bold">Login</Link>
                    )}
                    <button
                        onClick={handleDownloadClick}
                        className="bg-primary-container text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-all duration-300 scale-95 active:scale-90"
                    >
                        Download Free
                    </button>
                </div>
            </nav>
        </header>
    )
}
