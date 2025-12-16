'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SocialLinkProps {
  icon: React.ReactNode;
  href: string;
  isDark: boolean;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, href, isDark }) => (
  <a
    href={href}
    className={cn(
      "p-3 rounded-full border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
      isDark
        ? "bg-white/5 border-white/10 text-starlight hover:bg-white/10 hover:text-vibe-purple"
        : "bg-white border-ink/5 text-ink hover:text-vibe-purple hover:bg-white"
    )}
  >
    {icon}
  </a>
);

export default SocialLink;
