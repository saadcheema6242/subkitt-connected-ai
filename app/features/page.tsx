import Header from "../components/Header"
import Footer from "../components/Footer"

export default function FeaturesPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />

            {/* Hero Section */}
            <header className="relative pt-44 pb-20 px-8 overflow-hidden min-h-[716px] flex items-center">
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover opacity-25 grayscale brightness-50"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ5USHRb_ukJCqgKgpCtyPHC08Ki4K4XYHzThtd63oSDTinkJHygvhNWAx93B_tYArKYSIDGNmzDWf1-S2zdQ7Ylh0dz-tB60TD975oP4rnVdGYWNMyome3jCAE3-G1Gm3eSD9VkWoqtYDC7PbCKyFAYZYQ1ppPODCCYCbe3NxKzMV0474aKWGxEzYEFWc-JnG-6k5YNqrMadVceVMin5ZBRtEm5--Q2vUTmINjXzoR4_zahMTHF8bgk7XudykhIWWjdIDKOfjW_8"
                        alt="Features Hero"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto w-full text-center">
                    <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-primary to-primary-container">
                            Every Feature Earns Its Place
                        </span>
                    </h1>
                    <p className="text-on-surface-variant text-xl md:text-2xl max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
                        Precision-engineered tools for the digital auteur. No bloat, just absolute control over your workflow.
                    </p>
                </div>
            </header>

            {/* Main Features */}
            <div className="space-y-32 py-32 px-8 max-w-7xl mx-auto">
                <FeatureRow
                    tag="Precision"
                    title="Instant Control"
                    desc="Execute complex command sequences with zero latency. Our native core ensures that every trigger is met with immediate, deterministic action."
                    icon="bolt"
                    stat="12ms Response Time"
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuAXlqvl03MRBrrLkXg_sDuHIJOB7_v0wzkJye2T1fa1mXEMP6FosMBchhc65wcVGjhgEaR2dhM62diM0I5VnBAGrJ26SXQ-ONTL2feSKkeT4g8OkPncnhVL2YDof4G-2oa651ckyrPt4-Aiy0qbrdtI29xE9GOJO0jNCv02_X5YSWVZOqdjgAfg44bezh2kucGlHti1X4RmAGy_lgIlK4nzO6O36IiDg-Hus94G2nWuw_f5otO1kzMXkT3OnBSE_hg6NiPRpjEN5MQ"
                />
                <FeatureRow
                    tag="Connectivity"
                    title="Workflow Chains"
                    desc="Link disparate applications and APIs into a singular, fluid intelligence. Visualise the flow of data as it moves through your custom-built ecosystem."
                    icon="hub"
                    stat="Unlimited Node Mapping"
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuDMlG4zUy-UIyuAghRhQlQuAm0WTnQyLx_y2YcztiFNTQqML16HQLB8hQLOqDE4yn3gNlKasclNxowAtEAJCmDEX6CsSHMi85E9UQ7LxXfNIVX17BNPl_piD7a-6PVeT_agsAs6Wk1jUPoiMPzGGbZUJV83OpboAxt8rHHZrWrkCNFJt3zT-2WON5E1M7Qq1A-mDEPd25TBBGDoeGydT_LQ5xdMkiVVHzeCgBnMrZNpU_UXJ2Djo0huJZVqq-6AiZcfTC-Oh3_3_DA"
                    reverse
                />
                <FeatureRow
                    tag="Persistence"
                    title="Scheduled Automations"
                    desc="Set it and forget it. Our robust scheduler handles mission-critical tasks around the clock with millisecond accuracy, even while you sleep."
                    icon="schedule"
                    stat="Cron-level Granularity"
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuBPJkUeOQNHW8fF9aZg2ESBcvzMw7Vf1PcFGVYHeoxvMnEqOpOaIDORimOxjKr7UNrSt6YYuUDm6DC8zyrXbAp7OjpqHFO2l_UiU_OZnsuQpOykCByLICTX5DOLzghVBvbHRhJa4KSg7Tm_Yrito0utQvgj2fevwG2tFL_gtJrZK_O8prI6FsA601nE3a8aehHRl7yYaD8F8VSN_SBiy4iMs8Yo57mkH2tgeIzy8An9cHXkKdGJ3yvC0kPTJ1hzuuTEpxrkLXA1ue4"
                />
                <FeatureRow
                    tag="Intelligence"
                    title="Smart Web Scraping"
                    desc="Extract value from the noise. Our intelligent parser adapts to layout changes automatically, ensuring your data pipelines never break."
                    icon="dataset"
                    stat="Auto-Healing Selectors"
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuDYos7uVrotrdpWdYQG6Q1LIK0jPTzuuL5-OUIMsZZZMntr523sxRQDJzQhuCmODMQenSPjB5a1E-Q30U2x48VS9vVTCCqFHbeeCUcemY3ogJ3YyV6qy4QFzELYouyy3eJ9fz9RofwE0D5lLWcPy6rA1ecYlbjOlD5F40zboSA9D05WbzwJ_bl0K8BvE6UyXFZRgLnqyPw8deyLHeZ6ILRGz1_Yux0q4v88gioC5h1AnH11a-neJ9j6g4TyKcdMvkZdJVfrcsuvJw4"
                    reverse
                />
                <FeatureRow
                    tag="Reactive"
                    title="Event Triggers"
                    desc="Responsive by design. SubKitt listens for system events, file changes, or webhook pings to launch your workflows exactly when they are needed."
                    icon="electrical_services"
                    stat="Real-time Webhook Listeners"
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuAxVIOG-mSDK63OGmoQYn8IoygomA5j_ryMqCOmHyWeNLOIXqm1i7Xbuw2RJbIIMKf9OT5gUm1TSsgyQJdfRTpbUvjG3XI-acb1OQcSpEe2DiLQFRn0c5wDHG5nDNIFioKd75F-wCtOsreBlyprzC98obcv2u7NonC0U-jwXsX00gvEM4T7OIs8SMOzHp10RRTu4IVl2YkQM-oLHrDmsvDMYQ10xtghaZixzy7oWArDr64emKGdoO1n8r06XVtvdkTMExuUSgUJAeQ"
                />
                <FeatureRow
                    tag="Navigation"
                    title="Browser Automation"
                    desc="Automate the un-automatable. Control any web application like a human, but with the speed and reliability of a machine."
                    icon="browser_updated"
                    stat="Headless & GUI Modes"
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuDzZqyA36Tac0hS6zcuxVr0FlUmg6nKo3PtnTMHILL1hmE5ZSxa0RpZAdZLDMcTlXTMKqSZ_u6Kb8RcR6TcfwNmH-HwPDrC86q27VCYexjsDNunYisgiJl-4ptaM2L6JeaZGUrlphwB9Qu7k8DeihNYylkQ9xjs6uVmAQTIsOa4Ww8fpP6LrLTdztLNzKCqhlJPV3H9UEZguOHSjRcD4yAZdXLnX0zM_U1D-KXVm2dWgSy2MYJyoM5lmGp8fBisvY-7SJ-9yqTaUsE"
                    reverse
                />
                <FeatureRow
                    tag="Insight"
                    title="Analytics Dashboard"
                    desc="Monitor your performance in real-time. Gain deep insights into execution times, success rates, and resource utilization across all your agents."
                    icon="query_stats"
                    stat="Custom KPI Metrics"
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuA0YYWohEBKaFebFe_CCf6ugGk4HI5wXex6iENHr273a-xmYM5DlN8AadxCn4uyLmumf6ghaK1jlcPgYNpPu-MhQnEvpGFcOrpPDsx0TRIY2gFeZEXifiEJ1ASObihoLBP5wsPk04zvlI3hf4P1r_roPONZxzvR10OVs24HxKwYzRj59rzGnobi8TwBv_CoxqUk6_WGrs5DojJbOcu30Rf-Jv456YPJISgtemxR1-tkcut2kf75WQW-K6hjUH5pmiQOYAYhF9f42Cs"
                />
                <FeatureRow
                    tag="Security"
                    title="Privacy First"
                    desc="Your data never leaves your machine. SubKitt runs locally with end-to-end encryption for all external integrations."
                    icon="encrypted"
                    stat="Local-First Architecture"
                    img="https://lh3.googleusercontent.com/aida-public/AB6AXuB5im1aEboyqa8JieuUsRQczFwqH9nVI89VSIs9wve7OGB6LAr7f8pHHsUKUNTISX3JANpOChUJWp3c-Rr3D9AkeLLJcYGYB0Mrgv2sKZzvhWWNufTqntuaRsSSJBgrRGeo9VmG6TLhAEV84YBJqQAVnQIDtVenwd5uGl7Z30lhAuZogAhsl1N1uIr0G7b_XqFe6xmL0O8gJCW9AJH-mChB7TB6jqsGzSSaqN5rCVx8SPSCPLEjgrBGTVyy4YqlEUDBLNr6-UymatQ"
                    reverse
                />
            </div>

            {/* Comparison Table */}
            <section className="relative py-32 px-8 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.08]" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBrKp_BNgdgIHMr0VyJ9RzG2Gdbf66Ze6Xnu4XidnEdv0CryNWJZZi4xQ7BUCsURWyI8mQklx9DR2q0vJA_lll58jcifAmVvWCuZEcwW9FSXRo3BN8sk1zhL8oKZAaQwiz7pHtRpbrUGefnUyi1QXXnd6RJ83pFlqYh6y9ksOOmo7lfc6AclK-JBF_WZQXvIYQKSv-b6zUAj2N3303BqT14LOWxs0F0ILGuXPPi3AzfmZRGL60l2gJsV52QN5m_XVrxfyuIW1iuP3I')" }}></div>
                <div className="relative z-10 max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-headline font-extrabold text-white mb-4">The New Standard</h2>
                        <p className="text-on-surface-variant">How SubKitt redefines the boundaries of automation.</p>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container/40 backdrop-blur-xl">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-outline-variant/20">
                                    <th className="p-6 font-headline font-bold text-lg text-white">Capability</th>
                                    <th className="p-6 font-headline font-bold text-lg text-primary bg-primary/5">SubKitt AI</th>
                                    <th className="p-6 font-headline font-bold text-lg text-on-surface-variant">Traditional Tools</th>
                                    <th className="p-6 font-headline font-bold text-lg text-on-surface-variant">Manual Dev</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                <TableRow capability="Setup Time" subkitt="Minutes" traditional="Hours/Days" manual="Weeks" isSubkittBold />
                                <TableRow capability="Data Privacy" subkittIcon="verified_user" traditional="Cloud Dependent" manual="Custom Build" />
                                <TableRow capability="Adaptive AI" subkittIcon="check_circle" traditional="Static Logic" manual="High Maint." />
                                <TableRow capability="Cost Ratio" subkitt="1.0x" traditional="4.5x" manual="12.0x" isSubkittBold />
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function FeatureRow({ tag, title, desc, icon, stat, img, reverse }: any) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className={`${reverse ? 'order-2' : 'order-2 md:order-1'}`}>
                <span className="text-primary-container font-headline font-bold text-sm tracking-[0.2em] uppercase mb-4 block">{tag}</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mb-6 leading-tight">{title}</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-8">{desc}</p>
                <div className="flex items-center gap-4 text-primary">
                    <span className="material-symbols-outlined">{icon}</span>
                    <span className="font-bold tracking-tight">{stat}</span>
                </div>
            </div>
            <div className={`${reverse ? 'order-1' : 'order-1 md:order-2'} rounded-2xl overflow-hidden shadow-2xl shadow-primary-container/10`}>
                <img className="w-full aspect-video object-cover hover:scale-105 transition-transform duration-700" src={img} alt={title} />
            </div>
        </section>
    )
}

function TableRow({ capability, subkitt, traditional, manual, subkittIcon, isSubkittBold }: any) {
    return (
        <tr>
            <td className="p-6 text-white font-medium">{capability}</td>
            <td className={`p-6 text-primary bg-primary/5 ${isSubkittBold ? 'font-bold' : ''}`}>
                {subkittIcon ? <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{subkittIcon}</span> : subkitt}
            </td>
            <td className="p-6 text-on-surface-variant">{traditional}</td>
            <td className="p-6 text-on-surface-variant">{manual}</td>
        </tr>
    )
}
