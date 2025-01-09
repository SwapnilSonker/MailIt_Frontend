"use client";
import { GlowingAboutIcon } from "@/components/GlowingAbout";
import { GlowingGithubIcon } from "@/components/GlowingGithub";
import { GlowingHomeIcon } from "@/components/GlowingHome";
import { GlowingServicesIcon } from "@/components/GlowingService";
import Template from "@/utils/template";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

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
      <div className="flex items-center justify-center h-screen">
        <MotionDiv
          className="text-9xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 font-mono h-3/6"
          initial={{ x: '-100vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 50 }}
        >
          MailIt
        </MotionDiv>
      </div>
      </Template>
      </div>
    
  );
}
