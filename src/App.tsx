function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-4 shadow-lg shadow-orange-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Task Management CRM</h1>
          <p className="text-slate-400 text-lg">Step 7 — Task CRUD ✅ Complete</p>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-orange-400 font-medium">7/16 Steps</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all" style={{ width: '43.75%' }}></div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔌 Task CRUD API Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Get Tasks */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs font-mono rounded">GET</span>
                <span className="text-slate-300 font-mono text-sm">/api/tasks</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Get all tasks with filters, search, pagination</p>
              <div className="text-xs text-slate-500">
                <div>Query: ?status=TODO&priority=HIGH&search=bug</div>
                <div>Access: All authenticated (EMPLOYEE sees own)</div>
              </div>
            </div>

            {/* Get Task */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs font-mono rounded">GET</span>
                <span className="text-slate-300 font-mono text-sm">/api/tasks/:id</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Get task by ID with assignee & creator</p>
              <div className="text-xs text-slate-500">
                <div>Returns: task details + user info</div>
                <div>Access: All authenticated (EMPLOYEE sees own)</div>
              </div>
            </div>

            {/* Create Task */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs font-mono rounded">POST</span>
                <span className="text-slate-300 font-mono text-sm">/api/tasks</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Create new task</p>
              <div className="text-xs text-slate-500">
                <div>Body: {'{ title, description?, status?, priority?, dueDate?, assignedTo? }'}</div>
                <div>Access: ADMIN, MANAGER</div>
              </div>
            </div>

            {/* Update Task */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs font-mono rounded">PUT</span>
                <span className="text-slate-300 font-mono text-sm">/api/tasks/:id</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Update task</p>
              <div className="text-xs text-slate-500">
                <div>ADMIN/MANAGER: all fields</div>
                <div>EMPLOYEE: status only (own tasks)</div>
              </div>
            </div>

            {/* Delete Task */}
            <div className="bg-slate-900/50 rounded-lg p-4 md:col-span-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs font-mono rounded">DELETE</span>
                <span className="text-slate-300 font-mono text-sm">/api/tasks/:id</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Delete task</p>
              <div className="text-xs text-slate-500">
                <div>Access: ADMIN only</div>
              </div>
            </div>
          </div>
        </div>

        {/* Validation Rules */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">✅ Validation Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Create Task</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Title: required, cannot be empty</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Status: optional, default TODO</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Priority: optional, default MEDIUM</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>DueDate: optional, valid date format</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>AssignedTo: must be EMPLOYEE role</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Update Task</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>All fields optional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Status: TODO, IN_PROGRESS, COMPLETED</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Priority: LOW, MEDIUM, HIGH</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>EMPLOYEE: status only, own tasks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>ADMIN/MANAGER: all fields</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Role-Based Access */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔐 Role-Based Task Access</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Operation</th>
                  <th className="text-center py-3 px-4 text-red-400 font-medium">ADMIN</th>
                  <th className="text-center py-3 px-4 text-yellow-400 font-medium">MANAGER</th>
                  <th className="text-center py-3 px-4 text-green-400 font-medium">EMPLOYEE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr>
                  <td className="py-3 px-4 text-slate-300">View all tasks</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span> <span className="text-xs text-slate-500">(own only)</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300">Create task</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300">Update any field</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300">Update status (own tasks)</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300">Delete task</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Example Request/Response */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">📦 Example Request/Response</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-2">Create Task</h4>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                <pre className="text-slate-300">
{`POST /api/tasks
{
  "title": "Fix login bug",
  "description": "Users cannot login...",
  "priority": "HIGH",
  "dueDate": "2024-12-31",
  "assignedTo": 3
}`}
                </pre>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-2">Response</h4>
              <div className="bg-slate-900 rounded-lg p-3 font-mono text-xs overflow-x-auto">
                <pre className="text-slate-300">
{`{
  "success": true,
  "message": "Task created",
  "data": {
    "task": {
      "id": 11,
      "title": "Fix login bug",
      "status": "TODO",
      "priority": "HIGH",
      "assignee": {
        "id": 3,
        "name": "John Dev"
      }
    }
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">8</span>
            </div>
            <div>
              <p className="text-sm text-slate-400">Next Step</p>
              <p className="text-white font-semibold">STEP 8 — Task Filtering & Search</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-3 ml-13">
            Advanced filtering, search, pagination, sorting for tasks
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
