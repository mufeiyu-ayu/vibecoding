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
      {/* Ambient background blur */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/80 via-white/40 to-transparent backdrop-blur-sm z-40 pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <nav className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
          {/* Logo - with breathing glow effect */}
          <div className="pointer-events-auto relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-slow" />
            <div className="relative">
              <Logo />
            </div>
          </div>

          {/* Desktop Navigation - Floating pills */}
          <div className="hidden md:flex items-center gap-3 pointer-events-auto">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-6 py-3 rounded-full transition-all duration-500 hover:scale-105"
                  style={{
                    animation: `float-in 0.6s ease-out ${index * 0.1}s both`,
                  }}
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-blue-400/20 group-hover:via-pink-400/20 group-hover:to-purple-400/20 rounded-full blur-xl transition-all duration-500" />

                  {/* Glass morphism background */}
                  <div className={`absolute inset-0 rounded-full backdrop-blur-md transition-all duration-500 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500/90 to-pink-500/90 shadow-lg shadow-blue-500/25'
                      : 'bg-white/60 group-hover:bg-white/80 border border-gray-200/50 group-hover:border-gray-300/50 shadow-sm group-hover:shadow-md'
                  }`} />

                  {/* Content */}
                  <span className={`relative flex items-center gap-2 font-medium text-sm transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    <span className="text-base group-hover:scale-110 transition-transform duration-300">
                      {item.emoji}
                    </span>
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button - Morphing icon */}
          <button
            type="button"
            className="md:hidden pointer-events-auto relative w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-pink-400/0 group-hover:from-blue-400/20 group-hover:to-pink-400/20 rounded-full blur-lg transition-all duration-500" />
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`} />
              <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`} />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile menu - Slide in with blur */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-gradient-to-br from-blue-500/10 via-pink-500/10 to-purple-500/10 backdrop-blur-md md:hidden z-40"
            onClick={() => setMobileMenuOpen(false)}
            style={{ animation: 'fade-in 0.3s ease-out' }}
          />

          {/* Menu panel */}
          <div
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm md:hidden z-50 bg-white/95 backdrop-blur-2xl shadow-2xl"
            style={{ animation: 'slide-in-right 0.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500" />

            <div className="flex flex-col gap-2 p-8 pt-24">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`group relative px-6 py-4 rounded-2xl transition-all duration-300 ${
                      isActive ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg' : 'hover:bg-gray-50'
                    }`}
                    style={{
                      animation: `slide-in-item 0.4s ease-out ${index * 0.1 + 0.1}s both`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {item.emoji}
                      </span>
                      <span className={`text-lg font-medium ${isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>
                        {item.label}
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes float-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
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

        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slide-in-item {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  )
}
