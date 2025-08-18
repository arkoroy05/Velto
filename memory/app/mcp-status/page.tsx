export default function MCPStatus() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            MCP Server Status
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Server Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Server Name</p>
                <p className="text-lg text-gray-900">velto-memory-server</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Version</p>
                <p className="text-lg text-gray-900">1.0.0</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Protocol</p>
                <p className="text-lg text-gray-900">Model Context Protocol</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Available Tools</h2>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">save_context</h3>
                <p className="text-gray-600 mb-3">Save a new context to Velto memory system</p>
                <div className="text-sm text-gray-500">
                  <strong>Required:</strong> title, content, type
                  <br />
                  <strong>Optional:</strong> projectId, tags, source
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">search_contexts</h3>
                <p className="text-gray-600 mb-3">Search for contexts in Velto memory system</p>
                <div className="text-sm text-gray-500">
                  <strong>Required:</strong> query, userId
                  <br />
                  <strong>Optional:</strong> projectId, filters, limit
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">get_context</h3>
                <p className="text-gray-600 mb-3">Retrieve a specific context by ID</p>
                <div className="text-sm text-gray-500">
                  <strong>Required:</strong> contextId, userId
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">generate_prompt_version</h3>
                <p className="text-gray-600 mb-3">Generate a prompt version of a context for AI agents</p>
                <div className="text-sm text-gray-500">
                  <strong>Required:</strong> contextId, userId
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">find_related_contexts</h3>
                <p className="text-gray-600 mb-3">Find contexts related to a given context</p>
                <div className="text-sm text-gray-500">
                  <strong>Required:</strong> contextId, userId
                  <br />
                  <strong>Optional:</strong> limit
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">get_project_contexts</h3>
                <p className="text-gray-600 mb-3">Get all contexts for a specific project</p>
                <div className="text-sm text-gray-500">
                  <strong>Required:</strong> projectId, userId
                  <br />
                  <strong>Optional:</strong> limit, offset
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">analyze_context</h3>
                <p className="text-gray-600 mb-3">Analyze a context and get AI insights</p>
                <div className="text-sm text-gray-500">
                  <strong>Required:</strong> contextId, userId
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connection Details</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                <strong>Transport:</strong> stdio (for local development)
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Endpoint:</strong> Available via MCP client integration
              </p>
              <p className="text-sm text-gray-700">
                <strong>Authentication:</strong> User ID required for all operations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
