'use client'

import { useEffect, useState } from 'react'

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 1,
      }
    )

    headings.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const top = element.offsetTop - 100
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
      <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wider">
        On This Page
      </h3>
      <ul className="space-y-2 text-sm border-l-2 border-gray-200">
        {headings.map(({ id, text, level }) => (
          <li
            key={id}
            className={`${level === 3 ? 'pl-6' : 'pl-4'}`}
          >
            <a
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              className={`block py-1 transition-colors duration-300 border-l-2 -ml-[2px] ${
                activeId === id
                  ? 'border-gradient-to-b from-blue-500 to-pink-500 text-blue-600 font-medium'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
