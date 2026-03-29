"use client"

import Header from "../components/Header"
import Footer from "../components/Footer"
import Link from "next/link"
import { useState } from "react"

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true)

    return (
        <main className="min-h-screen flex flex-col pt-36 bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[614px] flex flex-col items-center justify-center pt-24 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Minimal Workspace"
                        className="w-full h-full object-cover opacity-20 filter grayscale contrast-125"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1IWNJwEkU9ntarj5yS34JLr1onnsrReTCiremDU3_aWPPiy0qeP_AZewpLc4xhrJU9JjeOsBQAGTBq7hxmj9tY7jz5-UKjfFONX72jLBuiGviDEeaBC5bOZjlPq4O7I49ujQZG07879mK_7QV94hN3dsPd_JZHBy-ZzLYMJOuhyxGeXPYw00MWIbSijgCUadpGHI-dOOC0tu7zTQSaW2tza7PjXD6nWDUTVommvdo6SRNbbDpdgWUqw_OYXh3x8cIWAHyQ8nkQ2I"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
                </div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Simple <span className="text-primary">Pricing.</span><br />Full Power.
                    </h1>
                    <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto mb-12">
                        Transparent plans designed for creators, teams, and enterprises. Choose the scale that fits your vision.
                    </p>

                    {/* Pricing Toggle */}
                    <div className="flex items-center justify-center gap-4 mb-16">
                        <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-on-surface-variant'}`}>Monthly</span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className="w-14 h-7 bg-surface-container-high rounded-full p-1 relative transition-colors duration-300"
                        >
                            <div className={`w-5 h-5 bg-primary rounded-full shadow-lg transform transition-transform duration-300 ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`}></div>
                        </button>
                        <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-on-surface-variant'} flex items-center gap-2`}>
                            Annual
                            <span className="text-[10px] bg-primary-container/20 text-primary px-2 py-0.5 rounded-full border border-primary-container/30 uppercase tracking-widest">Save 20%</span>
                        </span>
                    </div>
                </div>
            </section>

            {/* Pricing Cards Section */}
            <section className="relative px-6 py-24 -mt-24">
                <div className="absolute inset-0 z-0 opacity-[0.08] pointer-events-none">
                    <img alt="Bokeh Lights" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdrs2-823_e4pNlGMitR9SdKoCKJQE0D-zAN0eKihaAj6j2XJ2TTBUydOhyCYXIwjn-5dNMRoZivcFbKprrGm-VzRUE8E3-EBosPb9Bl-UFFE7sMNOHuLR82xPNDjtL1dhzOMWNT23jCzUszqlWNJHxttFGw24rxwtr_Rx0QJkyaUHjiQnb9J72b_hiV4MUJClL1JtJod5xiRKhLljeBu2HDRnaiwlwqHBuzlzqL8vImPpPsS3F-mo3g3vdGyyV2tuCJO5pM9Pi6Q" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Starter Plan */}
                    <PricingCard
                        title="Starter"
                        desc="Perfect for solo creators just getting started."
                        price={0}
                        img="https://lh3.googleusercontent.com/aida-public/AB6AXuBMKaRV6xiTe6rQ2avXwanO_r2H5bpE5HAMBPTtqIC49MHRlEVMA1GKgskbz_cttdx0cQV92PnIEmK5INbkMhidL917WQokZqcy1JeKlDd1DIkGcNERFhu3h8WlvCzvnIOLk1iiQnLigonqYG0I0UQ9DJXgPmp3MJK2ZJekLRlxGYuFAXedhfaAkMZtR06PjRs3vK6xl0RdpoV5d-irG-nFPWHvX77tOpmB8WlPWtePT_-bgVSQKnYwiQDJrYWkrzHKOq1RPU1KvVU"
                    >
                        <PricingFeature text="Up to 3 active projects" />
                        <PricingFeature text="Standard AI Processing" />
                        <PricingFeature text="2GB Cloud Storage" />
                    </PricingCard>

                    {/* Pro Plan */}
                    <PricingCard
                        title="Professional"
                        desc="Advanced features for growing creators."
                        price={isAnnual ? 24 : 29}
                        popular
                        img="https://lh3.googleusercontent.com/aida-public/AB6AXuCMC2030xrZSsxrW4-97VjxPCwj8xAJn5uLi00eyi1bAyJoi0GUD5ybUUL0Sw1dbU7JnFtys1OuNyCk0J8I9aL7IfY7r_t3uU3S5tgsQQrMrIFT92NtTBKjFUjhLQMOpda1Mb1qAea-98gmnA-fGptyHa6Y4um5fioOloFmMoXOV2O3btV31eS2AiDsAoTY0w3SPv11NlhNR9R1J6vClqQdAMofngkf7WhNvz8iqp7yd93Py36NrDHRZugWKUFNrnsekHXXNJ0cCNw"
                    >
                        <PricingFeature text="Unlimited projects" />
                        <PricingFeature text="Priority AI Processing" />
                        <PricingFeature text="50GB Cloud Storage" />
                        <PricingFeature text="Custom Branding" />
                    </PricingCard>

                    {/* Enterprise Plan */}
                    <PricingCard
                        title="Enterprise"
                        desc="Bespoke solutions for large organizations."
                        price="Custom"
                        img="https://lh3.googleusercontent.com/aida-public/AB6AXuAEiHZOczq8QicSymYCI2tQVKEcN1LNr50yR5nic1RiStA_FM3VGSfiHr7-H7qXBitQ7ey1-Ck-EozYrEUUe4oMtbLGbPJmGi2h0QEqtjBts5SoTxQUN2U_4qvjbaJwPvj2RwHVwcii5lTDEt_ThoQD7_3b4n58WKv7f6JeBLF3ABooUEo22KxUZ4TdNSBGEAyAoBkioZv6V6haZdhHIcAlWmdrBP-WW3_rxk1sMQ_0GphAVxejEvDvb6-RSt-CHJxSqoBEDbQa-Bc"
                    >
                        <PricingFeature text="Dedicated Account Manager" />
                        <PricingFeature text="SSO & Advanced Security" />
                        <PricingFeature text="API Access" />
                    </PricingCard>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-7xl mx-auto px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div className="relative rounded-[2rem] overflow-hidden group aspect-[3/4]">
                    <img alt="Person at computer" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlV_bp7jy_GsngmOWFEygFYFTeVr4o6VYFW6IVOIWWjooehls8tLLjgoGtkJk_fj1h7-BUanUnQ3M1Ma4HWn2HJ8C4BRkecHwSsXeIEXbsUejj5C5WC5TVIvPkNOPavY0EbjqVVtmFJoctSB8CMNHZWCPYl1LkGucfqd5WyA5FGIMMsDD66GI2IgwcbKSBImxDqdwHL3_siHSAhI2e-sPX5SA8o9O3k-WeKw42UyRaUOfZleJScOL-6_4AFyh4zqgdPjWwT0ay0Kw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                </div>
                <div>
                    <h2 className="font-headline text-4xl font-bold mb-12">Common <span className="text-primary">Questions</span></h2>
                    <div className="space-y-6">
                        <FAQItem question="Can I cancel my subscription anytime?" answer="Yes, you can cancel your subscription at any time through your dashboard. You will maintain access until the end of your billing cycle." />
                        <FAQItem question="What payment methods do you accept?" />
                        <FAQItem question="Is there a limit on file uploads?" />
                        <FAQItem question="Do you offer educational discounts?" />
                        <FAQItem question="How secure is my data on SubKitt?" />
                        <FAQItem question="Can I switch between plans?" />
                    </div>
                </div>
            </section>

            {/* Still Unsure Section */}
            <section className="max-w-7xl mx-auto px-8 pb-32">
                <div className="relative rounded-[3rem] overflow-hidden p-12 md:p-24 text-center">
                    <div className="absolute inset-0 z-0">
                        <img alt="Support Person" className="w-full h-full object-cover opacity-30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAj820XeQpL91Sm46Sj5GVEJcb1kufyuYK1VQbHnB1Ug7YR3Ddax-SzctcghF78_YafYLuskmRS4lIazPLJsdD6g3nJrRoJtXbYG7lB_QgOQj1pL4v5TbytRUWrnsZGZDPenVjE4sJQSXf6dM9qBXoRbtk2ZuQ_Ap3IStwGunkKrCFfkWv1eDtNFM1iPBKa996nBRomx4qPeLww_cP_rQ3FOedZzwUnqZ-Qjnz3k0sSsTI9Ebiu2jEXWolFKKfhuPDgHRmxVuKcf7w" />
                        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
                    </div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="font-headline text-4xl font-extrabold text-white mb-6">Still unsure?</h2>
                        <p className="text-on-surface-variant text-lg mb-12">Our team is here to help you find the perfect setup for your specific needs. Let's talk.</p>
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                            <input className="w-full sm:w-80 bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-white" placeholder="Enter your email" type="email" />
                            <button className="w-full sm:w-auto bg-primary-container text-white px-8 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all flex items-center justify-center gap-2">
                                Contact Sales
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function PricingCard({ title, desc, price, children, popular, img }: any) {
    return (
        <div className={`group p-8 rounded-[2rem] bg-surface-container-low border ${popular ? 'border-2 border-primary-container relative shadow-[0_0_50px_rgba(124,58,237,0.15)] transform md:-translate-y-4' : 'border-outline-variant/20'} hover:border-primary-container/40 hover:bg-surface-container-high transition-all duration-500 flex flex-col h-full`}>
            {popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Most Popular</div>}
            <div className={`mb-8 w-24 h-24 rounded-2xl ${popular ? 'bg-primary-container/20' : 'bg-surface-container-lowest'} flex items-center justify-center overflow-hidden`}>
                <img alt={title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" src={img} />
            </div>
            <h3 className="font-headline text-2xl font-bold mb-2 text-white">{title}</h3>
            <p className="text-on-surface-variant text-sm mb-6">{desc}</p>
            <div className="mb-8">
                <span className="text-4xl font-headline font-bold text-white">{typeof price === 'number' ? `$${price}` : price}</span>
                {typeof price === 'number' && <span className="text-on-surface-variant">/mo</span>}
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
                {children}
            </ul>
            <button className={`w-full py-4 rounded-xl ${popular ? 'bg-primary-container text-white shadow-[0_10px_20px_rgba(124,58,237,0.3)] hover:shadow-[0_15px_30px_rgba(124,58,237,0.5)]' : 'border border-white/20 text-white hover:bg-white hover:text-surface'} font-bold transition-all duration-300`}>
                {title === 'Enterprise' ? 'Contact Sales' : popular ? 'Go Pro' : 'Get Started'}
            </button>
        </div>
    )
}

function PricingFeature({ text }: any) {
    return (
        <li className="flex items-center gap-3 text-sm text-on-surface-variant">
            <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
            {text}
        </li>
    )
}

function FAQItem({ question, answer }: any) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="bg-surface-container-low rounded-2xl p-6 border-b border-outline-variant/10">
            <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <h4 className="font-bold text-white">{question}</h4>
                <span className={`material-symbols-outlined text-primary transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
            </div>
            {isOpen && answer && <p className="mt-4 text-on-surface-variant text-sm">{answer}</p>}
        </div>
    )
}
