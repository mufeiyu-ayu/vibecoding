'use client';

import React from 'react';

const Grain: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 opacity-[0.03] mix-blend-multiply overflow-hidden">
      <svg className="h-full w-full opacity-100 filter brightness-100 contrast-150">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
};

export default Grain;
