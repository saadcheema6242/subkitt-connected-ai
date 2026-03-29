import Header from "./components/Header"
import Footer from "./components/Footer"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-15 grayscale"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvJZl1OJ2r-Xicd97rNnkZi2IHXUyaXQph0ChtRnSsinFsA2j45tf8qhs_yr0BpbyerzUy45bZT5zg-3HAosngUk6-NoXD-N1fYjP286PVKzrIYFXIzptOGoY6mAP8zpifKdunHAGnRVb9wB4W0Kcl4o3PaaU3soZnd-btZsNov7PIlhn8qZPmgZL41n2exLx-qL7-HCmZ-VWhpBBBTZc36LPnq6v8yKkFvCHJQlzOqZJuH1xVZakmfmzLZNyu0x71XASl4aOQZqc"
            alt="Hero Background"
          />
          <div className="absolute inset-0 cinematic-overlay"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-white leading-tight tracking-tighter">
              Type Anything. <span className="text-gradient-purple">Control</span> Anything.
            </h1>
            <p className="text-xl text-on-surface-variant font-body max-w-lg">
              The ultimate command-line interface for your entire digital ecosystem. Automate tasks, connect apps, and master your workflow with natural language.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/download"
                className="bg-primary-container text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all scale-100 active:scale-95"
              >
                Download for Windows
              </Link>
              <button className="border border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-background transition-all">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-surface-container-highest/60 backdrop-blur-2xl rounded-2xl p-6 border border-outline-variant/20 shadow-2xl purple-glow">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="font-mono text-sm space-y-3">
                <div className="flex gap-2">
                  <span className="text-primary">&gt;</span>
                  <span className="text-white">subkitt create workflow "Morning Brief"</span>
                </div>
                <div className="pl-4 text-on-surface-variant space-y-2 border-l border-primary-container/30">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Connecting to Slack...
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    Fetching Calendar events...
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    Generating AI summary...
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-container/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-container/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-surface-container-lowest py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap justify-between items-center gap-8 md:gap-4">
          <div className="flex-1 min-w-[150px] text-center">
            <div className="text-4xl font-headline font-bold text-white mb-1">2.4M+</div>
            <div className="text-on-surface-variant text-sm font-label uppercase tracking-widest">Commands Run</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-primary-container/30"></div>
          <div className="flex-1 min-w-[150px] text-center">
            <div className="text-4xl font-headline font-bold text-white mb-1">150+</div>
            <div className="text-on-surface-variant text-sm font-label uppercase tracking-widest">Integrations</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-primary-container/30"></div>
          <div className="flex-1 min-w-[150px] text-center">
            <div className="text-4xl font-headline font-bold text-white mb-1">99.9%</div>
            <div className="text-on-surface-variant text-sm font-label uppercase tracking-widest">Uptime</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-primary-container/30"></div>
          <div className="flex-1 min-w-[150px] text-center">
            <div className="text-4xl font-headline font-bold text-white mb-1">45k+</div>
            <div className="text-on-surface-variant text-sm font-label uppercase tracking-widest">Active Users</div>
          </div>
        </div>
      </section>

      {/* Features Bento */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-10 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDACT4EHA_qFYsYsJGHeHHAxlVR5GMYM3i0ZeMNmEKl28EIWioGtJov-qN_-ggSvtHg8227yPuWVUWShLW-dczYFXAnn-H9ez1tPYqr4Ovv6tflMoaOUzV69SIidPqgik5UqzJMbvdCVnJ9ChqF5MJ2F5t0MMlUy6-CPldn_F79_Gym5Uv5ljW1Qax4FjQOsSEv-xUgnmIjIOVPW8c7Got8ZHZ-UKItk-yZSw_S15wpBBnOHer0pRPFNvsMnz_6KSJsZhvcUu8Bebg" alt="Bento Background" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl font-headline font-bold text-white">Everything. Nothing Extra.</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">A modular powerhouse designed to fit your unique workflow without the bloat of traditional dashboard tools.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="bolt"
              title="Instant Launch"
              desc="Launch any app or script in under 10ms with global hotkeys."
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuCdroNJWsmtJCb9TRrfYlKuvYWmtw9XWs4FaGE2J_KPq6qY7Oc-YFZUw6MMYXPWmuRXu9Cqn68NlZBFjEJFSM8OSzhP_bMcpIJPjmOFcbpbG1YlXvlmdu_frRJRVsVn9D1k2d_g7KWftE_mkCMd3F_DN3taxf9wr8KwF_AhSaerhoop90-O2mnqStxNciugAfDTxXzdOe_xcFgABoVmIZXXgKEN-G9y_0G2r83NK3HQt_d8KQoUbvO8hk3uYb5Xg623j9cj2UzQSbY"
            />
            <FeatureCard
              icon="psychology"
              title="AI Intent"
              desc="Natural language processing that actually understands context."
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuCiE0akV4aEHwsc1n24UNrC3kB6BXEaTRioD_RVcG9rYoeYJvBM_fJwfiIo5rR9cL8YRtKxYlBPQaM_HNLmFU35A-U9fgC-w1ZOEgA8p-VT7SYIWnyxGIRiMEZ9skUHV4c9egw_x2uvGX3cwbis-1esBkvjoh0NJsKdQszLJZynvWs509IRkvwoQ8_9Mn-LwrPcqOmS-pq-inbgr8s26fu0NKg8_AJFrvYsPx3-y2na3K2H5d8cPDAFZu09wYdXuKLysztQEi-WiTU"
            />
            <FeatureCard
              icon="hub"
              title="Smart Hub"
              desc="Consolidate 150+ APIs into a single searchable stream."
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDBLZ4rbV8PuzQHnQ_fjFfjgFBUD_2qAlK-OiWa4oh7vnSt9fqnLmpi7iGX0hLc52JDor03_y5YqqdZa_illqh4m3bwviCKxWzsTK0iPStnJCu_I32MtF4LpV3dSLpuLRQITfbgCnIm2TGGM6OoS9QrSTKbMTkpNWGBAGwwkQV8NIeFCOPp16_uDaQ0N_haXqT9zi-FJcxCcM8J66r8OVAZ6UEYJzJQzggf55ysRJH4qbTxs5XZymvJ4d6667oUC51d14LPrBSevog"
            />
            <FeatureCard
              icon="security"
              title="Encrypted"
              desc="Zero-knowledge encryption for all your local automation data."
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuAkSda4daCP7hocrbZncxVw40XyCoYge3GuMQTo7sx565JqCyVeVMF30NJ7HuefY1qhf_F9McnEMxZzSAiweSgQpIocHgSY6_kH-gS3ZvNxtd2SLrBwVsy9cgGkoFhJzaey8DTZg7vfi9_1piWVq6w_ZZRXvGIHpJ6photyEP7edhLxzSy6P2vm-f9s0h5g8cIy5OteCJE_iHcgR5kuX3veutKDbHL_JlzvpGS8lkj0cLNrkm4bk8IEybWd4dWkj-ZRf88NG1W_hBc"
            />
          </div>
        </div>
      </section>

      {/* Scheduled Automations */}
      <section className="py-24 relative overflow-hidden bg-surface">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-10 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDviSm6X2u-PgC48rH_rVoXR6UQgUxObjLJTcS9vk2eptu2Foi3C8ylSU2zWONtGSHxDVtLUxRGg4ofh5HV_pdwBL7flmI2Hz66TBZm664ZcX0twzPDkcAfsDPac8E4lI_0oseCrfO4esyJJ20NProlDQVijmTtMFzACizwRh-GxU796JkjKfvuZOvXj6GY1-DeSA4YAPijVrX4WH0G2Q4FW8WFn-ITCilTe6CodWpjiTn9bAFhHnFUxVkypzsN8SynSYbshUNeU-U" alt="Scheule Background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-4xl font-headline font-bold text-white">Set it. Forget it.</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScheduleCard emoji="☕" type="DAILY" title="Morning Prep" time="08:00 AM" />
              <ScheduleCard emoji="🧹" type="WEEKLY" title="Cache Cleanup" time="Fri, 11:00 PM" active />
              <ScheduleCard emoji="📸" type="MONTHLY" title="Cloud Backup" time="1st, 12:00 AM" />
              <ScheduleCard emoji="💬" type="ACTIVE" title="Auto-Reply" time="Slack Status" />
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/10 shadow-xl">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline font-bold text-white">Timeline Preview</h3>
              <span className="material-symbols-outlined text-primary">more_horiz</span>
            </div>
            <div className="space-y-8 relative">
              <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-outline-variant/20"></div>
              <TimelineItem status="NOW RUNNING" title="System Optimization" desc="Cleaning browser temporary files..." active />
              <TimelineItem status="UP NEXT (12:00 PM)" title="Lunch Break Protocol" desc="Muting notifications and setting status" />
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Chains */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-12 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_0GHbR5jS9vXndG0D-gTWdBx5Pax1TN6lAQP3AsA97kKSCWO_7I-ym0Ld67KtuVNSMvIhHcLachpmOlkgvjoF4Zyz8i0BcmGNXtSurraYIUoXos1a5vCENxoGJWJ8R-YpUkhg9_rl1G5icsktKL8taQXK2UaSYQ2dMlVr2n_CyfhGASPAx6gi5iFw-F5lZrAo0crKZh_GOPrBKoU-qyaqSOlEw9mMb8Js_qlGyBbB_qk_-vTmwhBTZPVTlRuNL2w7cZLeyP-LWEc" alt="Chains Background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-5xl font-headline font-extrabold text-white">Chain Actions. Build Workflows.</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary">link</span>
                <div>
                  <h4 className="text-white font-bold">Logic Chaining</h4>
                  <p className="text-on-surface-variant">Use IF/THEN logic to create complex multi-app dependencies.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="material-symbols-outlined text-primary">data_object</span>
                <div>
                  <h4 className="text-white font-bold">Variable Injection</h4>
                  <p className="text-on-surface-variant">Pass output from one command as input to the next automatically.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-[#0E0E13] rounded-2xl border border-primary/20 p-6 font-mono text-sm overflow-hidden">
              <div className="flex items-center gap-2 mb-6 text-on-surface-variant/40 text-xs">
                <span>WORKFLOW_EDITOR</span>
                <span className="w-px h-3 bg-white/10"></span>
                <span>prod_v1.sh</span>
              </div>
              <div className="space-y-6">
                <EditorStep num={1} code="read_calendar --today" color="primary-fixed" />
                <div className="ml-4 h-10 w-0.5 bg-gradient-to-b from-primary-container to-secondary-container"></div>
                <EditorStep num={2} code="ai summarize_events $calendar_output" color="white" bgColor="secondary-container" />
                <div className="ml-4 h-10 w-0.5 bg-gradient-to-b from-secondary-container to-primary"></div>
                <EditorStep num={3} code="slack send --to #daily-brief --msg $ai_summary" color="primary-fixed" bgColor="primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-8">
          <div className="relative bg-surface-container-low rounded-3xl p-4 md:p-12 border border-outline-variant/10 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/10 to-transparent"></div>
            <div className="relative z-10 flex flex-col items-center">
              <h2 className="text-4xl font-headline font-bold text-white mb-8">See it in Action</h2>
              <div className="relative w-full aspect-video bg-surface-container-lowest rounded-2xl border border-outline-variant/20 flex items-center justify-center group cursor-pointer overflow-hidden">
                <img className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCArsvjw6fRoBC4AEbRKHK46JFooz_pObpocuPUSmpUuJpTPEZKcg9CWnoP_N1aTidJG3J3TlzEdjUhHrCCdriKKMJ4Fs5gy-Yu6ars-b_5PcX5xt_BPOaY4w1peNp6sGWWMviJcj4of_18uCaNkCQYTe5ZPLyQHSbUKKOJ0g5MgqAoqBX4Y7pbf33kHsLrM5LSYNU7g36qMZQeweRzkDXLnbwsxXC2LczAtylYTuZKegKZtmx4e2RSv0Y7TTd6hbxtVzzvpqacvIM" alt="Demo Video" />
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-background text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-15 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDcUNGh7rbGAyeiC2GUrrgWsTvgx-lLahXi5iKC6ednK6iHJELjZnIsFqaYT3lRtCuyhoN0g8Ax4pL0zEn1BAuMOu_CGNdnhmo9LG-2C1q9-6WrHr7kUCd0MN8MPo8Qg7rXQULxcW96gUSul5jRH2nJJKIMmQW_uoOR26sCfS7BoLBw1CFmIKxpYyTzijHA4hqU3b-F4jJ8LhE7xxg8ENu7E8WQfDqqdZ5A2kOzv1JHPWD2lvVLV4FmGw_eYVcplYUx3lrVbR8AFHs" alt="Pricing Background" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-headline font-bold text-white">Pricing for Everyone</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard title="Starter" price="$0" subtitle="/ forever">
              <PricingFeature text="5 Custom Workflows" />
              <PricingFeature text="Local Only execution" />
              <PricingFeature text="Standard Integrations" />
            </PricingCard>
            <PricingCard title="Pro" price="$12" subtitle="/ mo" popular>
              <PricingFeature text="Unlimited Workflows" bold />
              <PricingFeature text="Cloud Sync & Backup" bold />
              <PricingFeature text="AI Intent Engine" bold />
              <PricingFeature text="Premium Integrations" bold />
            </PricingCard>
            <PricingCard title="Enterprise" price="Custom" subtitle="">
              <PricingFeature text="Self-Hosted Option" />
              <PricingFeature text="SSO & SAML" />
              <PricingFeature text="Priority 24/7 Support" />
            </PricingCard>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-32 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-20 grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAH1pCKdrs_REZMCCiaRIicqUhSwve5sgeRB1GtarjxAjnuvec6EjxPopzy2KJF-4VFwixxlFOd7HlSXskvwqWTp0Izfinuq0wUJTXrw5aMKT3VqvVjCVd6VbRf5n4HZE6K5HYMcUYWAwuOMfdL8-0k2eOKGvNPZ0UMO3KUHVWDqcYud0iGRGGxegSEux8m9EwWGXvnbUUE7GMx0AFVy32Dfb-knEOqGwCKp9Jhy0EeXPTVc4CYIALq66TOpA8bWoN4sdA6peUmWL4" alt="CTA Background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center space-y-10">
          <h2 className="text-6xl font-headline font-extrabold text-white">Ready to take control?</h2>
          <p className="text-xl text-on-surface-variant">Join 45,000+ power users and transform your desktop experience today.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-primary-container text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:scale-105 transition-transform">
              Download for Windows
            </button>
            <div className="text-on-surface-variant/40 text-sm flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-xs">info</span>
              Also available for macOS and Linux (Beta)
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function FeatureCard({ icon, title, desc, img }: any) {
  return (
    <div className="bg-surface-container-high/40 backdrop-blur-md rounded-xl p-6 border border-outline-variant/10 hover:bg-surface-container-high transition-all group">
      <div className="w-12 h-12 rounded-lg bg-primary-container/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <span className="material-symbols-outlined text-primary">{icon}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-on-surface-variant text-sm mb-4">{desc}</p>
      <img className="w-full h-24 object-cover rounded-lg opacity-40 group-hover:opacity-60 transition-opacity" src={img} alt={title} />
    </div>
  )
}

function ScheduleCard({ emoji, type, title, time, active }: any) {
  return (
    <div className={`p-4 rounded-xl border ${active ? 'bg-surface-container-high border-l-4 border-primary' : 'bg-surface-container-high/60 border-outline-variant/20 cursor-pointer hover:border-primary'} transition-all`}>
      <div className="flex justify-between items-start mb-2">
        <span className="text-2xl">{emoji}</span>
        <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold">{type}</span>
      </div>
      <h4 className="font-bold text-white">{title}</h4>
      <p className="text-xs text-on-surface-variant">{time}</p>
    </div>
  )
}

function TimelineItem({ status, title, desc, active }: any) {
  return (
    <div className={`relative pl-10 ${!active && 'opacity-50'}`}>
      <div className={`absolute left-2.5 top-1.5 w-3.5 h-3.5 rounded-full ${active ? 'bg-primary' : 'bg-outline-variant'} border-4 border-surface-container-lowest`}></div>
      <p className={`text-xs ${active ? 'text-primary' : 'text-on-surface-variant'} font-bold mb-1`}>{status}</p>
      <h5 className="text-white font-bold">{title}</h5>
      <p className="text-sm text-on-surface-variant italic">{desc}</p>
    </div>
  )
}

function EditorStep({ num, code, color, bgColor = "primary-container" }: any) {
  return (
    <div className="flex items-center gap-4">
      <span className={`w-8 h-8 rounded-full bg-${bgColor} flex items-center justify-center text-xs text-white`}>{num}</span>
      <code className={`text-${color}`}>{code}</code>
    </div>
  )
}

function PricingCard({ title, price, subtitle, children, popular }: any) {
  return (
    <div className={`bg-surface-container-low p-8 rounded-2xl border ${popular ? 'border-2 border-primary-container relative shadow-[0_0_40px_rgba(124,58,237,0.15)]' : 'border-outline-variant/20'} flex flex-col`}>
      {popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-white px-4 py-1 rounded-full text-xs font-bold">MOST POPULAR</div>}
      <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
      <div className="text-4xl font-headline font-extrabold text-white mb-6">{price} <span className="text-sm font-normal text-on-surface-variant">{subtitle}</span></div>
      <ul className="space-y-4 mb-10 flex-grow text-on-surface-variant">
        {children}
      </ul>
      <button className={`w-full ${popular ? 'bg-primary-container text-white' : 'border border-outline-variant'} py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all`}>
        {title === 'Starter' ? 'Start for Free' : title === 'Pro' ? 'Go Pro' : 'Contact Sales'}
      </button>
    </div>
  )
}

function PricingFeature({ text, bold }: any) {
  return (
    <li className={`flex items-center gap-2 ${bold ? 'font-bold text-white' : ''}`}>
      <span className="material-symbols-outlined text-sm text-primary">check</span> {text}
    </li>
  )
}
