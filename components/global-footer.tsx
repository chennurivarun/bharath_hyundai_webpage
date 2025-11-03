import type { ReactNode } from "react"
import Link from "next/link"
import { Facebook, Instagram, Youtube, Phone } from "lucide-react"

const CAR_LINKS: Array<{ name: string; href: string }> = [
  { name: "i10 Nios", href: "/model/nios" },
  { name: "Aura", href: "/model/aura" },
  { name: "Exter", href: "/exter" },
  { name: "i20", href: "/model/i20" },
  { name: "i20 N Line", href: "/i20-nline" },
  { name: "Venue", href: "/venue" },
  { name: "Venue N Line", href: "/venue-nline" },
  { name: "Verna", href: "/model/verna" },
  { name: "Creta", href: "/creta" },
  { name: "Creta N Line", href: "/creta-nline" },
  { name: "Creta EV", href: "/model/creta-ev" },
  { name: "Alcazar", href: "/alcazar" },
  { name: "Tucson", href: "/tucson" },
  { name: "IONIQ 5", href: "/model/ioniq5" },
]

const FIRST_COLUMN_COUNT = Math.ceil(CAR_LINKS.length / 2)

const CAR_COLUMNS = [
  CAR_LINKS.slice(0, FIRST_COLUMN_COUNT),
  CAR_LINKS.slice(FIRST_COLUMN_COUNT),
]

const SOCIAL_LINKS: Array<{ name: string; href: string; icon: ReactNode; bg: string }> = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/",
    icon: <Facebook className="h-4 w-4" aria-hidden />,
    bg: "bg-[#4064ac]",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: <Instagram className="h-4 w-4" aria-hidden />,
    bg: "bg-[#1f1f1f]",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/",
    icon: <Youtube className="h-4 w-4" aria-hidden />,
    bg: "bg-[#ff0000]",
  },
]

export function GlobalFooter() {
  return (
    <footer className="relative bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold tracking-wide text-white">BHARATH HYUNDAI</h2>
            <address className="not-italic text-sm leading-relaxed text-white/80">
              #3,4,5,6 Survey No 58/1, Gowdiloddi,<br />
              Gopanpally, Financial District,<br />
              Gachibowli – 500075.
            </address>
            <div className="text-sm text-white/80">
              <p className="font-medium uppercase tracking-[0.2em] text-xs text-white/60">Email</p>
              <a href="mailto:bharathyundaidm@gmail.com" className="mt-1 inline-block text-white/80 hover:text-white">
                bharathyundaidm@gmail.com
              </a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Hyundai cars</h3>
            <div className="grid grid-cols-1 gap-x-10 gap-y-2 text-sm text-white/80 sm:grid-cols-2">
              {CAR_COLUMNS.map((group, columnIndex) => (
                <ul key={columnIndex} className="space-y-2">
                  {group.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="transition-colors hover:text-white/60"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">About Us</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <Link href="/about" className="transition-colors hover:text-white/60">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white/60">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="transition-colors hover:text-white/60">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Follow Us</h3>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.name}
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${link.bg} transition-transform hover:scale-105`}
                >
                  {link.icon}
                </Link>
              ))}
            </div>
            <div>
              <a
                href="tel:+917733888999"
                className="inline-flex items-center gap-2 rounded-lg bg-[#5864d6] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#5864d6]/40 transition hover:bg-[#4955c0]"
              >
                <Phone className="h-4 w-4" aria-hidden /> 7733888999
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Bharath Hyundai. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-white/40">Hyundai Motor India Ltd. Authorized Dealer</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default GlobalFooter

