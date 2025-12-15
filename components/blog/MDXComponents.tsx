'use client'

import { ComponentProps, ReactNode } from 'react'

// Elegant typography components for MDX content
// Design: "Floating Reader" - editorial quality with gentle gradients

interface HeadingProps {
  children: ReactNode
  id?: string
}

function H1({ children, id }: HeadingProps) {
  return (
    <h1
      id={id}
      className="text-4xl md:text-5xl font-bold mt-12 mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight"
    >
      {children}
    </h1>
  )
}

function H2({ children, id }: HeadingProps) {
  // Auto-generate ID if not provided
  const headingId = id || (typeof children === 'string'
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : '')

  return (
    <h2
      id={headingId}
      className="group text-2xl md:text-3xl font-bold mt-12 mb-4 text-gray-900 flex items-center gap-3"
    >
      <span className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-pink-500 opacity-70" />
      {children}
    </h2>
  )
}

function H3({ children, id }: HeadingProps) {
  const headingId = id || (typeof children === 'string'
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    : '')

  return (
    <h3
      id={headingId}
      className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-gray-800"
    >
      {children}
    </h3>
  )
}

function H4({ children, id }: HeadingProps) {
  return (
    <h4
      id={id}
      className="text-lg font-semibold mt-6 mb-2 text-gray-700"
    >
      {children}
    </h4>
  )
}

function Paragraph({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg leading-relaxed text-gray-700 mb-6 font-light">
      {children}
    </p>
  )
}

function Anchor({ href, children, ...props }: ComponentProps<'a'>) {
  const isExternal = href?.startsWith('http')
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="relative text-blue-600 hover:text-pink-600 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
      {...props}
    >
      {children}
      {isExternal && (
        <svg
          className="inline-block ml-1 w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      )}
    </a>
  )
}

function BlockQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="relative my-8 pl-6 py-4 border-l-4 border-gradient-to-b from-blue-500 to-pink-500 bg-gradient-to-r from-blue-50/50 to-pink-50/30 rounded-r-2xl">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-pink-500 rounded-full" />
      <div className="text-gray-700 italic font-light text-lg">
        {children}
      </div>
    </blockquote>
  )
}

function UnorderedList({ children }: { children: ReactNode }) {
  return (
    <ul className="my-6 space-y-3 text-gray-700">
      {children}
    </ul>
  )
}

function OrderedList({ children }: { children: ReactNode }) {
  return (
    <ol className="my-6 space-y-3 text-gray-700 list-decimal list-inside">
      {children}
    </ol>
  )
}

function ListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-lg leading-relaxed">
      <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 flex-shrink-0" />
      <span className="flex-1">{children}</span>
    </li>
  )
}

function HorizontalRule() {
  return (
    <hr className="my-12 border-none h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
  )
}

function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="px-2 py-1 rounded-lg bg-gray-100 text-pink-600 font-mono text-sm border border-gray-200">
      {children}
    </code>
  )
}

function Pre({ children, ...props }: ComponentProps<'pre'>) {
  return (
    <div className="relative my-8 group">
      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <pre
        className="relative overflow-x-auto p-6 rounded-2xl bg-gray-900 text-gray-100 font-mono text-sm leading-relaxed shadow-2xl"
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}

function Table({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200">
      <table className="w-full text-left">
        {children}
      </table>
    </div>
  )
}

function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
      {children}
    </thead>
  )
}

function TableRow({ children }: { children: ReactNode }) {
  return (
    <tr className="border-b border-gray-100 last:border-none hover:bg-gray-50/50 transition-colors">
      {children}
    </tr>
  )
}

function TableHeaderCell({ children }: { children: ReactNode }) {
  return (
    <th className="px-6 py-4 font-semibold text-gray-900 text-sm uppercase tracking-wider">
      {children}
    </th>
  )
}

function TableCell({ children }: { children: ReactNode }) {
  return (
    <td className="px-6 py-4 text-gray-700">
      {children}
    </td>
  )
}

function Image({ src, alt }: ComponentProps<'img'>) {
  return (
    <figure className="my-10">
      <div className="relative group">
        {/* Decorative frame */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <img
          src={src}
          alt={alt || ''}
          className="relative w-full rounded-2xl shadow-xl"
        />
      </div>
      {alt && (
        <figcaption className="mt-4 text-center text-sm text-gray-500 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  )
}

// Export all MDX components
export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  a: Anchor,
  blockquote: BlockQuote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  hr: HorizontalRule,
  code: InlineCode,
  pre: Pre,
  table: Table,
  thead: TableHead,
  tr: TableRow,
  th: TableHeaderCell,
  td: TableCell,
  img: Image,
}

export default mdxComponents
