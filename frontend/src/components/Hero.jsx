import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollYProgress } = useScroll();

  // Globe movement: big & central → tucked under heading, still large
  const globeX = useTransform(scrollYProgress, [0, 0.3], ['0%', '-35%']);
  const globeY = useTransform(scrollYProgress, [0, 0.3], ['0%', '-10%']);
  const globeScale = useTransform(scrollYProgress, [0, 0.3], [1.2, 1.05]); // never shrinks too small

  // Text reveal (right side)
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.1, 0.3], ['20%', '0%']);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black px-6">
      {/* Title */}
      <motion.h1
        className="absolute top-20 left-12 text-5xl md:text-7xl font-extrabold text-white leading-tight z-20 max-w-xl"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Global <span className="text-blue-400">Energy</span> Trading Platform
      </motion.h1>

      {/* Globe */}
      <motion.div
        className="relative w-[850px] h-[850px] max-w-full drop-shadow-[0_0_50px_rgba(0,0,255,0.4)]"
        style={{ x: globeX, y: globeY, scale: globeScale }}
      >
        <Spline scene="https://prod.spline.design/Sateu9tTFzy3abaI/scene.splinecode" />
      </motion.div>

      {/* Text + buttons */}
      <motion.div
        className="absolute right-16 max-w-lg text-left z-10"
        style={{ opacity: textOpacity, x: textX }}
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">
          {/* mb-8 gives more space under heading */}
          Connect with verified energy suppliers worldwide.
        </h2>
        <p className="text-lg text-gray-300 mb-10 leading-relaxed">
          Trade oil, gas, and fuel with real-time pricing, secure transactions, and comprehensive
          documentation.
        </p>
        <div className="flex gap-6">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-500 transition">
            Start Trading
          </button>
          <button className="px-6 py-3 border border-blue-500 text-blue-400 rounded-xl font-semibold hover:bg-blue-900/30 transition">
            Browse Listings
          </button>
        </div>
      </motion.div>
    </section>
  );
}
