"use client"

import { useState } from "react"
import { Heart, Mail } from "lucide-react"

export function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-primary mb-8">
          A Little Letter
        </h2>

        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative inline-flex flex-col items-center gap-3 p-8 bg-card rounded-2xl 
              border-2 border-dashed border-primary/40 hover:border-primary transition-all duration-500
              hover:shadow-lg cursor-pointer"
          >
            <Mail className="w-16 h-16 text-primary group-hover:scale-110 transition-transform duration-300" />
            <span className="text-foreground font-medium text-lg">Tap to open</span>
            <span className="text-muted-foreground text-sm">{"(it's a love letter, don't be scared)"}</span>
          </button>
        ) : (
          <div className="bg-card rounded-2xl border border-border shadow-md p-8 animate-fade-in-up text-left">
            <p className="font-serif text-2xl text-primary mb-6">Dear Kumkum,</p>
            <div className="space-y-4 text-foreground leading-relaxed">
            <p>
                If someone told me I'd be making a whole website just to ask you to be my Valentine,
                I would have said they're crazy. But here we are, and honestly? I'd build a hundred
                more if it made you smile.
                <span className="block mt-2 font-medium italic">
                  Though, looking back, I realize I was pretty dumb for not coming up with this
                  idea sooner—it took me a minute to realize that a girl like you deserves
                  more than just a standard text; you deserve your own corner of the internet.
                </span>
              </p>
              <p>
                You're not just my favourite person to talk to, laugh with, and spend time with.
                You're the reason my phone battery is always low, my reason to smile on random
                Tuesday afternoons, and the only person whose texts I read seventeen times.
              </p>
              <p>
                Every moment with you feels like a little gift, and I don't say that to be cheesy
                (okay, maybe a little cheesy). I say it because it's true.
              </p>
              <p className="font-semibold">
                So, Kumkum... will you be my Valentine? Not just today, but every day?
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 mt-6 text-primary">
              <span className="font-serif text-xl">With all my love</span>
              <Heart className="w-5 h-5 fill-primary" />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
