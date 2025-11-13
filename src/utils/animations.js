// src/utils/animations.js
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
