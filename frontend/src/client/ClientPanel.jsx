"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BookOpen, Trophy, Clock, User, LogOut, Sparkles } from "lucide-react"
import { Link } from "react-router-dom";
import Logo2 from "../assets/Img/Logo2.png"
import Button from "../components/button"
import SearchBar from "../components/Searchbar";


export default function clientPanel() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
    } else {
      navigate("/login")
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">

              <div className="flex items-center space-x-2">
                <img src={Logo2} alt="EduSolver Logo" className="w-16 h-16 rounded-full object-cover" />
                <div className="flex flex-col items-start">
                  <span className="text-2xl font-bold text-white">EduSolver</span>
                  <span className="text-white">Welcome, {user.name}</span>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/feed" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
              Feed
            </Link>
            <Link to="/about" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
              About
            </Link>
            <Link to="/service" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
              Services
            </Link>
            <Link to="/contact" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
              Contact
            </Link>
            <Link to="/courses" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
              Courses
            </Link>
            <Link to="/test" className="text-white hover:bg-white px-4 py-2 rounded transition-colors duration-200">
              Test
            </Link>
            <SearchBar/>
           



          </nav>

            <div className="flex items-center gap-4">
              

              <Button label="Logout" onClick={handleLogout} icon={<LogOut size={16} />} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Cards */}
          <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Courses Enrolled</p>
                <p className="text-2xl font-bold text-gray-800">5</p>
              </div>
            </div>
            <div className="w-full bg-blue-100 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Achievements</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>
            <div className="w-full bg-yellow-100 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "80%" }}></div>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Study Hours</p>
                <p className="text-2xl font-bold text-gray-800">24</p>
              </div>
            </div>
            <div className="w-full bg-green-100 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
        </div>

        {/* Recent Courses */}
        <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-all duration-300 border border-blue-100">
              <h3 className="text-gray-800 font-semibold mb-2">Data Structures</h3>
              <p className="text-gray-600 text-sm mb-3">Progress: 75%</p>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 hover:bg-green-100 transition-all duration-300 border border-green-100">
              <h3 className="text-gray-800 font-semibold mb-2">Database Systems</h3>
              <p className="text-gray-600 text-sm mb-3">Progress: 45%</p>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 hover:bg-yellow-100 transition-all duration-300 border border-yellow-100">
              <h3 className="text-gray-800 font-semibold mb-2">Computer Networks</h3>
              <p className="text-gray-600 text-sm mb-3">Progress: 90%</p>
              <div className="w-full bg-yellow-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "90%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 text-gray-800 border border-blue-100">
                Browse Courses
              </button>
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 text-gray-800 border border-blue-100">
               Hire Personal Guide 
              </button>
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 text-gray-800 border border-blue-100">
                Check Progress
              </button>
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 text-gray-800 border border-blue-100">
                View Assignments
              </button>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Profile</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold">{user.name}</p>
                <p className="text-gray-600 text-sm">{user.email}</p>
                <p className="text-blue-600 text-sm capitalize">{user.role}</p>
              </div>
            </div>
            <button className="w-full p-5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 text-gray-800 border border-blue-100">
              Edit Profile
            </button>
            <button className="w-full mt-4 p-5 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 text-gray-800 border border-blue-100">
              Subscription Details
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
