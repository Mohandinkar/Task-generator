export function buildMarkdown({ spec, userStories = [], tasks = [], risks = [] }) {
  const { goal, users, constraints } = spec || {}

  const lines = []
  lines.push(`# Tasks Generator Plan`)
  lines.push('')

  if (goal) {
    lines.push('## Goal')
    lines.push('')
    lines.push(goal)
    lines.push('')
  }

  if (users) {
    lines.push('## Users')
    lines.push('')
    lines.push(users)
    lines.push('')
  }

  if (constraints) {
    lines.push('## Constraints')
    lines.push('')
    lines.push(constraints)
    lines.push('')
  }

  if (userStories.length) {
    lines.push('## User stories')
    lines.push('')
    userStories.forEach((story) => {
      if (typeof story === 'string') {
        lines.push(`- ${story}`)
      } else if (story?.title) {
        lines.push(`- ${story.title}`)
      }
    })
    lines.push('')
  }

  if (tasks.length) {
    const grouped = tasks.reduce((acc, task, index) => {
      const groupName =
        (task.group || task.Group || 'General').toString().trim() || 'General'
      if (!acc[groupName]) acc[groupName] = []
      acc[groupName].push({ task, index })
      return acc
    }, {})

    Object.entries(grouped).forEach(([groupName, groupTasks]) => {
      lines.push(`## ${groupName}`)
      lines.push('')

      groupTasks.forEach(({ task, index }) => {
        const title = task.title || task.name || `Task ${index + 1}`
        const description = task.description || task.details || ''
        lines.push(`- **${title}**`)
        if (description) {
          lines.push(`  - ${description}`)
        }
      })

      lines.push('')
    })
  }

  if (risks.length) {
    lines.push('## Risks')
    lines.push('')
    risks.forEach((risk) => {
      if (typeof risk === 'string') {
        lines.push(`- ${risk}`)
      } else if (risk?.title) {
        lines.push(`- ${risk.title}`)
      }
    })
    lines.push('')
  }

  return lines.join('\n')
}

export function downloadMarkdown(markdown, filename = 'tasks-plan.md') {
  const blob = new Blob([markdown], { type: 'text/markdown' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

export async function copyMarkdownToClipboard(markdown) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    await navigator.clipboard.writeText(markdown)
    return
  }

  // Fallback
  const textarea = document.createElement('textarea')
  textarea.value = markdown
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
}

