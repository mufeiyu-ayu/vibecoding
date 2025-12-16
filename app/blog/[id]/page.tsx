'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BLOG_POSTS } from '@/lib/constants';
import ClientLayout from '@/components/ClientLayout';

interface BlogDetailViewProps {
  isDark: boolean;
  id: string;
}

const BlogDetailView: React.FC<BlogDetailViewProps> = ({ isDark, id }) => {
  const router = useRouter();
  const post = BLOG_POSTS.find(p => p.id === id);
  const { scrollYProgress } = useScroll();

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className={cn(
            "text-4xl font-display font-bold mb-4",
            isDark ? "text-starlight" : "text-ink"
          )}>
            Post Not Found
          </h1>
          <button
            onClick={() => router.push('/blog')}
            className={cn(
              "px-6 py-3 rounded-full font-mono text-sm transition-all",
              isDark ? "bg-white/10 text-starlight hover:bg-white/20" : "bg-ink text-white hover:bg-ink/90"
            )}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen pb-32 pt-28"
    >
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-vibe-purple to-vibe-pink z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Header */}
      <div className={cn(
        "fixed top-0 left-0 w-full z-40 backdrop-blur-md px-6 py-4 flex justify-between items-center transition-all duration-500",
        isDark ? "bg-midnight/40" : "bg-paper/40"
      )}>
        <button
          onClick={() => router.push('/blog')}
          className={cn(
            "group flex items-center gap-2 px-4 py-2 rounded-full border hover:scale-105 active:scale-95 transition-all",
            isDark ? "bg-white/5 border-white/10 text-starlight hover:bg-white/10" : "bg-white border-ink/10 text-ink hover:bg-white"
          )}
        >
          <ArrowLeft size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Back</span>
        </button>
        <div className="flex gap-2">
          <button className={cn("p-2 rounded-full hover:bg-black/5 transition-colors", isDark ? "text-starlight hover:bg-white/10" : "text-ink")}><Heart size={18} /></button>
          <button className={cn("p-2 rounded-full hover:bg-black/5 transition-colors", isDark ? "text-starlight hover:bg-white/10" : "text-ink")}><Share2 size={18} /></button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Asymmetric Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-12 items-start mb-12 relative">

          {/* Left Column: Title & Metadata */}
          <div className="flex flex-col justify-center z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-4"
            >
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                "text-vibe-purple"
              )}>
                {post.category}
              </span>
              <span className="text-[10px] opacity-30">•</span>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider flex items-center gap-1",
                isDark ? "text-moon" : "text-graphite"
              )}>
                <Calendar size={10} /> {post.date}
              </span>
              <span className="text-[10px] opacity-30">•</span>
              <span className={cn(
                "text-[10px] font-bold uppercase tracking-wider flex items-center gap-1",
                isDark ? "text-moon" : "text-graphite"
              )}>
                <Clock size={10} /> 5 min read
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={cn(
                "font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-4 tracking-tight",
                isDark ? "text-starlight" : "text-ink"
              )}
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <img
                src="/avatar.jpg"
                alt="Author"
                className="w-10 h-10 rounded-full border-2 border-white/20"
              />
              <div>
                <p className={cn("text-xs font-bold", isDark ? "text-starlight" : "text-ink")}>Ayu</p>
                <p className={cn("text-[10px] uppercase tracking-wider", isDark ? "text-moon" : "text-gray-500")}>VibeCoding Engineer</p>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Image with Gradient Mask */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:absolute lg:right-0 lg:top-0 lg:w-[50vw] h-[180px] lg:h-[220px] w-full z-0"
          >
            <div className={cn(
              "w-full h-full relative",
              // CSS Mask for Gradient Fade effect (Bottom and Left edges)
              "[mask-image:linear-gradient(to_bottom,black_50%,transparent_100%),linear-gradient(to_left,black_50%,transparent_100%)]",
              "[mask-composite:intersect]"
            )}>
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover object-center lg:object-left rounded-3xl lg:rounded-none"
              />
              {/* Overlay for tint adjustment */}
              <div className={cn(
                "absolute inset-0 mix-blend-overlay opacity-30",
                isDark ? "bg-vibe-purple" : "bg-vibe-blue"
              )} />
            </div>
            {/* Fallback gradient for seamless blending if mask fails or needs augmentation */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-l lg:bg-gradient-to-r lg:via-transparent to-transparent",
              isDark ? "from-midnight via-midnight/50" : "from-paper via-paper/50"
            )} />
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t via-transparent to-transparent",
              isDark ? "from-midnight" : "from-paper"
            )} />
          </motion.div>
        </div>

        {/* Wide Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="prose-container"
          >
            <div
              className={cn(
                "prose prose-lg md:prose-2xl max-w-none font-body leading-loose",
                isDark ? "prose-invert" : "",
                // Typography Tweaks for 'High-End Editorial' look
                "prose-p:mb-8 prose-p:text-opacity-90",
                "prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight",
                "prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6",
                "prose-h3:text-2xl prose-h3:mt-8",
                "prose-blockquote:border-l-2 prose-blockquote:border-vibe-purple prose-blockquote:pl-8 prose-blockquote:py-2 prose-blockquote:font-display prose-blockquote:text-3xl prose-blockquote:not-italic prose-blockquote:font-normal",
                "first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px]",
                isDark ? "prose-headings:text-starlight prose-blockquote:text-starlight first-letter:text-starlight" : "prose-headings:text-ink prose-blockquote:text-ink first-letter:text-ink"
              )}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>

          {/* Sidebar Area */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="hidden lg:block space-y-12 mt-4"
          >
            <div>
              <h4 className="font-display font-bold text-xl mb-6 uppercase tracking-widest opacity-50">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className={cn(
                    "text-sm px-4 py-2 rounded-full border transition-colors hover:border-vibe-purple hover:text-vibe-purple cursor-pointer",
                    isDark ? "border-white/10 text-moon" : "border-ink/10 text-graphite"
                  )}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={cn(
              "p-8 rounded-2xl border",
              isDark ? "bg-white/5 border-white/10" : "bg-ink/5 border-ink/5"
            )}>
              <h4 className="font-display font-bold text-xl mb-4">Newsletter</h4>
              <p className="text-sm opacity-70 mb-6">Get the latest vibe coding insights delivered to your inbox.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className={cn(
                    "w-full px-4 py-2 rounded bg-transparent border focus:outline-none focus:border-vibe-purple text-sm",
                    isDark ? "border-white/20" : "border-ink/20"
                  )}
                />
                <button className="bg-vibe-purple text-white px-4 py-2 rounded hover:bg-vibe-purple/90">
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: PageProps) {
  const [id, setId] = useState<string>('');

  useEffect(() => {
    params.then(p => setId(p.id));
  }, [params]);

  if (!id) {
    return null;
  }

  return (
    <ClientLayout>
      {({ isDark }) => <BlogDetailView isDark={isDark} id={id} />}
    </ClientLayout>
  );
}
