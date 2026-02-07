"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export function HeroSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Big pulsing heart */}
      <div className="animate-pulse-heart mb-6">
        <Heart className="w-20 h-20 md:w-28 md:h-28 text-primary fill-primary" />
      </div>

      <div
        className={`text-center transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <p className="text-muted-foreground text-lg md:text-xl mb-2 font-medium tracking-wide">
          Dear
        </p>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-primary mb-4 leading-tight">
          Kumkum
        </h1>
        <p className="text-muted-foreground text-lg md:text-2xl font-medium max-w-md mx-auto leading-relaxed">
          I made something special just for you...
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-2 animate-bounce">
        <p className="text-sm text-muted-foreground font-medium">Scroll down</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-primary"
        >
          <path
            d="M12 5v14m0 0l-6-6m6 6l6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  )
}
