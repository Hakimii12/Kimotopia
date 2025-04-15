import React from 'react'
function NotFound() {
  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${dark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
    <h1 className="text-2xl font-bold mb-4">User not found</h1>
    <p className="mb-6">@{username} doesn't exist</p>
    <button 
      onClick={() => navigate('/')}
      className={`px-4 py-2 rounded-lg ${dark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
    >
      Go back home
    </button>
  </div>
  )
}

export default NotFound
