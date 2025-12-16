'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HeroTitleSvgProps {
  isDark: boolean;
}

const HeroTitleSvg: React.FC<HeroTitleSvgProps> = ({ isDark }) => {
  return (
    <div className="w-full relative select-none flex justify-center">
      <svg
        viewBox="0 0 400 120"
        className="w-[300px] md:w-[400px] h-auto"
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="textGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="textGradientDark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EAEAEA" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        <motion.text
          x="50%"
          y="100"
          textAnchor="middle"
          fontFamily='"Space Grotesk", sans-serif'
          fontWeight="700"
          fontSize="120"
          letterSpacing="-0.05em"
          fill={isDark ? "url(#textGradientDark)" : "url(#textGradientLight)"}
          stroke={isDark ? "#ffffff" : "#1a1a1a"}
          strokeWidth="0.5"
          initial={{
            fillOpacity: 0,
            strokeDasharray: 400,
            strokeDashoffset: 400,
            opacity: 0,
            y: 20
          }}
          animate={{
            fillOpacity: 1,
            strokeDashoffset: 0,
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            fillOpacity: { delay: 1, duration: 1 }
          }}
        >
          Ayu.
        </motion.text>
      </svg>
    </div>
  );
};

export default HeroTitleSvg;
