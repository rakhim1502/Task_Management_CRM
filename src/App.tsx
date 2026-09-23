function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg shadow-green-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Task Management CRM</h1>
          <p className="text-slate-400 text-lg">Step 4 — Authentication ✅ Complete</p>
        </div>

        {/* Progress */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Progress</span>
            <span className="text-sm text-green-400 font-medium">4/16 Steps</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all" style={{ width: '25%' }}></div>
          </div>
        </div>

        {/* Authentication Flow */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔐 Authentication Flow</h3>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <div className="text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-green-400">1.</span>
                <span>Client → POST /api/auth/register</span>
                <span className="text-slate-500 ml-auto">{'{ name, email, password }'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">2.</span>
                <span>Validate input & check email uniqueness</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">3.</span>
                <span>Hash password with bcrypt (10 rounds)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">4.</span>
                <span>Create user in PostgreSQL via Prisma</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">5.</span>
                <span>Generate JWT token (expires in 7 days)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">6.</span>
                <span>Return user + token to client</span>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">7.</span>
                  <span>Client → GET /api/auth/me</span>
                  <span className="text-slate-500 ml-auto">Authorization: Bearer {'<token>'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">8.</span>
                  <span>authMiddleware verifies JWT token</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">9.</span>
                  <span>Find user in database (exclude password)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">10.</span>
                  <span>Attach user to req.user</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Register */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Register</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-400">Method:</span>
                <span className="ml-2 text-green-400 font-mono">POST</span>
              </div>
              <div>
                <span className="text-slate-400">Endpoint:</span>
                <span className="ml-2 text-slate-300 font-mono">/api/auth/register</span>
              </div>
              <div>
                <span className="text-slate-400">Body:</span>
                <div className="mt-1 bg-slate-900 rounded p-2 font-mono text-xs text-slate-300">
                  {'{ name, email, password }'}
                </div>
              </div>
              <div>
                <span className="text-slate-400">Returns:</span>
                <div className="mt-1 bg-slate-900 rounded p-2 font-mono text-xs text-slate-300">
                  {'{ user, token }'}
                </div>
              </div>
            </div>
          </div>

          {/* Login */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7v4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Login</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-400">Method:</span>
                <span className="ml-2 text-green-400 font-mono">POST</span>
              </div>
              <div>
                <span className="text-slate-400">Endpoint:</span>
                <span className="ml-2 text-slate-300 font-mono">/api/auth/login</span>
              </div>
              <div>
                <span className="text-slate-400">Body:</span>
                <div className="mt-1 bg-slate-900 rounded p-2 font-mono text-xs text-slate-300">
                  {'{ email, password }'}
                </div>
              </div>
              <div>
                <span className="text-slate-400">Returns:</span>
                <div className="mt-1 bg-slate-900 rounded p-2 font-mono text-xs text-slate-300">
                  {'{ user, token }'}
                </div>
              </div>
            </div>
          </div>

          {/* Get Me */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Get Me</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-400">Method:</span>
                <span className="ml-2 text-blue-400 font-mono">GET</span>
              </div>
              <div>
                <span className="text-slate-400">Endpoint:</span>
                <span className="ml-2 text-slate-300 font-mono">/api/auth/me</span>
              </div>
              <div>
                <span className="text-slate-400">Auth:</span>
                <div className="mt-1 bg-slate-900 rounded p-2 font-mono text-xs text-slate-300">
                  Bearer {'<token>'}
                </div>
              </div>
              <div>
                <span className="text-slate-400">Returns:</span>
                <div className="mt-1 bg-slate-900 rounded p-2 font-mono text-xs text-slate-300">
                  {'{ user }'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">🛡️ Security Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Bcrypt Password Hashing</p>
                  <p className="text-xs text-slate-400">10 salt rounds for strong encryption</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">JWT Authentication</p>
                  <p className="text-xs text-slate-400">Token expires in 7 days</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Input Validation</p>
                  <p className="text-xs text-slate-400">Email format, password strength, required fields</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Email Normalization</p>
                  <p className="text-xs text-slate-400">Lowercase & trim to prevent duplicates</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Password Never Returned</p>
                  <p className="text-xs text-slate-400">Excluded from all API responses</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-white">Generic Error Messages</p>
                  <p className="text-xs text-slate-400">"Invalid email or password" (no info leakage)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testing */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 mb-6">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Testing Commands (PowerShell)</h3>
          <div className="space-y-2 font-mono text-sm">
            <div className="bg-slate-900 rounded-lg p-3">
              <div className="text-slate-500"># Register new user</div>
              <div className="text-slate-300 mt-1 text-xs break-all">
                <span className="text-green-400">$ </span>
                curl -X POST http://localhost:5000/api/auth/register \
                <br />
                &nbsp;&nbsp;-H &quot;Content-Type: application/json&quot; \
                <br />
                &nbsp;&nbsp;-d &apos;&#123;&quot;name&quot;:&quot;Test&quot;,&quot;email&quot;:&quot;test@test.com&quot;,&quot;password&quot;:&quot;pass123&quot;&#125;&apos;
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-3">
              <div className="text-slate-500"># Login</div>
              <div className="text-slate-300 mt-1 text-xs break-all">
                <span className="text-green-400">$ </span>
                curl -X POST http://localhost:5000/api/auth/login \
                <br />
                &nbsp;&nbsp;-H &quot;Content-Type: application/json&quot; \
                <br />
                &nbsp;&nbsp;-d &apos;&#123;&quot;email&quot;:&quot;admin@crm.com&quot;,&quot;password&quot;:&quot;admin123&quot;&#125;&apos;
              </div>
            </div>
            <div className="bg-slate-900 rounded-lg p-3">
              <div className="text-slate-500"># Get current user (requires token)</div>
              <div className="text-slate-300 mt-1 text-xs break-all">
                <span className="text-green-400">$ </span>
                curl http://localhost:5000/api/auth/me \
                <br />
                &nbsp;&nbsp;-H &quot;Authorization: Bearer YOUR_TOKEN&quot;
              </div>
            </div>
          </div>
        </div>

        {/* Next Step */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-6 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">5</span>
            </div>
            <div>
              <p className="text-sm text-slate-400">Next Step</p>
              <p className="text-white font-semibold">STEP 5 — Role-Based Authorization</p>
            </div>
          </div>
          <p className="text-sm text-slate-300 mt-3 ml-13">
            ADMIN, MANAGER, EMPLOYEE role permissions, roleMiddleware integration
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
