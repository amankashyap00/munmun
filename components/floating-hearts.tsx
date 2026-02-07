"use client"

import { useEffect, useState } from "react"

interface Heart {
  id: number
  left: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const generated: Heart[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
      opacity: Math.random() * 0.4 + 0.1,
    }))
    setHearts(generated)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float"
          style={{
            left: `${heart.left}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            opacity: heart.opacity,
          }}
        >
          {"<3".replace("<3", "\u2764\uFE0F")}
        </div>
      ))}
    </div>
  )
}
