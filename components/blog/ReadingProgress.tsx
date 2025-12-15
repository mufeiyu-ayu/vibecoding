'use client'

import { useEffect, useState } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(Math.min(100, Math.max(0, scrollProgress)))
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <>
      {/* Fixed progress bar at top */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-gray-100/50 backdrop-blur-sm">
        <div
          className="h-full transition-all duration-150 ease-out"
          style={{
            width: `${progress}%`,
            background: `linear-gradient(90deg,
              hsl(220, 80%, 60%) 0%,
              hsl(280, 80%, 60%) ${progress}%,
              hsl(340, 80%, 60%) 100%
            )`,
          }}
        />
      </div>

      {/* Floating progress indicator */}
      <div
        className="fixed bottom-8 right-8 z-40 opacity-0 transition-all duration-500"
        style={{
          opacity: progress > 5 ? 1 : 0,
          transform: progress > 5 ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <div className="relative w-14 h-14">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-gray-200"
            />
            {/* Progress circle */}
            <circle
              cx="18"
              cy="18"
              r="16"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={`${progress}, 100`}
              className="transition-all duration-300"
              style={{
                stroke: `hsl(${220 + (progress * 1.2)}, 80%, 60%)`,
              }}
            />
          </svg>
          {/* Center text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          {/* Glass background */}
          <div className="absolute inset-0 -z-10 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white/50" />
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.4);
          }
          50% {
            box-shadow: 0 0 20px 10px rgba(99, 102, 241, 0);
          }
        }
      `}</style>
    </>
  )
}
