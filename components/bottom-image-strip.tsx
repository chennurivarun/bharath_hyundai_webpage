"use client"

export default function BottomImageStrip({ images, className = "" }: { images: string[]; className?: string }) {
  const list = Array.isArray(images) ? images.filter(Boolean) : []
  if (list.length === 0) return null
  const doubled = list.concat(list)
  return (
    <section className={`mx-auto max-w-7xl px-4 pb-16 ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <div className="relative">
          <div className="flex gap-4 animate-scroll-slow">
            {doubled.map((src, i) => (
              <div key={`${src}-${i}`} className="h-44 w-72 shrink-0 overflow-hidden rounded-xl">
                <img src={src} alt={`image ${i + 1}`} className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-scroll-slow { animation: scrollX 40s linear infinite; width: max-content; }
        @keyframes scrollX { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </section>
  )
}


