function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl mb-4 shadow-lg shadow-pink-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Task Management CRM</h1>
          <p className="text-slate-400 text-lg">Step 9 — Dashboard API ✅ Complete</p>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-pink-400 font-medium">9/16 Steps</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all" style={{ width: '56.25%' }}></div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔌 Dashboard API Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs font-mono rounded">GET</span>
                <span className="text-slate-300 font-mono text-sm">/api/dashboard</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Comprehensive dashboard statistics</p>
              <div className="text-xs text-slate-500">
                <div>Access: ADMIN, MANAGER</div>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs font-mono rounded">GET</span>
                <span className="text-slate-300 font-mono text-sm">/api/dashboard/charts</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Chart data for visualizations</p>
              <div className="text-xs text-slate-500">
                <div>Access: ADMIN, MANAGER</div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">📊 Dashboard Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-lg p-4 border border-blue-500/30">
              <div className="text-2xl font-bold text-blue-400">5</div>
              <div className="text-xs text-slate-400">Total Users</div>
            </div>
            <div className="bg-gradient-to-br from-green-600/20 to-green-700/20 rounded-lg p-4 border border-green-500/30">
              <div className="text-2xl font-bold text-green-400">10</div>
              <div className="text-xs text-slate-400">Total Tasks</div>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-purple-700/20 rounded-lg p-4 border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">30%</div>
              <div className="text-xs text-slate-400">Completion Rate</div>
            </div>
            <div className="bg-gradient-to-br from-orange-600/20 to-orange-700/20 rounded-lg p-4 border border-orange-500/30">
              <div className="text-2xl font-bold text-orange-400">2</div>
              <div className="text-xs text-slate-400">Overdue Tasks</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* By Status */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Tasks by Status</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">TODO</span>
                  <span className="text-sm text-slate-400">4</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-slate-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">IN_PROGRESS</span>
                  <span className="text-sm text-slate-400">3</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">COMPLETED</span>
                  <span className="text-sm text-slate-400">3</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>

            {/* By Priority */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Tasks by Priority</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">HIGH</span>
                  <span className="text-sm text-slate-400">3</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">MEDIUM</span>
                  <span className="text-sm text-slate-400">4</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div className="space-y-2 mt-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">LOW</span>
                  <span className="text-sm text-slate-400">3</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Example Response */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">📦 Example Response</h3>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-slate-300">
{`GET /api/dashboard

{
  "success": true,
  "data": {
    "stats": {
      "overview": {
        "totalUsers": 5,
        "totalEmployees": 3,
        "totalTasks": 10,
        "completionRate": 30,
        "tasksPerEmployee": 3,
        "overdueTasks": 2
      },
      "byStatus": {
        "todo": 4,
        "inProgress": 3,
        "completed": 3
      },
      "byPriority": {
        "high": 3,
        "medium": 4,
        "low": 3
      },
      "thisMonth": {
        "created": 5,
        "completed": 2
      },
      "recentTasks": [...],
      "tasksByEmployee": [
        {
          "id": 3,
          "name": "John Developer",
          "email": "employee1@crm.com",
          "totalTasks": 4,
          "todoTasks": 2,
          "inProgressTasks": 1,
          "completedTasks": 1
        },
        ...
      ]
    }
  }
}`}
            </pre>
          </div>
        </div>

        {/* Chart Data */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">📈 Chart Data Endpoint</h3>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-slate-300">
{`GET /api/dashboard/charts

{
  "success": true,
  "data": {
    "chartData": {
      "statusChart": {
        "labels": ["TODO", "IN_PROGRESS", "COMPLETED"],
        "values": [4, 3, 3]
      },
      "priorityChart": {
        "labels": ["LOW", "MEDIUM", "HIGH"],
        "values": [3, 4, 3]
      }
    }
  }
}`}
            </pre>
          </div>
        </div>

        {/* Features */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">✨ Dashboard Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Overview Statistics</p>
                  <p className="text-xs text-slate-400">Total users, tasks, completion rate, overdue</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Status Breakdown</p>
                  <p className="text-xs text-slate-400">TODO, IN_PROGRESS, COMPLETED counts</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Priority Breakdown</p>
                  <p className="text-xs text-slate-400">HIGH, MEDIUM, LOW counts</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Monthly Statistics</p>
                  <p className="text-xs text-slate-400">Tasks created & completed this month</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Employee Performance</p>
                  <p className="text-xs text-slate-400">Tasks per employee with breakdown</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Recent Tasks</p>
                  <p className="text-xs text-slate-400">Last 10 created tasks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">10</span>
            </div>
            <div>
              <p className="text-sm text-slate-400">Next Step</p>
              <p className="text-white font-semibold">STEP 10 — React Frontend Setup</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-3 ml-13">
            React app setup, routing, authentication context, API service
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
