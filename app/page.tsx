import { Background } from "@/components/Background"
import { HeroSection } from "@/components/HeroSection"

export default function HomePage() {
  return (
    <>
      <Background />
      <HeroSection />

      {/* Footer discret */}
      <footer className="relative z-10 pb-8 text-center">
        <p className="font-sans text-[11px] tracking-widest text-[#2A2010] uppercase">
          Événement privé · Sur invitation uniquement
        </p>
      </footer>
    </>
  )
}
