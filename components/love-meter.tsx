"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"

const messages = [
  { min: 0, max: 20, text: "Nice try... but it won't go below 100% for you!" },
  { min: 21, max: 40, text: "Haha, you think you can lower my love? Impossible!" },
  { min: 41, max: 60, text: "Cute attempt, but this meter only goes UP for Kumkum!" },
  { min: 61, max: 80, text: "Getting warmer... but you're always at the top!" },
  { min: 81, max: 99, text: "So close to the truth..." },
  { min: 100, max: 100, text: "Because my love for you is literally immeasurable!" },
]

export function LoveMeter() {
  const [sliderValue, setSliderValue] = useState(50)
  const [displayValue, setDisplayValue] = useState(100)
  const [message, setMessage] = useState(messages[5].text)
  const [sparkles, setSparkles] = useState(false)

  useEffect(() => {
    // The meter always shows 100% or goes higher no matter what you do
    const rigged = Math.max(100, sliderValue + 50)
    const display = Math.min(rigged, 200)
    setDisplayValue(display)

    if (sliderValue < 20) {
      setMessage(messages[0].text)
    } else if (sliderValue < 40) {
      setMessage(messages[1].text)
    } else if (sliderValue < 60) {
      setMessage(messages[2].text)
    } else if (sliderValue < 80) {
      setMessage(messages[3].text)
    } else if (sliderValue < 100) {
      setMessage(messages[4].text)
    } else {
      setMessage(messages[5].text)
    }

    setSparkles(true)
    const timer = setTimeout(() => setSparkles(false), 600)
    return () => clearTimeout(timer)
  }, [sliderValue])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-primary mb-2">
          Love Meter
        </h2>
        <p className="text-muted-foreground mb-10 text-base">
          Try to change how much I love you... I dare you
        </p>

        {/* The big heart with percentage */}
        <div className="relative mb-10">
          <div className={`inline-flex items-center justify-center w-44 h-44 md:w-52 md:h-52 relative ${sparkles ? "animate-pulse-heart" : ""}`}>
            <Heart className="w-full h-full text-primary fill-primary absolute" />
            <span className="relative z-10 text-3xl md:text-4xl font-bold text-primary-foreground">
              {displayValue}%
            </span>
          </div>

          {/* Sparkle effects */}
          {sparkles && (
            <>
              {[...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="absolute animate-sparkle text-accent text-xl"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                >
                  {"*".replace("*", "\u2728")}
                </span>
              ))}
            </>
          )}
        </div>

        {/* Slider */}
        <div className="px-4 mb-6">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer bg-secondary 
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:transition-transform
              [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full 
              [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0"
            aria-label="Love meter slider"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>A little</span>
            <span>A LOT</span>
          </div>
        </div>

        {/* Funny message */}
        <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
          <p className="text-foreground font-medium text-lg leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </section>
  )
}
