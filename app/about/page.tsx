'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative pt-8 pb-20 px-4 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-50/80 via-orange-50/30 to-blue-50/50" />
          <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-slower" />
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Page header */}
          <div className="text-center mb-16">
            <div
              className="inline-block mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm"
              style={{ animation: 'fade-in-down 0.6s ease-out' }}
            >
              <span className="text-sm font-semibold text-gray-600">
                👋 ABOUT ME
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 via-orange-500 to-pink-600 bg-clip-text text-transparent"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.1s both' }}
            >
              Hello, World!
            </h1>
            <p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.2s both' }}
            >
              Get to know the person behind the code
            </p>
          </div>

          {/* Profile card */}
          <div
            className="relative mb-16"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.3s both' }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-400/20 via-orange-400/20 to-blue-400/20 rounded-[2.5rem] blur-2xl" />

            <div className="relative p-8 md:p-12 rounded-3xl bg-white/90 backdrop-blur-sm border border-white/50 shadow-xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Avatar */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full blur-lg opacity-50" />
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-pink-400 via-orange-400 to-blue-400 flex items-center justify-center text-white text-5xl md:text-6xl font-bold shadow-2xl">
                    V
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">vibecoding</h2>
                  <p className="text-lg text-gray-600 mb-4">Full-stack Developer × Open Source Enthusiast</p>

                  {/* Tags */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">React</span>
                    <span className="px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-semibold">TypeScript</span>
                    <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">Node.js</span>
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">AI/ML</span>
                  </div>

                  {/* Social links */}
                  <div className="flex justify-center md:justify-start gap-4">
                    <a
                      href="https://github.com/vibecoding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-900 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href="https://twitter.com/vibecoding"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                    <a
                      href="mailto:hello@vibecoding.com"
                      className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-pink-500 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio section */}
          <div
            className="prose prose-lg max-w-none mb-16"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.4s both' }}
          >
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <span className="text-3xl">🚀</span>
                About Me
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                I&apos;m a passionate full-stack developer who loves building elegant, performant web applications.
                With a focus on modern JavaScript/TypeScript ecosystems, I enjoy working with React, Next.js,
                and Node.js to create seamless user experiences.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                When I&apos;m not coding, you&apos;ll find me contributing to open source projects, writing technical
                blog posts, or exploring the latest developments in AI and machine learning.
              </p>
              <p className="text-gray-600 leading-relaxed">
                I believe in writing clean, maintainable code and sharing knowledge with the developer community.
                This blog is my space to document my learning journey and hopefully help others along the way.
              </p>
            </div>
          </div>

          {/* Coming soon notice */}
          <div
            className="mb-16"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.5s both' }}
          >
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-orange-50/80 via-white to-pink-50/80 border border-orange-100">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-orange-500/10 via-transparent to-pink-500/10 pointer-events-none" />
              <div className="relative text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">More Coming Soon</h3>
                <p className="text-gray-600 mb-4">
                  This page will be expanded with a detailed timeline, skills visualization,
                  and a contact form in Phase 2.
                </p>
                <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                  Phase 2 Feature
                </span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className="text-center"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.6s both' }}
          >
            <Link href="/blog">
              <Button variant="primary" size="lg" className="min-w-[200px] group">
                <span className="mr-2">✍️</span>
                Read My Blog
                <svg
                  className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>
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

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, -30px) scale(1.05);
          }
        }

        @keyframes float-slower {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(30px, 20px) scale(1.1);
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
