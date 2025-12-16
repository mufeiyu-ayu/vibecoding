'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface BackgroundMeshProps {
  isDark: boolean;
}

const BackgroundMesh: React.FC<BackgroundMeshProps> = ({ isDark }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-opacity duration-1000">
      <div className={cn(
        "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] mix-blend-multiply opacity-40 animate-blob",
        isDark ? "bg-vibe-purple/30" : "bg-vibe-blue/20"
      )} />
      <div className={cn(
        "absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full blur-[100px] mix-blend-multiply opacity-40 animate-blob animation-delay-2000",
        isDark ? "bg-vibe-blue/20" : "bg-vibe-purple/20"
      )} />
      <div className={cn(
        "absolute bottom-[-10%] left-[20%] w-[50%] h-[50%] rounded-full blur-[120px] mix-blend-multiply opacity-40 animate-blob animation-delay-4000",
        isDark ? "bg-terracotta/20" : "bg-vibe-pink/20"
      )} />
    </div>
  );
};

export default BackgroundMesh;
