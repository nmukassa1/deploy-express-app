import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './page/Home.tsx'
import Dashboard from './page/Dashboard.tsx'
import { ClerkProvider, SignedIn } from '@clerk/clerk-react'
import ProtectedRoute from './ProtectedRoute.tsx'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,

    children: [
      {
        index: true,
        element: (
            <Home />
        )
      },
      {
        path: 'dashboard',
        element: (
              <ProtectedRoute>
                <SignedIn>
                  <Dashboard />
                </SignedIn>
              </ProtectedRoute>
        )
      }
    ]
  }])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" signInFallbackRedirectUrl="https://nyahmukassa/dashboard" signUpFallbackRedirectUrl="https://nyahmukassa/dashboard" >
      <RouterProvider router={router} />
     </ClerkProvider>
  </StrictMode>,
)
