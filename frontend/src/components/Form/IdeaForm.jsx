function IdeaForm({ values, onChange, onSubmit, isLoading }) {
  const handleChange = (field) => (event) => {
    onChange(field, event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!values.goal?.trim()) return
    onSubmit()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4 shadow-sm"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">
            Product idea
          </h2>
          <p className="text-xs text-slate-400">
            Describe what you want to build and for whom.
          </p>
        </div>
        <button
          type="submit"
          disabled={isLoading || !values.goal?.trim()}
          className="inline-flex items-center gap-1 rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {isLoading ? 'Generating…' : 'Generate plan'}
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-medium text-slate-300">
            Goal
          </label>
          <textarea
            rows={3}
            value={values.goal}
            onChange={handleChange('goal')}
            placeholder="E.g. Help a small SaaS team plan and track feature delivery for their customers."
            className="w-full rounded-md border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none ring-0 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300">
            Users
          </label>
          <input
            type="text"
            value={values.users}
            onChange={handleChange('users')}
            placeholder="E.g. product managers, engineers, founders"
            className="w-full rounded-md border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none ring-0 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium text-slate-300">
            Constraints
          </label>
          <textarea
            rows={2}
            value={values.constraints}
            onChange={handleChange('constraints')}
            placeholder="E.g. launch in 4 weeks, desktop-only, budget constraints, existing tech stack."
            className="w-full rounded-md border border-slate-800 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 shadow-sm outline-none ring-0 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
    </form>
  )
}

export default IdeaForm

