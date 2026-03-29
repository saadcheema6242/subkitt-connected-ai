import Header from "../components/Header"
import Footer from "../components/Footer"

export default function AboutPage() {
    return (
        <main className="min-h-screen flex flex-col bg-background">
            <Header />

            {/* Hero Section */}
            <header className="relative h-[819px] flex items-center justify-center pt-44 overflow-hidden">
                <img
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-lighten"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuTBpH4DHbcQOkGcHgT6B33sxeZHC2LJC-JluYlqIrCVUWBtba6fccQ4uIP2ub2oT-9KRAx6Opp4yFFqQlx-ef0hrjgRgXnHNeHFGeAgBmRRxjfkYI_jHBH7Cp2xt1s68P4MYrriO2boA1ItOkIIEVSUPl_84S1VdQ35DN2A41Zl8YFsS0mjwt_JICo3Gq90tJ54dPGxYureLKS7311Z3ZKCoMyDaEtlc0QSPjejvcZCD56kCxIwYt17bHCIAUWknfFHK1tZJqQ34"
                    alt="About Hero"
                />
                <div className="absolute inset-0 cinematic-gradient"></div>
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-6 leading-none">
                        Built for People <br />Who Move Fast
                    </h1>
                    <p className="text-on-surface-variant text-lg md:text-xl max-w-2xl mx-auto">
                        In an era of digital friction, we build tools that disappear, allowing your creativity and momentum to take center stage.
                    </p>
                </div>
            </header>

            {/* Mission & Portrait Section */}
            <section className="py-24 px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                <div className="md:col-span-7">
                    <blockquote className="font-headline text-3xl md:text-5xl italic text-primary leading-tight font-light">
                        "Our mission is to bridge the gap between human ambition and technical execution, making the complex feel like second nature."
                    </blockquote>
                </div>
                <div className="md:col-span-5">
                    <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-2xl">
                        <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiU_5FE6ET_sR_DTVFZZ9Ty-HvxkZGoaTLtRAWw-UO02TTsfSUVLZzf2xMsNR7T3wQd7Dq04RpJGltLFwExLGOdtUk9xSQQQZx_itWtbVYRjg5jD9yM8xgIPTspDSnbFWbdloLPfZyZpgHFPVwzXC_ikh5Ve9QX21HKb1aDyMY6CyjH69boUhuz3JH1WOG97OseLIDZXOs0H93dclYlPPiqZm-JR7ku_ToKJJ5FkCCdVVk4ia4crs4DDw5hoiEiXdAZYMbmfsp6uk" alt="Inspiration" />
                        <div className="absolute inset-0 bg-primary-container/10"></div>
                    </div>
                </div>
            </section>

            {/* Value Bento Grid */}
            <section className="py-24 px-8 bg-surface-container-lowest">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard num="01" title="Privacy First" desc="Your data is yours. We build with end-to-end encryption by default, not as an afterthought." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAFhE5AbO7IOS5GVvvCKVoENmaykwaZk9cMJobYABbZ_SCGg7AnCRFqA-NAq6vV8nntnxhzkYLLu_rzgCbD95MstZXjVQoRbw6SmjP1W_Oom9dmRTAdO1lhdZv6rLO_3o7fZdvrp9Dv1kWNBRbuFp4x3xyyRGu0S5mDsdm0oCTQTAWqmv7_QdL020PxgYxRMSOGlsQnIFXG_N78FOjekPtNEzCg8IhUSxbPyNHzORS9OPIKB7y50DpHWt_g6rYevZbaIsc0kJEZXjI" />
                        <ValueCard num="02" title="Power Without Code" desc="Democratizing complex workflows through intuitive, high-performance visual interfaces." img="https://lh3.googleusercontent.com/aida-public/AB6AXuAR4GpTEu_3DfXDJL-1mMn7vXIi_mwDVWM4r8I6OC6v4Kj-g81bAjQekhQuo9RglazXKONcdSQqEQ1_SYL879erqbf6nCxXv-BeJIB0xLYMYcuZu1Oem4ZnSup0u5QmLZv6JBDT5UzhwS2Klld936jqf5OfVZy8C8rjfedfiv9uNiQ1bcZmF2UlftiTk4GoQzJOd7EbDKYRnmTfHxhH79H_q1pvy9Cr3Nthi6b50vs7FZ-AeqM1VW50Sxog5s2B4f5RMmu8OsvwR5s" />
                        <ValueCard num="03" title="Built for Speed" desc="Performance is a feature. Our infrastructure is optimized for sub-millisecond responses." img="https://lh3.googleusercontent.com/aida-public/AB6AXuBXEk1_n-zTH-kgJX-mA45HuueA-BNILRudCQG47HzIKa-pcJeW-74UxFO6ito2RIrDlxOwM-mtF0E79aNM5fx4fnFZTTUHLEsM7ThHunXOrF6O-2AADAWOimtStt9PyAN43s7vbqj9cUiUpYPKPhgsg_hVaBdxwfHVbLtn72PyLxmToR0p1qL6VinnQ8ubKZfuXxPXby77YQRC4j7566Z8rT5q-MuknTc1q_r_dIrV8r9uE5rKOMZij8VsqUZ3LOSZmHFZG0teW7s" />
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 px-8 max-w-7xl mx-auto">
                <h2 className="font-headline text-4xl font-bold text-white text-center mb-16">The Minds Behind SubKitt</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    <TeamMember name="Julian Vane" role="CEO & Founder" img="https://lh3.googleusercontent.com/aida-public/AB6AXuAfeMMLHMkhNdmHOwzH04bj-3E6JqN97GN4LArn2FhOK7secsV9Zfr8aTfnPr0QGdzXzaZQcMoNcBi2imXuB7DQCWbQ_dLF082elcFYGPK1b-eVgCcDc414bZT-7RSWjs1Y3fgW4_VdwaiKtKqQTzDfvTFc_Xl9tsHBECIhCxQ2wf7o1WjMqCQhgeKZJROdk6zUGAnOgvnnwtRAi-PlnY2aK7J9ScX_6ajr5SPKK1DhnYcbOx3BWoqO2BjEr7YiyKBVHQbrjhngDcc" />
                    <TeamMember name="Sarah Chen" role="Head of Design" img="https://lh3.googleusercontent.com/aida-public/AB6AXuC4CbWGZx1hfHvsVclIJ9iX6zAHxtyRAmTCshrGsmxJhuQHHUKG4FKlpf-mvakcJwyY00lPHjDUiGgvI7Lx-vZbOTz9oFX2dnOceZsjtR6DS6YB6sNJul14fQmUQYDJwss6YPo_EEs9qHn8NlGQIF8wJ0ohe8tfUkyRR7w-uutB8b7AT7dKHGyBqTw1pZ76aP2spEMHTcGGY1HGgMgIUGkbD3PuKGGHnnmIrjWmdBDVS2L2la_bqWJ91gbZ3XRxyRm5HsAIfyZIxic" />
                    <TeamMember name="Marcus Thorne" role="CTO" img="https://lh3.googleusercontent.com/aida-public/AB6AXuAJZloU0R9z5Ds1GTBsMUyhXsjBAh52XxhYo_h0lCXge1Ck0K1vPgXVAXdZcdGu-sBLot_6WkF9fTPevPlCdUs3jSRu640rjEGSxy2ChK9O0hSKGj0nl8y3grYZEnxKb-VlXby1Dd8FrOv4G-VMFoF1j68hgU_jcDNPj7hppg8wkCxJLpwwP3ucZvlmIW9tN2V4NiD3fwzD5rxETnYKE_l1SagCzkmytwVNyFh7Dv-IlDnPKlDPFaj1HeuS5dNEJdAu6hU1I8cHF2c" />
                    <TeamMember name="Elena Rossi" role="Ops Director" img="https://lh3.googleusercontent.com/aida-public/AB6AXuBOzCp1JenvgdkBN95QlxZTclWqW0SvU1M0onVofHZfQ9jGKCyzkvUImg77Smzu5sy1yyBQw0bqVO5lfrgQckNsM2J-rsjBnVdBy6qHPgNOXdPmN811ol5uv-vEMnhGLnHj4UdMIYV8C1VVIbJJh8jLq2Wyx_M-L3LE3oIYECAtYHZBOOu6vi0LM-UJFqDQxHSuR1Bu8Q6FCsfJc2FMoAFwfsYEKu6rcPBz7d1psZ3MmS8Q-Gwz_wV3zgMt6z1uzxKMqa2P-AoWuik" />
                </div>
            </section>

            {/* Company Timeline */}
            <section className="py-24 px-8 bg-surface">
                <div className="max-w-4xl mx-auto relative">
                    <h2 className="font-headline text-4xl font-bold text-white text-center mb-24">The Journey So Far</h2>
                    <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-primary via-primary-container to-transparent opacity-30 hidden md:block"></div>
                    <div className="space-y-24 relative">
                        <Milestone year="FALL 2021" title="The Genesis" desc="Code zero. Two developers and a vision for frictionless AI integration." img="https://lh3.googleusercontent.com/aida-public/AB6AXuBJvOjNx7wlpCoo02JsNeP8xxnNWEpWZr1RxrNP2uZeUQ3h43V-W5Mq7WtVBNGPyj-HK1ZBKICwhT_60oaN5tqcWz5LNrIXHQrxj2jZlm_6N8ELIB8gAXnai6it9AwuCuA5kkGfOrJvVeKZTdtjBdSY2DuxkB6cqXlXzhv99VtjVK4Q2sL43eBG3VpHy8FhswE7esoDzHxtPpBuSi5T2GaM38GHiXIkNFWEvy1QX1XfzuaTZaz8puKAdV10rtJUh4S3jaq4_1ohpt8" />
                        <Milestone year="WINTER 2022" title="Public Launch" desc="We opened our doors to the first 500 beta users. The response was electric." img="https://lh3.googleusercontent.com/aida-public/AB6AXuBH9E0ANROXBvR4TQBy82dstyA9Za0NG6XWxn9E-bRO2-QiwjJux6HG7wZ4fVjxa9Xio_yCQkPU9gkyPr5a2FBM05nL_mj2eBlUru42NxxrihiJxvBwRamILSvjmWzXeFg6oLvoCtEYtIOvlIy6BAZ-nztNYUN4S9c-4SykIHPcjLz4twTg4ijYzd78Al1hVfRvX67tVz8A6TTJAA8J3706F-Hd-28uziEiw_xA9QULBOG7WPZqB77uvPX106Mv8PpHrYU4QKDlgAs" reverse />
                        <Milestone year="SUMMER 2023" title="Global Expansion" desc="Showcasing SubKitt on the world stage at Web Summit 2023." img="https://lh3.googleusercontent.com/aida-public/AB6AXuDYp8r5kkA6Sczvz2S0Gi5O8zG6IMZ7vjY0q3QaqUYAAbIvg0uIsaZuJuq1jb_YZ9ngA8lFsqlK0e0AX290pyVSTAr-QtTHbLKYUbBpD6VVo4aCa-cnyA3BtHdsM9DpnzWTtgEyfqXLzSGN_R8xLuxUdqGs6yE7ckLu44jcUpIePYPl_uBZ0RNeawsB4EKruA6BUEfWlvI9BRi_prDaqtcb3EVo1NyXd9JPfNrADcW4NzLNzqWClNNHcWWV5L9Hnm31xZpPztaXkyk" />
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="relative py-32 overflow-hidden bg-surface-container-lowest">
                <img className="absolute inset-0 w-full h-full object-cover opacity-15" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAivuUmfEny23cgz9weXLE5xg4DSrXldzufqEx8GB_r9g9Tm2_6g7WJbwKlLJmsCMieb8gikut5eBUSSKFL1ACkhnFwok5rVGfcEfvQFJKpTg2vFNsNfuheXfIPf0NPsKz70cUWIoBPshbxffjzg0Eoh0tGcRywMF_FBA_4XH3zziC0vz77Enm01wH8DYCwOsHd-hny-dXerfwYiRr6vR5xLi6RMnF9zyV68aty6dULjE5t8B3NYkOO0q6e2q3GLG6kRVbK_VfonX0" alt="CTA Background" />
                <div className="relative z-10 text-center px-8">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-4">Join 2,400+ users</h2>
                    <p className="text-on-surface-variant text-lg max-w-xl mx-auto mb-10">Start your journey into a more efficient, cinematic workflow today.</p>
                    <button className="bg-primary hover:bg-white text-on-primary-fixed font-bold px-10 py-4 rounded-xl text-lg transition-all duration-300 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                        Download Now
                    </button>
                </div>
            </section>

            <Footer />
        </main>
    )
}

function ValueCard({ num, title, desc, img }: any) {
    return (
        <div className="bg-surface-container-high rounded-3xl p-8 flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-500 border border-outline-variant/10">
            <div>
                <span className="font-headline text-4xl font-black text-primary/20 mb-8 block">{num}</span>
                <h3 className="text-2xl font-headline font-bold text-white mb-4">{title}</h3>
                <p className="text-on-surface-variant leading-relaxed mb-8">{desc}</p>
            </div>
            <div className="h-48 rounded-xl overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={img} alt={title} />
            </div>
        </div>
    )
}

function TeamMember({ name, role, img }: any) {
    return (
        <div className="text-center group">
            <div className="w-32 h-32 md:w-48 md:h-48 mx-auto mb-6 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 shadow-xl">
                <img className="w-full h-full object-cover" src={img} alt={name} />
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl">
                <h4 className="font-headline font-bold text-white">{name}</h4>
                <p className="text-primary text-sm uppercase tracking-widest font-bold mt-1">{role}</p>
            </div>
        </div>
    )
}

function Milestone({ year, title, desc, img, reverse }: any) {
    return (
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-0`}>
            <div className={`md:w-1/2 ${reverse ? 'md:pl-12 text-left' : 'md:pr-12 text-right'} text-center`}>
                <span className="font-headline text-primary font-bold tracking-widest">{year}</span>
                <h3 className="text-2xl font-bold text-white mt-2">{title}</h3>
                <p className="text-on-surface-variant mt-2">{desc}</p>
            </div>
            <div className="relative z-10 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-[0_0_15px_rgba(210,187,255,0.6)] hidden md:block"></div>
            <div className={`md:w-1/2 ${reverse ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-surface-container-high p-4 rounded-2xl border border-outline-variant/10">
                    <img className="rounded-xl w-full grayscale opacity-70" src={img} alt={title} />
                </div>
            </div>
        </div>
    )
}
