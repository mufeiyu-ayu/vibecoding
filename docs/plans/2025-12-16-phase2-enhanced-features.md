# Phase 2: Enhanced Features Design Document

**Created**: 2025-12-16
**Status**: ✅ Design Complete, Ready for Implementation
**Previous Phase**: Phase 1 - Blog Foundation Complete

## Overview

Phase 2 builds upon the solid foundation from Phase 1 by adding professional code highlighting, improved navigation, interactive filtering, search functionality, and completing the Projects and About pages.

**Priority Order**: Code Quality First
1. Shiki code highlighting (professional appearance)
2. Table of Contents (readability)
3. Interactive category filtering (complete existing UI)
4. Search functionality (discoverability)
5. Projects page (content completeness)
6. About page (content completeness)

## Design Sections

### 1. Shiki Code Highlighting

**Goal**: Replace basic code styling with professional syntax highlighting.

**Approach**:
- Use Shiki with **Rosé Pine Dawn** theme exclusively (no theme switching needed)
- Integrate via `rehype-pretty-code` in Contentlayer's MDX pipeline
- Add code block enhancements:
  - Language label (top-right corner)
  - Copy button with success feedback
  - Optional line numbers (off by default)
  - Smooth hover glow effect

**Technical Implementation**:
- Install: `shiki`, `rehype-pretty-code`
- Configure in `contentlayer.config.ts` as rehype plugin
- Build-time highlighting (zero runtime JS cost)
- Supports 100+ languages automatically

**File Changes**:
- `contentlayer.config.ts` - Add rehype-pretty-code configuration
- `components/blog/MDXComponents.tsx` - Enhance Pre component with toolbar
- `app/globals.css` - Add Shiki theme CSS variables

**Trade-offs**:
- ✅ Beautiful highlighting with zero runtime cost
- ✅ 100+ languages supported
- ⚠️ Slight build time increase (1-2s per 100 posts)
- ⚠️ Theme changes require rebuild (acceptable for static site)

---

### 2. Table of Contents (TOC)

**Goal**: Auto-generate TOC for blog posts to improve navigation of long articles.

**Approach**:
- Extract H2 and H3 headings from MDX content automatically
- Desktop only (hidden on mobile/tablet < 1024px)
- Sticky sidebar positioning on left side
- Highlight current section during scroll
- Smooth scroll to section on click

**Technical Implementation**:
- Extract headings via remark plugin or custom parsing
- Generate heading IDs (slugified from text)
- Client component for scroll tracking
- Intersection Observer API for active detection
- Store heading structure in Post computed field

**Component Structure**:
```typescript
// components/blog/TableOfContents.tsx
interface Heading {
  level: 2 | 3
  text: string
  id: string
}

props: { headings: Heading[] }
- Tracks active heading with useEffect + IntersectionObserver
- Renders nested list with indentation
```

**Layout Changes**:
- Desktop (>1024px): 3-column layout
  - Left sidebar (250px): TOC (sticky)
  - Center (65ch): Article content
  - Right: Breathing room
- Mobile: TOC hidden, full-width content

**Visual Design**:
- TOC items: Gray text, gradient on active
- Thin connecting line on left edge
- Smooth 300ms transitions
- Small dot indicator for active heading

---

### 3. Interactive Category Filtering

**Goal**: Make blog list category filters functional with smooth transitions.

**Approach**:
- Client component for filters (or client island)
- Real-time filtering based on selected category
- Animate cards during filter changes (fade out/in with stagger)
- Optional: URL sync with query parameter `/blog?category=tech`
- Preserve scroll position

**Technical Implementation**:
```typescript
// app/blog/page.tsx (client component or hybrid)
const [activeCategory, setActiveCategory] = useState<Category>('all')
const filteredPosts = posts.filter(post =>
  activeCategory === 'all' || post.category === activeCategory
)
```

- Use Framer Motion's `AnimatePresence` for card transitions
- Optional: `useSearchParams` for URL sync
- Debounce filtering to avoid layout thrashing

**Visual Feedback**:
- Active filter: Gradient background + white text
- Inactive filters: Gray background + gray text
- Smooth 300ms transition
- Pill-shaped buttons with hover effects
- Show post count in each button

**Animation Behavior**:
- Cards fade out: 200ms
- Layout reflow
- Cards fade in with stagger: 50ms between each
- Total: ~500ms for smooth experience

---

### 4. Search Functionality

**Goal**: Add client-side fuzzy search using Fuse.js.

**Approach**:
- Fuzzy search across titles, descriptions, tags
- Real-time search with 300ms debounce
- Works together with category filters (combined filtering)
- Highlight matches in results
- "No results" state with suggestions

**Technical Implementation**:
```typescript
// Fuse.js configuration
const fuseOptions = {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'description', weight: 2 },
    { name: 'tags', weight: 1 }
  ],
  threshold: 0.3,
  includeMatches: true // for highlighting
}
```

- Install: `fuse.js`
- Client-side only (all posts already loaded)
- Combine search results with category filter

**UX Flow**:
1. User types in search box
2. 300ms debounce
3. Fuse.js searches posts
4. Apply category filter on results
5. Animate cards with new results

**Visual Design**:
- Input: Full width mobile, max-w-2xl desktop
- Search icon (left), clear button (right when typing)
- Placeholder: "Search articles by title, content, or tags..."
- Focus: Blue gradient ring

**Empty State**:
- No results message with emoji
- Suggestion: "Try different keywords or clear filters"
- Button to clear all filters and search

---

### 5. Projects Page with Timeline Layout

**Goal**: Visually stunning timeline to showcase projects.

**Approach**:
- Vertical timeline with alternating left/right cards (desktop)
- Mobile: All cards on right, thin timeline on left
- Read from `content/projects/*.mdx` files
- Sort by date (newest first)
- Display: image, title, description, tech stack, links

**Content Structure** (New Contentlayer Document Type):
```typescript
export const Project = defineDocumentType(() => ({
  name: 'Project',
  filePathPattern: 'projects/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    cover: { type: 'string', required: false },
    techStack: { type: 'list', of: { type: 'string' }, required: true },
    demoUrl: { type: 'string', required: false },
    githubUrl: { type: 'string', required: false },
    featured: { type: 'boolean', default: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('projects/', ''),
    },
  },
}))
```

**Visual Design**:
- **Timeline**:
  - Vertical gradient line (blue → pink) in center
  - Circular nodes at each project point
  - Nodes glow on hover

- **Project Cards**:
  - Glass morphism background
  - Hover: Lift + shadow increase
  - Cover image at top (rounded)
  - Tech stack as colored badges
  - Action buttons at bottom

**Desktop Layout** (>1024px):
```
[Card Left] ●━━━ Timeline ━━━
            ●━━━ Timeline ━━━ [Card Right]
[Card Left] ●━━━ Timeline ━━━
```

**Mobile Layout** (<1024px):
```
Timeline ━━━ [Card]
●
Timeline ━━━ [Card]
●
```

**Animation**:
- Scroll-triggered entrance (Intersection Observer)
- Cards fade in + slide from side
- Stagger: 150ms between cards
- Timeline draws progressively during scroll

---

### 6. About Page with Full Content

**Goal**: Complete About page with introduction, skills, contact.

**Approach**:
- Single-column centered layout (max-width: 65ch)
- Static content in component (no MDX needed)
- Natural top-to-bottom flow
- Staggered entrance animations

**Content Structure**:

1. **Hero Section**:
   - Gradient avatar placeholder (120px circle)
   - Name with gradient text
   - One-line tagline
   - Fade + slide up animation

2. **About Me Section** (h2):
   - 2-4 paragraphs introduction
   - Natural storytelling
   - Placeholder text (user customizable)

3. **Skills Section** (h2):
   - Grouped: Frontend / Backend / Tools / Other
   - Pill-shaped badges
   - Tech-specific colors:
     - React/Next.js: Blue gradient
     - TypeScript: Blue solid
     - Tailwind: Cyan gradient
     - Node.js: Green

4. **Contact Section** (h2):
   - Social links with icons
   - GitHub, Twitter, Email, LinkedIn
   - Horizontal layout
   - Icons scale + color shift on hover

**Visual Design**:
- Typography-focused, clean layout
- Generous spacing (2-3rem between sections)
- H2 headings with gradient underline
- Avatar: Gradient border
- Badges: Rounded-full, subtle shadow, hover lift
- Icons: 24px with gradient hover

**Animation Sequence** (entrance):
- Avatar: Fade in (0ms)
- Name: Fade + slide up (100ms)
- Tagline: Fade + slide up (200ms)
- About: Fade up (300ms)
- Skills: Stagger badges (400ms + 50ms each)
- Contact: Fade up (600ms)

---

## Technical Architecture

### Dependencies to Add

```json
{
  "dependencies": {
    "fuse.js": "^7.0.0",
    "rehype-pretty-code": "^0.13.0",
    "shiki": "^1.0.0"
  }
}
```

### File Structure Changes

```
New files:
- components/blog/TableOfContents.tsx
- components/blog/CodeBlock.tsx (enhanced)
- components/projects/Timeline.tsx
- components/projects/ProjectCard.tsx
- content/projects/*.mdx (sample projects)

Modified files:
- contentlayer.config.ts (add Project type, rehype plugin)
- app/blog/page.tsx (add filtering + search)
- app/projects/page.tsx (complete implementation)
- app/about/page.tsx (complete implementation)
- components/blog/MDXComponents.tsx (enhance Pre component)
- app/globals.css (Shiki theme variables)
```

### Performance Considerations

- **Shiki**: Build-time only, zero runtime cost
- **Search**: Client-side with Fuse.js (~15KB gzipped)
- **Filtering**: React state, no external dependencies
- **TOC**: Minimal overhead, only on blog post pages
- **Animations**: CSS-based where possible, Framer Motion for complex

### Browser Support

- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Graceful degradation for older browsers
- No animations if `prefers-reduced-motion` enabled

---

## Success Criteria

**Phase 2 Complete When**:
- ✅ Code blocks have syntax highlighting with Rosé Pine Dawn
- ✅ Blog posts show working TOC on desktop
- ✅ Category filters work and animate smoothly
- ✅ Search finds posts by title/description/tags
- ✅ Projects page displays timeline with sample projects
- ✅ About page has full content and animations
- ✅ All features work responsively on mobile
- ✅ Production build succeeds
- ✅ Lighthouse score remains >90

---

## Next Steps: Implementation

1. Create detailed implementation plan with task breakdown
2. Use git worktree for isolated development
3. Implement tasks in priority order
4. Test each feature before moving to next
5. Commit after each completed task

**Estimated Tasks**: 12-15 tasks
**Complexity**: Medium (building on solid Phase 1 foundation)
