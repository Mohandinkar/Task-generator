import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Home from './pages/Home.jsx'
import Status from './pages/Status.jsx'
import Header from './components/Layout/Header.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950 text-slate-100">
        <Header />
        <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pb-10 pt-4">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<Home />} />
            <Route path="/status" element={<Status />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
