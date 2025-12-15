'use client'

/* eslint-disable react-hooks/static-components */

import Link from 'next/link'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { Post } from 'contentlayer/generated'
import { formatDate } from '@/lib/utils'
import { mdxComponents } from '@/components/blog/MDXComponents'
import ReadingProgress from '@/components/blog/ReadingProgress'
import PostCard from '@/components/blog/PostCard'

interface BlogPostClientProps {
  post: Post
  relatedPosts: Post[]
}

export default function BlogPostClient({ post, relatedPosts }: BlogPostClientProps) {
  const MDXContent = useMDXComponent(post.body.code)

  return (
    <>
      <ReadingProgress />

      <article className="min-h-screen">
        {/* Hero Header */}
        <header className="relative pt-8 pb-20 px-4 overflow-hidden">
          {/* Gradient mesh background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-pink-50/50 to-white" />
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-float-slower" />
          </div>

          <div className="mx-auto max-w-4xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors duration-300 mb-8 group"
              style={{ animation: 'fade-in-down 0.6s ease-out' }}
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Blog</span>
            </Link>

            {/* Category & Date */}
            <div
              className="flex flex-wrap items-center gap-4 mb-6"
              style={{ animation: 'fade-in-up 0.7s ease-out 0.1s both' }}
            >
              <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider ${
                post.category === 'tech'
                  ? 'bg-blue-100 text-blue-700'
                  : post.category === 'life'
                  ? 'bg-pink-100 text-pink-700'
                  : 'bg-purple-100 text-purple-700'
              }`}>
                {post.category === 'tech' ? '⚡ Tech' : post.category === 'life' ? '🌸 Life' : '🎨 Work'}
              </span>
              <div className="flex items-center gap-2 text-gray-500">
                <time className="font-medium">{formatDate(post.date)}</time>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <span>{post.readingTime}</span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.2s both' }}
            >
              {post.title}
            </h1>

            {/* Description */}
            <p
              className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light mb-8"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.3s both' }}
            >
              {post.description}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div
                className="flex flex-wrap gap-2"
                style={{ animation: 'fade-in-up 0.8s ease-out 0.4s both' }}
              >
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-600 border border-gray-200/50 hover:border-gray-300 hover:shadow-sm transition-all duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <div className="px-4 pb-24">
          <div className="mx-auto max-w-3xl">
            {/* Article body */}
            <div
              className="prose-custom"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.5s both' }}
            >
              <MDXContent components={mdxComponents} />
            </div>

            {/* Article footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200">
              {/* Share & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
                <div className="flex items-center gap-4">
                  <span className="text-gray-500 font-medium">Share this article</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href)
                      }}
                      className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-all duration-300"
                      title="Copy link"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <span>More Articles</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Author section */}
              <div className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-pink-50/80 border border-gray-100">
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-pink-500/10 pointer-events-none" />
                <div className="relative flex items-center gap-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                    V
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">vibecoding</h4>
                    <p className="text-gray-600 mb-3">Full-stack Developer × Open Source Enthusiast</p>
                    <p className="text-sm text-gray-500">
                      Exploring tech frontiers, sharing the creative journey
                    </p>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="px-4 py-24 bg-gradient-to-b from-white via-gray-50/50 to-white">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Related Articles
                </h3>
                <p className="text-gray-600">Continue exploring more great content</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <PostCard key={relatedPost.slug} post={relatedPost} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
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

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, -20px) scale(1.05);
          }
        }

        @keyframes float-slower {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, 20px) scale(1.1);
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
