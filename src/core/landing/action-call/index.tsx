import React from 'react';
import Button from '@/components/button';
const CallToAction = () => {
  return (
    <section className="bg-secondary py-16 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
          Ready to Transform Your Interview Skills?
        </h2>
        <p className="text-xl text-white mb-8">
          Empower your professional journey with proven interview strategies. <span className="text-indigo-500">Unlock your potential, one interview at a time.</span>
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button className="inline-block  rounded-sm px-4 py-3 m:px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-indigo-950 dark:bg-white/10 dark:text-white dark:hover:bg-white/5" variant='secondary' >
            Learn More
          </Button>
          <Button className="inline-block rounded-sm bg-black px-6 py-3 m:px-8 text-base font-semibold text-white duration-300 ease-in-out hover:bg-indigo-950 dark:bg-white/10 dark:text-white dark:hover:bg-white/5 " variant='primary'>
            Start Now
          </Button>
        </div>

      </div>
      <div className="mt-12 flex justify-center">

      </div>
    </section>
  );
};

export default CallToAction;
