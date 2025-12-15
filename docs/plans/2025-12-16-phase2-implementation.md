# Phase 2: Enhanced Features Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add professional code highlighting, TOC navigation, interactive filtering, search functionality, and complete the Projects and About pages.

**Architecture:** Integrate Shiki for build-time syntax highlighting via rehype plugins, implement client-side search with Fuse.js, add Contentlayer Project document type, and create interactive filtering with smooth animations. All features maintain static-first approach with minimal client-side JavaScript.

**Tech Stack:** Next.js 15, React 19, TypeScript, Contentlayer, Shiki, rehype-pretty-code, Fuse.js, Framer Motion (optional for animations)

---

## Task 1: Install Dependencies for Phase 2

**Files:**
- Modify: `package.json`

### Step 1: Install Shiki and rehype-pretty-code

Run:
```bash
pnpm install shiki rehype-pretty-code
```

Expected: Dependencies installed successfully

### Step 2: Install Fuse.js for search

Run:
```bash
pnpm install fuse.js
```

Expected: Dependency installed successfully

### Step 3: Verify installation

Run:
```bash
pnpm list shiki rehype-pretty-code fuse.js
```

Expected: All three packages listed with version numbers

### Step 4: Commit

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: install Phase 2 dependencies

- Add shiki and rehype-pretty-code for code highlighting
- Add fuse.js for search functionality"
```

---

## Task 2: Configure Shiki Code Highlighting

**Files:**
- Modify: `contentlayer.config.ts`

### Step 1: Import rehype-pretty-code

Add to top of `contentlayer.config.ts`:

```typescript
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import rehypePrettyCode from 'rehype-pretty-code'
```

### Step 2: Configure rehype-pretty-code options

Add before `export default makeSource`:

```typescript
const rehypePrettyCodeOptions = {
  theme: 'rose-pine-dawn',
  keepBackground: true,
  onVisitLine(node: any) {
    // Prevent lines from collapsing in `display: grid` mode
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }]
    }
  },
  onVisitHighlightedLine(node: any) {
    node.properties.className?.push('line--highlighted')
  },
  onVisitHighlightedChars(node: any) {
    node.properties.className = ['word--highlighted']
  },
}
```

### Step 3: Add rehype plugin to makeSource

Modify the `mdx` section in `makeSource`:

```typescript
export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
})
```

### Step 4: Test build with Shiki

Run:
```bash
pnpm run build
```

Expected: Build succeeds, Shiki processes code blocks

### Step 5: Commit

```bash
git add contentlayer.config.ts
git commit -m "feat: configure Shiki code highlighting

- Add rehype-pretty-code with Rosé Pine Dawn theme
- Configure line and character highlighting
- Keep background for theme consistency"
```

---

## Task 3: Enhance Code Block Component

**Files:**
- Modify: `components/blog/MDXComponents.tsx`
- Modify: `app/globals.css`

### Step 1: Update Pre component with copy button

Replace the `Pre` function in `components/blog/MDXComponents.tsx`:

```typescript
'use client'

import { ComponentProps, ReactNode, useState } from 'react'

// ... other imports and components ...

function Pre({ children, ...props }: ComponentProps<'pre'>) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const code = props['data-raw'] || ''
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative my-8 group">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-gray-300 text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Copied!
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy
          </span>
        )}
      </button>

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
```

### Step 2: Add Shiki theme styles to globals.css

Add to the end of `app/globals.css`:

```css
/* Shiki code highlighting styles */
pre code {
  display: grid;
  counter-reset: line;
}

pre code > [data-line]::before {
  counter-increment: line;
  content: counter(line);
  display: inline-block;
  width: 1rem;
  margin-right: 2rem;
  text-align: right;
  color: rgba(255, 255, 255, 0.3);
}

pre code [data-highlighted-line] {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0 1rem;
  margin: 0 -1rem;
}

.word--highlighted {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}
```

### Step 3: Test code highlighting

Run:
```bash
pnpm run dev
```

Expected: Open http://localhost:3000/blog/nextjs-contentlayer, see syntax highlighted code with Rosé Pine Dawn theme

### Step 4: Commit

```bash
git add components/blog/MDXComponents.tsx app/globals.css
git commit -m "feat: enhance code blocks with copy button and Shiki styles

- Add copy-to-clipboard button with success feedback
- Style Shiki output with line numbers and highlighting
- Add hover glow effect on code blocks"
```

---

## Task 4: Add Project Document Type to Contentlayer

**Files:**
- Modify: `contentlayer.config.ts`

### Step 1: Define Project document type

Add after the `Post` definition in `contentlayer.config.ts`:

```typescript
export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: `projects/**/*.mdx`,
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
    cover: {
      type: 'string',
      required: false,
    },
    techStack: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    demoUrl: {
      type: 'string',
      required: false,
    },
    githubUrl: {
      type: 'string',
      required: false,
    },
    featured: {
      type: 'boolean',
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        const path = doc._raw.flattenedPath.replace('projects/', '')
        const segments = path.split('/')
        return segments[segments.length - 1]
      },
    },
    url: {
      type: 'string',
      resolve: (doc) => {
        const path = doc._raw.flattenedPath.replace('projects/', '')
        const segments = path.split('/')
        return `/projects/${segments[segments.length - 1]}`
      },
    },
  },
}))
```

### Step 2: Add Project to documentTypes

Update the `makeSource` call:

```typescript
export default makeSource({
  contentDirPath: './content',
  documentTypes: [Post, Project],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
  },
})
```

### Step 3: Create projects directory

Run:
```bash
mkdir -p content/projects
```

Expected: Directory created

### Step 4: Create sample project file

Create `content/projects/vibecoding-blog.mdx`:

```mdx
---
title: "VibeCoding Personal Blog"
description: "A modern, elegant personal blog built with Next.js 15, featuring MDX content management, beautiful animations, and a gentle aesthetic."
date: "2025-12-16"
techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Contentlayer", "MDX"]
demoUrl: "https://vibecoding.com"
githubUrl: "https://github.com/vibecoding/blog"
featured: true
---

# VibeCoding Blog

A modern personal blog showcasing the "Floating Cosmos" design aesthetic with gentle gradients, glass morphism, and smooth animations.

## Features

- **Static Site Generation** - Built with Next.js App Router for optimal performance
- **Type-Safe Content** - Contentlayer for MDX management with TypeScript
- **Beautiful Code Blocks** - Shiki syntax highlighting with Rosé Pine Dawn theme
- **Responsive Design** - Mobile-first approach with elegant desktop layouts

## Technical Highlights

- Zero-runtime code highlighting
- Optimized image loading
- SEO-friendly metadata
- Fast page transitions
```

### Step 5: Test Contentlayer generation

Run:
```bash
pnpm run dev
```

Expected: Contentlayer generates Project types in `.contentlayer/generated`, no errors

### Step 6: Commit

```bash
git add contentlayer.config.ts content/projects/
git commit -m "feat: add Project document type to Contentlayer

- Define Project schema with required and optional fields
- Add computed fields for slug and url
- Create projects content directory
- Add sample VibeCoding blog project"
```

---

## Task 5: Create Table of Contents Component

**Files:**
- Create: `components/blog/TableOfContents.tsx`

### Step 1: Create TOC component file

Create `components/blog/TableOfContents.tsx`:

```typescript
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
```

### Step 2: Add utility to extract headings from MDX

Create `lib/toc.ts`:

```typescript
interface Heading {
  id: string
  text: string
  level: number
}

export function extractHeadings(content: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const headings: Heading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    headings.push({ id, text, level })
  }

  return headings
}
```

### Step 3: Update MDX components to add IDs to headings

Modify `components/blog/MDXComponents.tsx`:

```typescript
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
```

### Step 4: Test TOC component

Run:
```bash
pnpm run dev
```

Expected: Dev server starts, no TypeScript errors

### Step 5: Commit

```bash
git add components/blog/TableOfContents.tsx lib/toc.ts components/blog/MDXComponents.tsx
git commit -m "feat: create Table of Contents component

- Add TOC with scroll tracking and active highlighting
- Extract headings utility function
- Auto-generate heading IDs for anchor links
- Desktop-only sticky sidebar display"
```

---

## Task 6: Integrate TOC into Blog Post Page

**Files:**
- Modify: `app/blog/[slug]/BlogPostClient.tsx`

### Step 1: Import TOC component and utility

Add to imports in `app/blog/[slug]/BlogPostClient.tsx`:

```typescript
import TableOfContents from '@/components/blog/TableOfContents'
import { extractHeadings } from '@/lib/toc'
```

### Step 2: Extract headings in component

Add before the return statement:

```typescript
export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const MDXContent = useMDXComponent(post.body.code)
  const headings = extractHeadings(post.body.raw)

  return (
    // ... rest of component
  )
}
```

### Step 3: Update layout to include TOC

Replace the content section (around line 110-118) with:

```typescript
        {/* Content with TOC */}
        <div className="px-4 pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-12">
              {/* Table of Contents - Desktop only */}
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <TableOfContents headings={headings} />
              </aside>

              {/* Article body */}
              <div className="flex-1 max-w-3xl">
                <div
                  className="prose-custom"
                  style={{ animation: 'fade-in-up 0.8s ease-out 0.5s both' }}
                >
                  <MDXContent components={mdxComponents} />
                </div>

                {/* Article footer */}
                <footer className="mt-16 pt-8 border-t border-gray-200">
                  {/* ... existing footer content ... */}
                </footer>
              </div>
            </div>
          </div>
        </div>
```

### Step 4: Test TOC on blog post

Run:
```bash
pnpm run dev
```

Expected: Open a blog post, see TOC on left side (desktop), clicking scrolls to section, active heading highlights

### Step 5: Commit

```bash
git add app/blog/[slug]/BlogPostClient.tsx
git commit -m "feat: integrate TOC into blog post page

- Extract headings from post content
- Add TOC sidebar on desktop (hidden on mobile)
- Update layout to 3-column design
- Active section highlights as user scrolls"
```

---

## Task 7: Add Interactive Category Filtering

**Files:**
- Modify: `app/blog/page.tsx`

### Step 1: Convert blog page to use client component

Modify `app/blog/page.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { allPosts } from 'contentlayer/generated'
import PostCard from '@/components/blog/PostCard'

type Category = 'all' | 'tech' | 'life' | 'work'

const categoryConfig = {
  all: { label: 'All', emoji: '📚' },
  tech: { label: 'Tech', emoji: '⚡' },
  life: { label: 'Life', emoji: '🌸' },
  work: { label: 'Work', emoji: '🎨' },
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  // Filter and sort posts
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Filter by category
  const filteredPosts =
    activeCategory === 'all'
      ? posts
      : posts.filter((p) => p.category === activeCategory)

  // Count posts by category
  const postCounts = {
    all: posts.length,
    tech: posts.filter((p) => p.category === 'tech').length,
    life: posts.filter((p) => p.category === 'life').length,
    work: posts.filter((p) => p.category === 'work').length,
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Sharing tech insights, life reflections, and creative journeys
        </p>
      </div>

      {/* Category filters */}
      <div className="mb-12 flex gap-3 justify-center flex-wrap">
        {(Object.keys(categoryConfig) as Category[]).map((category) => {
          const config = categoryConfig[category]
          const isActive = activeCategory === category

          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{config.emoji}</span>
                <span>{config.label}</span>
                <span className={`text-sm ${isActive ? 'text-white/80' : 'text-gray-500'}`}>
                  ({postCounts[category]})
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No articles found in this category...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <div
              key={post.slug}
              style={{
                animation: `fade-in-up 0.5s ease-out ${index * 0.05}s both`,
              }}
            >
              <PostCard post={post} index={index} />
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
```

### Step 2: Add metadata to separate file

Create `app/blog/metadata.ts`:

```typescript
export const metadata = {
  title: 'Blog - vibecoding',
  description: 'Tech articles, life reflections, and project shares',
}
```

### Step 3: Test category filtering

Run:
```bash
pnpm run dev
```

Expected: Click category filters, posts filter with smooth animations, counts update

### Step 4: Commit

```bash
git add app/blog/page.tsx app/blog/metadata.ts
git commit -m "feat: add interactive category filtering to blog page

- Convert to client component with React state
- Filter posts by category in real-time
- Animate cards on filter change with stagger
- Show post counts in each filter button
- Active filter has gradient background"
```

---

## Task 8: Add Search Functionality

**Files:**
- Modify: `app/blog/page.tsx`

### Step 1: Import Fuse.js

Add to imports in `app/blog/page.tsx`:

```typescript
import Fuse from 'fuse.js'
import { useMemo } from 'react'
```

### Step 2: Add search state and Fuse instance

Add after the `activeCategory` state:

```typescript
export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Filter and sort posts
  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Setup Fuse.js for fuzzy search
  const fuse = useMemo(
    () =>
      new Fuse(posts, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'description', weight: 2 },
          { name: 'tags', weight: 1 },
        ],
        threshold: 0.3,
        includeScore: true,
      }),
    [posts]
  )

  // Apply search and category filter
  const filteredPosts = useMemo(() => {
    let results = posts

    // Apply search if query exists
    if (searchQuery.trim()) {
      const searchResults = fuse.search(searchQuery)
      results = searchResults.map((result) => result.item)
    }

    // Apply category filter
    if (activeCategory !== 'all') {
      results = results.filter((p) => p.category === activeCategory)
    }

    return results
  }, [posts, searchQuery, activeCategory, fuse])

  // ... rest of component
}
```

### Step 3: Add search input UI

Add after the category filters (before posts grid):

```typescript
      {/* Search box */}
      <div className="mb-12 max-w-2xl mx-auto">
        <div className="relative">
          {/* Search icon */}
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Input */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, content, or tags..."
            className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />

          {/* Clear button */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Clear search"
            >
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Search results count */}
        {searchQuery && (
          <p className="mt-3 text-sm text-gray-500 text-center">
            Found {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
```

### Step 4: Update empty state

Update the empty state message:

```typescript
      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg mb-4">
            {searchQuery
              ? `No articles found for "${searchQuery}"`
              : 'No articles found in this category...'}
          </p>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('')
                setActiveCategory('all')
              }}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold hover:shadow-lg transition-all"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        // ... posts grid ...
      )}
```

### Step 5: Test search functionality

Run:
```bash
pnpm run dev
```

Expected: Type in search box, posts filter in real-time, works with category filter, clear button removes search

### Step 6: Commit

```bash
git add app/blog/page.tsx
git commit -m "feat: add search functionality with Fuse.js

- Fuzzy search across title, description, and tags
- Real-time search as user types
- Works together with category filters
- Clear button and results count
- Empty state with clear all filters option"
```

---

## Task 9: Create Project Timeline Components

**Files:**
- Create: `components/projects/Timeline.tsx`
- Create: `components/projects/ProjectCard.tsx`

### Step 1: Create ProjectCard component

Create `components/projects/ProjectCard.tsx`:

```typescript
import Link from 'next/link'
import { Project } from 'contentlayer/generated'
import { formatDate } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index: number
  side: 'left' | 'right'
}

export default function ProjectCard({ project, index, side }: ProjectCardProps) {
  const techColors: Record<string, string> = {
    'Next.js': 'bg-black text-white',
    'Next.js 15': 'bg-black text-white',
    'React': 'bg-blue-500 text-white',
    'React 19': 'bg-blue-500 text-white',
    'TypeScript': 'bg-blue-600 text-white',
    'Tailwind CSS': 'bg-cyan-500 text-white',
    'Node.js': 'bg-green-600 text-white',
    'Contentlayer': 'bg-purple-500 text-white',
    'MDX': 'bg-orange-500 text-white',
  }

  return (
    <div
      className={`flex gap-8 items-center ${
        side === 'right' ? 'flex-row' : 'flex-row-reverse'
      }`}
      style={{
        animation: `fade-slide-${side} 0.6s ease-out ${index * 0.15}s both`,
      }}
    >
      {/* Card */}
      <div className="flex-1 max-w-xl">
        <div className="group relative p-6 rounded-3xl bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
          {/* Gradient glow on hover */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-blue-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />

          {/* Date */}
          <time className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            {formatDate(project.date)}
          </time>

          {/* Cover image */}
          {project.cover && (
            <div className="mt-4 -mx-6 -mt-6 mb-4">
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-3xl"
              />
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-bold mt-3 mb-2 text-gray-900">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  techColors[tech] || 'bg-gray-200 text-gray-700'
                }`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-pink-500 text-white text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 hover:scale-105 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Timeline node - hidden on mobile */}
      <div className="hidden lg:flex flex-col items-center flex-shrink-0">
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 shadow-lg relative z-10">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-pink-500 animate-ping opacity-75" />
        </div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden lg:block flex-1 max-w-xl" />
    </div>
  )
}
```

### Step 2: Create Timeline component

Create `components/projects/Timeline.tsx`:

```typescript
import { Project } from 'contentlayer/generated'
import ProjectCard from './ProjectCard'

interface TimelineProps {
  projects: Project[]
}

export default function Timeline({ projects }: TimelineProps) {
  return (
    <div className="relative">
      {/* Timeline line - hidden on mobile */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 -translate-x-1/2" />

      {/* Projects */}
      <div className="space-y-16">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={index}
            side={index % 2 === 0 ? 'right' : 'left'}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-slide-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-slide-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
```

### Step 3: Test components compile

Run:
```bash
pnpm run build
```

Expected: Build succeeds, no TypeScript errors

### Step 4: Commit

```bash
git add components/projects/
git commit -m "feat: create project timeline components

- Add ProjectCard with tech stack badges and links
- Add Timeline with alternating left/right layout
- Gradient timeline with animated nodes
- Staggered entrance animations
- Responsive: desktop timeline, mobile stacked"
```

---

## Task 10: Complete Projects Page

**Files:**
- Modify: `app/projects/page.tsx`

### Step 1: Update projects page with timeline

Replace contents of `app/projects/page.tsx`:

```typescript
import { allProjects } from 'contentlayer/generated'
import Timeline from '@/components/projects/Timeline'

export const metadata = {
  title: 'Projects - vibecoding',
  description: 'Showcase of projects and creative work',
}

export default function ProjectsPage() {
  // Sort projects by date (newest first)
  const projects = allProjects
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen py-16 px-4">
      {/* Header */}
      <div className="mx-auto max-w-4xl text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
          Projects
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A timeline of projects I've built, experiments I've tried, and ideas I've brought to life
        </p>
      </div>

      {/* Timeline */}
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">Projects coming soon...</p>
        </div>
      ) : (
        <div className="mx-auto max-w-6xl">
          <Timeline projects={projects} />
        </div>
      )}
    </div>
  )
}
```

### Step 2: Create additional sample projects

Create `content/projects/example-app.mdx`:

```mdx
---
title: "Example Mobile App"
description: "A cross-platform mobile application built with React Native, featuring real-time updates, offline support, and smooth animations."
date: "2025-06-10"
techStack: ["React Native", "TypeScript", "Firebase", "Redux"]
demoUrl: "https://example-app.com"
githubUrl: "https://github.com/example/app"
featured: false
---

# Example Mobile App

Built a full-featured mobile app with offline-first architecture.
```

Create `content/projects/api-service.mdx`:

```mdx
---
title: "REST API Service"
description: "Scalable RESTful API service with authentication, rate limiting, and comprehensive documentation."
date: "2025-03-15"
techStack: ["Node.js", "Express", "PostgreSQL", "Docker"]
githubUrl: "https://github.com/example/api"
featured: false
---

# REST API Service

High-performance API serving 1M+ requests per day.
```

### Step 3: Test projects page

Run:
```bash
pnpm run dev
```

Expected: Navigate to /projects, see timeline with 3 projects, alternating layout, smooth animations

### Step 4: Commit

```bash
git add app/projects/page.tsx content/projects/
git commit -m "feat: complete Projects page with timeline

- Display projects in chronological timeline
- Sort by date (newest first)
- Add two more sample projects
- Responsive header and empty state"
```

---

## Task 11: Complete About Page

**Files:**
- Modify: `app/about/page.tsx`

### Step 1: Replace About page content

Replace contents of `app/about/page.tsx`:

```typescript
export const metadata = {
  title: 'About - vibecoding',
  description: 'About vibecoding - Full-stack Developer and Open Source Enthusiast',
}

const skills = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis'],
  Tools: ['Git', 'Docker', 'VS Code', 'Figma', 'Vercel'],
  Other: ['MDX', 'Contentlayer', 'Shiki', 'Jest', 'Playwright'],
}

const socials = [
  {
    name: 'GitHub',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    ),
    href: 'https://github.com',
  },
  {
    name: 'Twitter',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    href: 'https://twitter.com',
  },
  {
    name: 'Email',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    href: 'mailto:hello@vibecoding.com',
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Hero Section */}
        <div
          className="text-center mb-16"
          style={{ animation: 'fade-in-up 0.6s ease-out' }}
        >
          {/* Avatar */}
          <div className="inline-block relative mb-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-white text-5xl font-bold shadow-2xl">
              V
            </div>
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 opacity-20 blur-xl -z-10" />
          </div>

          {/* Name */}
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
            style={{ animation: 'fade-in-up 0.7s ease-out 0.1s both' }}
          >
            vibecoding
          </h1>

          {/* Tagline */}
          <p
            className="text-xl text-gray-600"
            style={{ animation: 'fade-in-up 0.7s ease-out 0.2s both' }}
          >
            Full-stack Developer × Open Source Enthusiast
          </p>
        </div>

        {/* About Me */}
        <section
          className="mb-16"
          style={{ animation: 'fade-in-up 0.7s ease-out 0.3s both' }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-pink-500" />
            About Me
          </h2>
          <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
            <p>
              Hi! I'm a full-stack developer passionate about building elegant, performant web applications. I love working with modern technologies and exploring new ways to create delightful user experiences.
            </p>
            <p>
              When I'm not coding, you'll find me contributing to open source projects, writing technical articles, or experimenting with new tools and frameworks. I believe in continuous learning and sharing knowledge with the developer community.
            </p>
            <p>
              I'm particularly interested in React ecosystem, TypeScript, performance optimization, and design systems. I enjoy building tools that make developers' lives easier and creating interfaces that users love.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section
          className="mb-16"
          style={{ animation: 'fade-in-up 0.7s ease-out 0.4s both' }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-pink-500" />
            Skills
          </h2>
          <div className="space-y-6">
            {Object.entries(skills).map(([category, items], categoryIndex) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-pink-50 text-gray-700 font-medium border border-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                      style={{
                        animation: `fade-in-up 0.4s ease-out ${
                          0.5 + categoryIndex * 0.1 + skillIndex * 0.05
                        }s both`,
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          className="mb-16"
          style={{ animation: 'fade-in-up 0.7s ease-out 0.6s both' }}
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-3">
            <span className="w-1 h-8 rounded-full bg-gradient-to-b from-blue-500 to-pink-500" />
            Get in Touch
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Feel free to reach out for collaborations, questions, or just to say hi!
          </p>
          <div className="flex gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.name !== 'Email' ? '_blank' : undefined}
                rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-pink-50 text-gray-700 hover:from-blue-500 hover:to-pink-500 hover:text-white hover:shadow-lg hover:scale-110 transition-all duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
```

### Step 2: Test About page

Run:
```bash
pnpm run dev
```

Expected: Navigate to /about, see full content with avatar, intro, skills, and contact links, smooth staggered animations

### Step 3: Commit

```bash
git add app/about/page.tsx
git commit -m "feat: complete About page with full content

- Add hero section with gradient avatar
- Write personal introduction (3 paragraphs)
- Display skills grouped by category
- Add social contact links with hover effects
- Staggered entrance animations throughout"
```

---

## Task 12: Final Testing and Build

**Files:**
- None (testing phase)

### Step 1: Run production build

Run:
```bash
pnpm run build
```

Expected: Build succeeds with no errors, all pages generated

### Step 2: Test all pages in production mode

Run:
```bash
pnpm run build && pnpm start
```

Then test each page:
- http://localhost:3000 - Home
- http://localhost:3000/blog - Blog list with filters and search
- http://localhost:3000/blog/nextjs-contentlayer - Post with TOC and syntax highlighting
- http://localhost:3000/projects - Projects timeline
- http://localhost:3000/about - About page

Expected: All pages load correctly, all features work, no console errors

### Step 3: Test responsive design

Using browser dev tools, test at these breakpoints:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1920px

Expected: All pages responsive, TOC hidden on mobile, timeline adapts, navigation works

### Step 4: Test interactive features

Verify:
- ✅ Category filtering works and animates
- ✅ Search finds posts correctly
- ✅ TOC highlights active section
- ✅ Code blocks have copy button
- ✅ All links work
- ✅ Animations smooth and performant

### Step 5: Check Lighthouse scores

Run Lighthouse in Chrome DevTools on:
- Home page
- Blog list page
- Blog post page

Expected: Performance >90, Accessibility >95, Best Practices >95, SEO 100

### Step 6: Final commit

```bash
git add -A
git commit -m "test: verify Phase 2 implementation complete

- All pages build successfully
- Interactive features working
- Responsive design verified
- Lighthouse scores excellent
- Ready for deployment"
```

---

## Phase 2 Complete!

Congratulations! Phase 2 is now complete. You have:

✅ **Shiki Code Highlighting** - Beautiful Rosé Pine Dawn syntax highlighting with copy button
✅ **Table of Contents** - Scroll-tracking TOC on blog posts (desktop)
✅ **Category Filtering** - Interactive filters with smooth animations
✅ **Search Functionality** - Fuzzy search with Fuse.js across posts
✅ **Projects Page** - Timeline layout with sample projects
✅ **About Page** - Complete with intro, skills, and contact

## Next Steps

**Phase 3** will add:
- Framer Motion for advanced animations
- Hero wave/fluid background animation
- Page transitions between routes
- Enhanced hover effects
- Loading states and skeleton screens

**Deployment**:
- Set up Vercel/Netlify deployment
- Configure custom domain
- Set up analytics (optional)
- Add RSS feed generation

Enjoy your enhanced blog! 🎉
