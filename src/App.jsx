function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Huy's Portfolio</h1>
            <div className="space-x-6">
              <a href="#about" className="text-gray-700 hover:text-indigo-600 transition">About</a>
              <a href="#projects" className="text-gray-700 hover:text-indigo-600 transition">Projects</a>
              <a href="#contact" className="text-gray-700 hover:text-indigo-600 transition">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to My Portfolio
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Built with Vite, React, and Tailwind CSS
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition">
              View Projects
            </button>
            <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition">
              Contact Me
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold mb-2">Fast</h3>
            <p className="text-gray-600">Powered by Vite for lightning-fast development and builds</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-4xl mb-4">⚛️</div>
            <h3 className="text-xl font-semibold mb-2">Modern</h3>
            <p className="text-gray-600">Built with React 19 for a smooth, interactive experience</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold mb-2">Beautiful</h3>
            <p className="text-gray-600">Styled with Tailwind CSS for beautiful, responsive design</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p>&copy; 2024 Huy's Portfolio. Built with ❤️ using Vite, React, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
