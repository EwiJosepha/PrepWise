import Link from 'next/link'

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h1 className="text-6xl font-bold text-center text-gray-800 mb-4">404</h1>
        <p className="text-xl text-center text-gray-600 mb-8">Oops! Page not found</p>
        <div className="flex justify-center">
          <Link href="/" className="px-6 py-3 bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-900 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default  NotFound
