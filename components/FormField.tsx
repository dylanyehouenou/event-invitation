"use client"

import { forwardRef, InputHTMLAttributes } from "react"
import { clsx } from "clsx"

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  optional?: boolean
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField({ label, error, optional, className, id, ...props }, ref) {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={fieldId}
          className="flex items-baseline gap-2 font-sans text-xs font-medium uppercase tracking-widest text-[#A09070]"
        >
          {label}
          {optional && (
            <span className="text-[10px] normal-case tracking-normal text-[#605040]">
              (recommandé)
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={fieldId}
          className={clsx(
            "w-full rounded-sm border bg-white/[0.03] px-4 py-3 font-sans text-sm text-[#F0EBE1] outline-none",
            "placeholder:text-[#504030] caret-gold-500",
            "transition-all duration-200",
            error
              ? "border-red-800/60 focus:border-red-600/80 focus:ring-1 focus:ring-red-700/30"
              : "border-[#C9A96E]/15 focus:border-[#C9A96E]/50 focus:ring-1 focus:ring-[#C9A96E]/20",
            className
          )}
          {...props}
        />

        {error && (
          <p className="font-sans text-xs text-red-400">{error}</p>
        )}
      </div>
    )
  }
)
