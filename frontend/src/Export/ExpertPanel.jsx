"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  BookOpen,
  MessageSquare,
  PlusCircle,
  LogOut,
  GraduationCap,
  Star,
  Send,
  Eye,
  Edit3,
  User
} from "lucide-react";

import Logo2 from "../assets/Img/Logo2.png";
import Button from "../components/button";

export default function ExpertPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("students");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [suggestion, setSuggestion] = useState("");
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "article"
  });

  // Mock data
  const [students] = useState([
    {
      id: 1,
      name: "Nirajan Shrestha",
      email: "nirajan@student.com",
      subjects: ["Data Structures", "Algorithms"],
      progress: 75,
      lastActive: "2 hours ago",
      strengths: ["Arrays", "Sorting Algorithms"],
      weaknesses: ["Trees", "Graph Algorithms"],
      recentScores: [85, 78, 92, 67, 89]
    },
    {
      id: 2,
      name: "Sujata Karki",
      email: "sujata@student.com",
      subjects: ["Database Systems"],
      progress: 60,
      lastActive: "1 day ago",
      strengths: ["SQL Basics", "Normalization"],
      weaknesses: ["Indexing", "Query Optimization"],
      recentScores: [72, 65, 78, 55, 70]
    },
    {
      id: 3,
      name: "Prakash Thapa",
      email: "prakash@student.com",
      subjects: ["Computer Networks"],
      progress: 88,
      lastActive: "30 minutes ago",
      strengths: ["OSI Model", "Network Protocols"],
      weaknesses: ["Subnetting"],
      recentScores: [90, 85, 92, 88, 94]
    }
  ]);

  const [suggestions] = useState([
    {
      id: 1,
      studentId: 1,
      studentName: "Nirajan Shrestha",
      message:
        "Focus more on implementing tree data structures. Try building a binary search tree from scratch.",
      date: "2025-05-20",
      status: "sent"
    },
    {
      id: 2,
      studentId: 2,
      studentName: "Sujata Karki",
      message:
        "Great progress in SQL! Consider practicing complex JOIN queries and optimizing indexes.",
      date: "2025-05-18",
      status: "read"
    }
  ]);

  const [resources] = useState([
    {
      id: 1,
      title: "Data Structures and Algorithms Guide",
      description:
        "Comprehensive guide covering arrays, linked lists, trees, and sorting algorithms.",
      type: "document",
      downloads: 58,
      rating: 4.9
    },
    {
      id: 2,
      title: "Relational Database Design",
      description:
        "Video tutorial on designing efficient relational databases with practical examples.",
      type: "video",
      downloads: 41,
      rating: 4.7
    }
  ]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (parsedUser.role !== "expert") {
        navigate("/dashboard");
        return;
      }
      setUser(parsedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSendSuggestion = () => {
    if (selectedStudent && suggestion.trim()) {
      console.log(
        "Sending suggestion to:",
        selectedStudent.name,
        "Message:",
        suggestion
      );
      setSuggestion("");
      setSelectedStudent(null);
      alert("Suggestion sent successfully!");
    }
  };

  const handleAddResource = () => {
    if (newResource.title.trim() && newResource.description.trim()) {
      console.log("Adding resource:", newResource);
      setNewResource({ title: "", description: "", type: "article" });
      alert("Resource added successfully!");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="w-8 h-8 border-4 border-blue-600/30 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 backdrop-blur-sm border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <img
                  src={Logo2}
                  alt="EduSolver Logo"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <span className="text-2xl font-bold text-white">EduSolver</span>

              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-white">Welcome, {user.name}</span>
              <Button
                label="Logout"
                onClick={handleLogout}
                icon={<LogOut size={16} />}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("students")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "students"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-blue-50 border border-blue-100"
              }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            My Students
          </button>
          <button
            onClick={() => setActiveTab("suggestions")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "suggestions"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-blue-50 border border-blue-100"
              }`}
          >
            <MessageSquare className="w-5 h-5 inline mr-2" />
            Suggestions
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "resources"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-blue-50 border border-blue-100"
              }`}
          >
            <BookOpen className="w-5 h-5 inline mr-2" />
            Resources
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${activeTab === "profile"
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-600 hover:bg-blue-50 border border-blue-100"
              }`}
          >
            <Users className="w-5 h-5 inline mr-2" />
            Profile
          </button>
        </div>

        {/* Students Tab */}
        {activeTab === "students" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div
                  key={student.id}
                  className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-gray-800 font-semibold">{student.name}</h3>
                      <p className="text-gray-600 text-sm">{student.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-gray-600 text-sm mb-1">Progress</p>
                      <div className="w-full bg-blue-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${student.progress}%` }}></div>
                      </div>
                      <p className="text-gray-800 text-sm mt-1">{student.progress}%</p>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm mb-1">Subjects</p>
                      <div className="flex flex-wrap gap-1">
                        {student.subjects.map((subject, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm mb-1">Strengths</p>
                      <div className="flex flex-wrap gap-1">
                        {student.strengths.map((strength, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            {strength}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm mb-1">Areas to Improve</p>
                      <div className="flex flex-wrap gap-1">
                        {student.weaknesses.map((weakness, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                            {weakness}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg text-sm transition-all duration-300"
                      >
                        <MessageSquare className="w-4 h-4 inline mr-1" />
                        Send Suggestion
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg text-sm transition-all duration-300">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions Tab */}
        {activeTab === "suggestions" && (
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Suggestions</h2>
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-gray-800 font-semibold">{suggestion.studentName}</h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs rounded ${suggestion.status === "read"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {suggestion.status}
                        </span>
                        <span className="text-gray-500 text-sm">{suggestion.date}</span>
                      </div>
                    </div>
                    <p className="text-gray-700">{suggestion.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div className="space-y-6">
            {/* Add New Resource */}
            <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Resource</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Resource Title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
                <select
                  value={newResource.type}
                  onChange={(e) => setNewResource({ ...newResource, type: e.target.value })}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="article">Article</option>
                  <option value="video">Video</option>
                  <option value="document">Document</option>
                  <option value="quiz">Quiz</option>
                </select>
              </div>
              <textarea
                placeholder="Resource Description"
                value={newResource.description}
                onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 mb-4"
              />
              <button
                onClick={handleAddResource}
                className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-3 rounded-lg transition-all duration-300"
              >
                <PlusCircle className="w-5 h-5 inline mr-2" />
                Add Resource
              </button>
            </div>

            {/* Existing Resources */}
            <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">My Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-gray-800 font-semibold">{resource.title}</h3>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">{resource.type}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{resource.downloads} downloads</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>{resource.rating}</span>
                        </div>
                      </div>
                      <button className="text-gray-600 hover:text-gray-800">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm border border-blue-100 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Profile</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <p className="text-gray-600 text-sm">
                    Expertise: {user.expertise?.join(", ") || "General"}
                  </p>
                  <p className="text-blue-600 text-sm capitalize">{user.role}</p>
                </div>
              </div>
              <button className="w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all duration-300 text-gray-800 border border-blue-100">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>


    </div>
  );
}
