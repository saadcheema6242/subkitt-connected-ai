import Header from "../components/Header"
import Footer from "../components/Footer"

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-44 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        alt="Cinematic office"
                        className="w-full h-full object-cover opacity-60"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQGqLDlWKTcoiw8NJuzdiPcpjVpriJGefBKl2CDhfQoR-xsq8yG4rFqxuz-6zqARwJWKltdnDZ8T6Mv7zQzHWGWBrymY7xVfmSm8S1glvdUUFjXS8jx3Lh1ZOOTTl-bqYEXdNTFM0QKcHe7yGveO5v6dJeySRKuz1KEUhoDUgbJs7EEqcVmDv5nea5C66uut89EYoYNDe3xpTSWYYtN_pAmZecRVkKA3_KmoNkP1616uingVY5ES4MdU6-mw8yOkh-F9GjZau4d5M"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background"></div>
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                    <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-white tracking-tighter mb-6 leading-none">
                        From Words to <span className="text-primary">Action</span> in Seconds
                    </h1>
                    <p className="text-on-surface-variant text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
                        Unlock the power of your workflow with natural language. No complex syntax, just pure execution.
                    </p>
                    <div className="mt-12">
                        <span className="material-symbols-outlined text-primary text-4xl animate-bounce">expand_more</span>
                    </div>
                </div>
            </section>

            {/* 3-Step Timeline Section */}
            <section className="py-24 relative overflow-hidden blueprint-bg">
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 relative">
                        {/* Timeline Connecting Line */}
                        <div className="hidden md:block absolute top-[140px] left-[15%] right-[15%] h-[2px] border-t-2 border-dashed border-primary-container/40 z-0"></div>

                        <TimelineStep
                            num="1"
                            title="Download & Install"
                            desc="Get started with our lightweight native client for MacOS and Windows."
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuDOZ_v9lsTmtRYr9gDP6gks7bwgL4XO9pCM8YliCt7GMGz_79-odBu_3j26QwKkB2mMC4b8EkIghvrL4Qc_HM1L_9aQI1NIxEXcpQbpcmoxK89oYlpkkUdLnoHNO_9BmeVCaSiaHycRnOdF2NT2aiXJE2aM_Sk-8e-VZlj-22gG_M55NHWxCsex-Eo_qomwa3yzOL_s7vdyp3ZTtt1WZDprLSRASMoOfCOrQ90rAHGXUiJyy3LR8e8lhFTakEm-FXS0dy-mmSvr9Uk"
                        />
                        <TimelineStep
                            num="2"
                            title="Add Your API Key"
                            desc="Securely connect your preferred AI models using your own API credentials."
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuAq8VWi4SOCkdCIUO2HJBa_6S-c6cqRXaa2ZgZvyKP6QUZkpsOYCw4Hr848lfhlOcmMCACeKqO0AlXjkcWqun-FmlgtqwhAcZb-oatFEvlh9VsGqPRepg7iKrPDpH_plrh4fccmFtJRwdqDkwR4xOLMmsw_E9ThhZEAx5NjrTUEFLcgAJI7ACURXfXaoYc_nkPe06_FaPlJviUgZWKjz9fUCKdRmz235OmPw5ut5gc4kl4NmpMJ4-MKL1pt8oZpD1rLyTJCwDG8NRc"
                        />
                        <TimelineStep
                            num="3"
                            title="Type Your Command"
                            desc="Press Cmd + K and tell SubKitt what you need to achieve next."
                            img="https://lh3.googleusercontent.com/aida-public/AB6AXuCjSlp1pxMguBDKFwAm1X1Xjb12cqU0xJy1UHlvl0wEyA-UTN9dcSFwfa8J72JQijhbHuq_B248oHU2a5CtCRotohZqPHGkhLNLn-7X2FSCoi3KX5QZg8p1u08n8BFNX7tc7p4SmYaBf_94_HS39GAYFN6hJHW84cCQWCaZMgZ0lUmjvxMuvGCfnwCvsW3u_C9IZBDt4g3kszlybwsaP4b2Ck1pAEVK35ndq2N6yK3cEPhNoiVOST7R3ghh4f0C4W2_9MHCu5jiyU0"
                        />
                    </div>
                </div>
            </section>

            {/* What You Can Say Section */}
            <section className="py-24 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5 relative">
                            <div className="absolute -inset-4 bg-primary-container/20 blur-3xl rounded-full"></div>
                            <img alt="Professional" className="relative rounded-2xl w-full aspect-[4/5] object-cover grayscale brightness-75 border border-outline-variant/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe0DZWCJ4XurIJ3APO_odukfguido7_u93jrNVVO2vh-fIhR8whkibiMutFWZtL2bPfBZObYwRbh9SQsIKdtXbGqPjjYveiESvW5oVCwViX9VnEPk-4p2Xo2XgTeaQbFCq6iyWTTtiJBeD2vmbojSgO7EDIJze9PC4COW_C3z3SyvYMnQPvx8N5iAdBDwwyPXnYRfef5jy4aw9Xck3EHnwXB2_HyqMriTHmSWgA53DijEnjIKjoUOLs9BoZewBLvrumMBNJS0AC3Y" />
                        </div>
                        <div className="lg:col-span-7">
                            <h2 className="text-4xl md:text-5xl font-headline font-bold text-white mb-12">What You Can Say</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                <CommandCard tag="FILE OPS" text='"Summarize the latest PDF in my downloads."' />
                                <CommandCard tag="DEVELOPMENT" text='"Review this React component for performance."' />
                                <CommandCard tag="EMAIL" text='"Draft a polite decline to the project invite."' />
                                <CommandCard tag="SYSTEM" text='"Optimize my system cache for faster boot."' />
                                <CommandCard tag="CREATIVE" text='"Generate 5 blog titles about AI ethics."' />
                                <CommandCard tag="MEETINGS" text='"Schedule a huddle with the design team."' />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow Chain Visual */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img alt="Abstract flow" className="w-full h-full object-cover opacity-10 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0SWwoxksDFjk7DkmXO-YjwTN7c6mHDeG4lKiyXfcvj_7wVo44m6snLBlI8HaSc7WFPa0tj9HLwwtiNAKC_1bw9iaIfOM9MTR888NQYC6-QSU35IUymgImyFoiq_zt45Ad7_1yNDbvWV4cSUgEFcnSb68FfowvEpK94FFHzwjRGmlE_d4EZdsN68FhVGPadxTnKXAkbZscADkJ0aT2_nuTNdhtQ3EVqiKBMT-K0h1RcA19oyv6lsAMxJy3Cx7AFRVOQ8-2sJXmvsA" />
                </div>
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-headline font-bold text-white mb-4">Autonomous Workflows</h2>
                        <p className="text-on-surface-variant max-w-xl mx-auto">See how SubKitt chains multiple complex operations into a single seamless motion.</p>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4">
                        <WorkflowBox icon="mic" title="Input" desc="Voice or Text capture" />
                        <span className="material-symbols-outlined text-primary-container text-4xl transform rotate-90 md:rotate-0">arrow_right_alt</span>
                        <WorkflowBox icon="psychology" title="Process" desc="AI Intent Recognition" />
                        <span className="material-symbols-outlined text-primary-container text-4xl transform rotate-90 md:rotate-0">arrow_right_alt</span>
                        <WorkflowBox icon="integration_instructions" title="Integrate" desc="App API Interaction" />
                        <span className="material-symbols-outlined text-primary-container text-4xl transform rotate-90 md:rotate-0">arrow_right_alt</span>
                        <WorkflowBox icon="task_alt" title="Execute" desc="Result Delivered" filled />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function TimelineStep({ num, title, desc, img }: any) {
    return (
        <div className="flex-1 flex flex-col items-center text-center relative z-10">
            <div className="mb-8 relative">
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center border border-outline-variant/30 text-primary font-headline font-bold text-2xl mb-6 shadow-xl">{num}</div>
                <div className="aspect-video w-64 md:w-full rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.5)] bg-surface-container-lowest border border-outline-variant/20 p-2">
                    <img alt={title} className="w-full h-full object-cover rounded-lg grayscale opacity-80" src={img} />
                </div>
            </div>
            <h3 className="text-2xl font-headline font-bold text-white mb-3">{title}</h3>
            <p className="text-on-surface-variant leading-relaxed text-sm">{desc}</p>
        </div>
    )
}

function CommandCard({ tag, text }: any) {
    return (
        <div className="p-4 bg-surface-container-high rounded-xl border border-outline-variant/10 hover:border-primary/40 transition-all cursor-default group">
            <span className="text-xs font-mono text-primary mb-2 block">{tag}</span>
            <p className="text-on-surface-variant group-hover:text-white transition-colors text-sm">{text}</p>
        </div>
    )
}

function WorkflowBox({ icon, title, desc, filled }: any) {
    return (
        <div className={`w-full md:w-64 p-6 rounded-2xl border ${filled ? 'bg-primary-container border-primary shadow-[0_0_30px_rgba(124,58,237,0.4)]' : 'bg-surface-container-high border-outline-variant/20 shadow-2xl'} flex flex-col items-center text-center`}>
            <span className={`material-symbols-outlined ${filled ? 'text-white' : 'text-primary'} mb-4 text-3xl`} style={{ fontVariationSettings: filled ? "'FILL' 1" : "" }}>{icon}</span>
            <h4 className={`font-headline font-bold text-white text-sm uppercase tracking-widest mb-2`}>{title}</h4>
            <p className={`text-xs ${filled ? 'text-white/80' : 'text-on-surface-variant'}`}>{desc}</p>
        </div>
    )
}
