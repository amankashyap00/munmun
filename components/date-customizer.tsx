"use client"

import { useState } from "react"
import { Heart, Send, Loader2, CheckCircle2, Sparkles } from "lucide-react"

const dateActivities = [
  { id: "movie", label: "Movie Night In", icon: "🎬" },
  { id: "dinner", label: "Candlelight Dinner", icon: "🕯️" },
  { id: "walk", label: "Stargazing Walk", icon: "🌙" },
  { id: "cook", label: "Cook Together", icon: "👩‍🍳" },
]

const giftOptions = [
  { id: "chocolates", label: "Chocolates", icon: "🍫" },
  { id: "flowers", label: "Flowers", icon: "🌹" },
  { id: "teddy", label: "Teddy Bear", icon: "🧸" },
  { id: "letter", label: "Love Letter", icon: "💌" },
]

const musicMoods = [
  { id: "romantic", label: "Romantic & Slow" },
  { id: "bollywood", label: "Bollywood Classics" },
  { id: "upbeat", label: "Fun & Upbeat" },
  { id: "acoustic", label: "Soft Acoustic" },
]

export function DateCustomizer() {
  const [selectedActivity, setSelectedActivity] = useState("")
  const [selectedGift, setSelectedGift] = useState("")
  const [selectedMood, setSelectedMood] = useState("")
  const [cheesyLevel, setCheesyLevel] = useState(50)
  const [showSummary, setShowSummary] = useState(false)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [sendError, setSendError] = useState("")

  const cheesyLabels = ["Mild", "Sweet", "Extra Cheesy", "Unbearably Romantic", "Cringe-but-cute"]
  const cheesyIndex = Math.min(Math.floor(cheesyLevel / 21), 4)

  const handlePlan = async () => {
    setShowSummary(true)
    setSending(true)
    setSendError("")

    const planData = {
      activity: dateActivities.find((a) => a.id === selectedActivity)?.label || "Surprise me!",
      gift: giftOptions.find((g) => g.id === selectedGift)?.label || "All of them, obviously",
      music: musicMoods.find((m) => m.id === selectedMood)?.label || "Whatever makes you smile",
      cheesiness: `${cheesyLabels[cheesyIndex]} level`,
    }

    try {
      const res = await fetch("/api/send-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(planData),
      })

      if (res.ok) {
        setSent(true)
      } else {
        setSendError("Couldn't send the plan, but it's saved here!")
      }
    } catch {
      setSendError("Couldn't send the plan, but it's saved here!")
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="min-h-screen flex items-center px-4 py-20">
      <div className="w-full max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-2">
            Plan Our Date
          </h2>
          <p className="text-muted-foreground text-base">
            Customize the perfect Valentine's evening
          </p>
        </div>

        {/* Activity Picker */}
        <div className="mb-8">
          <h3 className="text-foreground font-semibold text-lg mb-3">Pick an Activity</h3>
          <div className="grid grid-cols-2 gap-3">
            {dateActivities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => setSelectedActivity(activity.id)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 text-left
                  ${selectedActivity === activity.id
                    ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.02]"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:shadow-sm"
                  }`}
              >
                <span className="text-2xl block mb-1">{activity.icon}</span>
                <span className="font-medium text-sm">{activity.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gift Picker */}
        <div className="mb-8">
          <h3 className="text-foreground font-semibold text-lg mb-3">Pick a Gift</h3>
          <div className="grid grid-cols-4 gap-3">
            {giftOptions.map((gift) => (
              <button
                key={gift.id}
                onClick={() => setSelectedGift(gift.id)}
                className={`p-3 rounded-2xl border-2 transition-all duration-300 text-center flex flex-col items-center gap-1
                  ${selectedGift === gift.id
                    ? "border-primary bg-primary text-primary-foreground shadow-md scale-[1.05]"
                    : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
              >
                <span className="text-2xl">{gift.icon}</span>
                <span className="text-xs font-medium">{gift.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Music Mood */}
        <div className="mb-8">
          <h3 className="text-foreground font-semibold text-lg mb-3">Music Vibe</h3>
          <div className="flex flex-wrap gap-2">
            {musicMoods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-300 text-sm font-medium
                  ${selectedMood === mood.id
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-border bg-card text-foreground hover:border-primary/50"
                  }`}
              >
                {mood.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cheesy Level Slider */}
        <div className="mb-10">
          <h3 className="text-foreground font-semibold text-lg mb-3">Cheesiness Level</h3>
          <input
            type="range"
            min="0"
            max="100"
            value={cheesyLevel}
            onChange={(e) => setCheesyLevel(Number(e.target.value))}
            className="w-full h-3 rounded-full appearance-none cursor-pointer bg-secondary 
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-lg
              [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full 
              [&::-moz-range-thumb]:bg-accent [&::-moz-range-thumb]:border-0"
            aria-label="Cheesiness level slider"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-muted-foreground">Chill</span>
            <span className="text-sm font-bold text-accent">{cheesyLabels[cheesyIndex]}</span>
            <span className="text-sm text-muted-foreground">Maximum Cringe</span>
          </div>
        </div>

        {/* Plan Button */}
        {!sent ? (
          <button
            onClick={handlePlan}
            disabled={sending}
            className={`w-full py-4 rounded-2xl font-bold text-lg 
              transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
              flex items-center justify-center gap-2
              bg-primary text-primary-foreground hover:shadow-lg
              ${sending ? "opacity-80 cursor-wait" : ""}`}
          >
            {sending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending our plan...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                {"Lock In Our Plan"}
              </>
            )}
          </button>
        ) : (
          <div className="w-full py-6 rounded-2xl bg-card border-2 border-primary/30 text-center animate-fade-in-up">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="text-2xl">{"💖"}</span>
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <p className="text-primary font-bold text-lg">Plan locked. Sender has been notified.</p>
            <p className="text-muted-foreground text-sm mt-1 italic">{"It feels magical ✨"}</p>
          </div>
        )}

        {/* Summary */}
        {showSummary && (
          <div className="mt-8 p-6 bg-card rounded-2xl border border-border shadow-sm animate-fade-in-up">
            <h3 className="font-serif text-2xl text-primary mb-4 text-center">{"Our Perfect Date"}</h3>
            <div className="space-y-3 text-foreground">
              <p>
                <span className="font-semibold">Activity:</span>{" "}
                {dateActivities.find((a) => a.id === selectedActivity)?.label || "Surprise me!"}
              </p>
              <p>
                <span className="font-semibold">Gift:</span>{" "}
                {giftOptions.find((g) => g.id === selectedGift)?.label || "All of them, obviously"}
              </p>
              <p>
                <span className="font-semibold">Music:</span>{" "}
                {musicMoods.find((m) => m.id === selectedMood)?.label || "Whatever makes you smile"}
              </p>
              <p>
                <span className="font-semibold">Cheesiness:</span>{" "}
                {cheesyLabels[cheesyIndex]} level
              </p>
              <p className="text-center text-muted-foreground italic mt-4 text-sm">
                (Honestly, I'd be happy doing absolutely anything as long as it's with you)
              </p>
              {sent && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-center text-sm font-medium text-primary flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-accent" />
                    {"Aman has been notified. He's already planning it! 💕"}
                  </p>
                </div>
              )}
              {sendError && !sent && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-center text-sm text-muted-foreground">
                    {sendError}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
