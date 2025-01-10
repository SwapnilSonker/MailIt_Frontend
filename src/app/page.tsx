"use client";
import { AnimatedCard } from "@/components/AnimateCard";
import { AnimatedCard2 } from "@/components/AnimateCard2";
import { GlowingAboutIcon } from "@/components/GlowingAbout";
import { GlowingGithubIcon } from "@/components/GlowingGithub";
import { GlowingHomeIcon } from "@/components/GlowingHome";
import { GlowingServicesIcon } from "@/components/GlowingService";
import Template from "@/utils/template";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Mail, Sparkles, Send } from 'lucide-react';

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  {
    ssr: false, // Disable SSR
  }
);

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-yellow-600 to-white">
      <Template>
        <header className="flex justify-center items-center p-5 ">
          <div className="flex items-center space-x-10 bg-white/10 backdrop-blur-md rounded-full px-10 py-4 shadow-lg">
            <GlowingHomeIcon />
            <GlowingAboutIcon />
            <GlowingServicesIcon />
            <GlowingGithubIcon />
          </div>
        </header>
        <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
        {/* Background animated particles */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 bg-yellow-300 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.div>

        {/* Main Logo Container */}
        <div className="relative">
          <motion.div
            className="flex items-center gap-6"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            {/* Animated Mail Icon */}
            <motion.div
              className="relative"
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <Mail size={100} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
              </motion.div>
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 45, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
              >
                <Sparkles size={32} className="text-yellow-300" />
              </motion.div>
            </motion.div>

            {/* Text Container */}
            <div className="flex flex-col items-start relative">
              {/* Mail Text */}
              <motion.h1 
                className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 drop-shadow-[0_0_25px_rgba(250,204,21,0.3)]"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
              >
                Mail
              </motion.h1>

              {/* It Text with Floating Animation */}
              <motion.div
                className="relative -mt-6"
                initial={{ x: 120, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
              >
                <motion.span 
                  className="text-9xl font-thin text-yellow-200 inline-block"
                  animate={{ y: [-2, 2, -2] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  It
                </motion.span>
                <motion.div
                  className="absolute -right-12 top-1/2 -translate-y-1/2"
                  animate={{
                    x: [0, 10, 0],
                    rotate: [0, 15, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }}
                >
                  <Send size={40} className="text-yellow-300" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
        <div className="flex items-center justify-center gap-8 h-screen p-2">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ 
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          <AnimatedCard />
          {/* <AnimatedCard2/> */}
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2
            }}
          >
            <AnimatedCard2/>
          </motion.div>
      </div>
      </Template>
    </div>
  );
}
