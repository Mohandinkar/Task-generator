import { useNavigate } from 'react-router-dom'

function Landing() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/app')
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6">
      <section className="space-y-4">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold text-slate-50">
          Tasks Generator
          </h1>
          <p className="text-sm text-slate-400">
            Turn a product idea into user stories, engineering tasks, and risks.
          </p>
        </header>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-slate-100">
            How it works
          </h2>
          <ol className="space-y-1.5 text-sm text-slate-200">
            <li>1. Enter your product idea</li>
            <li>2. Generate tasks and user stories</li>
            <li>3. Edit, reorder, and group tasks</li>
            <li>4. Export your plan</li>
          </ol>
          <button
            type="button"
            onClick={handleGetStarted}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Get Started
          </button>
        </div>
      </section>
    </div>
  )
}

export default Landing

