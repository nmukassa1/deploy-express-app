import { SignedIn, UserButton } from "@clerk/clerk-react"
import { Link, Outlet } from "react-router-dom"

function App() {


  return (
    <main className="min-h-screen bg-[beige]">

      <header className="flex items-center justify-between px-4 py-2">
        <nav className="flex items-center gap-6 justify-center">
          <Link to="/">Home</Link>
          <SignedIn>
            <Link to="/dashboard">Dashboard</Link>
          </SignedIn>
        </nav>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </header>

      <div className="h-full">
        <Outlet />
      </div>
    </main>
  )
}

export default App
