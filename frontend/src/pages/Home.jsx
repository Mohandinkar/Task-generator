import { useEffect, useState } from 'react'
import IdeaForm from '../components/Form/IdeaForm.jsx'
import TaskList from '../components/Tasks/TaskList.jsx'
import HistoryPanel from '../components/History/HistoryPanel.jsx'
import ExportButtons from '../components/Export/ExportButtons.jsx'
import { generateTasks } from '../services/api.js'

const HISTORY_KEY = 'tasks-generator-history'
const EMPTY_SPEC = {
  goal: '',
  users: '',
  constraints: '',
}

function createEmptyTask(index) {
  return {
    id: `manual-${Date.now()}-${index}-${Math.random().toString(36).slice(2, 7)}`,
    title: '',
    description: '',
    group: 'General',
  }
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  } catch {
    console.error('Error saving history:', error)
  }
}

function Home() {
  const [spec, setSpec] = useState(EMPTY_SPEC)
  const [userStories, setUserStories] = useState([])
  const [tasks, setTasks] = useState([
    createEmptyTask(0),
    createEmptyTask(1),
    createEmptyTask(2),
  ])
  const [risks, setRisks] = useState([])
  const [history, setHistory] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setHistory(loadHistory())
  }, [])

  const handleSpecChange = (field, value) => {
    setSpec((prev) => ({ ...prev, [field]: value }))
  }

  const pushToHistory = (nextSpec, nextResult) => {
    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
      ...nextSpec,
      result: nextResult,
    }
    const nextHistory = [entry, ...history].slice(0, 5)
    setHistory(nextHistory)
    saveHistory(nextHistory)
  }

  const handleGenerate = async () => {
    setIsLoading(true)
    setError('')
    try {
      const payload = {
        goal: spec.goal,
        users: spec.users,
        constraints: spec.constraints,
      }
      const result = await generateTasks(payload)

      const nextUserStories = result.userStories || result.user_stories || []
      const nextTasks = (result.tasks || [])
        .slice(0, 6)
        .map((task, index) => {
        const baseId = `${Date.now()}-${index}`

        if (typeof task === 'string') {
          return {
            id: baseId,
            title: task,
            description: task,
            group: 'General',
          }
        }

        return {
          id: task.id ?? baseId,
          title: task.title || task.name || `Task ${index + 1}`,
          description: task.description || task.details || '',
          group: task.group || 'General',
        }
      })
      const nextRisks = result.risks || []

      setUserStories(nextUserStories)
      setTasks(nextTasks)
      setRisks(nextRisks)

      pushToHistory(payload, {
        userStories: nextUserStories,
        tasks: nextTasks,
        risks: nextRisks,
      })
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to generate tasks. Please try again.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleHistorySelect = (item) => {
    setSpec({
      goal: item.goal || '',
      users: item.users || '',
      constraints: item.constraints || '',
    })

    if (item.result) {
      setUserStories(item.result.userStories || [])
      setTasks(item.result.tasks || [])
      setRisks(item.result.risks || [])
    }
  }

  const handleHistoryClear = () => {
    setHistory([])
    saveHistory([])
  }

  const handleTaskChange = (index, updatedTask) => {
    setTasks((prev) => {
      const copy = [...prev]
      copy[index] = { ...copy[index], ...updatedTask }
      return copy
    })
  }

  const handleReorder = (fromIndex, toIndex) => {
    setTasks((prev) => {
      const copy = [...prev]
      const [moved] = copy.splice(fromIndex, 1)
      copy.splice(toIndex, 0, moved)
      return copy
    })
  }

  const handleAddTask = () => {
    setTasks((prev) => [...prev, createEmptyTask(prev.length)])
  }

  const handleRemoveTask = (index) => {
    setTasks((prev) => {
      if (prev.length <= 1) return prev
      const copy = [...prev]
      copy.splice(index, 1)
      return copy
    })
  }

  const hasResults =
    (userStories && userStories.length > 0) ||
    (risks && risks.length > 0)

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 space-y-6">
      
      <section>
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-slate-50">
                Tasks Generator
              </h1>
              <p className="max-w-2xl text-sm text-slate-400">
                Turn a product idea into user stories, engineering tasks, and
                risks instantly. Built for product-minded developers and tech
                teams who want to move from idea to execution faster.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300">
                AI powered
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200">
                Editable tasks
              </span>
              <span className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-200">
                Export markdown
              </span>
            </div>
          </div>
        </div>
        {/* <div className="h-px bg-slate-800 my-6" /> */}
      </section>

      
      <section className="rounded-lg border border-slate-800 bg-slate-900 p-5 shadow-md">
        <div className="mb-4 space-y-1">
          <h2 className="text-sm font-semibold text-slate-100">
            Describe your product idea
          </h2>
          <p className="text-xs text-slate-400">
            Capture the goal, who it&apos;s for, and any constraints so the
            AI can generate a realistic plan.
          </p>
        </div>
        <IdeaForm
          values={spec}
          onChange={handleSpecChange}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />
        {error ? (
          <p className="mt-3 text-xs text-rose-400">
            {error}
          </p>
        ) : null}
        {isLoading ? (
          <p className="mt-2 text-xs text-slate-400">
            Generating tasks with AI...
          </p>
        ) : null}
      </section>

      {/* Row 1: Generated plan (left) + Recent specs (right) */}
      <section className="grid items-start gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-100">
                Generated Plan
              </h2>
              <p className="text-xs text-slate-400">
                High-level view of the plan generated from your idea.
              </p>
            </div>
            <ExportButtons
              spec={spec}
              userStories={userStories}
              tasks={tasks}
              risks={risks}
            />
          </div>

          {hasResults ? (
            <div className="space-y-4">
              {userStories?.length ? (
                <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-950 p-4">
                  <h3 className="text-xs font-semibold text-slate-100">
                    User Stories
                  </h3>
                  <ul className="list-disc space-y-1.5 pl-4 text-xs text-slate-200">
                    {userStories.map((story, index) => (
                      <li key={index}>
                        {typeof story === 'string'
                          ? story
                          : story.title || JSON.stringify(story)}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  Generate a plan to see user stories here.
                </p>
              )}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500">
              Generate a plan to see user stories, tasks, and risks.
            </div>
          )}
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Recent Specs
              </h2>
              <p className="text-[11px] text-slate-500">
                Quickly reload previous ideas you have explored.
              </p>
            </div>
          </div>
          <HistoryPanel
            items={history}
            onSelect={handleHistorySelect}
            onClear={handleHistoryClear}
          />
        </div>
      </section>

      {/* Row 2: Tasks (left) + Risks (right) */}
      <section className="grid items-start gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3 flex items-center justify-between gap-2">
            <div>
              <h3 className="text-xs font-semibold text-slate-100">
                Tasks
              </h3>
              <p className="text-[11px] text-slate-400">
                Edit, reorder, add, or remove tasks before execution.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddTask}
              className="rounded-lg bg-indigo-500 px-3 py-1 text-[11px] font-medium text-white shadow-sm transition hover:bg-indigo-600"
            >
              Add task
            </button>
          </div>
          <TaskList
            tasks={tasks}
            onTaskChange={handleTaskChange}
            onReorder={handleReorder}
            onRemoveTask={handleRemoveTask}
          />
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3">
            <h3 className="text-xs font-semibold text-slate-100">
              Risks
            </h3>
            <p className="text-[11px] text-slate-400">
              Capture constraints, unknowns, and potential blockers.
            </p>
          </div>
          {risks?.length ? (
            <ul className="list-disc space-y-1.5 pl-4 text-xs text-slate-200">
              {risks.map((risk, index) => (
                <li key={index}>
                  {typeof risk === 'string'
                    ? risk
                    : risk.title || JSON.stringify(risk)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500">
              Generate a plan to see risks here.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Home

