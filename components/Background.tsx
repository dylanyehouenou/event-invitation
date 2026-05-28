import { StarField } from "./StarField"

export function Background() {
  return (
    <>
      {/* Orbes de fond animés */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Orbe gauche-bas : violet profond */}
        <div className="animate-orb-1 absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-radial from-[#1e0040]/60 via-[#0d0020]/30 to-transparent blur-3xl" />

        {/* Orbe droite-haut : bleu nuit */}
        <div className="animate-orb-2 absolute -right-40 -top-40 h-[700px] w-[700px] rounded-full bg-gradient-radial from-[#001840]/55 via-[#000d28]/25 to-transparent blur-3xl" />

        {/* Orbe centre : reflet doré très subtil */}
        <div className="animate-orb-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gradient-radial from-[#1a1000]/20 via-transparent to-transparent blur-3xl" />

        {/* Vignette périphérique */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#03030A]/70" />
      </div>

      {/* Étoiles */}
      <StarField />
    </>
  )
}
