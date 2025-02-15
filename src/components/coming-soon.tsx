import Link from 'next/link';
import React from 'react';

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center text-white">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Coming Soon</h1>
        <p className="text-lg md:text-xl mb-8">
          We're working hard to bring you something amazing!
        </p>
        <div className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-md bg-indigo-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="mt-4 w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300">
            Notify Me
          </button>
        </div>
      </div>
      <div className="mt-8 flex space-x-4">
        <Link href="#" className="text-white hover:text-indigo-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {/* ... */}
          </svg>
        </Link>
      </div>

    </div>
  );
};

export default ComingSoon;