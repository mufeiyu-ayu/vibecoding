'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const navItems = [
  { href: '/blog', label: 'Blog', emoji: '✍️' },
  { href: '/projects', label: 'Projects', emoji: '🚀' },
  { href: '/about', label: 'About', emoji: '👋' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Subtle top gradient atmosphere */}
      <div className="fixed top-0 left-0 right-0 h-40 bg-gradient-to-b from-blue-50/30 via-pink-50/20 to-transparent pointer-events-none z-30" />

      {/* Unified Floating Island - Logo + Navigation */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:block pointer-events-auto">
        <div className="relative group">
          {/* Ambient glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:via-pink-400/20 group-hover:to-purple-400/20 rounded-full blur-2xl transition-all duration-1000" />

          {/* Island container */}
          <div
            className="relative flex items-center gap-6 px-6 py-3 rounded-full bg-white/70 backdrop-blur-2xl border border-white/50 shadow-xl shadow-black/5"
            style={{ animation: 'float-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) both' }}
          >
            {/* Logo section */}
            <div
              className="relative"
              style={{ animation: 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both' }}
            >
              <Logo />
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" />

            {/* Navigation items */}
            <div className="flex items-center gap-1">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative group/item"
                    style={{
                      animation: `scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08 + 0.3}s both`,
                    }}
                  >
                    {/* Magnetic hover glow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/0 to-pink-400/0 group-hover/item:from-blue-400/30 group-hover/item:to-pink-400/30 rounded-full blur-lg transition-all duration-500" />

                    {/* Nav item pill */}
                    <div className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg shadow-blue-500/30 scale-105'
                        : 'hover:bg-white/80 hover:shadow-md hover:scale-105'
                    }`}>
                      <span className={`text-lg transition-transform duration-300 group-hover/item:scale-125 ${
                        isActive ? 'animate-bounce-subtle' : ''
                      }`}>
                        {item.emoji}
                      </span>
                      <span className={`text-sm font-medium transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-700 group-hover/item:text-gray-900'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Compact floating bar with logo and menu button */}
      <div className="md:hidden fixed top-6 left-6 right-6 z-50 pointer-events-auto">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/10 to-pink-400/10 rounded-2xl blur-xl" />

          {/* Mobile bar */}
          <div className="relative flex items-center justify-between px-5 py-3 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/50 shadow-lg shadow-black/5">
            <Logo />

            {/* Mobile menu button */}
            <button
              type="button"
              className="relative w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center group"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {/* Glow on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/0 to-pink-400/0 group-hover:from-blue-400/20 group-hover:to-pink-400/20 rounded-full blur-lg transition-all duration-500" />

              {/* Morphing icon */}
              <div className="relative w-4 h-3 flex flex-col justify-between">
                <span className={`block h-0.5 rounded-full bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-1 bg-pink-500' : ''
                }`} />
                <span className={`block h-0.5 rounded-full bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0 scale-0' : ''
                }`} />
                <span className={`block h-0.5 rounded-full bg-gray-700 transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-pink-500' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Full screen overlay with centered content */}
      {mobileMenuOpen && (
        <>
          {/* Gradient backdrop */}
          <div
            className="fixed inset-0 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 backdrop-blur-2xl md:hidden z-40"
            onClick={() => setMobileMenuOpen(false)}
            style={{ animation: 'fade-in 0.4s ease-out' }}
          />

          {/* Centered menu content */}
          <div className="fixed inset-0 md:hidden z-40 flex items-center justify-center p-8">
            <div
              className="w-full max-w-sm"
              style={{ animation: 'scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both' }}
            >
              {/* Menu island */}
              <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                {/* Decorative top bar */}
                <div className="h-2 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500" />

                {/* Menu items */}
                <div className="p-6 space-y-2">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg transform scale-105'
                            : 'hover:bg-gray-50 active:scale-95'
                        }`}
                        style={{
                          animation: `slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1 + 0.2}s both`,
                        }}
                      >
                        <span className={`text-3xl transition-transform duration-300 group-hover:scale-125 ${
                          isActive ? 'animate-bounce-subtle' : ''
                        }`}>
                          {item.emoji}
                        </span>
                        <span className={`text-lg font-semibold ${
                          isActive ? 'text-white' : 'text-gray-800 group-hover:text-gray-900'
                        }`}>
                          {item.label}
                        </span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes float-down {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
