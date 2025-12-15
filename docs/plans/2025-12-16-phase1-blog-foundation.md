# Personal Blog Foundation (Phase 1) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the foundational structure for the vibecoding personal blog with content management, basic routing, core UI components, and essential pages.

**Architecture:** Use Contentlayer for type-safe MDX content management, Shiki for elegant code highlighting with Rosé Pine Dawn theme, and establish the core component library following the温柔优雅 design system. All pages use Next.js 16 App Router with static site generation.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Contentlayer 2, Shiki, MDX

---

## Task 1: Install and Configure Dependencies

**Files:**
- Modify: `package.json`
- Create: `contentlayer.config.ts`
- Modify: `next.config.ts`
- Modify: `tsconfig.json`

### Step 1: Install Contentlayer and dependencies

Run:
```bash
npm install contentlayer next-contentlayer date-fns reading-time
npm install -D @types/node
```

Expected: Dependencies installed successfully

### Step 2: Install Shiki for code highlighting

Run:
```bash
npm install shiki
```

Expected: Shiki installed successfully

### Step 3: Create Contentlayer configuration

Create `contentlayer.config.ts`:

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    updated: {
      type: 'date',
      required: false,
    },
    category: {
      type: 'enum',
      options: ['tech', 'life', 'work'],
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    cover: {
      type: 'string',
      required: false,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
    draft: {
      type: 'boolean',
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('posts/', ''),
    },
    readingTime: {
      type: 'string',
      resolve: (doc) => readingTime(doc.body.raw).text,
    },
    url: {
      type: 'string',
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace('posts/', '')}`,
    },
  },
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
```

### Step 4: Update Next.js config to integrate Contentlayer

Modify `next.config.ts`:

```typescript
import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withContentlayer(nextConfig);
```

### Step 5: Update TypeScript config to include Contentlayer types

Modify `tsconfig.json`, add to the `"include"` array:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts",
    ".contentlayer/generated"
  ],
  "exclude": ["node_modules"]
}
```

### Step 6: Add Contentlayer to gitignore

Run:
```bash
echo ".contentlayer" >> .gitignore
```

Expected: .contentlayer added to .gitignore

### Step 7: Create content directories

Run:
```bash
mkdir -p content/posts/tech content/posts/life content/posts/work
```

Expected: Directories created

### Step 8: Create a test blog post

Create `content/posts/tech/test-post.mdx`:

```mdx
---
title: "Test Post"
description: "This is a test post to verify Contentlayer setup"
date: "2025-12-16"
category: "tech"
tags: ["test", "setup"]
featured: false
draft: false
---

# Hello World

This is a test post to verify that Contentlayer is working correctly.

## Code Example

```typescript
const greeting = "Hello, World!";
console.log(greeting);
```

Everything is working!
```

### Step 9: Test Contentlayer generation

Run:
```bash
npm run dev
```

Expected: Dev server starts, Contentlayer generates types in `.contentlayer/generated`, no errors

### Step 10: Commit

```bash
git add package.json package-lock.json contentlayer.config.ts next.config.ts tsconfig.json .gitignore content/
git commit -m "feat: setup Contentlayer for MDX content management

- Install contentlayer, next-contentlayer, date-fns, reading-time, shiki
- Configure contentlayer with Post document type
- Add computed fields: slug, readingTime, url
- Integrate with Next.js config
- Create content directory structure
- Add test post for verification"
```

---

## Task 2: Create Design System Tokens and Utilities

**Files:**
- Create: `lib/constants/design-tokens.ts`
- Create: `lib/utils.ts`
- Modify: `app/globals.css`

### Step 1: Create design tokens file

Create `lib/constants/design-tokens.ts`:

```typescript
/**
 * Design tokens for the vibecoding blog
 * Following the 温柔优雅 (gentle and elegant) design system
 */

export const colors = {
  // Blue to Pink gradient
  gradientFrom: '#3b82f6', // blue-500
  gradientTo: '#ec4899',   // pink-500

  // Background colors (light mode)
  bgPrimary: '#ffffff',
  bgSecondary: '#fafafa',
  bgTertiary: '#f9f9f9',

  // Text colors (light mode)
  textPrimary: '#1f2937',   // gray-800
  textSecondary: '#374151', // gray-700
  textTertiary: '#6b7280',  // gray-500

  // Auxiliary colors
  success: '#10b981',  // green-500
  warning: '#f59e0b',  // amber-500
  info: '#3b82f6',     // blue-500
} as const;

export const timing = {
  // Animation durations (ms)
  small: 500,      // buttons, links
  medium: 550,     // cards, modals
  large: 600,      // page transitions, hero
  background: 25000, // wave animations (25s)

  // Stagger delays (ms)
  staggerShort: 60,
  staggerMedium: 80,
  staggerLong: 150,
} as const;

export const easing = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  inOut: 'ease-in-out',
  out: 'ease-out',
} as const;

export const spacing = {
  // Common spacing values
  sectionGap: '4rem',
  cardGap: '1.5rem',
  contentMaxWidth: '65ch', // optimal reading width
} as const;

export const borderRadius = {
  button: '12px',
  card: '16px',
  cardLarge: '24px',
  image: '12px',
} as const;
```

### Step 2: Create utility functions

Create `lib/utils.ts`:

```typescript
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Get excerpt from text
 */
export function getExcerpt(text: string, maxLength: number = 150): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}
```

### Step 3: Install utility dependencies

Run:
```bash
npm install clsx tailwind-merge
```

Expected: Dependencies installed

### Step 4: Update global CSS with design system

Modify `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Color tokens */
    --gradient-from: #3b82f6;
    --gradient-to: #ec4899;

    --bg-primary: #ffffff;
    --bg-secondary: #fafafa;
    --bg-tertiary: #f9f9f9;

    --text-primary: #1f2937;
    --text-secondary: #374151;
    --text-tertiary: #6b7280;

    /* Timing tokens */
    --timing-small: 500ms;
    --timing-medium: 550ms;
    --timing-large: 600ms;
  }

  body {
    @apply bg-white text-gray-800;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold text-gray-800;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Selection */
  ::selection {
    @apply bg-blue-500/20;
  }
}

@layer components {
  /* Gradient text utility */
  .gradient-text {
    @apply bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent;
  }

  /* Glass effect utility */
  .glass {
    @apply bg-white/80 backdrop-blur-xl;
  }

  /* Card hover effect */
  .card-hover {
    @apply transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl;
  }
}
```

### Step 5: Test build

Run:
```bash
npm run build
```

Expected: Build succeeds with no errors

### Step 6: Commit

```bash
git add lib/ app/globals.css package.json package-lock.json
git commit -m "feat: add design system tokens and utilities

- Create design-tokens.ts with colors, timing, easing, spacing
- Add utility functions: cn, formatDate, getExcerpt
- Install clsx and tailwind-merge
- Update globals.css with design tokens and utilities
- Add gradient-text, glass, and card-hover utilities"
```

---

## Task 3: Create Core UI Components - Button

**Files:**
- Create: `components/ui/Button.tsx`

### Step 1: Create Button component

Create `components/ui/Button.tsx`:

```typescript
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2 rounded-xl font-medium',
          'transition-all duration-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',

          // Variants
          {
            'bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:scale-[1.03]':
              variant === 'primary',
            'border border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50':
              variant === 'secondary',
            'text-gray-700 hover:bg-gray-100':
              variant === 'ghost',
          },

          // Sizes
          {
            'h-9 px-4 text-sm': size === 'sm',
            'h-12 px-6 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },

          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
```

### Step 2: Test Button in home page temporarily

Modify `app/page.tsx` to test the button:

```typescript
import Button from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold">Button Test</h1>

      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Button variant="primary" size="sm">Primary Small</Button>
          <Button variant="primary" size="md">Primary Medium</Button>
          <Button variant="primary" size="lg">Primary Large</Button>
        </div>

        <div className="flex gap-4">
          <Button variant="secondary" size="md">Secondary</Button>
          <Button variant="ghost" size="md">Ghost</Button>
        </div>
      </div>
    </div>
  )
}
```

### Step 3: Test in browser

Run:
```bash
npm run dev
```

Expected: Open http://localhost:3000, see buttons with gradient, hover effects working, smooth transitions

### Step 4: Revert test changes to page.tsx

Modify `app/page.tsx` back to empty state:

```typescript
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Coming soon...</p>
    </div>
  )
}
```

### Step 5: Commit

```bash
git add components/ui/Button.tsx app/page.tsx
git commit -m "feat: add Button component with variants and sizes

- Create Button component with primary, secondary, ghost variants
- Support sm, md, lg sizes
- Smooth 500ms transitions with hover effects
- Gradient background for primary variant
- Accessible with focus states"
```

---

## Task 4: Create Core UI Components - Card

**Files:**
- Create: `components/ui/Card.tsx`

### Step 1: Create Card component

Create `components/ui/Card.tsx`:

```typescript
import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glass?: boolean
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, glass = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-2xl border border-gray-100 p-6',
          'transition-all duration-550',

          // Glass effect
          glass ? 'bg-white/80 backdrop-blur-lg' : 'bg-white',

          // Shadow
          'shadow-sm',

          // Hover effect
          hover && 'hover:-translate-y-1.5 hover:shadow-xl cursor-pointer',
          hover && 'hover:shadow-blue-500/5',

          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
```

### Step 2: Test Card component

Modify `app/page.tsx`:

```typescript
import Card from '@/components/ui/Card'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-4xl font-bold">Card Test</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <h3 className="text-xl font-semibold mb-2">Regular Card</h3>
          <p className="text-gray-600">This is a regular card without hover effect.</p>
        </Card>

        <Card hover>
          <h3 className="text-xl font-semibold mb-2">Hover Card</h3>
          <p className="text-gray-600">Hover over me to see the effect!</p>
        </Card>

        <Card glass hover>
          <h3 className="text-xl font-semibold mb-2">Glass Card</h3>
          <p className="text-gray-600">I have a glass effect with hover.</p>
        </Card>
      </div>
    </div>
  )
}
```

### Step 3: Test in browser

Run:
```bash
npm run dev
```

Expected: See cards with different styles, hover effects work smoothly

### Step 4: Revert test changes

Modify `app/page.tsx`:

```typescript
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-gray-500">Coming soon...</p>
    </div>
  )
}
```

### Step 5: Commit

```bash
git add components/ui/Card.tsx app/page.tsx
git commit -m "feat: add Card component with glass and hover effects

- Create Card component with optional hover animation
- Support glass effect with backdrop-blur
- Smooth 550ms transitions
- Rounded corners and subtle shadows"
```

---

## Task 5: Create Layout Components - Header

**Files:**
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Logo.tsx`

### Step 1: Create Logo component

Create `components/layout/Logo.tsx`:

```typescript
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
```

### Step 2: Create Header component

Create `components/layout/Header.tsx`:

```typescript
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Logo from './Logo'

const navItems = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-gray-100/50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-gray-900 transition-colors duration-500 font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            // Close icon
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-[80%] max-w-xs bg-white/95 backdrop-blur-xl shadow-xl md:hidden z-50 animate-slide-in">
            <div className="flex flex-col gap-1 p-6 pt-20">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 p-4 rounded-xl transition-all duration-500"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  )
}
```

### Step 3: Add slide-in animation to globals.css

Modify `app/globals.css`, add to the end:

```css
@layer utilities {
  /* Mobile drawer animation */
  @keyframes slide-in {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .animate-slide-in {
    animation: slide-in 500ms ease-out;
  }
}
```

### Step 4: Update root layout to include Header

Modify `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vibecoding",
  description: "Personal blog of vibecoding - tech, life, and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
```

### Step 5: Test Header in browser

Run:
```bash
npm run dev
```

Expected:
- Header appears at top with glass effect
- Desktop: horizontal nav links
- Mobile: hamburger menu, drawer slides in from right
- Logo links to home, nav items have hover effects

### Step 6: Commit

```bash
git add components/layout/ app/layout.tsx app/globals.css
git commit -m "feat: add Header with mobile drawer navigation

- Create Logo component with gradient text
- Create Header with desktop horizontal nav
- Add mobile drawer that slides from right
- Glass effect with backdrop blur
- Smooth 500ms animations
- Integrate Header into root layout"
```

---

## Task 6: Create Layout Components - Footer

**Files:**
- Create: `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`

### Step 1: Create Footer component

Create `components/layout/Footer.tsx`:

```typescript
import Link from 'next/link'

const socialLinks = [
  { name: 'GitHub', href: '#', icon: 'github' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Email', href: 'mailto:hello@vibecoding.com', icon: 'email' },
]

const footerLinks = [
  { name: 'Blog', href: '/blog' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'RSS', href: '/rss.xml' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100 bg-gray-50/50 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold gradient-text mb-2">vibecoding</h3>
            <p className="text-sm text-gray-600">
              分享技术、生活与创作
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">导航</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-500"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-3">关注</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors duration-500"
                  aria-label={social.name}
                >
                  {social.icon === 'github' && (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  )}
                  {social.icon === 'twitter' && (
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {social.icon === 'email' && (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} vibecoding. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

### Step 2: Update layout to include Footer

Modify `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "vibecoding",
  description: "Personal blog of vibecoding - tech, life, and projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="pt-16 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

### Step 3: Test Footer in browser

Run:
```bash
npm run dev
```

Expected: Footer appears at bottom with links and social icons

### Step 4: Commit

```bash
git add components/layout/Footer.tsx app/layout.tsx
git commit -m "feat: add Footer with links and social icons

- Create Footer component with 3-column layout
- Add navigation links and social media links
- Include GitHub, Twitter, Email icons
- Responsive design with smooth transitions
- Integrate Footer into root layout with flex-1 main"
```

---

## Task 7: Create Home Page (Landing Page - Basic)

**Files:**
- Modify: `app/page.tsx`
- Create: `components/home/Hero.tsx`
- Create: `components/home/FeaturedPosts.tsx`

### Step 1: Create Hero component (without wave animation)

Create `components/home/Hero.tsx`:

```typescript
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Simple gradient background (wave animation will be added in Phase 3) */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 -z-10" />

      <div className="mx-auto max-w-4xl text-center">
        {/* Title with stagger animation (will be enhanced in Phase 3) */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
          vibecoding
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Full-stack Developer | Open Source Enthusiast
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/blog">
            <Button variant="primary" size="lg">
              进入博客
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="secondary" size="lg">
              查看作品
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="secondary" size="lg">
              关于我
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
```

### Step 2: Create FeaturedPosts component

Create `components/home/FeaturedPosts.tsx`:

```typescript
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatDate } from '@/lib/utils'

export default function FeaturedPosts() {
  // Get featured posts or latest 4 posts
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4)

  if (posts.length === 0) {
    return null
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">最新文章</h2>
        <p className="text-gray-600">分享技术心得与生活感悟</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {posts.map((post) => (
          <Link key={post.slug} href={post.url}>
            <Card hover>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                  <span>·</span>
                  <span className="text-blue-500">{post.category}</span>
                </div>

                <h3 className="text-xl font-semibold hover:gradient-text transition-all duration-500">
                  {post.title}
                </h3>

                <p className="text-gray-600 line-clamp-2">
                  {post.description}
                </p>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link href="/blog">
          <Button variant="secondary" size="lg">
            查看更多文章
          </Button>
        </Link>
      </div>
    </section>
  )
}
```

### Step 3: Update home page

Modify `app/page.tsx`:

```typescript
import Hero from '@/components/home/Hero'
import FeaturedPosts from '@/components/home/FeaturedPosts'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedPosts />
    </>
  )
}
```

### Step 4: Test home page

Run:
```bash
npm run dev
```

Expected:
- Hero section with gradient background and CTA buttons
- Featured posts section showing the test post
- Hover effects on cards
- All links functional

### Step 5: Commit

```bash
git add app/page.tsx components/home/
git commit -m "feat: add home page with Hero and FeaturedPosts

- Create Hero component with gradient background
- Add CTA buttons for blog, projects, about
- Create FeaturedPosts showing latest 4 posts
- Card layout with hover effects
- Display post metadata: date, reading time, category, tags
- Link to full blog list"
```

---

## Task 8: Create Blog List Page

**Files:**
- Create: `app/blog/page.tsx`
- Create: `components/blog/PostCard.tsx`

### Step 1: Create PostCard component

Create `components/blog/PostCard.tsx`:

```typescript
import Link from 'next/link'
import { Post } from 'contentlayer/generated'
import Card from '@/components/ui/Card'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={post.url}>
      <Card hover className="h-full">
        {/* Cover image if exists */}
        {post.cover && (
          <div className="mb-4 -mx-6 -mt-6">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
          </div>
        )}

        <div className="space-y-3">
          {/* Meta info */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>{post.readingTime}</span>
            <span>·</span>
            <span className="text-blue-500 font-medium">{post.category}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold hover:gradient-text transition-all duration-500 line-clamp-2">
            {post.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 line-clamp-3">
            {post.description}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap pt-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="text-xs px-2 py-1 text-gray-400">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
```

### Step 2: Create blog list page

Create `app/blog/page.tsx`:

```typescript
import { allPosts } from 'contentlayer/generated'
import PostCard from '@/components/blog/PostCard'

export const metadata = {
  title: 'Blog - vibecoding',
  description: '技术文章、生活记录与项目分享',
}

export default function BlogPage() {
  // Filter and sort posts
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Group posts by category
  const postsByCategory = {
    all: posts,
    tech: posts.filter((p) => p.category === 'tech'),
    life: posts.filter((p) => p.category === 'life'),
    work: posts.filter((p) => p.category === 'work'),
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          博客
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          分享技术心得、生活感悟与创作历程
        </p>
      </div>

      {/* Category filter (will be interactive in Phase 2) */}
      <div className="mb-12 flex gap-4 justify-center flex-wrap">
        <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-medium">
          全部 ({postsByCategory.all.length})
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
          技术 ({postsByCategory.tech.length})
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
          生活 ({postsByCategory.life.length})
        </button>
        <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
          作品 ({postsByCategory.work.length})
        </button>
      </div>

      {/* Search box placeholder (will be implemented in Phase 2) */}
      <div className="mb-12 max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="搜索文章标题、内容或标签..."
          className="w-full px-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          disabled
        />
      </div>

      {/* Posts grid */}
      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">还没有文章，敬请期待...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
```

### Step 3: Test blog list page

Run:
```bash
npm run dev
```

Expected:
- Navigate to /blog
- See page title and description
- Category filters shown (not functional yet)
- Posts displayed in 3-column grid
- Test post visible with all metadata
- Hover effects on cards

### Step 4: Commit

```bash
git add app/blog/page.tsx components/blog/PostCard.tsx
git commit -m "feat: add blog list page with post cards

- Create PostCard component with cover image support
- Display post metadata, title, description, tags
- Create blog list page with header and category filters
- 3-column responsive grid layout
- Search box placeholder for Phase 2
- Sort posts by date (newest first)
- Filter out draft posts"
```

---

## Task 9: Create Blog Post Detail Page (Basic)

**Files:**
- Create: `app/blog/[slug]/page.tsx`
- Create: `components/blog/MDXContent.tsx`
- Create: `lib/mdx-components.tsx`

### Step 1: Create custom MDX components

Create `lib/mdx-components.tsx`:

```typescript
import { HTMLAttributes } from 'react'
import Link from 'next/link'
import { cn } from './utils'

// Custom components for MDX
export const mdxComponents = {
  // Headings with anchor links
  h1: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn('text-4xl font-bold mb-6 mt-8 gradient-text', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn('text-3xl font-bold mb-4 mt-8 text-gray-800', className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn('text-2xl font-semibold mb-3 mt-6 text-gray-800', className)}
      {...props}
    />
  ),

  // Paragraphs
  p: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn('text-gray-700 leading-relaxed mb-4', className)}
      {...props}
    />
  ),

  // Links
  a: ({ className, href, ...props }: HTMLAttributes<HTMLAnchorElement> & { href?: string }) => {
    const isExternal = href?.startsWith('http')

    if (isExternal) {
      return (
        <a
          href={href}
          className={cn('text-blue-500 hover:text-pink-500 transition-colors underline', className)}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        />
      )
    }

    return (
      <Link
        href={href || '#'}
        className={cn('text-blue-500 hover:text-pink-500 transition-colors underline', className)}
        {...props}
      />
    )
  },

  // Code blocks (Shiki will be integrated in Phase 2)
  code: ({ className, ...props }: HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'px-1.5 py-0.5 rounded bg-gray-100 text-pink-600 text-sm font-mono',
        className
      )}
      {...props}
    />
  ),

  pre: ({ className, ...props }: HTMLAttributes<HTMLPreElement>) => (
    <pre
      className={cn(
        'p-4 rounded-2xl bg-gray-50 overflow-x-auto mb-6 border border-gray-200',
        className
      )}
      {...props}
    />
  ),

  // Blockquotes
  blockquote: ({ className, ...props }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(
        'border-l-4 border-gradient-to-b from-blue-500 to-pink-500 pl-6 py-2 my-6 italic text-gray-700 bg-gradient-to-r from-blue-50/50 to-pink-50/50 rounded-r-xl',
        className
      )}
      {...props}
    />
  ),

  // Lists
  ul: ({ className, ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul
      className={cn('list-disc list-inside mb-4 space-y-2 text-gray-700', className)}
      {...props}
    />
  ),
  ol: ({ className, ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol
      className={cn('list-decimal list-inside mb-4 space-y-2 text-gray-700', className)}
      {...props}
    />
  ),

  // Tables
  table: ({ className, ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto mb-6">
      <table
        className={cn('w-full border-collapse', className)}
        {...props}
      />
    </div>
  ),
  th: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn('border border-gray-200 px-4 py-2 bg-gray-50 font-semibold text-left', className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn('border border-gray-200 px-4 py-2', className)}
      {...props}
    />
  ),
}
```

### Step 2: Create MDXContent component

Create `components/blog/MDXContent.tsx`:

```typescript
import { useMDXComponent } from 'next-contentlayer/hooks'
import { mdxComponents } from '@/lib/mdx-components'

interface MDXContentProps {
  code: string
}

export default function MDXContent({ code }: MDXContentProps) {
  const MDXComponent = useMDXComponent(code)

  return (
    <div className="prose prose-lg max-w-none">
      <MDXComponent components={mdxComponents} />
    </div>
  )
}
```

### Step 3: Create blog post page

Create `app/blog/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { formatDate } from '@/lib/utils'
import MDXContent from '@/components/blog/MDXContent'

interface PostPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all posts
export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata
export async function generateMetadata({ params }: PostPageProps) {
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - vibecoding`,
    description: post.description,
  }
}

export default function PostPage({ params }: PostPageProps) {
  const post = allPosts.find((post) => post.slug === params.slug)

  if (!post || post.draft) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      {/* Header */}
      <header className="mb-12">
        {/* Meta info */}
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
          <span>{formatDate(post.date)}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
          <span>·</span>
          <span className="text-blue-500 font-medium">{post.category}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          {post.title}
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Cover image */}
        {post.cover && (
          <div className="mt-8 -mx-4">
            <img
              src={post.cover}
              alt={post.title}
              className="w-full rounded-2xl"
            />
          </div>
        )}
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <MDXContent code={post.body.code} />
      </div>

      {/* Footer - prev/next navigation will be added in Phase 2 */}
      <footer className="mt-16 pt-8 border-t border-gray-200">
        <div className="text-center">
          <a
            href="/blog"
            className="text-blue-500 hover:text-pink-500 transition-colors font-medium"
          >
            ← 返回博客列表
          </a>
        </div>
      </footer>
    </article>
  )
}
```

### Step 4: Fix MDXContent to be client component

Modify `components/blog/MDXContent.tsx`, add 'use client' directive:

```typescript
'use client'

import { useMDXComponent } from 'next-contentlayer/hooks'
import { mdxComponents } from '@/lib/mdx-components'

interface MDXContentProps {
  code: string
}

export default function MDXContent({ code }: MDXContentProps) {
  const MDXComponent = useMDXComponent(code)

  return (
    <div className="prose prose-lg max-w-none">
      <MDXComponent components={mdxComponents} />
    </div>
  )
}
```

### Step 5: Test post detail page

Run:
```bash
npm run dev
```

Expected:
- Click on test post from home or blog list
- See post title, description, metadata
- Content rendered with custom styles
- Code blocks, headings, links all styled
- Back to blog list link works

### Step 6: Commit

```bash
git add app/blog/[slug]/ components/blog/MDXContent.tsx lib/mdx-components.tsx
git commit -m "feat: add blog post detail page with MDX rendering

- Create custom MDX components for headings, links, code, etc
- Create MDXContent client component using next-contentlayer
- Create dynamic blog post page with generateStaticParams
- Display post header with title, description, metadata, tags
- Render MDX content with custom styling
- Add back to blog list link
- Generate metadata for SEO"
```

---

## Task 10: Create Placeholder Pages (Projects & About)

**Files:**
- Create: `app/projects/page.tsx`
- Create: `app/about/page.tsx`

### Step 1: Create projects placeholder page

Create `app/projects/page.tsx`:

```typescript
export const metadata = {
  title: 'Projects - vibecoding',
  description: '我的项目作品集',
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
        作品展示
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        项目时间轴页面正在设计中...
      </p>
      <p className="text-gray-500">
        将在 Phase 2 实现完整的项目展示功能
      </p>
    </div>
  )
}
```

### Step 2: Create about placeholder page

Create `app/about/page.tsx`:

```typescript
export const metadata = {
  title: 'About - vibecoding',
  description: '关于 vibecoding',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 min-h-[70vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
        关于我
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        个人介绍页面正在准备中...
      </p>
      <p className="text-gray-500">
        将在 Phase 2 实现完整的关于页面
      </p>
    </div>
  )
}
```

### Step 3: Test placeholder pages

Run:
```bash
npm run dev
```

Expected:
- Navigate to /projects - see placeholder
- Navigate to /about - see placeholder
- Header links work
- Pages have gradient titles

### Step 4: Commit

```bash
git add app/projects/page.tsx app/about/page.tsx
git commit -m "feat: add placeholder pages for projects and about

- Create projects placeholder page
- Create about placeholder page
- Will be fully implemented in Phase 2
- Both pages have proper metadata"
```

---

## Task 11: Create More Test Content

**Files:**
- Create: `content/posts/tech/nextjs-contentlayer.mdx`
- Create: `content/posts/life/2025-goals.mdx`

### Step 1: Create second tech post

Create `content/posts/tech/nextjs-contentlayer.mdx`:

```mdx
---
title: "使用 Contentlayer 管理 Next.js 博客内容"
description: "Contentlayer 是一个强大的内容 SDK，它可以将你的 Markdown 或 MDX 文件转换为类型安全的 JSON 数据。"
date: "2025-12-15"
category: "tech"
tags: ["nextjs", "contentlayer", "mdx", "typescript"]
featured: true
draft: false
---

# 为什么选择 Contentlayer

在构建现代博客时，我们需要一个既简单又强大的内容管理方案。Contentlayer 正是这样一个工具。

## 主要优势

1. **类型安全** - 自动生成 TypeScript 类型
2. **开发体验** - 热更新，即时看到内容变化
3. **灵活性** - 支持 Markdown 和 MDX
4. **性能** - 构建时生成，运行时零开销

## 安装和配置

安装 Contentlayer 非常简单：

```bash
npm install contentlayer next-contentlayer
```

然后在 `contentlayer.config.ts` 中配置：

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `posts/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
  },
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post],
})
```

## 在页面中使用

使用生成的类型和数据：

```typescript
import { allPosts } from 'contentlayer/generated'

export default function Blog() {
  return (
    <div>
      {allPosts.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
        </article>
      ))}
    </div>
  )
}
```

## 总结

Contentlayer 让内容管理变得简单而优雅，特别适合静态博客和文档网站。
```

### Step 2: Create a life post

Create `content/posts/life/2025-goals.mdx`:

```mdx
---
title: "2025 年度目标"
description: "新的一年，新的开始。记录下今年想要完成的事情。"
date: "2025-12-14"
category: "life"
tags: ["年度目标", "计划", "成长"]
featured: false
draft: false
---

# 2025 年度目标

新的一年到了，是时候为自己设定一些目标了。

## 技术方面

- 深入学习 **React Server Components**
- 掌握 **TypeScript** 高级特性
- 贡献更多开源项目
- 写至少 50 篇技术文章

## 生活方面

- 保持每周运动 3 次
- 读完 24 本书
- 学会一门新的语言
- 多陪伴家人

## 创作方面

> "The best time to plant a tree was 20 years ago. The second best time is now."

- 完成个人博客建设
- 制作一个有趣的开源项目
- 尝试录制技术视频
- 参与技术社区分享

## 小结

目标不在多，在于能够坚持。希望年底回看这篇文章时，能够问心无愧。

加油！💪
```

### Step 3: Test with multiple posts

Run:
```bash
npm run dev
```

Expected:
- Home page shows 3 posts (or 4 if you want to create one more)
- Blog list shows all 3 posts
- Different categories shown
- All posts clickable and render correctly

### Step 4: Commit

```bash
git add content/posts/
git commit -m "feat: add more test blog posts

- Add tech post about Contentlayer with code examples
- Add life post about 2025 goals
- Test multi-category functionality
- Verify card layout with multiple posts"
```

---

## Phase 1 Complete!

Congratulations! Phase 1 is now complete. You have:

✅ Contentlayer configured with MDX support
✅ Design system tokens and utilities
✅ Core UI components (Button, Card)
✅ Layout components (Header, Footer, Logo)
✅ Home page with Hero and FeaturedPosts
✅ Blog list page with PostCard
✅ Blog post detail page with MDX rendering
✅ Placeholder pages for Projects and About
✅ Test content to verify everything works

## What's Next?

**Phase 2** will include:
- Shiki code highlighting with Rosé Pine Dawn theme
- Enhanced MDX components
- Table of Contents (TOC) generation
- Search functionality with Fuse.js
- Category filtering
- Projects page with timeline layout
- About page with full content

**Phase 3** will add:
- Framer Motion animations
- Hero wave/fluid background
- Page transitions
- Hover effects and stagger animations
- Mobile drawer with smooth slide-in

## Current Status

- ✅ All routes working
- ✅ Content management functional
- ✅ Responsive design
- ✅ Basic styling complete
- 🚧 Animations (Phase 3)
- 🚧 Advanced features (Phase 2)
