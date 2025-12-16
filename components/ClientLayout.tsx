'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import Grain from '@/components/ui/Grain';
import BackgroundMesh from '@/components/ui/BackgroundMesh';

interface ClientLayoutProps {
  children: (props: { isDark: boolean; setView: (view: string) => void }) => React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleViewChange = (view: string) => {
    const location = window.location;
    location.href = `/${view === 'intro' ? '' : view}`;
  };

  return (
    <div className={cn(
      "min-h-screen font-body relative overflow-x-hidden transition-colors duration-500",
      isDark ? "bg-midnight text-starlight" : "bg-paper text-ink"
    )}>
      <Grain />
      <BackgroundMesh isDark={isDark} />

      {/* Floating Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => setIsDark(!isDark)}
          className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-ink/5 dark:border-white/10 hover:bg-white/20 transition-all shadow-lg"
        >
          {isDark ? <Sun className="w-5 h-5 text-starlight" /> : <Moon className="w-5 h-5 text-ink" />}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {children({ isDark, setView: handleViewChange })}
      </AnimatePresence>
    </div>
  );
};

export default ClientLayout;
