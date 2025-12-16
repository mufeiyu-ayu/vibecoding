'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Camera, MapPin, Music, Gamepad2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import ClientLayout from '@/components/ClientLayout';
import { LIFE_MOMENTS } from '@/lib/constants';

const LifestyleView: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const router = useRouter();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 50 }}
      className="relative min-h-screen z-10 font-body pb-20 bg-dot-pattern"
    >
      {/* Floating Header */}
      <div className={cn(
        "fixed top-0 left-0 w-full z-40 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center transition-all duration-500",
        isDark ? "bg-midnight/80 border-white/5" : "bg-paper/80 border-ink/5"
      )}>
        <button
          onClick={() => router.push('/')}
          className={cn(
            "group flex items-center gap-2 px-4 py-2 rounded-full border hover:scale-105 active:scale-95 transition-all",
            isDark ? "bg-white/5 border-white/10 text-starlight hover:bg-white/10" : "bg-white border-ink/10 text-ink hover:bg-white"
          )}
        >
          <ArrowLeft size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Home</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className={cn(
            "text-xs font-bold uppercase tracking-widest",
            isDark ? "text-starlight" : "text-ink"
          )}>AFK Mode Active</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32">
        {/* Intro */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h1 className={cn(
            "font-display font-bold text-4xl md:text-6xl mb-6 relative inline-block",
            isDark ? "text-starlight" : "text-ink"
          )}>
            Life.log
            <span className="absolute -top-6 -right-8 rotate-12 text-sm bg-vibe-pink text-white px-3 py-1 rounded-full shadow-lg transform hover:scale-110 transition-transform cursor-default">
              Raw & Unfiltered
            </span>
          </h1>
          <p className={cn(
            "text-lg",
            isDark ? "text-moon" : "text-graphite"
          )}>
            When I'm not pushing pixels, I'm touching grass (occasionally). <br />
            A collection of moments, gears, and caffeine-fueled adventures.
          </p>
        </div>

        {/* Masonry-ish Grid (using CSS Columns) */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {LIFE_MOMENTS.map((moment) => (
            <motion.div
              variants={item}
              key={moment.id}
              className="break-inside-avoid relative group"
            >
              <div className={cn(
                "relative rounded-2xl overflow-hidden border transition-all duration-300 hover:z-20",
                "hover:shadow-2xl hover:-translate-y-2 hover:rotate-1",
                isDark ? "bg-white/5 border-white/10" : "bg-white border-ink/5"
              )}>
                {/* Content Type Rendering */}
                {moment.type === 'image' || moment.type === 'checkin' || moment.type === 'music' ? (
                  <div className="relative">
                    <img
                      src={moment.content}
                      alt={moment.caption}
                      className="w-full h-auto object-cover min-h-[200px]"
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Icon Badge */}
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 shadow-lg">
                      {moment.type === 'image' && <Camera size={16} />}
                      {moment.type === 'checkin' && <MapPin size={16} />}
                      {moment.type === 'music' && <Music size={16} />}
                    </div>
                  </div>
                ) : (
                  <div className={cn(
                    "p-8 min-h-[200px] flex items-center justify-center text-center",
                    isDark ? "bg-vibe-purple/10" : "bg-vibe-purple/5"
                  )}>
                    <p className={cn(
                      "font-display font-bold text-xl leading-tight",
                      isDark ? "text-starlight" : "text-ink"
                    )}>
                      &quot;{moment.content}&quot;
                    </p>
                  </div>
                )}

                {/* Caption & Metadata */}
                <div className={cn(
                  "p-5 relative",
                  (moment.type === 'image' || moment.type === 'checkin' || moment.type === 'music') && "absolute bottom-0 left-0 w-full text-white"
                )}>
                  <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest opacity-80">
                    <span>{moment.date}</span>
                    <span>•</span>
                    <span>{moment.location || 'Unknown'}</span>
                  </div>

                  <h3 className={cn(
                    "font-bold text-lg mb-3 leading-snug",
                    (moment.type === 'image' || moment.type === 'checkin' || moment.type === 'music') ? "text-white" : (isDark ? "text-starlight" : "text-ink")
                  )}>
                    {moment.caption}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {moment.tags.map(tag => (
                      <span key={tag} className={cn(
                        "text-[10px] px-2 py-1 rounded-md font-bold uppercase tracking-wider backdrop-blur-sm",
                        (moment.type === 'image' || moment.type === 'checkin' || moment.type === 'music')
                          ? "bg-white/20 text-white"
                          : (isDark ? "bg-white/10 text-moon" : "bg-ink/5 text-graphite")
                      )}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Note */}
        <div className="mt-20 text-center opacity-50 pb-10">
          <Gamepad2 className="mx-auto w-6 h-6 mb-2" />
          <p className="text-xs uppercase tracking-widest">End of Log</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function LifestylePage() {
  return (
    <ClientLayout>
      {({ isDark }) => <LifestyleView isDark={isDark} />}
    </ClientLayout>
  );
}
