import Link from "next/link"

export default function Logo({ className = "" }: { className?: string }) {
    return (
        <Link href="/" className={`flex items-center group ${className}`}>
            <div className="relative w-64 h-20 overflow-hidden flex items-center justify-center -ml-12">
                <img
                    src="/logo.jpg"
                    alt="SubKitt Logo"
                    className="w-full h-full object-contain scale-[2.2] mix-blend-lighten"
                />
            </div>
        </Link>
    )
}
