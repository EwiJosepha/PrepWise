'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import interviewPicture from '@/assets/images/interview-prep.jpeg'
import InterviewSuggesterSvg from '@/components/svg-components/interview.svg';

const FloatingElement = ({ delay }: {delay: number}) => (
  <motion.div
    className="absolute w-12 h-12 rounded-full bg-blue-500 opacity-10"
    initial={{ y: '100%' }}
    animate={{ y: ['-100%', '100%'] }}
    transition={{
      repeat: Infinity,
      repeatType: 'reverse',
      duration: 10,
      ease: 'easeInOut',
      delay: delay,
    }}
  />
);

const InterviewSuggestionBox = () => {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    setIsLoading(true);
    setTimeout(() => {
      setSuggestion('What challenges did you face in your previous role?');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className='bg-secondary flex flex-col md:flex-row items-center justify-center  w-full border-none px-4'>
      <motion.div 
        className="bg-gray-800 text-blue-200 p-6 rounded-lg shadow-lg w-full md:w-1/2 lg:w-2/5 relative overflow-hidden h-[400px]"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FloatingElement delay={0} />
        <FloatingElement delay={2} />
        <FloatingElement delay={4} />
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Prep@ wise Suggester</h2>
          <textarea 
            className="w-full p-3 bg-gray-700 text-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Paste job description here..."
            onPaste={handlePaste}
          ></textarea>
          {isLoading ? (
            <motion.div 
              className="mt-4 text-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
           <InterviewSuggesterSvg />
            </motion.div>
          ) : suggestion && (
            <motion.div 
              className="mt-4 p-4 bg-blue-900 rounded-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-2">Suggested Question:</h3>
              <p className="text-blue-200">{suggestion}</p>
            </motion.div>
          )}
        </div>
      </motion.div>
      
      <motion.div 
        className="mt-8 md:mt-0 md:ml-8 w-full md:w-1/2 lg:w-2/5 "
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image
          src={interviewPicture}
          alt="Interview illustration"
          width={500}
          height={500}
          className="rounded-lg shadow-lg w-full"
        />
      </motion.div>
    </div>
  );
};

export default InterviewSuggestionBox;
