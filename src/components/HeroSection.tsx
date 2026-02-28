import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

export const HeroSection = memo(function HeroSection() {
  const text = "VRChatter Server Wiki";

  // Create an array of characters
  const characters = useMemo(() => Array.from(text), [text]);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Adjust typing speed here
      }
    }
  }), []);

  const childVariants = useMemo(() => ({
    hidden: { opacity: 0, display: "none" },
    visible: {
      opacity: 1,
      display: "inline-block",
      transition: { duration: 0 }
    }
  }), []);
  return (
    <div className="mc-panel flex flex-col items-center justify-center py-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[#c6c6c6]/80 mix-blend-multiply z-0"></div>
      <div className="relative z-10 w-full max-w-3xl drop-shadow-[2px_2px_0px_#555555]">
        <span className="inline-block bg-[#58a14e] text-[#ffff55] px-3 py-1 border-2 border-black shadow-[inset_2px_2px_0px_0px_#a4e590,inset_-2px_-2px_0px_0px_#386a31] mc-text-shadow font-bold text-sm select-none">
          Minecraft 1.20.1 / Forge
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-2 text-white mc-text-shadow tracking-wide flex justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center border-r-4 border-white animate-blink pr-1"
          >
            {characters.map((char, index) => (
              <motion.span key={index} variants={childVariants}>
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.div>
        </h1>
        <p className="text-[#3F3F3F] font-bold mt-4 leading-relaxed bg-[#c6c6c6]/90 p-4 border-2 border-black inline-block shadow-[inset_3px_3px_0px_0px_#ffffff,inset_-3px_-3px_0px_0px_#555555]">
          VRChatter Serverへようこそ！
          <br />
          このサイトでは環境構築と導入Mod一覧をまとめています！
        </p>
      </div>
    </div>
  )
});
