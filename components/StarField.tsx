"use client"

import { useEffect, useState } from "react"

interface Star {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

function generateStars(): Star[] {
  return Array.from({ length: 90 }, (_, i) => ({
    id:       i,
    x:        Math.random() * 100,
    y:        Math.random() * 100,
    size:     Math.random() * 1.4 + 0.4,
    duration: Math.random() * 5 + 2,
    delay:    Math.random() * 4,
  }))
}

export function StarField() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    setStars(generateStars())
  }, [])

  if (stars.length === 0) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left:   `${s.x}%`,
            top:    `${s.y}%`,
            width:  `${s.size}px`,
            height: `${s.size}px`,
            ["--tw-duration" as string]: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
