function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl mb-4 shadow-lg shadow-emerald-500/30">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Task Management CRM</h1>
          <p className="text-slate-400 text-lg">Step 15 — Testing & Final Polish ✅ Complete</p>
          <p className="text-emerald-400 text-sm mt-2 font-medium">🎉 Production Ready!</p>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-emerald-400 font-medium">15/16 Steps</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all" style={{ width: '93.75%' }}></div>
          </div>
        </div>

        {/* Project Summary */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">📊 Project Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-emerald-400 mb-3">Backend (Steps 1-9)</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Project Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Backend Setup (Express, Middleware)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  PostgreSQL + Prisma ORM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Authentication (JWT, bcrypt)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Role-Based Authorization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  User Management API
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Task CRUD API
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Task Filtering & Search
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Dashboard API
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-400 mb-3">Frontend (Steps 10-15)</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  React Frontend Setup
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Authentication UI
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Dashboard UI
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Task Management UI
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  User Management UI
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Testing & Documentation
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">✨ Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2">🔐 Authentication</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• JWT token-based auth</li>
                <li>• bcrypt password hashing</li>
                <li>• Protected routes</li>
                <li>• Auto-redirect on 401</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2">🛡️ Authorization</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• Role-based access (ADMIN, MANAGER, EMPLOYEE)</li>
                <li>• Middleware protection</li>
                <li>• Data isolation</li>
                <li>• Field-level permissions</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2">📊 Dashboard</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• Statistics overview</li>
                <li>• Task charts</li>
                <li>• Recent tasks</li>
                <li>• Employee performance</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2">📝 Task Management</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• CRUD operations</li>
                <li>• Search & filter</li>
                <li>• Pagination</li>
                <li>• Status updates</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2">👥 User Management</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• User CRUD</li>
                <li>• Role management</li>
                <li>• Search & filter</li>
                <li>• Profile management</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-white mb-2">🗄️ Database</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• PostgreSQL</li>
                <li>• Prisma ORM</li>
                <li>• Migrations</li>
                <li>• Seed data</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🛠️ Technology Stack</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Backend</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs font-medium">Node.js</span>
                <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs font-medium">Express.js</span>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium">PostgreSQL</span>
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs font-medium">Prisma ORM</span>
                <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full text-xs font-medium">JWT</span>
                <span className="px-3 py-1 bg-red-600/20 text-red-400 rounded-full text-xs font-medium">bcrypt</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-3">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium">React</span>
                <span className="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-xs font-medium">Vite</span>
                <span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-xs font-medium">TypeScript</span>
                <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs font-medium">React Router</span>
                <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-xs font-medium">Axios</span>
                <span className="px-3 py-1 bg-cyan-600/20 text-cyan-400 rounded-full text-xs font-medium">Tailwind CSS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl p-6 border border-emerald-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">16</span>
            </div>
            <div>
              <p className="text-sm text-slate-400">Final Step</p>
              <p className="text-white font-semibold">STEP 16 — Production Deployment</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-3 ml-13">
            Final bug fixing, optimization, and deployment preparation
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
