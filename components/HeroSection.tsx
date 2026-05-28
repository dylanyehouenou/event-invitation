"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Calendar, Clock } from "lucide-react"
import { InvitationModal } from "./InvitationModal"
import { eventConfig } from "@/lib/config"

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 20 },
  animate:   { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay },
})

export function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-24">
        <div className="flex w-full max-w-2xl flex-col items-center text-center">

          {/* ── Badge supérieur ─────────────────────────── */}
          <motion.div {...fadeUp(0.1)} className="mb-10 flex items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A96E]/60" />
            <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#C9A96E]/80">
              Invitation Privée
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A96E]/60" />
          </motion.div>

          {/* ── Nom de l'événement ───────────────────────── */}
          <motion.h1
            {...fadeUp(0.25)}
            className="font-serif text-6xl font-light leading-none tracking-[0.06em] text-[#F0EBE1] sm:text-7xl md:text-8xl"
          >
            {eventConfig.name}
          </motion.h1>

          {/* ── Tagline ──────────────────────────────────── */}
          <motion.p
            {...fadeUp(0.4)}
            className="mt-5 font-sans text-sm font-light tracking-[0.15em] text-[#7A6A5A] uppercase"
          >
            {eventConfig.tagline}
          </motion.p>

          {/* ── Séparateur ───────────────────────────────── */}
          <motion.div {...fadeUp(0.5)} className="my-10 flex items-center gap-4 w-full max-w-xs">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A96E]/25" />
            <span className="text-[#C9A96E]/40 text-xs">◆</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A96E]/25" />
          </motion.div>

          {/* ── Infos événement ──────────────────────────── */}
          <motion.div
            {...fadeUp(0.55)}
            className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8"
          >
            <InfoItem icon={<Calendar size={13} />} text={eventConfig.date} />
            <Dot />
            <InfoItem icon={<Clock size={13} />} text={eventConfig.time} />
            <Dot />
            <InfoItem icon={<MapPin size={13} />} text={eventConfig.location} />
          </motion.div>

          {/* ── Description ──────────────────────────────── */}
          <motion.p
            {...fadeUp(0.65)}
            className="mt-10 max-w-md font-sans text-sm leading-relaxed text-[#6A5A4A]"
          >
            {eventConfig.description}
          </motion.p>

          {/* ── CTA ──────────────────────────────────────── */}
          {eventConfig.registrationsOpen ? (
            <motion.div {...fadeUp(0.8)} className="mt-12 flex flex-col items-center gap-4">
              <button
                onClick={() => setModalOpen(true)}
                className="group relative overflow-hidden border border-[#C9A96E]/40 bg-transparent px-10 py-4 font-sans text-xs font-medium uppercase tracking-[0.25em] text-[#C9A96E] transition-all duration-300 hover:border-[#C9A96E]/80 hover:text-[#E8D5B0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C9A96E]"
              >
                {/* Shimmer hover */}
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#C9A96E]/12 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Demander une invitation</span>
              </button>

              <p className="font-sans text-[11px] tracking-widest text-[#4A3A2A] uppercase">
                Places limitées · Sélection sur dossier
              </p>
            </motion.div>
          ) : (
            <motion.div
              {...fadeUp(0.8)}
              className="mt-12 rounded-sm border border-[#C9A96E]/10 bg-[#C9A96E]/04 px-8 py-5 text-center"
            >
              <p className="font-sans text-sm text-[#7A6A5A]">
                Les demandes d'invitation sont actuellement fermées.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <InvitationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}

function InfoItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-[#8A7A6A]">
      <span className="text-[#C9A96E]/60">{icon}</span>
      <span className="font-sans text-sm tracking-wide">{text}</span>
    </div>
  )
}

function Dot() {
  return (
    <span className="hidden text-[#3A2A1A] sm:inline">·</span>
  )
}
