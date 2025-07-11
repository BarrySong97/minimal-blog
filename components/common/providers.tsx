"use client";

import { Provider } from "jotai";
import TanstackProvider from "../tanstack/TanstackProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TransitionRouter } from "next-transition-router";
import { motion, useAnimationControls, cubicBezier } from "framer-motion";
import { usePathname } from "next/navigation";

const layerVariants = {
  initial: { y: "100%" },
  visible: { y: 0 },
  exit: { y: "-100%" },
};

// Define mask variants
const maskVariants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
const transitionConfig = (delay = 0) => ({
  duration: 0.5,
  ease: cubicBezier(0.19, 1, 0.22, 1), // Using cubicBezier instead of array
  delay,
});

export const GlobalProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const firstLayerControls = useAnimationControls();
  const maskControls = useAnimationControls();

  return (
    <Provider>
      <TanstackProvider>
        <NuqsAdapter>
          <TransitionRouter
            auto={true}
            leave={(next, from, to) => {
              // 如果from或to路径包含journal，跳过动画
              if (from?.includes("journal") && to?.includes("journal")) {
                next();
                return;
              }

              // Animate with Framer Motion
              const animateLeave = async () => {
                await Promise.all([
                  maskControls.start("visible", transitionConfig()),
                  firstLayerControls.start("visible", transitionConfig(0.25)),
                ]);

                next();
              };

              animateLeave();

              return () => {
                firstLayerControls.stop();
                maskControls.stop();
              };
            }}
            enter={(next) => {
              // 如果当前路径包含journal，跳过动画
              const animateEnter = async () => {
                await Promise.all([
                  maskControls.start("exit", transitionConfig()),
                  firstLayerControls.start("exit", transitionConfig(0.25)),
                ]);

                // Reset to initial state after animation completes
                firstLayerControls.set("initial");
                maskControls.set("initial");

                next();
              };
              if (window.location.pathname.includes("journal")) {
                Promise.all([
                  maskControls.start("exit", transitionConfig()),
                  firstLayerControls.start("exit", transitionConfig(0.25)),
                ]);
                return;
              }
              // Animate with Framer Motion

              animateEnter();

              return () => {
                firstLayerControls.stop();
                maskControls.stop();
              };
            }}
          >
            <div>
              {children}

              <motion.div
                variants={maskVariants}
                initial="initial"
                animate={maskControls}
                className="fixed inset-0 z-50 bg-black bg-opacity-50 pointer-events-none"
              />
              <motion.div
                variants={layerVariants}
                initial="initial"
                animate={firstLayerControls}
                className="fixed inset-0 z-50 bg-white pointer-events-none"
              />
            </div>
          </TransitionRouter>
        </NuqsAdapter>
      </TanstackProvider>
    </Provider>
  );
};
