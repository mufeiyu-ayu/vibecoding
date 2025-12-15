import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      href="/"
      className="relative group text-xl font-bold tracking-tight hover:scale-105 transition-transform duration-500"
    >
      <span className="relative inline-block">
        {/* Main gradient text */}
        <span className="gradient-text relative z-10">
          vibecoding
        </span>

        {/* Animated underline */}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />

        {/* Subtle glow dot */}
        <span className="absolute -top-1 -right-2 w-2 h-2 bg-gradient-to-r from-blue-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
      </span>
    </Link>
  )
}
