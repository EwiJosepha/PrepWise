'use client'
import React from 'react';
import { motion } from "framer-motion";
import Button from "@/components/button";
import Link from 'next/link';
const CallToAction = () => {
  return (
    <section className="bg-secondary py-16 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Ready to Transform Your Interview Skills?
        </motion.h2>
        
        <motion.p
          className="text-xl text-white mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Empower your professional journey with proven interview strategies.{" "}
          <span className="text-indigo-500">
            Unlock your potential, one interview at a time.
          </span>
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Button className="rounded-sm px-4 py-3 text-base font-semibold text-white hover:bg-indigo-950" variant='tetiary'>
              Learn More
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link  href={'/sign-up'} className="rounded-sm  px-6 py-3 text-base font-semibold text-white hover:bg-indigo-950 bg-indigo-500">
              Start Now
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
};

export default CallToAction;
