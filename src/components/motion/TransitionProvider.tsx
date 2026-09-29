"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Image from "next/image";

interface TransitionContextType {
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextType>({
  navigate: () => {},
});

export function usePageTransition() {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  // Entrance wipe on route change
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !curtainRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

      tl.set(curtainRef.current, { scaleY: 1, transformOrigin: "top" })
        .to(logoRef.current, { opacity: 0, y: -20, duration: 0.35 })
        .to(
          curtainRef.current,
          {
            scaleY: 0,
            transformOrigin: "bottom",
            duration: 0.55,
            ease: "expo.out",
          },
          "-=0.15"
        );
    });

    return () => ctx.revert();
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate: () => {} }}>
      {/* Wipe Curtain */}
      <div
        ref={curtainRef}
        className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-[#111111] will-change-transform origin-top scale-y-0"
        aria-hidden="true"
      >
        <div ref={logoRef} className="opacity-0 flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-[#C4653F] flex items-center justify-center shadow-xl">
            <span className="text-white font-extrabold text-3xl tracking-tight">Z</span>
          </div>
          <span className="text-white font-bold text-sm tracking-widest uppercase">ZAYA ZEN</span>
        </div>
      </div>
      {children}
    </TransitionContext.Provider>
  );
}
