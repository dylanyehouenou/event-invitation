"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { X, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { FormField } from "./FormField"
import type { ApiResult } from "@/types"

const schema = z.object({
  first_name: z.string().min(2, "Au moins 2 caractères").max(50),
  last_name:  z.string().min(2, "Au moins 2 caractères").max(50),
  email:      z.string().email("Adresse email invalide"),
  phone:      z.string().max(20, "Numéro trop long").optional(),
})

type FormValues = z.infer<typeof schema>

interface InvitationModalProps {
  open: boolean
  onClose: () => void
}

export function InvitationModal({ open, onClose }: InvitationModalProps) {
  const [result, setResult] = useState<ApiResult | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      reset()
      setResult(null)
    }, 400)
  }

  const onSubmit = async (data: FormValues) => {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/register", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(data),
      })
      const json: ApiResult = await res.json()
      setResult(json)
    } catch {
      setResult({
        success: false,
        code:    "SERVER_ERROR",
        message: "Une erreur réseau est survenue. Réessayez plus tard.",
      })
    } finally {
      setLoading(false)
    }
  }

  const overlayVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1 },
  }

  const panelVariants = {
    hidden:  { opacity: 0, scale: 0.94, y: 16 },
    visible: { opacity: 1, scale: 1,    y: 0, transition: { type: "spring", damping: 28, stiffness: 300 } },
    exit:    { opacity: 0, scale: 0.96, y: 8,  transition: { duration: 0.2 } },
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backdropFilter: "blur(12px)", backgroundColor: "rgba(3,3,10,0.75)" }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            key="panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md rounded-sm border border-[#C9A96E]/15 bg-[#09090F] shadow-2xl"
            style={{ boxShadow: "0 0 80px rgba(201,169,110,0.06), 0 25px 60px rgba(0,0,0,0.7)" }}
          >
            {/* Ligne dorée top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent" />

            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#C9A96E]/08 px-8 py-7">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#C9A96E]/70">
                  Accès exclusif
                </p>
                <h2 className="mt-1 font-serif text-2xl font-light tracking-wide text-[#F0EBE1]">
                  Demander une invitation
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="mt-1 rounded-sm p-1.5 text-[#605040] transition-colors hover:text-[#C9A96E]"
                aria-label="Fermer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-7">
              <AnimatePresence mode="wait">
                {result?.success ? (
                  // ── Succès ──────────────────────────────
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 py-6 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A96E]/25 bg-[#C9A96E]/08">
                      <CheckCircle className="text-[#C9A96E]" size={32} />
                    </div>
                    <div>
                      <p className="font-serif text-xl font-light text-[#F0EBE1]">
                        Demande enregistrée
                      </p>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-[#8A7A6A]">
                        Votre demande a bien été reçue. Vous serez contacté(e) si votre invitation est confirmée.
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="mt-2 font-sans text-xs uppercase tracking-widest text-[#C9A96E]/60 transition-colors hover:text-[#C9A96E]"
                    >
                      Fermer
                    </button>
                  </motion.div>
                ) : (
                  // ── Formulaire ──────────────────────────
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        label="Prénom"
                        error={errors.first_name?.message}
                        placeholder="Marie"
                        autoComplete="given-name"
                        {...register("first_name")}
                      />
                      <FormField
                        label="Nom"
                        error={errors.last_name?.message}
                        placeholder="Dupont"
                        autoComplete="family-name"
                        {...register("last_name")}
                      />
                    </div>

                    <FormField
                      label="Email"
                      type="email"
                      error={errors.email?.message}
                      placeholder="marie@exemple.fr"
                      autoComplete="email"
                      {...register("email")}
                    />

                    <FormField
                      label="Téléphone"
                      type="tel"
                      optional
                      error={errors.phone?.message}
                      placeholder="+33 6 00 00 00 00"
                      autoComplete="tel"
                      {...register("phone")}
                    />

                    {/* Message d'erreur API */}
                    {result && !result.success && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2.5 rounded-sm border border-red-900/40 bg-red-950/20 px-4 py-3"
                      >
                        <AlertCircle className="mt-0.5 shrink-0 text-red-400" size={15} />
                        <p className="font-sans text-sm text-red-300">{result.message}</p>
                      </motion.div>
                    )}

                    {/* Bouton submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative mt-1 flex h-12 w-full items-center justify-center overflow-hidden border border-[#C9A96E]/35 bg-[#C9A96E]/06 font-sans text-xs font-medium uppercase tracking-[0.2em] text-[#C9A96E] transition-all duration-300 hover:border-[#C9A96E]/60 hover:bg-[#C9A96E]/12 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          <span className="relative z-10">Envoyer ma demande</span>
                          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#C9A96E]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        </>
                      )}
                    </button>

                    <p className="text-center font-sans text-[11px] leading-relaxed text-[#4A3A2A]">
                      En soumettant ce formulaire, vous acceptez d'être contacté(e) dans le cadre de cet événement privé.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Ligne dorée bottom */}
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/20 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
