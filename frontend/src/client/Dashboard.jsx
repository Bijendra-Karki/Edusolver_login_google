
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user data exists in localStorage (from Google login)
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem("user")
    navigate("/login")
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
              {user && <p className="text-gray-600 mt-2">Welcome back, {user.name || user.email}! 👋</p>}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          {/* User Info Card (if logged in with Google) */}
          {user && (
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl mb-6">
              <div className="flex items-center gap-4">
                {user.picture && (
                  <img
                    src={user.picture || "/placeholder.svg"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2 border-white"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold">{user.name}</h3>
                  <p className="opacity-90">{user.email}</p>
                  <p className="text-sm opacity-75">✅ Authenticated with Google</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Welcome!</h3>
              <p className="opacity-90">You have successfully logged in to your dashboard.</p>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Analytics</h3>
              <p className="opacity-90">View your performance metrics and insights.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">Settings</h3>
              <p className="opacity-90">Customize your account preferences.</p>
            </div>
          </div>

          <div className="mt-8 bg-gray-50 p-6 rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                Create New Project
              </button>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200">
                View Reports
              </button>
              <button className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition-colors duration-200">
                Manage Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
