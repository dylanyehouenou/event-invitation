"use client"

import { useEffect, useState } from "react"

interface Rose {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
  blur: number
}

function generateRoses(): Rose[] {
  return Array.from({ length: 18 }, (_, i) => ({
    id:       i,
    x:        Math.random() * 100,
    y:        Math.random() * 100,
    size:     Math.random() * 120 + 80,   // 80–200px
    rotation: Math.random() * 360,
    opacity:  Math.random() * 0.045 + 0.02, // 2–6.5%
    blur:     Math.random() > 0.6 ? Math.random() * 2 + 0.5 : 0,
  }))
}

function RoseSVG() {
  return (
    <svg viewBox="0 0 100 100" fill="white" xmlns="http://www.w3.org/2000/svg">
      {/* Pétales extérieurs — ovales larges et arrondis */}
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={`o${a}`} cx="50" cy="27" rx="13" ry="19"
          transform={`rotate(${a} 50 50)`} />
      ))}
      {/* Pétales intermédiaires — décalés 36°, plus proches du centre */}
      {[36, 108, 180, 252, 324].map((a) => (
        <ellipse key={`i${a}`} cx="50" cy="35" rx="10" ry="14"
          transform={`rotate(${a} 50 50)`} />
      ))}
      {/* Petits pétales du cœur — serrés */}
      {[0, 120, 240].map((a) => (
        <ellipse key={`c${a}`} cx="50" cy="42" rx="6" ry="9"
          transform={`rotate(${a} 50 50)`} />
      ))}
      {/* Centre */}
      <circle cx="50" cy="50" r="7" />
    </svg>
  )
}

export function RoseField() {
  const [roses, setRoses] = useState<Rose[]>([])

  useEffect(() => {
    setRoses(generateRoses())
  }, [])

  if (roses.length === 0) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {roses.map((rose) => (
        <div
          key={rose.id}
          className="absolute"
          style={{
            left:      `${rose.x}%`,
            top:       `${rose.y}%`,
            width:     `${rose.size}px`,
            height:    `${rose.size}px`,
            transform: `translate(-50%, -50%) rotate(${rose.rotation}deg)`,
            opacity:   rose.opacity,
            filter:    rose.blur > 0 ? `blur(${rose.blur}px)` : undefined,
          }}
        >
          <RoseSVG />
        </div>
      ))}
    </div>
  )
}
