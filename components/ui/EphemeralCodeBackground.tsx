'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const CODE_SNIPPETS = [
  "<Dream />", "opacity: 0;", "const memory = null;", "await future;",
  "git push --force", "void 0", "0x5F3759DF",
  "import { Chaos } from 'life';", "return null;",
  "// TODO: Fix entropy", "while(alive) { create() }",
  "=>", "{}", "[]", "Error: 404 Reality Not Found",
  "display: none;", "z-index: 9999;", "Math.random()",
  "console.log('Hello World')", "try { love() } catch (e) {}"
];

interface EphemeralCodeBackgroundProps {
  isDark: boolean;
}

const EphemeralCodeBackground: React.FC<EphemeralCodeBackgroundProps> = ({ isDark }) => {
  const particles = useMemo(() => {
    const generateParticles = () => {
      const random = Math.random;
      return Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        text: CODE_SNIPPETS[Math.floor(random() * CODE_SNIPPETS.length)],
        top: random() * 100,
        duration: random() * 20 + 20,
        delay: -random() * 40,
        scale: random() * 0.5 + 0.8,
        blur: random() > 0.6 ? 'blur-[1px]' : 'blur-[0px]',
      }));
    };
    return generateParticles();
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: "110vw", opacity: 0 }}
          animate={{
            x: "-20vw",
            opacity: [0, 0.8, 0.8, 0]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay
          }}
          className={cn(
            "absolute whitespace-nowrap font-mono text-sm md:text-lg select-none font-medium",
            p.blur,
            isDark ? "text-vibe-purple/40" : "text-ink/20"
          )}
          style={{
            top: `${p.top}%`,
            scale: p.scale,
          }}
        >
          {p.text}
        </motion.div>
      ))}
    </div>
  );
};

export default EphemeralCodeBackground;
