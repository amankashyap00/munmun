"use client"

import { useEffect, useRef, useState } from "react"
import { Heart, Star, Smile, Coffee, Music, Sparkles } from "lucide-react"

const reasons = [
  { icon: Heart, text: "Your smile makes my worst days feel like the best ones", color: "text-primary" },
{ icon: Star, text: "You put up with my terrible jokes (and even laugh sometimes)", color: "text-accent" },
{ icon: Smile, text: "The way you scrunch your nose when you're thinking is adorable", color: "text-primary" },
{ icon: Coffee, text: "Our video call dates are my favourite part of any day", color: "text-accent" },
{ icon: Music, text: "You hum songs without realizing and it's the cutest thing ever", color: "text-primary" },
{ icon: Sparkles, text: "You make even the most boring day feel like an adventure", color: "text-accent" },
]

export function ReasonsSection() {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set())
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setVisibleCards((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.2 }
    )

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="min-h-screen flex items-center px-4 py-20">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-2">
            Why I Love You
          </h2>
          <p className="text-muted-foreground text-base">
            Just a few of the million reasons...
          </p>
        </div>

        <div className="flex flex-col gap-5">
          {reasons.map((reason, index) => {
            const Icon = reason.icon
            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el }}
                data-index={index}
                className={`flex items-start gap-4 p-5 bg-card rounded-2xl border border-border shadow-sm 
                  transition-all duration-700 ${
                    visibleCards.has(index)
                      ? "opacity-100 translate-x-0"
                      : index % 2 === 0
                        ? "opacity-0 -translate-x-12"
                        : "opacity-0 translate-x-12"
                  }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`${reason.color} mt-0.5 flex-shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-foreground font-medium text-base md:text-lg leading-relaxed">
                  {reason.text}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
