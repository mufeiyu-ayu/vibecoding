import Link from 'next/link'

export default function Logo() {
  return (
    <Link
      href="/"
      className="text-xl font-bold gradient-text hover:opacity-80 transition-opacity duration-500"
    >
      vibecoding
    </Link>
  )
}
