
'use client'
import { motion } from "framer-motion";

const WalkingAnimation = () => {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: "100%" }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="left-0 text-3xl text-white"
    >
      🚶‍♂️Prepare for your dream job interview by signup with Prep wise@ !!!  🚶‍♂️
    </motion.div>
  );
};

export default WalkingAnimation;
