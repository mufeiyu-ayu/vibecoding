import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  glass?: boolean
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, glass = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-2xl border border-gray-100 p-6',
          'transition-all duration-550',

          // Glass effect
          glass ? 'bg-white/80 backdrop-blur-lg' : 'bg-white',

          // Shadow
          'shadow-sm',

          // Hover effect
          hover && 'hover:-translate-y-1.5 hover:shadow-xl cursor-pointer',
          hover && 'hover:shadow-blue-500/5',

          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
