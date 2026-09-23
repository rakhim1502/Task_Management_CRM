function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Task Management CRM</h1>
          <p className="text-slate-400 text-lg">Step 3 — PostgreSQL + Prisma ORM ✅ Complete</p>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-blue-400 font-medium">3/16 Steps</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all" style={{ width: '18.75%' }}></div>
          </div>
        </div>

        {/* Database Schema */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* User Model */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-white">User Model</h2>
            </div>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">id</span>
                <span className="text-slate-500">Int</span>
                <span className="text-xs text-blue-400 ml-auto">@id @default(autoincrement())</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">name</span>
                <span className="text-slate-500">String</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">email</span>
                <span className="text-slate-500">String</span>
                <span className="text-xs text-blue-400 ml-auto">@unique</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">password</span>
                <span className="text-slate-500">String</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">role</span>
                <span className="text-slate-500">Role</span>
                <span className="text-xs text-blue-400 ml-auto">@default(EMPLOYEE)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">createdTasks</span>
                <span className="text-slate-500">Task[]</span>
                <span className="text-xs text-purple-400 ml-auto">@relation</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">assignedTasks</span>
                <span className="text-slate-500">Task[]</span>
                <span className="text-xs text-purple-400 ml-auto">@relation</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">createdAt</span>
                <span className="text-slate-500">DateTime</span>
                <span className="text-xs text-blue-400 ml-auto">@default(now())</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">updatedAt</span>
                <span className="text-slate-500">DateTime</span>
                <span className="text-xs text-blue-400 ml-auto">@updatedAt</span>
              </div>
            </div>
          </div>

          {/* Task Model */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-white">Task Model</h2>
            </div>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">id</span>
                <span className="text-slate-500">Int</span>
                <span className="text-xs text-blue-400 ml-auto">@id @default(autoincrement())</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">title</span>
                <span className="text-slate-500">String</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">description</span>
                <span className="text-slate-500">String?</span>
                <span className="text-xs text-slate-500 ml-auto">optional</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">status</span>
                <span className="text-slate-500">TaskStatus</span>
                <span className="text-xs text-blue-400 ml-auto">@default(TODO)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">priority</span>
                <span className="text-slate-500">Priority</span>
                <span className="text-xs text-blue-400 ml-auto">@default(MEDIUM)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">dueDate</span>
                <span className="text-slate-500">DateTime?</span>
                <span className="text-xs text-slate-500 ml-auto">optional</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">assignedTo</span>
                <span className="text-slate-500">Int?</span>
                <span className="text-xs text-purple-400 ml-auto">FK → User</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">createdBy</span>
                <span className="text-slate-500">Int</span>
                <span className="text-xs text-purple-400 ml-auto">FK → User</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">createdAt</span>
                <span className="text-slate-500">DateTime</span>
                <span className="text-xs text-blue-400 ml-auto">@default(now())</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-yellow-400">updatedAt</span>
                <span className="text-slate-500">DateTime</span>
                <span className="text-xs text-blue-400 ml-auto">@updatedAt</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enums & Relations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Role Enum */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Role Enum</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span className="text-sm text-slate-300">ADMIN</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="text-sm text-slate-300">MANAGER</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm text-slate-300">EMPLOYEE</span>
              </div>
            </div>
          </div>

          {/* Status Enum */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">TaskStatus Enum</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                <span className="text-sm text-slate-300">TODO</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span className="text-sm text-slate-300">IN_PROGRESS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm text-slate-300">COMPLETED</span>
              </div>
            </div>
          </div>

          {/* Priority Enum */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Priority Enum</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span className="text-sm text-slate-300">LOW</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span className="text-sm text-slate-300">MEDIUM</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                <span className="text-sm text-slate-300">HIGH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Relations Diagram */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔗 Database Relations</h3>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
            <div className="text-slate-300">
              <div className="text-green-400 mb-2">User Model</div>
              <div className="ml-4 text-slate-400">
                <div>├── createdTasks → Task[] <span className="text-purple-400">(1:N)</span></div>
                <div>└── assignedTasks → Task[] <span className="text-purple-400">(1:N)</span></div>
              </div>
              <div className="text-blue-400 mt-4 mb-2">Task Model</div>
              <div className="ml-4 text-slate-400">
                <div>├── assignee → User? <span className="text-purple-400">(N:1, optional)</span></div>
                <div>└── creator → User <span className="text-purple-400">(N:1, required)</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Seed Data */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🌱 Seed Data</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-2">Users (5)</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                  1 Admin
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></span>
                  1 Manager
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  3 Employees
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-400 mb-2">Tasks (10)</h4>
              <ul className="space-y-1 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                  4 TODO tasks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                  3 IN_PROGRESS tasks
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                  3 COMPLETED tasks
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Commands */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Prisma Commands (PowerShell)</h3>
          <div className="space-y-2 font-mono text-sm">
            <div className="bg-slate-900 rounded-lg p-3">
              <span className="text-green-400">$</span> <span className="text-slate-300">cd backend</span>
            </div>
            <div className="bg-slate-900 rounded-lg p-3">
              <span className="text-green-400">$</span> <span className="text-slate-300">npx prisma generate</span>
              <span className="text-slate-500 ml-2"># Generate Prisma Client</span>
            </div>
            <div className="bg-slate-900 rounded-lg p-3">
              <span className="text-green-400">$</span> <span className="text-slate-300">npx prisma migrate dev --name init</span>
              <span className="text-slate-500 ml-2"># Create tables</span>
            </div>
            <div className="bg-slate-900 rounded-lg p-3">
              <span className="text-green-400">$</span> <span className="text-slate-300">npx prisma db seed</span>
              <span className="text-slate-500 ml-2"># Seed data</span>
            </div>
            <div className="bg-slate-900 rounded-lg p-3">
              <span className="text-green-400">$</span> <span className="text-slate-300">npx prisma studio</span>
              <span className="text-slate-500 ml-2"># Visual DB browser</span>
            </div>
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">4</span>
            </div>
            <div>
              <p className="text-sm text-slate-400">Next Step</p>
              <p className="text-white font-semibold">STEP 4 — Authentication</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-3 ml-13">
            Register, Login, bcrypt password hashing, JWT tokens, /me endpoint
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
