
'use client'
import { motion } from "framer-motion";

export default function WalkingAnimation() {
  return (
    <div className="relative w-full h-[150px] bg-white overflow-hidden flex items-center">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute text-xl font-bold  pb-10"
      >
        🚀 Ace your next interview with **Prep Wise** – The ultimate AI coach! 🚀
      </motion.div>
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute text-xl font-bold text-blue-900  pt-10 invisible md:visible"
      >
        🎯 Get expert insights & practice tailored questions – Join **Prep Wise** today! 🎯
      </motion.div>
    </div>
  );
}
