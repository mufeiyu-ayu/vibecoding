'use client'

import Link from 'next/link'
import { Post } from 'contentlayer/generated'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
  featured?: boolean
  index?: number
}

export default function PostCard({ post, featured = false, index = 0 }: PostCardProps) {
  return (
    <Link
      href={post.url}
      className="group block"
      style={{
        animation: `card-float-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both`,
      }}
    >
      <article
        className={`relative h-full overflow-hidden rounded-3xl transition-all duration-500 ${
          featured
            ? 'bg-gradient-to-br from-blue-50 via-white to-pink-50 p-8 md:p-10'
            : 'bg-white p-6'
        }`}
      >
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className={`absolute inset-[1px] rounded-3xl bg-white ${featured ? 'bg-gradient-to-br from-blue-50 via-white to-pink-50' : ''}`} />

        {/* Hover glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-blue-400/10 group-hover:via-pink-400/10 group-hover:to-purple-400/10 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col">
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              post.category === 'tech'
                ? 'bg-blue-100 text-blue-700'
                : post.category === 'life'
                ? 'bg-pink-100 text-pink-700'
                : 'bg-purple-100 text-purple-700'
            }`}>
              {post.category === 'tech' ? '⚡ Tech' : post.category === 'life' ? '🌸 Life' : '🎨 Work'}
            </span>
            {post.featured && (
              <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold">
                ✨ Featured
              </span>
            )}
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <time className="font-medium">{formatDate(post.date)}</time>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span>{post.readingTime}</span>
          </div>

          {/* Title */}
          <h2 className={`font-bold mb-3 leading-tight group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500 ${
            featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'
          }`}>
            {post.title}
          </h2>

          {/* Description */}
          <p className={`text-gray-600 mb-4 flex-1 leading-relaxed ${
            featured ? 'text-lg line-clamp-4' : 'text-base line-clamp-3'
          }`}>
            {post.description}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {post.tags.slice(0, featured ? 5 : 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors duration-300"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > (featured ? 5 : 3) && (
                <span className="text-xs px-3 py-1.5 text-gray-400 font-medium">
                  +{post.tags.length - (featured ? 5 : 3)}
                </span>
              )}
            </div>
          )}

          {/* Read more */}
          <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:text-pink-600 transition-colors duration-300">
            <span>Read More</span>
            <svg
              className="ml-2 w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Decorative corner accent for featured */}
        {featured && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/10 via-pink-500/10 to-transparent rounded-bl-full" />
        )}
      </article>

      <style jsx>{`
        @keyframes card-float-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Link>
  )
}
