'use client'

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
    <section className="relative mx-auto max-w-7xl px-4 py-24 md:py-32">
      {/* Section header */}
      <div className="mb-16 text-center">
        <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-pink-500/10 border border-blue-500/20">
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
            ✨ LATEST POSTS
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
          Latest Posts
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Exploring tech, life, and creative endeavors
        </p>
      </div>

      {/* Staggered grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-16">
        {posts.map((post, index) => {
          // Determine card size and position for visual interest
          const isLarge = index === 0
          const gridClass = isLarge
            ? 'lg:col-span-7 md:row-span-2'
            : index === 1
            ? 'lg:col-span-5'
            : 'lg:col-span-6'

          return (
            <Link
              key={post.slug}
              href={post.url}
              className={`group ${gridClass}`}
              style={{
                animation: `float-in-stagger 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s both`,
              }}
            >
              <Card
                hover
                className={`h-full relative overflow-hidden border-2 hover:border-blue-500/30 transition-all duration-500 ${
                  isLarge ? 'p-8' : 'p-6'
                }`}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-pink-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:via-pink-500/5 group-hover:to-purple-500/5 transition-all duration-500 pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Meta info */}
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <time className="font-medium">{formatDate(post.date)}</time>
                    <span>·</span>
                    <span className="font-medium">{post.readingTime}</span>
                    <span>·</span>
                    <span className="px-2 py-1 rounded-full bg-gradient-to-r from-blue-500 to-pink-500 text-white text-xs font-semibold">
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-bold mb-3 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 ${
                      isLarge ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
                    }`}
                  >
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-gray-600 mb-4 flex-1 ${
                      isLarge ? 'text-lg line-clamp-4' : 'text-base line-clamp-3'
                    }`}
                  >
                    {post.description}
                  </p>

                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.slice(0, isLarge ? 4 : 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-300 font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > (isLarge ? 4 : 3) && (
                        <span className="text-xs px-3 py-1.5 text-gray-400 font-medium">
                          +{post.tags.length - (isLarge ? 4 : 3)}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Read more indicator */}
                  <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 group-hover:text-pink-600 transition-colors duration-300">
                    <span>Read More</span>
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* View all button */}
      <div className="text-center" style={{ animation: 'fade-in-scale 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both' }}>
        <Link href="/blog">
          <Button variant="secondary" size="lg" className="min-w-[200px] group">
            <span className="mr-2">📚</span>
            View All Posts
            <svg
              className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </Link>
      </div>

      <style jsx>{`
        @keyframes float-in-stagger {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fade-in-scale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  )
}
