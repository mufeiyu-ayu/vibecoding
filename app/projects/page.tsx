'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'

// Placeholder projects data - will be replaced with real data later
const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A cutting-edge web application built with Next.js and TypeScript. Features real-time collaboration and AI-powered insights.',
    tags: ['Next.js', 'TypeScript', 'AI'],
    status: 'In Progress',
    link: '#',
  },
  {
    id: 2,
    title: 'Open Source Library',
    description: 'A React component library focused on accessibility and performance. Used by thousands of developers worldwide.',
    tags: ['React', 'Open Source', 'A11y'],
    status: 'Active',
    link: '#',
  },
  {
    id: 3,
    title: 'Developer Tool',
    description: 'CLI tool that automates repetitive development tasks. Integrates with popular frameworks and CI/CD pipelines.',
    tags: ['CLI', 'Node.js', 'DevOps'],
    status: 'Maintenance',
    link: '#',
  },
]

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="relative pt-8 pb-20 px-4 overflow-hidden">
        {/* Gradient mesh background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/80 via-blue-50/50 to-pink-50/30" />
          <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-float-slower" />
        </div>

        <div className="mx-auto max-w-7xl">
          {/* Page header */}
          <div className="text-center mb-16">
            <div
              className="inline-block mb-4 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-sm"
              style={{ animation: 'fade-in-down 0.6s ease-out' }}
            >
              <span className="text-sm font-semibold text-gray-600">
                🚀 PROJECTS
              </span>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-900 via-blue-800 to-purple-900 bg-clip-text text-transparent"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.1s both' }}
            >
              My Work
            </h1>
            <p
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              style={{ animation: 'fade-in-up 0.8s ease-out 0.2s both' }}
            >
              A collection of projects that showcase my passion for building great software
            </p>
          </div>

          {/* Coming soon notice */}
          <div
            className="max-w-3xl mx-auto mb-16"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.3s both' }}
          >
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-purple-50/80 via-white to-blue-50/80 border border-purple-100">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />
              <div className="relative text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Full Portfolio Coming Soon</h3>
                <p className="text-gray-600 mb-4">
                  This page will be enhanced with detailed case studies, live demos, and GitHub integrations in Phase 2.
                </p>
                <span className="inline-block px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
                  Phase 2 Feature
                </span>
              </div>
            </div>
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group relative"
                style={{ animation: `fade-in-up 0.8s ease-out ${0.4 + index * 0.1}s both` }}
              >
                {/* Hover glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/0 via-blue-400/0 to-pink-400/0 group-hover:from-purple-400/10 group-hover:via-blue-400/10 group-hover:to-pink-400/10 rounded-3xl blur-2xl transition-all duration-700 pointer-events-none" />

                <div className="relative p-6 rounded-3xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-500">
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                      project.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : project.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </span>
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-purple-500 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className="text-center mt-16"
            style={{ animation: 'fade-in-up 0.8s ease-out 0.8s both' }}
          >
            <Link href="https://github.com/vibecoding" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary" size="lg" className="min-w-[200px] group">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                View on GitHub
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
            transform: translate(20px, -30px) scale(1.05);
          }
        }

        @keyframes float-slower {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, 20px) scale(1.1);
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
