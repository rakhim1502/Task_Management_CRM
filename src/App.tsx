function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Task Management CRM</h1>
          <p className="text-slate-400 text-lg">Step 6 — User Management ✅ Complete</p>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-cyan-400 font-medium">6/16 Steps</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all" style={{ width: '37.5%' }}></div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔌 User Management API Endpoints</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* User List */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs font-mono rounded">GET</span>
                <span className="text-slate-300 font-mono text-sm">/api/users</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Get all users with pagination, filtering, search</p>
              <div className="text-xs text-slate-500">
                <div>Query: ?role=EMPLOYEE&search=john&page=1&limit=10</div>
                <div>Access: ADMIN, MANAGER</div>
              </div>
            </div>

            {/* User Detail */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs font-mono rounded">GET</span>
                <span className="text-slate-300 font-mono text-sm">/api/users/:id</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Get user by ID with tasks</p>
              <div className="text-xs text-slate-500">
                <div>Returns: user details + assigned/created tasks</div>
                <div>Access: ADMIN, MANAGER</div>
              </div>
            </div>

            {/* Create User */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs font-mono rounded">POST</span>
                <span className="text-slate-300 font-mono text-sm">/api/users</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Create new user</p>
              <div className="text-xs text-slate-500">
                <div>Body: {'{ name, email, password, role? }'}</div>
                <div>Access: ADMIN only</div>
              </div>
            </div>

            {/* Update User */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs font-mono rounded">PUT</span>
                <span className="text-slate-300 font-mono text-sm">/api/users/:id</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Update user</p>
              <div className="text-xs text-slate-500">
                <div>Body: {'{ name?, email?, password?, role? }'}</div>
                <div>Access: ADMIN only</div>
              </div>
            </div>

            {/* Delete User */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs font-mono rounded">DELETE</span>
                <span className="text-slate-300 font-mono text-sm">/api/users/:id</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Delete user</p>
              <div className="text-xs text-slate-500">
                <div>Prevents self-deletion</div>
                <div>Access: ADMIN only</div>
              </div>
            </div>

            {/* My Profile */}
            <div className="bg-slate-900/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs font-mono rounded">GET/PUT</span>
                <span className="text-slate-300 font-mono text-sm">/api/users/profile/me</span>
              </div>
              <p className="text-xs text-slate-400 mb-2">Get/Update own profile</p>
              <div className="text-xs text-slate-500">
                <div>Returns: profile + active tasks</div>
                <div>Access: All authenticated users</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Pagination */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Pagination</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Page number (default: 1)</li>
              <li>• Items per page (default: 10)</li>
              <li>• Total count & pages</li>
              <li>• Sort by field & order</li>
            </ul>
          </div>

          {/* Filtering */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Filtering</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• Filter by role</li>
              <li>• Search in name & email</li>
              <li>• Sort by createdAt, name, email, role</li>
              <li>• Ascending/descending order</li>
            </ul>
          </div>

          {/* Profile */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Profile</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>• View own profile</li>
              <li>• Update name, email, password</li>
              <li>• Cannot change own role</li>
              <li>• See active assigned tasks</li>
            </ul>
          </div>
        </div>

        {/* Validation */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">✅ Validation Rules</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Create User</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Name: required, min 2 chars</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Email: required, valid format, unique</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Password: required, min 6 chars</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Role: optional, default EMPLOYEE</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Update User</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>All fields optional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Email uniqueness check</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Password auto-hashed with bcrypt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">✓</span>
                  <span>Role validation against enum</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Example Response */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">📦 Example Response</h3>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs overflow-x-auto">
            <pre className="text-slate-300">
{`GET /api/users?role=EMPLOYEE&search=john&page=1&limit=10

{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "name": "John Developer",
        "email": "employee1@crm.com",
        "role": "EMPLOYEE",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "_count": {
          "assignedTasks": 5,
          "createdTasks": 0
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 3,
      "totalPages": 1
    }
  }
}`}
            </pre>
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">7</span>
            </div>
            <div>
              <p className="text-sm text-slate-400">Next Step</p>
              <p className="text-white font-semibold">STEP 7 — Task CRUD</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-3 ml-13">
            Task create, read, update, delete with role-based access control
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
