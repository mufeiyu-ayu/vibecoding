/**
 * Design tokens for the vibecoding blog
 * Following the 温柔优雅 (gentle and elegant) design system
 */

export const colors = {
  // Blue to Pink gradient
  gradientFrom: '#3b82f6', // blue-500
  gradientTo: '#ec4899',   // pink-500

  // Background colors (light mode)
  bgPrimary: '#ffffff',
  bgSecondary: '#fafafa',
  bgTertiary: '#f9f9f9',

  // Text colors (light mode)
  textPrimary: '#1f2937',   // gray-800
  textSecondary: '#374151', // gray-700
  textTertiary: '#6b7280',  // gray-500

  // Auxiliary colors
  success: '#10b981',  // green-500
  warning: '#f59e0b',  // amber-500
  info: '#3b82f6',     // blue-500
} as const;

export const timing = {
  // Animation durations (ms)
  small: 500,      // buttons, links
  medium: 550,     // cards, modals
  large: 600,      // page transitions, hero
  background: 25000, // wave animations (25s)

  // Stagger delays (ms)
  staggerShort: 60,
  staggerMedium: 80,
  staggerLong: 150,
} as const;

export const easing = {
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',
  inOut: 'ease-in-out',
  out: 'ease-out',
} as const;

export const spacing = {
  // Common spacing values
  sectionGap: '4rem',
  cardGap: '1.5rem',
  contentMaxWidth: '65ch', // optimal reading width
} as const;

export const borderRadius = {
  button: '12px',
  card: '16px',
  cardLarge: '24px',
  image: '12px',
} as const;
