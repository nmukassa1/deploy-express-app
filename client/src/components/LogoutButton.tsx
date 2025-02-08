import {  useNavigate,  } from "react-router-dom"
import api from "../lib/api"
import { useAuth } from "../context/AuthProvider"


function LogoutButton() {
    const navigate = useNavigate()

  const {isAuthenticated, setIsAuthenticated} = useAuth()

  async function logout(event: React.FormEvent) {
    event.preventDefault()
    const result = await api.post("/logout")
    if (result.data.success) {
      setIsAuthenticated(false)
      navigate("/")
    }
  }
    return ( 
        <>
            {isAuthenticated && (
                <form onSubmit={logout}>
                <button className="button">Logout</button>
                </form>
            )}
        </>
     );
}

export default LogoutButton;