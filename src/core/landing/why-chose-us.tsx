import Image from "next/image";

function WhyChooseUs() {
  return (
    <section className="relative z-10 bg-secondary text-white py-16 md:py-20 lg:py-24 px-4 sm:px-8 lg:px-16">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Why Choose PrepWise@
          </h2>
          <p className="text-lg mb-6 leading-relaxed text-gray-300">
            Prepare smarter, not harder! With PrepWise@, we bring innovation to your career journey. Whether you're acing your next interview or fine-tuning your skills, we've got you covered.
          </p>
          <ul className="list-disc pl-5 text-gray-400 space-y-4 mb-8">
            <li>Personalized interview preparation tailored to your needs.</li>
            <li>Interactive tools designed to help you excel.</li>
            <li>Expert guidance for resumes, mock interviews, and more.</li>
          </ul>
          <div className="flex space-x-4">
            <button className="rounded-md bg-indigo-600 hover:bg-indigo-500 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300">
              Learn More
            </button>
            <button className="rounded-md bg-gray-800 hover:bg-gray-700 px-6 py-3 text-base font-semibold text-white shadow-lg transition duration-300">
              Watch Demo
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-xl shadow-lg">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl"></div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs
