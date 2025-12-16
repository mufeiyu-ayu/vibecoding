'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { ArrowLeft, Coffee, Zap, Layers, Code2, Github, Mail, ArrowRight, MoveUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import ClientLayout from '@/components/ClientLayout';

interface AboutViewProps {
  isDark: boolean;
}

const AboutView: React.FC<AboutViewProps> = ({ isDark }) => {
  const router = useRouter();

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: 50 }}
      className="relative min-h-screen z-10 font-body pb-20"
    >
      {/* Floating Header */}
      <div className={cn(
        "fixed top-0 left-0 w-full z-40 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center transition-all duration-500",
        isDark ? "bg-midnight/80 border-white/5" : "bg-paper/80 border-ink/5"
      )}>
        <button
          onClick={handleBack}
          className={cn(
            "group flex items-center gap-2 px-4 py-2 rounded-full border hover:scale-105 active:scale-95 transition-all",
            isDark ? "bg-white/5 border-white/10 text-starlight hover:bg-white/10" : "bg-white border-ink/10 text-ink hover:bg-white"
          )}
        >
          <ArrowLeft size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Home</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-12 gap-6 grid-auto-rows-min"
        >
          {/* Header Section - Spans Full Width */}
          <motion.div variants={item} className="md:col-span-12 mb-16">
             <h1 className={cn(
               "font-display font-bold text-6xl md:text-8xl tracking-tighter leading-none mb-8",
               isDark ? "text-starlight" : "text-ink"
             )}>
               The Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibe-purple to-vibe-pink">Artisan.</span>
             </h1>

             {/* Detailed Bio - ~6 Lines */}
             <div className={cn(
               "prose prose-lg md:prose-xl max-w-4xl border-l-2 pl-6 md:pl-8 py-2",
               isDark ? "border-vibe-purple/50 text-moon" : "border-vibe-purple/50 text-graphite"
             )}>
               <p className="leading-loose font-light">
                 I am a frontend engineer who views code as a medium for expression. For the past three years, I have been obsessively refining the gap between design and engineering, specializing in the React and Vue ecosystems. My work is not just about functionality; it is about the <i>feeling</i> of software—the micro-interactions, the fluid motion, and the silent rhythm of a well-architected interface. I build for the web because it is the world&apos;s largest canvas, open to anyone with a browser and a dream.
               </p>
             </div>
          </motion.div>

          {/* Block 1: Profile Image & Role - Spans 4 cols */}
          <motion.div variants={item} className={cn(
            "md:col-span-4 rounded-3xl overflow-hidden relative group min-h-[300px]",
            isDark ? "bg-white/5 border border-white/10" : "bg-white border border-ink/5"
          )}>
            <div className="absolute inset-0 z-0">
               <img
                 src="https://i.pinimg.com/736x/8f/58/0b/8f580b395db37998b4c538a798a0c201.jpg"
                 alt="Profile"
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
               />
               <div className={cn(
                 "absolute inset-0 opacity-40 group-hover:opacity-20 transition-opacity",
                 isDark ? "bg-midnight" : "bg-ink"
               )} />
            </div>
            <div className="absolute bottom-0 left-0 p-6 z-10">
              <h2 className="text-white font-display font-bold text-3xl">Ayu</h2>
              <p className="text-white/80 font-mono text-sm uppercase tracking-widest mt-1">Frontend Engineer</p>
            </div>
          </motion.div>

          {/* Block 2: Experience & Stats - Spans 4 cols */}
          <motion.div variants={item} className="md:col-span-4 grid grid-rows-2 gap-6">
             {/* Years Experience */}
             <div className={cn(
               "rounded-3xl p-6 border flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300",
               isDark ? "bg-white/5 border-white/10" : "bg-white border-ink/5"
             )}>
                <div className={cn(
                  "absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity rotate-[-15deg]",
                  isDark ? "text-starlight" : "text-ink"
                )}>
                  <Coffee size={100} />
                </div>
                <div className="flex justify-between items-start">
                   <span className={cn("text-xs font-bold uppercase tracking-wider", isDark ? "text-moon" : "text-gray-500")}>Experience</span>
                   <MoveUpRight className={cn("w-5 h-5", isDark ? "text-vibe-purple" : "text-vibe-purple")} />
                </div>
                <div>
                   <span className={cn("font-display font-bold text-6xl block", isDark ? "text-starlight" : "text-ink")}>03</span>
                   <span className={cn("text-sm", isDark ? "text-moon" : "text-graphite")}>Years of crafting web apps</span>
                </div>
             </div>

             {/* Age */}
             <div className={cn(
               "rounded-3xl p-6 border flex flex-col justify-between relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300",
               isDark ? "bg-white/5 border-white/10" : "bg-white border-ink/5"
             )}>
                <div className={cn(
                  "absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity rotate-[15deg]",
                  isDark ? "text-starlight" : "text-ink"
                )}>
                  <Zap size={100} />
                </div>
                <div className="flex justify-between items-start">
                   <span className={cn("text-xs font-bold uppercase tracking-wider", isDark ? "text-moon" : "text-gray-500")}>Age</span>
                </div>
                <div>
                   <span className={cn("font-display font-bold text-6xl block", isDark ? "text-starlight" : "text-ink")}>25</span>
                   <span className={cn("text-sm", isDark ? "text-moon" : "text-graphite")}>Young enough to learn, old enough to lead</span>
                </div>
             </div>
          </motion.div>

          {/* Block 3: Tech Stack - Spans 4 cols */}
          <motion.div variants={item} className={cn(
            "md:col-span-4 rounded-3xl p-8 border flex flex-col relative overflow-hidden group",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-ink/5"
          )}>
             <div className="flex items-center gap-3 mb-6">
                <Layers className={isDark ? "text-vibe-pink" : "text-vibe-purple"} />
                <h3 className={cn("font-display font-bold text-2xl", isDark ? "text-starlight" : "text-ink")}>Tech Stack</h3>
             </div>

             <div className="space-y-6 relative z-10">
                <div>
                  <p className={cn("text-xs uppercase tracking-widest mb-2 opacity-50", isDark ? "text-starlight" : "text-ink")}>Core</p>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Vue.js', 'TypeScript', 'Next.js'].map(tech => (
                      <span key={tech} className={cn(
                        "px-3 py-1 text-sm rounded-md border font-medium",
                        isDark ? "border-white/10 bg-white/5 text-starlight" : "border-ink/10 bg-ink/5 text-ink"
                      )}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={cn("text-xs uppercase tracking-widest mb-2 opacity-50", isDark ? "text-starlight" : "text-ink")}>Backend</p>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express', 'GraphQL', 'PostgreSQL'].map(tech => (
                      <span key={tech} className={cn(
                        "px-3 py-1 text-sm rounded-md border font-medium",
                        isDark ? "border-white/10 bg-white/5 text-starlight" : "border-ink/10 bg-ink/5 text-ink"
                      )}>{tech}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className={cn("text-xs uppercase tracking-widest mb-2 opacity-50", isDark ? "text-starlight" : "text-ink")}>Creative</p>
                  <div className="flex flex-wrap gap-2">
                    {['Three.js', 'Framer Motion', 'Tailwind'].map(tech => (
                      <span key={tech} className={cn(
                        "px-3 py-1 text-sm rounded-md border font-medium",
                        isDark ? "border-white/10 bg-white/5 text-starlight" : "border-ink/10 bg-ink/5 text-ink"
                      )}>{tech}</span>
                    ))}
                  </div>
                </div>
             </div>
          </motion.div>

          {/* Block 4: Philosophy - Spans 8 cols */}
          <motion.div variants={item} className={cn(
            "md:col-span-8 rounded-3xl p-8 md:p-12 border flex flex-col justify-center relative overflow-hidden",
            isDark ? "bg-gradient-to-br from-white/5 to-white/0 border-white/10" : "bg-gradient-to-br from-white to-white/50 border-ink/5"
          )}>
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Code2 size={200} />
            </div>
            <h3 className={cn(
              "font-display font-bold text-3xl md:text-5xl mb-6 leading-tight relative z-10",
              isDark ? "text-starlight" : "text-ink"
            )}>
              &quot;Open source is my cathedral. Code is a shared heritage, a collective poem.&quot;
            </h3>
            <p className={cn(
              "text-lg md:text-xl font-light leading-relaxed max-w-3xl relative z-10",
              isDark ? "text-moon" : "text-graphite"
            )}>
              My journey isn&apos;t defined by the frameworks I use, but by the problems I solve.
              I believe in minimalist aesthetics and maximalist performance.
              Accessibility is a right, not a feature.
            </p>
            <div className="flex gap-4 mt-8 relative z-10">
               <button className={cn(
                 "px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm transition-all hover:scale-105 flex items-center gap-2",
                 isDark ? "bg-starlight text-midnight hover:bg-white" : "bg-ink text-white hover:bg-black"
               )}>
                 <Github size={18} /> Github
               </button>
               <button className={cn(
                 "px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm border transition-all hover:scale-105",
                 isDark ? "border-white/20 text-starlight hover:bg-white/10" : "border-ink/20 text-ink hover:bg-ink/5"
               )}>
                 Resume
               </button>
            </div>
          </motion.div>

          {/* Block 5: Contact/Social - Spans 4 cols */}
          <motion.div variants={item} className={cn(
            "md:col-span-4 rounded-3xl p-8 border flex flex-col justify-center items-center text-center relative overflow-hidden group cursor-pointer",
            isDark ? "bg-vibe-purple text-white border-transparent" : "bg-vibe-purple text-white border-transparent"
          )}>
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
             <div className="relative z-10">
               <Mail size={48} className="mx-auto mb-4" />
               <h3 className="font-display font-bold text-3xl mb-2">Let&apos;s Talk</h3>
               <p className="opacity-90 mb-6">Have a project in mind?</p>
               <div className="inline-flex items-center gap-2 font-bold border-b border-white/50 pb-1">
                 Send a message <ArrowRight size={16} />
               </div>
             </div>
          </motion.div>

        </motion.div>
      </div>
    </motion.div>
  );
};

export default function AboutPage() {
  return (
    <ClientLayout>
      {({ isDark }) => <AboutView isDark={isDark} />}
    </ClientLayout>
  );
}
