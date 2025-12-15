'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-pink-50" />

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-purple-400/15 to-blue-400/15 rounded-full blur-3xl animate-float-slowest" />

        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")' }} />
      </div>

      <div className="mx-auto max-w-6xl text-center relative z-10">
        {/* Floating skill badges */}
        <div className="absolute -top-20 left-0 right-0 flex justify-center gap-4 flex-wrap opacity-0 animate-fade-in-delay-1">
          <span className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-sm font-medium text-gray-700 shadow-lg animate-float-badge-1">
            React ⚛️
          </span>
          <span className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-sm font-medium text-gray-700 shadow-lg animate-float-badge-2">
            TypeScript 📘
          </span>
          <span className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-white/50 text-sm font-medium text-gray-700 shadow-lg animate-float-badge-3">
            Next.js ▲
          </span>
        </div>

        {/* Main title with dramatic entrance */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none opacity-0 animate-title-entrance">
          <span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm animate-gradient-shift">
            vibecoding
          </span>
        </h1>

        {/* Subtitle with stagger */}
        <p className="text-2xl md:text-3xl text-gray-700 mb-6 font-light tracking-wide opacity-0 animate-fade-in-up-delay-1">
          Full-stack Developer
          <span className="inline-block mx-3 text-pink-500">×</span>
          Open Source Enthusiast
        </p>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0 animate-fade-in-up-delay-2">
          探索技术边界，分享创作旅程
          <span className="block mt-2 text-base text-gray-500">Exploring tech frontiers, sharing the creative journey</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-fade-in-up-delay-3">
          <Link href="/blog">
            <Button variant="primary" size="lg" className="min-w-[180px] shadow-2xl shadow-blue-500/25 hover:shadow-pink-500/25">
              <span className="mr-2">✍️</span>
              阅读博客
            </Button>
          </Link>
          <Link href="/projects">
            <Button variant="secondary" size="lg" className="min-w-[180px]">
              <span className="mr-2">🚀</span>
              查看作品
            </Button>
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-delay-4">
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <span className="text-sm font-medium">向下滚动</span>
            <div className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center p-2">
              <div className="w-1.5 h-3 rounded-full bg-gray-400 animate-scroll-indicator" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float-slower {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, -40px) scale(1.15);
          }
        }

        @keyframes float-slowest {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(25px, 30px) scale(0.95);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes title-entrance {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
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

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes float-badge-1 {
          0%, 100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes float-badge-2 {
          0%, 100% {
            transform: translateY(0px) rotate(2deg);
          }
          50% {
            transform: translateY(-15px) rotate(-2deg);
          }
        }

        @keyframes float-badge-3 {
          0%, 100% {
            transform: translateY(0px) rotate(-1deg);
          }
          50% {
            transform: translateY(-12px) rotate(1deg);
          }
        }

        @keyframes scroll-indicator {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }

        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }

        .animate-float-slower {
          animation: float-slower 25s ease-in-out infinite;
        }

        .animate-float-slowest {
          animation: float-slowest 30s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }

        .animate-title-entrance {
          animation: title-entrance 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }

        .animate-fade-in-up-delay-1 {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
        }

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards;
        }

        .animate-fade-in-up-delay-3 {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
        }

        .animate-fade-in-delay-1 {
          animation: fade-in 0.8s ease-out 0.4s forwards;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in 0.8s ease-out 1.5s forwards;
        }

        .animate-float-badge-1 {
          animation: float-badge-1 3s ease-in-out infinite;
        }

        .animate-float-badge-2 {
          animation: float-badge-2 3.5s ease-in-out infinite 0.5s;
        }

        .animate-float-badge-3 {
          animation: float-badge-3 3.2s ease-in-out infinite 0.3s;
        }

        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
