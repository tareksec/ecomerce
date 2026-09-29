'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export type DockIcon = React.ComponentType<{ className?: string }>;

export interface DockItem {
  title: string;
  icon: DockIcon;
  onClick?: () => void;
  href?: string;
  badge?: number | string | null;
  isActive?: boolean;
}

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  dockClassName?: string;
}

export const GlassDock = React.forwardRef<HTMLDivElement, GlassDockProps>(
  ({ items, className, dockClassName, ...props }, ref) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState(0);
    const router = useRouter();

    const handleMouseEnter = (index: number) => {
      if (hoveredIndex !== null && index !== hoveredIndex) {
        setDirection(index > hoveredIndex ? 1 : -1);
      }
      setHoveredIndex(index);
    };

    // Calculate tooltip position centered over each item
    // Each item is 44px wide (w-11), gap is 12px (gap-3), container padding is 16px (px-4)
    // Center of item i = 16 + i * (44 + 12) + 22 = 38 + i * 56
    const getTooltipPosition = (index: number) => 38 + index * 56;

    return (
      <div ref={ref} className={cn('w-max relative', className)} {...props}>
        <div
          className={cn(
            'glass-dock relative flex gap-3 items-center px-4 py-2 rounded-full',
            'bg-[#FAFAF8]/92 dark:bg-[#181816]/92 border border-[#E7E3DC]/90 dark:border-stone-800',
            'backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.12)] justify-center',
            dockClassName
          )}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setDirection(0);
          }}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {hoveredIndex !== null && items[hoveredIndex] && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: -50,
                  x: getTooltipPosition(hoveredIndex),
                }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="absolute top-0 left-0 pointer-events-none z-50 -translate-x-1/2"
              >
                <div
                  className={cn(
                    'px-3.5 py-1.5 rounded-full',
                    'bg-[#111111] text-white dark:bg-white dark:text-black',
                    'shadow-lg flex items-center justify-center',
                    'border border-neutral-800 dark:border-neutral-200'
                  )}
                >
                  <div className="relative h-4 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="popLayout" custom={direction}>
                      <motion.span
                        key={items[hoveredIndex].title}
                        custom={direction}
                        initial={{
                          x: direction > 0 ? 25 : -25,
                          opacity: 0,
                          filter: 'blur(4px)',
                        }}
                        animate={{
                          x: 0,
                          opacity: 1,
                          filter: 'blur(0px)',
                        }}
                        exit={{
                          x: direction > 0 ? -25 : 25,
                          opacity: 0,
                          filter: 'blur(4px)',
                        }}
                        transition={{
                          duration: 0.25,
                          ease: 'easeOut',
                        }}
                        className="text-xs font-semibold tracking-wide whitespace-nowrap"
                      >
                        {items[hoveredIndex].title}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dock Items */}
          {items.map((el, index) => {
            const Icon = el.icon;
            const isHovered = hoveredIndex === index;
            const isCurrent = el.isActive;

            const content = (
              <>
                <motion.div
                  whileTap={{ scale: 0.88 }}
                  animate={{
                    scale: isHovered ? 1.15 : isCurrent ? 1.05 : 1,
                    y: isHovered ? -3 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                  className="relative flex items-center justify-center"
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 transition-colors duration-200',
                      isCurrent
                        ? 'text-[#C4653F]'
                        : isHovered
                        ? 'text-[#111111] dark:text-white'
                        : 'text-stone-600 dark:text-neutral-400'
                    )}
                  />

                  {/* Badge */}
                  {el.badge !== undefined && el.badge !== null && (
                    <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#C4653F] text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                      {el.badge}
                    </span>
                  )}
                </motion.div>

                {/* Active Indicator Dot */}
                {isCurrent && (
                  <motion.span
                    layoutId="glassDockActiveDot"
                    className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[#C4653F]"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
              </>
            );

            const itemClass = "relative w-11 h-11 flex flex-col items-center justify-center cursor-pointer touch-manipulation select-none";

            if (el.href) {
              if (el.href.startsWith('http')) {
                return (
                  <a
                    key={el.title}
                    href={el.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => handleMouseEnter(index)}
                    className={itemClass}
                    aria-label={el.title}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <Link
                  key={el.title}
                  href={el.href}
                  onMouseEnter={() => handleMouseEnter(index)}
                  className={itemClass}
                  aria-label={el.title}
                >
                  {content}
                </Link>
              );
            }

            return (
              <button
                key={el.title}
                type="button"
                onClick={el.onClick}
                onMouseEnter={() => handleMouseEnter(index)}
                className={itemClass}
                aria-label={el.title}
              >
                {content}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);

GlassDock.displayName = 'GlassDock';
export default GlassDock;