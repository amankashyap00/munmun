"use client"

import { useState, useRef, useCallback } from "react"
import { Heart, PartyPopper, Sparkles } from "lucide-react"

const noButtonTexts = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You're breaking my heart!",
  "I'm gonna cry...",
  "You're so mean!",
  "Pretty please?",
  "With a cherry on top?",
  "I'll be sad forever...",
  "OK fine, I'll ask again...",
]

export function ValentineQuestion() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string; delay: number }>>([])
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const yesScale = Math.min(1 + noCount * 0.15, 2.5)

  const handleNo = useCallback(() => {
    setNoCount((prev) => Math.min(prev + 1, noButtonTexts.length - 1))

    // Make the No button run away on larger screens
    if (noButtonRef.current && containerRef.current) {
      const container = containerRef.current.getBoundingClientRect()
      const maxX = container.width / 2 - 60
      const maxY = 100
      const randomX = (Math.random() - 0.5) * 2 * maxX
      const randomY = (Math.random() - 0.5) * 2 * maxY
      noButtonRef.current.style.transform = `translate(${randomX}px, ${randomY}px)`
    }
  }, [])

  const handleYes = async () => {
    setYesPressed(true)
    // Generate confetti
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ["#e11d48", "#f97316", "#ec4899", "#f43f5e", "#fb923c"][Math.floor(Math.random() * 5)],
      delay: Math.random() * 2,
    }))
    setConfetti(pieces)

    // Send the happy news!
    try {
      await fetch("/api/send-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          valentineAnswer: "YES! She said YES!",
          activity: "",
          gift: "",
          music: "",
          cheesiness: "",
        }),
      })
    } catch {
      // Silently fail - the confetti is more important
    }
  }

  if (yesPressed) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        {/* Confetti */}
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute w-3 h-3 rounded-sm"
            style={{
              left: `${piece.left}%`,
              top: "-20px",
              backgroundColor: piece.color,
              animation: `confetti-fall ${3 + Math.random() * 2}s linear ${piece.delay}s forwards`,
            }}
            aria-hidden="true"
          />
        ))}

        <div className="text-center animate-fade-in-up relative z-10">
          <PartyPopper className="w-16 h-16 mx-auto text-accent mb-6" />
          <h2 className="font-serif text-5xl md:text-7xl text-primary mb-4">
            {"Yayyy!"}
          </h2>
          <p className="text-foreground text-xl md:text-2xl font-medium mb-2 leading-relaxed">
            I knew you'd say yes, Kumkum!
          </p>
          <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto leading-relaxed">
            You just made me the happiest person in the entire world.
            This is going to be the best Valentine's Day ever!
          </p>
          <div className="flex items-center justify-center gap-2 text-primary mb-6">
            <Heart className="w-6 h-6 fill-primary animate-pulse-heart" />
            <span className="font-serif text-3xl">Forever yours</span>
            <Heart className="w-6 h-6 fill-primary animate-pulse-heart" />
          </div>
          <div className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card border border-primary/20 shadow-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-primary">{"💖 Plan locked. Sender has been notified."}</span>
            <Sparkles className="w-4 h-4 text-accent" />
          </div>
          <p className="text-muted-foreground text-sm mt-2 italic">{"It feels magical ✨"}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div ref={containerRef} className="w-full max-w-md mx-auto text-center">
        <div className="animate-pulse-heart mb-8">
          <Heart className="w-24 h-24 md:w-32 md:h-32 text-primary fill-primary mx-auto" />
        </div>

        <h2 className="font-serif text-4xl md:text-6xl text-primary mb-4 text-balance">
          Will you be my Valentine?
        </h2>
        <p className="text-muted-foreground mb-10 text-base">
          Kumkum, this is the big question...
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Yes button grows with each "No" */}
          <button
            onClick={handleYes}
            style={{ transform: `scale(${yesScale})` }}
            className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-xl
              hover:shadow-xl transition-all duration-300 hover:brightness-110 active:scale-95
              origin-center"
          >
            {"Yes!"}
          </button>

          {/* No button runs away */}
          <button
            ref={noButtonRef}
            onClick={handleNo}
            className="px-6 py-3 rounded-2xl border-2 border-border bg-card text-foreground font-medium text-base
              hover:border-primary/30 transition-all duration-500 ease-out"
          >
            {noButtonTexts[noCount]}
          </button>
        </div>

        {noCount > 0 && (
          <p className="mt-8 text-sm text-muted-foreground italic animate-fade-in-up">
            {noCount >= 5 ? "The Yes button is getting bigger... just saying..." : "Come on, you know you want to say yes!"}
          </p>
        )}
      </div>
    </section>
  )
}
