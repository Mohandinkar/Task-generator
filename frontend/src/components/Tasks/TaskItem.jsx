function TaskItem({ task, index, onChange, onMoveUp, onMoveDown, onRemove }) {
  const handleTitleChange = (event) => {
    onChange({ ...task, title: event.target.value })
  }

  const handleDescriptionChange = (event) => {
    onChange({ ...task, description: event.target.value })
  }

  return (
    <div className="flex gap-3 rounded-lg border border-slate-800 bg-slate-900/60 p-3">
      <div className="mt-1 flex flex-col items-center gap-1">
        <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-300">
          {index + 1}
        </span>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            className="h-5 w-5 rounded bg-slate-800 text-[10px] text-slate-300 hover:bg-slate-700"
            aria-label="Move task up"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            className="h-5 w-5 rounded bg-slate-800 text-[10px] text-slate-300 hover:bg-slate-700"
            aria-label="Move task down"
          >
            ↓
          </button>
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <input
          type="text"
          value={task.title || ''}
          onChange={handleTitleChange}
          placeholder="Task title"
          className="w-full rounded-md border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-sm font-medium text-slate-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <textarea
          rows={2}
          value={task.description || ''}
          onChange={handleDescriptionChange}
          placeholder="What needs to be done?"
          className="w-full rounded-md border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 text-xs text-slate-200 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-col items-end justify-between">
        <button
          type="button"
          onClick={onRemove}
          className="h-7 rounded-md bg-rose-950 px-2 text-[11px] font-medium text-rose-200 ring-1 ring-rose-800 hover:bg-rose-900"
        >
          Remove
        </button>
      </div>
    </div>
  )
}

export default TaskItem

