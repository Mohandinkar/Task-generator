function HistoryPanel({ items, onSelect, onClear }) {
  if (!items || items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-3 text-center text-xs text-slate-400">
        Last 5 specs will appear here so you can quickly reload them.
      </div>
    )
  }

  return (
    <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-xs font-semibold text-slate-100">
            Recent specs
          </h3>
          <p className="text-[11px] text-slate-400">
            Click to reload a previous idea (stored locally).
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="rounded-md bg-slate-900 px-2 py-1 text-[11px] text-slate-300 ring-1 ring-slate-700 hover:bg-slate-800"
        >
          Clear
        </button>
      </div>

      <ul className="space-y-1.5 text-xs">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={() => onSelect(item)}
              className="w-full rounded-md border border-slate-800 bg-slate-950/50 px-2.5 py-1.5 text-left text-slate-200 hover:border-indigo-500 hover:bg-slate-900/80"
            >
              <div className="line-clamp-2 text-[11px] font-medium text-slate-100">
                {item.goal || 'Untitled idea'}
              </div>
              {item.users ? (
                <div className="mt-0.5 line-clamp-1 text-[10px] text-slate-400">
                  Users: {item.users}
                </div>
              ) : null}
              <div className="mt-0.5 text-[10px] text-slate-500">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : 'Saved'}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HistoryPanel

