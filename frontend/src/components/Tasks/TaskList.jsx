import TaskItem from './TaskItem.jsx'

function TaskList({ tasks, onTaskChange, onReorder, onRemoveTask }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-800 bg-slate-900/40 p-4 text-center text-xs text-slate-400">
        Generated tasks will appear here after you run the generator.
      </div>
    )
  }

  const handleMove = (index, direction) => {
    const newIndex = index + direction
    if (newIndex < 0 || newIndex >= tasks.length) return
    onReorder(index, newIndex)
  }

  const grouped = tasks.reduce((acc, task, index) => {
    const groupName = (task.group || 'General').trim() || 'General'
    if (!acc[groupName]) acc[groupName] = []
    acc[groupName].push({ task, index })
    return acc
  }, {})

  const groupOptions = ['General', 'Frontend', 'Backend', 'Design', 'Testing']

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([groupName, groupTasks]) => (
        <div key={groupName} className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-[11px] font-semibold uppercase tracking-wide text-indigo-300">
              {groupName}
            </h4>
          </div>

          <div className="space-y-2">
            {groupTasks.map(({ task, index }) => (
              <div
                key={task.id ?? `${index}-${task.title ?? 'task'}`}
                className="space-y-1"
              >
                <div className="flex justify-end">
                  <select
                    value={task.group || 'General'}
                    onChange={(event) =>
                      onTaskChange(index, { group: event.target.value })
                    }
                    className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] text-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {groupOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <TaskItem
                  task={task}
                  index={index}
                  onChange={(updated) => onTaskChange(index, updated)}
                  onMoveUp={() => handleMove(index, -1)}
                  onMoveDown={() => handleMove(index, 1)}
                  onRemove={() => onRemoveTask(index)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TaskList


