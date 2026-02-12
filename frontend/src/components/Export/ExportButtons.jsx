import { buildMarkdown, downloadMarkdown, copyMarkdownToClipboard } from '../../utils/exportMarkdown.js'

function ExportButtons({ spec, userStories, tasks, risks }) {
  const handleDownload = () => {
    const markdown = buildMarkdown({ spec, userStories, tasks, risks })
    downloadMarkdown(markdown)
  }

  const handleCopy = async () => {
    const markdown = buildMarkdown({ spec, userStories, tasks, risks })
    await copyMarkdownToClipboard(markdown)
  }

  const disabled =
    !spec?.goal && (!tasks || tasks.length === 0) && (!userStories || userStories.length === 0)

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={disabled}
        className="inline-flex min-w-[150px] items-center justify-center gap-1 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 ring-1 ring-slate-700 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-slate-500"
      >
        Download Markdown
      </button>
      <button
        type="button"
        onClick={handleCopy}
        disabled={disabled}
        className="inline-flex min-w-[150px] items-center justify-center gap-1 rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 ring-1 ring-slate-700 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-900 disabled:text-slate-500"
      >
        Copy to clipboard
      </button>
    </div>
  )
}

export default ExportButtons

