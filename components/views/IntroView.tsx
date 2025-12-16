'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Github, Terminal, Mail, User, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import EphemeralCodeBackground from '@/components/ui/EphemeralCodeBackground';
import HeroTitleSvg from '@/components/ui/HeroTitleSvg';
import SocialLink from '@/components/ui/SocialLink';

interface IntroViewProps {
  isDark: boolean;
}

const IntroView: React.FC<IntroViewProps> = ({ isDark }) => {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <motion.div
      className="relative h-screen w-full flex flex-col items-center px-6 md:px-20 overflow-hidden pt-16 pb-32 md:pt-0 md:pb-0 md:justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
    >
      {/* Passing Clouds / Code Effect */}
      <EphemeralCodeBackground isDark={isDark} />

      <motion.div
        style={{ y: yHero }}
        className="w-full max-w-4xl z-10 flex flex-col items-center text-center relative"
      >
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-4 md:mb-6 relative group cursor-default"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-vibe-purple to-vibe-pink blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 rounded-full animate-pulse"></div>
          <img
            src="/avatar.jpg"
            alt="Ayu Avatar"
            className="w-28 h-28 md:w-40 md:h-40 rounded-full border-2 border-white/20 shadow-2xl object-cover relative z-10 grayscale group-hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>

        {/* Name SVG */}
        <div className="w-full relative mb-3 md:mb-4 flex justify-center">
          <HeroTitleSvg isDark={isDark} />
        </div>

        {/* Role */}
        <motion.div
          className="overflow-hidden mb-4 md:mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h2 className="font-body font-medium text-base md:text-xl text-vibe-purple tracking-tight">
            &lt;VibeCodingEngineer /&gt;
          </h2>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className={cn(
            "font-body text-xs md:text-base text-center leading-relaxed md:leading-loose max-w-lg mb-6 md:mb-8 backdrop-blur-sm rounded-xl p-2",
            isDark ? "text-moon bg-midnight/30" : "text-graphite bg-white/30"
          )}
        >
          Crafting digital experiences where <span className={cn("px-1 rounded font-bold", isDark ? "bg-white/10 text-starlight" : "bg-ink/5 text-ink")}>code meets intuition</span>.
          <br className="hidden md:block" />
          Exploring the bleeding edge of the web.
        </motion.p>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex gap-4 md:gap-6 mb-6 md:mb-10"
        >
          <SocialLink icon={<Github className="w-5 h-5" />} href="#" isDark={isDark} />
          <SocialLink icon={<Terminal className="w-5 h-5" />} href="#" isDark={isDark} />
          <SocialLink icon={<Mail className="w-5 h-5" />} href="#" isDark={isDark} />
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col items-center gap-4 w-full max-w-md mx-auto"
        >
          {/* Primary Action */}
          <button
            onClick={() => router.push('/blog')}
            className={cn(
              "w-full group relative px-10 py-4 backdrop-blur-sm border font-body font-bold tracking-widest uppercase text-xs rounded transition-all duration-500 shadow-sm",
              isDark
                ? "bg-white/10 border-white/10 text-starlight hover:bg-white/20 hover:border-vibe-purple/50"
                : "bg-white/40 border-ink/10 text-ink hover:bg-white/80 hover:border-vibe-purple/50"
            )}
          >
            <span className="flex items-center justify-center gap-3">
              Enter My World <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Secondary Actions Row */}
          <div className="flex gap-4 w-full">
            <button
              onClick={() => router.push('/about')}
              className={cn(
                "flex-1 group px-6 py-3 font-body font-bold tracking-widest uppercase text-xs rounded transition-all duration-300 border border-transparent",
                isDark
                  ? "text-moon hover:text-starlight hover:bg-white/5 hover:border-white/5"
                  : "text-graphite hover:text-ink hover:bg-ink/5 hover:border-ink/5"
              )}
            >
              <span className="flex items-center justify-center gap-2">
                <User className="w-4 h-4" /> Who is Ayu?
              </span>
            </button>

            <button
              onClick={() => router.push('/lifestyle')}
              className={cn(
                "flex-1 group px-6 py-3 font-body font-bold tracking-widest uppercase text-xs rounded transition-all duration-300 border border-transparent relative overflow-hidden",
                isDark
                  ? "text-vibe-pink hover:text-white hover:bg-vibe-pink/80"
                  : "text-vibe-purple hover:text-white hover:bg-vibe-purple/80"
              )}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Camera className="w-4 h-4" /> AFK Mode
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default IntroView;
