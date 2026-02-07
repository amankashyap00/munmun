import { FloatingHearts } from "@/components/floating-hearts"
import { HeroSection } from "@/components/hero-section"
import { LoveMeter } from "@/components/love-meter"
import { ReasonsSection } from "@/components/reasons-section"
import { LoveLetter } from "@/components/love-letter"
import { DateCustomizer } from "@/components/date-customizer"
import { ValentineQuestion } from "@/components/valentine-question"

export default function Page() {
  return (
    <main className="relative overflow-hidden">
      <FloatingHearts />

      {/* Section dividers use soft curves */}
      <HeroSection />

      <div className="w-24 h-px bg-border mx-auto" />

      <LoveMeter />

      <div className="w-24 h-px bg-border mx-auto" />

      <ReasonsSection />

      <div className="w-24 h-px bg-border mx-auto" />

      <LoveLetter />

      <div className="w-24 h-px bg-border mx-auto" />

      <DateCustomizer />

      <div className="w-24 h-px bg-border mx-auto" />

      <ValentineQuestion />

      {/* Footer */}
      <footer className="text-center py-10 text-muted-foreground text-sm">
        <p>Made with all my heart, just for you, Kumkum</p>
        <p className="mt-1 text-xs">{"(Yes, I actually built this whole website for you)"}</p>
      </footer>
    </main>
  )
}
