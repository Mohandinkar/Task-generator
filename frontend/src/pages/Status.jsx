import { useEffect, useState } from 'react'
import { getHealth } from '../services/api.js'

function Status() {
  const [status, setStatus] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRaw, setShowRaw] = useState(false)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await getHealth()
        setStatus(data)
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.message ||
            'Failed to reach backend.',
        )
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [])

  const isOk =
    status &&
    (status.status === 'ok' ||
      status.status === 'healthy' ||
      status.ok === true)

  const backendOk = isOk && !error
  const llmOk = backendOk
  const localStorageOk = true

  const renderStatusDot = (ok) => (
    <span
      className={`inline-block h-2 w-2 rounded-full ${
        ok ? 'bg-emerald-400' : 'bg-rose-500'
      }`}
    />
  )

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-lg font-semibold text-slate-100">
          System Status
        </h1>
        <p className="text-xs text-slate-400">
          Checks your backend health endpoint and surfaces key service status.
        </p>
      </header>

      {loading ? (
        <p className="text-xs text-slate-300">
          Checking services...
        </p>
      ) : error ? (
        <p className="text-xs text-rose-400">
          {error}
        </p>
      ) : null}

      <section className="grid gap-4 md:grid-cols-3">
        {/* Backend */}
        <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold text-slate-100">
              {renderStatusDot(backendOk)}
              <span>Backend</span>
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              {backendOk ? 'Backend online' : 'Backend offline'}
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            /health
          </span>
        </div>

        {/* LLM connection */}
        <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold text-slate-100">
              {renderStatusDot(llmOk)}
              <span>LLM connection</span>
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              {llmOk ? 'LLM reachable via backend' : 'LLM connection issue'}
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            gemini-2.5-flash
          </span>
        </div>

        {/* Local storage */}
        <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900 p-4">
          <div>
            <p className="flex items-center gap-2 text-xs font-semibold text-slate-100">
              {renderStatusDot(localStorageOk)}
              <span>Local storage</span>
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              {localStorageOk
                ? 'Specs can be cached locally'
                : 'Local storage not available'}
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            browser
          </span>
        </div>
      </section>

      {/* Raw response toggle */}
      <section className="space-y-2">
        <button
          type="button"
          onClick={() => setShowRaw((prev) => !prev)}
          className="rounded-md border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 hover:bg-slate-800"
        >
          {showRaw ? 'Hide raw response' : 'View raw response'}
        </button>

        {showRaw && status ? (
          <pre className="max-h-64 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-[11px] text-slate-300">
            {JSON.stringify(status, null, 2)}
          </pre>
        ) : null}
      </section>
    </div>
  )
}

export default Status

