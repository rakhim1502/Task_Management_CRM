function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg shadow-purple-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Task Management CRM</h1>
          <p className="text-slate-400 text-lg">Step 5 — Role-Based Authorization ✅ Complete</p>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-purple-400 font-medium">5/16 Steps</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all" style={{ width: '31.25%' }}></div>
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔐 Permission Matrix</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Endpoint</th>
                  <th className="text-center py-3 px-4 text-red-400 font-medium">ADMIN</th>
                  <th className="text-center py-3 px-4 text-yellow-400 font-medium">MANAGER</th>
                  <th className="text-center py-3 px-4 text-green-400 font-medium">EMPLOYEE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr>
                  <td className="py-3 px-4 text-slate-300">GET /api/users</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300">POST /api/users</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300">PUT /api/users/:id</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300">DELETE /api/users/:id</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                </tr>
                <tr className="bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-300">GET /api/tasks</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span> <span className="text-xs text-slate-500">(all)</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span> <span className="text-xs text-slate-500">(all)</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span> <span className="text-xs text-slate-500">(own)</span></td>
                </tr>
                <tr className="bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-300">GET /api/tasks/:id</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span> <span className="text-xs text-slate-500">(own)</span></td>
                </tr>
                <tr className="bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-300">POST /api/tasks</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                </tr>
                <tr className="bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-300">PUT /api/tasks/:id</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span> <span className="text-xs text-slate-500">(all)</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span> <span className="text-xs text-slate-500">(all)</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span> <span className="text-xs text-slate-500">(status only)</span></td>
                </tr>
                <tr className="bg-slate-800/30">
                  <td className="py-3 px-4 text-slate-300">DELETE /api/tasks/:id</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-300">GET /api/dashboard</td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-green-400">✅</span></td>
                  <td className="py-3 px-4 text-center"><span className="text-red-400">❌</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Descriptions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* ADMIN */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-red-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">ADMIN</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Full system access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Manage all users (CRUD)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Manage all tasks (CRUD)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>View dashboard statistics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Assign tasks to employees</span>
              </li>
            </ul>
          </div>

          {/* MANAGER */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-yellow-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">MANAGER</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>View all employees</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Create and edit tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Assign tasks to employees</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>View dashboard statistics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span className="text-slate-500">Cannot delete users/tasks</span>
              </li>
            </ul>
          </div>

          {/* EMPLOYEE */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-500/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">EMPLOYEE</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>View own assigned tasks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>Update task status only</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>View own profile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span className="text-slate-500">Cannot view other users</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">✗</span>
                <span className="text-slate-500">Cannot create/edit tasks</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Implementation Details */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">⚙️ Implementation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Middleware Chain</h4>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs space-y-2">
                <div className="text-slate-300">
                  <div className="text-green-400">// Route with role protection</div>
                  <div>router.get('/users',</div>
                  <div className="ml-4 text-blue-400">authMiddleware, <span className="text-slate-500">// 1. Verify JWT</span></div>
                  <div className="ml-4 text-purple-400">roleMiddleware('ADMIN', 'MANAGER'), <span className="text-slate-500">// 2. Check role</span></div>
                  <div className="ml-4 text-yellow-400">userController.getUsers <span className="text-slate-500">// 3. Handle request</span></div>
                  <div>);</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Employee Task Access</h4>
              <div className="bg-slate-900 rounded-lg p-4 font-mono text-xs space-y-2">
                <div className="text-slate-300">
                  <div className="text-green-400">// Employee sees only own tasks</div>
                  <div>if (req.user.role === 'EMPLOYEE') {'{'}</div>
                  <div className="ml-4 text-blue-400">filters.assignedTo = req.user.id;</div>
                  <div>{'}'}</div>
                  <div className="mt-2 text-green-400">// Employee updates status only</div>
                  <div>if (user.role === 'EMPLOYEE') {'{'}</div>
                  <div className="ml-4 text-blue-400">const allowedFields = ['status'];</div>
                  <div className="ml-4 text-blue-400">updateData = filterFields(data, allowedFields);</div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🛡️ Security Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Role-Based Access Control</p>
                  <p className="text-xs text-slate-400">Middleware checks user role before allowing access</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Data Isolation</p>
                  <p className="text-xs text-slate-400">Employees see only their own tasks</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Field-Level Permissions</p>
                  <p className="text-xs text-slate-400">Employees can only update task status</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Self-Delete Prevention</p>
                  <p className="text-xs text-slate-400">Admins cannot delete their own account</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Input Validation</p>
                  <p className="text-xs text-slate-400">Role values validated against enum</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Clear Error Messages</p>
                  <p className="text-xs text-slate-400">403 Forbidden with role details</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">6</span>
            </div>
            <div>
              <p className="text-sm text-slate-400">Next Step</p>
              <p className="text-white font-semibold">STEP 6 — User Management</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-3 ml-13">
            User CRUD operations, user list, create, update, delete with validation
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
