function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-indigo-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Task Management CRM</h1>
          <p className="text-slate-400 text-lg">Step 8 — Task Filtering & Search ✅ Complete</p>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-indigo-400 font-medium">8/16 Steps</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* Filter Types */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔍 Advanced Filtering Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-white">Status</h4>
              </div>
              <p className="text-xs text-slate-400 mb-2">Filter by task status</p>
              <div className="text-xs text-slate-500 font-mono">
                <div>?status=TODO</div>
                <div>?statuses=TODO,IN_PROGRESS</div>
              </div>
            </div>

            {/* Priority Filter */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-red-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-white">Priority</h4>
              </div>
              <p className="text-xs text-slate-400 mb-2">Filter by priority level</p>
              <div className="text-xs text-slate-500 font-mono">
                <div>?priority=HIGH</div>
                <div>?priorities=HIGH,MEDIUM</div>
              </div>
            </div>

            {/* Search */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-white">Search</h4>
              </div>
              <p className="text-xs text-slate-400 mb-2">Full-text search in title & description</p>
              <div className="text-xs text-slate-500 font-mono">
                <div>?search=bug</div>
                <div>?search=login+issue</div>
              </div>
            </div>

            {/* Date Range */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-white">Date Range</h4>
              </div>
              <p className="text-xs text-slate-400 mb-2">Filter by creation date</p>
              <div className="text-xs text-slate-500 font-mono">
                <div>?fromDate=2024-01-01</div>
                <div>?toDate=2024-12-31</div>
              </div>
            </div>

            {/* Due Date */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-white">Due Date</h4>
              </div>
              <p className="text-xs text-slate-400 mb-2">Filter by due date range</p>
              <div className="text-xs text-slate-500 font-mono">
                <div>?dueFrom=2024-01-01</div>
                <div>?dueTo=2024-12-31</div>
              </div>
            </div>

            {/* Overdue */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-white">Overdue</h4>
              </div>
              <p className="text-xs text-slate-400 mb-2">Filter overdue tasks</p>
              <div className="text-xs text-slate-500 font-mono">
                <div>?overdue=true</div>
              </div>
            </div>
          </div>
        </div>

        {/* Sorting Options */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">📊 Sorting Options</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Sort Fields</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  <span className="font-mono text-xs">createdAt</span>
                  <span className="text-slate-500">— Creation date</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  <span className="font-mono text-xs">updatedAt</span>
                  <span className="text-slate-500">— Last update</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  <span className="font-mono text-xs">dueDate</span>
                  <span className="text-slate-500">— Deadline</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  <span className="font-mono text-xs">title</span>
                  <span className="text-slate-500">— Alphabetical</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  <span className="font-mono text-xs">priority</span>
                  <span className="text-slate-500">— Priority level</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Sort Orders</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  <span className="font-mono text-xs">asc</span>
                  <span className="text-slate-500">— Ascending (A-Z, 1-9)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  <span className="font-mono text-xs">desc</span>
                  <span className="text-slate-500">— Descending (Z-A, 9-1)</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-slate-900 rounded-lg">
                <p className="text-xs text-slate-400 mb-1">Example:</p>
                <p className="text-xs text-slate-300 font-mono">?sortBy=dueDate&sortOrder=asc</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">📄 Pagination</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Parameters</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  <span className="font-mono text-xs">page</span>
                  <span className="text-slate-500">— Page number (default: 1)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                  <span className="font-mono text-xs">limit</span>
                  <span className="text-slate-500">— Items per page (default: 10, max: 100)</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Response</h4>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs">
                <pre className="text-slate-300">
{`"pagination": {
  "page": 1,
  "limit": 10,
  "total": 45,
  "totalPages": 5
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Example Queries */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">💡 Example Queries</h3>
          <div className="space-y-3">
            <div className="bg-slate-900 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Get all HIGH priority TODO tasks:</p>
              <p className="text-sm text-slate-300 font-mono break-all">
                GET /api/tasks?status=TODO&priority=HIGH
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Search for "bug" in tasks created this month:</p>
              <p className="text-sm text-slate-300 font-mono break-all">
                GET /api/tasks?search=bug&fromDate=2024-01-01&toDate=2024-01-31
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Get overdue tasks assigned to user 3:</p>
              <p className="text-sm text-slate-300 font-mono break-all">
                GET /api/tasks?overdue=true&assignedTo=3
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Get tasks due this week, sorted by due date:</p>
              <p className="text-sm text-slate-300 font-mono break-all">
                GET /api/tasks?dueFrom=2024-01-15&dueTo=2024-01-21&sortBy=dueDate&sortOrder=asc
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-3">
              <p className="text-xs text-slate-400 mb-1">Complex filter: multiple statuses and priorities:</p>
              <p className="text-sm text-slate-300 font-mono break-all">
                GET /api/tasks?statuses=TODO,IN_PROGRESS&priorities=HIGH,MEDIUM&page=1&limit=20
              </p>
            </div>
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">9</span>
            </div>
            <div>
              <p className="text-sm text-slate-400">Next Step</p>
              <p className="text-white font-semibold">STEP 9 — Dashboard API</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-3 ml-13">
            Dashboard statistics, aggregations, charts data, recent tasks
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
