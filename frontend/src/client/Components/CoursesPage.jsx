

import { useState } from "react"
import { BookOpen, Clock, Users, Star, Search } from "lucide-react"

const CoursesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const courses = [
    {
      id: 1,
      title: "Advanced Java Programming",
      instructor: "Dr. Smith Johnson",
      duration: "12 weeks",
      students: 245,
      rating: 4.8,
      level: "Advanced",
      category: "programming",
      image: "/placeholder.svg?height=200&width=300",
      description: "Master advanced Java concepts including multithreading, collections, and design patterns.",
      price: "Free",
    },
    {
      id: 2,
      title: "Python for Data Science",
      instructor: "Prof. Sarah Wilson",
      duration: "10 weeks",
      students: 189,
      rating: 4.9,
      level: "Intermediate",
      category: "data-science",
      image: "/placeholder.svg?height=200&width=300",
      description: "Learn Python programming with focus on data analysis and machine learning.",
      price: "Free",
    },
    {
      id: 3,
      title: "Web Development with React",
      instructor: "John Martinez",
      duration: "8 weeks",
      students: 312,
      rating: 4.7,
      level: "Intermediate",
      category: "web-dev",
      image: "/placeholder.svg?height=200&width=300",
      description: "Build modern web applications using React, Redux, and modern JavaScript.",
      price: "Free",
    },
    {
      id: 4,
      title: "Database Management Systems",
      instructor: "Dr. Emily Chen",
      duration: "14 weeks",
      students: 156,
      rating: 4.6,
      level: "Intermediate",
      category: "database",
      image: "/placeholder.svg?height=200&width=300",
      description: "Comprehensive course on SQL, NoSQL, and database design principles.",
      price: "Free",
    },
    {
      id: 5,
      title: "Computer Networks",
      instructor: "Prof. Michael Brown",
      duration: "16 weeks",
      students: 203,
      rating: 4.5,
      level: "Advanced",
      category: "networking",
      image: "/placeholder.svg?height=200&width=300",
      description: "Understanding network protocols, security, and network administration.",
      price: "Free",
    },
    {
      id: 6,
      title: "Mobile App Development",
      instructor: "Lisa Anderson",
      duration: "12 weeks",
      students: 278,
      rating: 4.8,
      level: "Intermediate",
      category: "mobile",
      image: "/placeholder.svg?height=200&width=300",
      description: "Create mobile applications for Android and iOS using React Native.",
      price: "Free",
    },
  ]

  const categories = [
    { id: "all", name: "All Courses", count: courses.length },
    { id: "programming", name: "Programming", count: courses.filter((c) => c.category === "programming").length },
    { id: "web-dev", name: "Web Development", count: courses.filter((c) => c.category === "web-dev").length },
    { id: "data-science", name: "Data Science", count: courses.filter((c) => c.category === "data-science").length },
    { id: "database", name: "Database", count: courses.filter((c) => c.category === "database").length },
    { id: "networking", name: "Networking", count: courses.filter((c) => c.category === "networking").length },
    { id: "mobile", name: "Mobile Dev", count: courses.filter((c) => c.category === "mobile").length },
  ]

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">CSIT Courses</h1>
          <p className="text-gray-600 text-lg">
            Enhance your programming and technical skills with our comprehensive courses
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      course.level === "Beginner"
                        ? "bg-green-100 text-green-800"
                        : course.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {course.level}
                  </span>
                  <span className="text-blue-600 font-bold">{course.price}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">By {course.instructor}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {course.students} students
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {course.rating}
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoursesPage
