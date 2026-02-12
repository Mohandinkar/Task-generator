import { Link, NavLink } from 'react-router-dom'

function Header() {
  const baseLinkClasses =
    'px-3 py-1.5 text-sm font-medium rounded-md transition-colors'

  return (
    <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="rounded bg-indigo-600 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white">
            Tasks
          </span>
          <span className="text-sm font-semibold text-slate-100">
            Generator
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLinkClasses} ${
                isActive
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/status"
            className={({ isActive }) =>
              `${baseLinkClasses} ${
                isActive
                  ? 'bg-emerald-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            Status
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header

