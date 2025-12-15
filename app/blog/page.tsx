'use client'

import { useState } from 'react'
import { allPosts } from 'contentlayer/generated'
import PostCard from '@/components/blog/PostCard'

const categories = [
  { id: 'all', label: '全部', emoji: '📚' },
  { id: 'tech', label: '技术', emoji: '⚡' },
  { id: 'life', label: '生活', emoji: '🌸' },
  { id: 'work', label: '作品', emoji: '🎨' },
]

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  // Filter and sort posts
  const allFilteredPosts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const posts = activeCategory === 'all'
    ? allFilteredPosts
    : allFilteredPosts.filter((p) => p.category === activeCategory)

  // Count posts by category
  const counts = {
    all: allFilteredPosts.length,
    tech: allFilteredPosts.filter((p) => p.category === 'tech').length,
    life: allFilteredPosts.filter((p) => p.category === 'life').length,
    work: allFilteredPosts.filter((p) => p.category === 'work').length,
  }

  return (
    <div className="min-h-screen">
      {/* Hero header */}
      <section className="relative pt-8 pb-16 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 via-pink-50/30 to-transparent -z-10" />

        <div className="mx-auto max-w-7xl">
          {/* Page title */}
          <div className="text-center mb-12">
            <div
              className="inline-block mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm"
              style={{ animation: 'fade-in-down 0.6s ease-out' }}
            >
              <span className="text-sm font-semibold text-gray-600">
                ✍️ BLOG ARCHIVE
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.1s both' }}
            >
              博客文章
            </h1>
            <p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.2s both' }}
            >
              探索技术深度、分享生活感悟、记录创作历程
            </p>
          </div>

          {/* Category filters - Floating pills */}
          <div
            className="flex flex-wrap justify-center gap-3 mb-8"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.3s both' }}
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id
              const count = counts[cat.id as keyof typeof counts]

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`group relative px-5 py-3 rounded-full font-medium transition-all duration-500 ${
                    isActive
                      ? 'text-white shadow-lg scale-105'
                      : 'bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-700 hover:border-gray-300 hover:shadow-md hover:scale-105'
                  }`}
                >
                  {/* Active gradient background */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full" />
                  )}

                  {/* Hover glow */}
                  <div className={`absolute -inset-1 rounded-full blur-lg transition-opacity duration-500 ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-400 to-pink-400 opacity-50'
                      : 'bg-gradient-to-r from-blue-400/0 to-pink-400/0 group-hover:from-blue-400/30 group-hover:to-pink-400/30 opacity-0 group-hover:opacity-100'
                  }`} />

                  <span className="relative flex items-center gap-2">
                    <span className="text-lg">{cat.emoji}</span>
                    <span>{cat.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20' : 'bg-gray-100'
                    }`}>
                      {count}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Search placeholder */}
          <div
            className="max-w-2xl mx-auto"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.4s both' }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-pink-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center">
                <span className="absolute left-5 text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="搜索文章标题、内容或标签..."
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
                  disabled
                />
                <span className="absolute right-5 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                  Phase 2
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-xl text-gray-500">这个分类还没有文章</p>
              <p className="text-gray-400 mt-2">敬请期待更多内容...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Featured first post */}
              {posts[0] && (
                <div className="lg:col-span-8">
                  <PostCard post={posts[0]} featured index={0} />
                </div>
              )}

              {/* Second post - smaller */}
              {posts[1] && (
                <div className="lg:col-span-4">
                  <PostCard post={posts[1]} index={1} />
                </div>
              )}

              {/* Rest of posts - masonry-like grid */}
              {posts.slice(2).map((post, idx) => (
                <div
                  key={post.slug}
                  className={`${
                    idx % 3 === 0 ? 'lg:col-span-6' : idx % 3 === 1 ? 'lg:col-span-6' : 'lg:col-span-4'
                  }`}
                >
                  <PostCard post={post} index={idx + 2} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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
