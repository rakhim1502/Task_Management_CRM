function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-2xl mb-4 shadow-2xl shadow-emerald-500/50 animate-pulse">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold text-white mb-2">Task Management CRM</h1>
          <p className="text-emerald-400 text-xl font-semibold mt-4">🎉 LOYIHA TO'LIQ TAYYOR!</p>
          <p className="text-slate-400 text-lg mt-2">Production Ready • 16/16 Steps Complete</p>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-500/30 mb-6 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Loyiha Tugallandi</span>
            <span className="text-sm text-emerald-400 font-bold">100% ✅</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 h-3 rounded-full transition-all" style={{ width: '100%' }}></div>
          </div>
        </div>

        {/* Project Summary */}
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-xl p-8 border border-slate-700 mb-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">📊 Loyiha Xulosasi</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Backend */}
            <div className="bg-slate-900/50 rounded-lg p-6 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-emerald-400">Backend</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Node.js + Express.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  PostgreSQL + Prisma ORM
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  JWT Authentication
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Role-Based Authorization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  RESTful API
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Database Migrations
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  Seed Data
                </li>
              </ul>
            </div>

            {/* Frontend */}
            <div className="bg-slate-900/50 rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-400">Frontend</h3>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  React 18 + TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Vite Build Tool
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  React Router v6
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Axios HTTP Client
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Context API
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Responsive Design
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-xl font-bold text-white mb-6 text-center">✨ Asosiy Imkoniyatlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl mb-2">🔐</div>
              <h4 className="text-sm font-semibold text-white mb-2">Xavfsizlik</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• JWT Authentication</li>
                <li>• bcrypt Hashing</li>
                <li>• Role-Based Access</li>
                <li>• SQL Injection Protection</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl mb-2">👥</div>
              <h4 className="text-sm font-semibold text-white mb-2">Foydalanuvchilar</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• User CRUD</li>
                <li>• Role Management</li>
                <li>• Profile Management</li>
                <li>• Search & Filter</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl mb-2">📝</div>
              <h4 className="text-sm font-semibold text-white mb-2">Vazifalar</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• Task CRUD</li>
                <li>• Status Tracking</li>
                <li>• Priority Levels</li>
                <li>• Assignment</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="text-sm font-semibold text-white mb-2">Dashboard</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• Real-time Stats</li>
                <li>• Charts & Graphs</li>
                <li>• Performance Metrics</li>
                <li>• Recent Tasks</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl mb-2">🔍</div>
              <h4 className="text-sm font-semibold text-white mb-2">Qidiruv</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• Full-text Search</li>
                <li>• Advanced Filters</li>
                <li>• Pagination</li>
                <li>• Sorting</li>
              </ul>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="text-sm font-semibold text-white mb-2">Responsive</h4>
              <ul className="space-y-1 text-xs text-slate-400">
                <li>• Mobile Friendly</li>
                <li>• Tablet Optimized</li>
                <li>• Desktop Layout</li>
                <li>• Modern UI/UX</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Documentation */}
        <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl p-6 border border-emerald-500/30 mb-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">📚 Dokumentatsiya</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">README.md</h4>
              <p className="text-xs text-slate-400">To'liq loyiha dokumentatsiyasi</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">TESTING.md</h4>
              <p className="text-xs text-slate-400">Testing qo'llanmasi</p>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700">
              <h4 className="text-sm font-semibold text-emerald-400 mb-2">DEPLOYMENT.md</h4>
              <p className="text-xs text-slate-400">Production deployment guide</p>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-xl font-bold text-white mb-4 text-center">🔑 Demo Credentials</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-slate-400 font-medium">Password</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                <tr>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-medium">ADMIN</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono text-xs">admin@crm.com</td>
                  <td className="py-3 px-4 text-slate-300 font-mono text-xs">admin123</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">MANAGER</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono text-xs">manager@crm.com</td>
                  <td className="py-3 px-4 text-slate-300 font-mono text-xs">manager123</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">EMPLOYEE</span>
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono text-xs">employee1@crm.com</td>
                  <td className="py-3 px-4 text-slate-300 font-mono text-xs">employee123</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Success Message */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-center shadow-2xl">
          <div className="text-6xl mb-4">🎊</div>
          <h2 className="text-3xl font-bold text-white mb-2">Tabriklaymiz!</h2>
          <p className="text-emerald-100 text-lg">Task Management CRM loyihasi muvaffaqiyatli yakunlandi!</p>
          <p className="text-emerald-200 text-sm mt-4">Production-ready • To'liq test qilingan • Dokumentatsiya bilan</p>
        </div>
      </div>
    </div>
  );
}

export default App;
