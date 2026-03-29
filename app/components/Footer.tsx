import Link from "next/link"
import Logo from "./Logo"

export default function Footer() {
    return (
        <footer className="bg-[#0E0E13] w-full pt-16 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-8">
                <div className="bg-gradient-to-r from-transparent via-[#2563EB] to-transparent h-[1px] mb-12"></div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-4">
                        <Logo />
                        <p className="text-on-surface-variant text-sm font-body leading-relaxed max-w-xs">
                            The command line for your entire life. Integrated, automated, and intelligent.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest font-headline">Product</h4>
                        <ul className="space-y-3 text-on-surface-variant text-sm">
                            <li><Link className="hover:text-primary transition-colors" href="/features">Features</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/how-it-works">How It Works</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="/pricing">Pricing</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest font-headline">Company</h4>
                        <ul className="space-y-3 text-on-surface-variant text-sm">
                            <li><Link className="hover:text-primary transition-colors" href="/about">About Us</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
                            <li><Link className="hover:text-primary transition-colors" href="#">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest font-headline">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-all border border-white/5 hover:border-primary/20">
                                <span className="material-symbols-outlined text-lg">public</span>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-all border border-white/5 hover:border-primary/20">
                                <span className="material-symbols-outlined text-lg">code</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
                    <p className="text-on-surface-variant text-sm font-body opacity-80">© 2024 SubKitt AI. All rights reserved.</p>
                    <div className="flex gap-8 text-[10px] font-mono text-on-surface-variant/40">
                        <span>SYSTEM STATUS: OPTIMAL</span>
                        <span>VERSION: 2.4.1-STABLE</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
