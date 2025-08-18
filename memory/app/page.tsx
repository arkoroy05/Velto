import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Velto Memory MCP Server
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A powerful Model Context Protocol server for managing and analyzing context data 
            with AI-powered insights, semantic search, and intelligent context graphs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/api/health"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Health Check
            </Link>
            <Link 
              href="/api/docs"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              API Documentation
            </Link>
            <Link 
              href="/mcp-status"
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              MCP Status
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              Advanced context analysis using Google Gemini AI with comprehensive breakdowns, 
              sentiment analysis, and relationship mapping.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Context Graphs</h3>
            <p className="text-gray-600">
              Automatic creation of visual context graphs showing relationships between 
              different pieces of information with semantic similarity.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Semantic Search</h3>
            <p className="text-gray-600">
              Intelligent search using embeddings and RAG (Retrieval Augmented Generation) 
              for finding relevant contexts based on meaning.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Deploy</h2>
          <p className="text-gray-600 mb-8">
            This Next.js application is configured for easy deployment to Vercel with 
            all the necessary configurations for MCP functionality.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg inline-block">
            <code className="text-sm text-gray-800">
              npm run build && npm run start
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
