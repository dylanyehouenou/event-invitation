import { StarField } from "./StarField"
import { RoseField } from "./RoseField"

export function Background() {
  return (
    <>
      {/* Roses blanchées */}
      <RoseField />

      {/* Orbes de fond animés */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Orbe gauche-bas : rouge profond */}
        <div className="animate-orb-1 absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-radial from-[#3A0000]/60 via-[#1A0000]/30 to-transparent blur-3xl" />

        {/* Orbe droite-haut : rouge sombre */}
        <div className="animate-orb-2 absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-gradient-radial from-[#2A0000]/55 via-[#120000]/25 to-transparent blur-3xl" />

        {/* Orbe centre : lueur rouge subtile */}
        <div className="animate-orb-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-radial from-[#1A0000]/20 via-transparent to-transparent blur-3xl" />

        {/* Vignette périphérique */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#030000]/70" />
      </div>

      {/* Étoiles */}
      <StarField />
    </>
  )
}
