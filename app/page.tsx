import PostCreator from './components/PostCreator'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4 md:p-8 lg:p-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-1 p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Your Social Post</h1>
            <PostCreator />
          </div>
          <div className="md:flex-1 bg-gray-50 p-6 md:p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Live Preview</h2>
            <div id="preview-container"></div>
          </div>
        </div>
      </div>
    </main>
  )
}