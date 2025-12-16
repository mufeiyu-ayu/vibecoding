'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { ArrowLeft, LayoutList, List, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BLOG_POSTS } from '@/lib/constants';
import type { BlogPost } from '@/lib/types';
import ClientLayout from '@/components/ClientLayout';

type LayoutMode = 'timeline' | 'list';

interface BlogViewProps {
  isDark: boolean;
}

const BlogView: React.FC<BlogViewProps> = ({ isDark }) => {
  const router = useRouter();
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('timeline');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];

  const filteredPosts = activeCategory === 'All'
    ? BLOG_POSTS
    : BLOG_POSTS.filter(p => p.category === activeCategory);

  const handleBack = () => {
    router.push('/');
  };

  const handleAbout = () => {
    router.push('/about');
  };

  const handleSelectPost = (id: string) => {
    router.push(`/blog/${id}`);
  };

  return (
    <motion.div
      className="relative w-full min-h-screen pb-20 z-10"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100, transition: { duration: 0.5 } }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Header */}
      <header className={cn(
        "sticky top-0 left-0 w-full z-40 backdrop-blur-md border-b px-6 md:px-12 py-4 flex justify-between items-center transition-colors",
        isDark ? "bg-midnight/80 border-white/5" : "bg-paper/80 border-ink/5"
      )}>
        <button
          onClick={handleBack}
          className={cn(
            "group flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors",
            isDark ? "text-moon hover:text-vibe-purple" : "text-graphite hover:text-vibe-purple"
          )}
        >
          <div className={cn(
            "p-2 rounded-full border transition-colors",
            isDark ? "border-white/10 group-hover:border-vibe-purple" : "border-ink/10 group-hover:border-vibe-purple"
          )}>
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="hidden md:inline">Back</span>
        </button>

        <span className={cn(
          "font-display font-bold text-xl tracking-tighter",
          isDark ? "text-starlight" : "text-ink"
        )}>
          Ayu.Blog
        </span>

        <div className="flex items-center gap-4">
          <button
            onClick={handleAbout}
            className={cn(
              "text-xs font-bold uppercase tracking-widest transition-colors hidden md:block",
              isDark ? "text-moon hover:text-starlight" : "text-graphite hover:text-ink"
            )}
          >
            About
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-12 py-12">

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-16 gap-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                  activeCategory === cat
                    ? "bg-vibe-purple text-white shadow-lg shadow-vibe-purple/25"
                    : isDark ? "bg-white/5 text-moon hover:bg-white/10" : "bg-ink/5 text-graphite hover:bg-ink/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={cn(
            "flex p-1 rounded-lg border",
            isDark ? "bg-white/5 border-white/10" : "bg-white border-ink/5"
          )}>
            <button
              onClick={() => setLayoutMode('timeline')}
              className={cn(
                "p-2 rounded transition-all",
                layoutMode === 'timeline'
                  ? (isDark ? "bg-white/10 text-starlight" : "bg-ink/5 text-ink")
                  : (isDark ? "text-moon hover:text-starlight" : "text-gray-400 hover:text-ink")
              )}
            >
              <LayoutList size={18} />
            </button>
            <button
              onClick={() => setLayoutMode('list')}
              className={cn(
                "p-2 rounded transition-all",
                layoutMode === 'list'
                  ? (isDark ? "bg-white/10 text-starlight" : "bg-ink/5 text-ink")
                  : (isDark ? "text-moon hover:text-starlight" : "text-gray-400 hover:text-ink")
              )}
            >
              <List size={18} />
            </button>
          </div>
        </div>

        <LayoutGroup>
          <motion.div layout className="relative min-h-[500px]">
             {layoutMode === 'timeline' ? (
                <TimelineView posts={filteredPosts} isDark={isDark} onSelect={handleSelectPost} />
             ) : (
                <CompactListView posts={filteredPosts} isDark={isDark} onSelect={handleSelectPost} />
             )}
          </motion.div>
        </LayoutGroup>

      </main>
    </motion.div>
  );
};

// Timeline View
const TimelineView: React.FC<{ posts: BlogPost[], isDark: boolean, onSelect: (id: string) => void }> = ({ posts, isDark, onSelect }) => {
  return (
    <div className="relative">
      <div className={cn(
        "absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block",
        isDark ? "bg-white/10" : "bg-ink/10"
      )} />
      <div className="space-y-24 md:space-y-32">
        {posts.map((post, index) => (
          <TimelineItem key={post.id} post={post} index={index} isDark={isDark} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

const TimelineItem: React.FC<{ post: BlogPost; index: number; isDark: boolean; onSelect: (id: string) => void }> = ({ post, index, isDark, onSelect }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6 }}
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-20 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      <div className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full z-10 hidden md:block border-2",
        isDark ? "bg-midnight border-white shadow-[0_0_0_8px_#050505]" : "bg-paper border-ink shadow-[0_0_0_8px_#ffffff]"
      )} />

      {/* Text Side */}
      <div className={`w-full md:w-1/2 flex flex-col ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} text-left`}>
        <div className="flex items-center gap-3 text-vibe-purple text-xs font-bold uppercase tracking-widest mb-3">
           <span className={cn("px-2 py-1 rounded", isDark ? "bg-vibe-purple/20" : "bg-vibe-purple/10")}>{post.category}</span>
           <span className="flex items-center gap-1"><Calendar size={12}/> {post.date}</span>
        </div>

        <h3
          onClick={() => onSelect(post.id)}
          className={cn(
          "font-display font-bold text-3xl md:text-4xl leading-none mb-6 transition-colors cursor-pointer",
          isDark ? "text-starlight group-hover:text-vibe-pink hover:text-vibe-pink" : "text-ink group-hover:text-vibe-purple hover:text-vibe-purple"
        )}>
          {post.title}
        </h3>

        <p className={cn(
          "font-body leading-relaxed max-w-md mb-6 text-sm md:text-base",
          isDark ? "text-moon" : "text-graphite"
        )}>
          {post.excerpt}
        </p>

        <div className="flex gap-2 mb-4 justify-end md:justify-start" style={{ justifyContent: isEven ? 'flex-end' : 'flex-start' }}>
          {post.tags?.map(tag => (
            <span key={tag} className={cn(
              "text-[10px] px-2 py-1 rounded border",
              isDark ? "border-white/10 text-moon" : "border-ink/10 text-graphite"
            )}>
              #{tag}
            </span>
          ))}
        </div>

        <motion.button
          onClick={() => onSelect(post.id)}
          whileHover={{ x: isEven ? -10 : 10 }}
          className={cn(
            "flex items-center gap-2 font-bold uppercase text-xs tracking-widest border-b pb-1 transition-all",
            isDark ? "text-starlight border-white/20 hover:border-vibe-pink hover:text-vibe-pink" : "text-ink border-ink/20 hover:border-vibe-purple hover:text-vibe-purple"
          )}
        >
          Read Article <ArrowRight size={14} />
        </motion.button>
      </div>

      {/* Image Side */}
      <div className="w-full md:w-1/2">
        <div onClick={() => onSelect(post.id)} className="relative group overflow-hidden rounded-2xl cursor-pointer">
          <div className={cn(
            "absolute inset-0 transition-colors duration-500 z-10 pointer-events-none mix-blend-multiply",
            isDark ? "bg-midnight/40 group-hover:bg-transparent" : "bg-ink/10 group-hover:bg-transparent"
          )} />
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.7 }}
            src={post.image}
            alt={post.title}
            className="w-full aspect-[4/3] object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700"
          />
        </div>
      </div>
    </motion.div>
  );
};

// Compact List View
const CompactListView: React.FC<{ posts: BlogPost[], isDark: boolean, onSelect: (id: string) => void }> = ({ posts, isDark, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          onClick={() => onSelect(post.id)}
          className={cn(
            "group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300",
            isDark ? "bg-white/5 border-white/10 hover:border-vibe-purple/50" : "bg-white border-ink/10 hover:border-vibe-purple/50 hover:shadow-xl"
          )}
        >
          <div className="relative overflow-hidden aspect-[16/10]">
            <div className={cn(
              "absolute inset-0 transition-opacity duration-500 z-10 pointer-events-none mix-blend-multiply",
              isDark ? "bg-midnight/40 group-hover:bg-transparent" : "bg-ink/10 group-hover:bg-transparent"
            )} />
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 group-hover:scale-105"
            />
          </div>

          <div className="p-6">
            <div className="flex items-center gap-3 text-vibe-purple text-xs font-bold uppercase tracking-widest mb-3">
              <span className={cn("px-2 py-1 rounded", isDark ? "bg-vibe-purple/20" : "bg-vibe-purple/10")}>{post.category}</span>
              <span>{post.date}</span>
            </div>

            <h3 className={cn(
              "font-display font-bold text-xl md:text-2xl mb-3 transition-colors",
              isDark ? "text-starlight group-hover:text-vibe-pink" : "text-ink group-hover:text-vibe-purple"
            )}>
              {post.title}
            </h3>

            <p className={cn(
              "text-sm mb-4 line-clamp-2",
              isDark ? "text-moon" : "text-graphite"
            )}>
              {post.excerpt}
            </p>

            <div className="flex flex-wrap gap-2">
              {post.tags?.slice(0, 3).map(tag => (
                <span key={tag} className={cn(
                  "text-[10px] px-2 py-1 rounded border",
                  isDark ? "border-white/10 text-moon" : "border-ink/10 text-graphite"
                )}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default function BlogPage() {
  return (
    <ClientLayout>
      {({ isDark }) => <BlogView isDark={isDark} />}
    </ClientLayout>
  );
}
