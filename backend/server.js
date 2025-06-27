const express = require("express")
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const app = express()
const PORT = process.env.PORT || 5000
const JWT_SECRET = "your-secret-key-change-in-production"

// Middleware
app.use(cors())
app.use(express.json())

// Mock Database (In production, use MongoDB, PostgreSQL, etc.)
const users = [
  {
    id: 1,
    username: "Bikky Kakri",
    email: "bikkykarki171@gmail.com",
    password: "$2a$10$8K1p/a0dRTlbfm.8K1p/aOeH4kKk4kKk4kKk4kKk4kKk4kKk4kKk4", // admin123
    role: "admin",
    name: "Administrator",
    createdAt: new Date("2024-01-01"),
    isActive: true,
  },
  {
    id: 2,
    username: "John Doe",
    email: "john.doe@example.com",
    password: "$2a$10$8K1p/a0dRTlbfm.8K1p/aOeH4kKk4kKk4kKk4kKk4kKk4kKk4kKk4", // user123
    role: "client",
    name: "John Doe",
    createdAt: new Date("2024-01-15"),
    isActive: true,
  },
  {
    id: 3,
    username: "Jane Smith",
    email: "jane.smith@example.com",
    password: "$2a$10$8K1p/a0dRTlbfm.8K1p/aOeH4kKk4kKk4kKk4kKk4kKk4kKk4kKk4", // student123
    role: "client",
    name: "Jane Smith",
    createdAt: new Date("2024-02-01"),
    isActive: true,
  },
]

const courses = [
  { id: 1, title: "Advanced Mathematics", instructor: "Dr. Smith", students: 45, status: "active" },
  { id: 2, title: "Physics Fundamentals", instructor: "Prof. Johnson", students: 32, status: "active" },
  { id: 3, title: "Chemistry Basics", instructor: "Dr. Brown", students: 28, status: "inactive" },
]

const supportTickets = [
  { id: 1, userId: 2, subject: "Login Issues", status: "open", priority: "high", createdAt: new Date() },
  { id: 2, userId: 3, subject: "Course Access", status: "resolved", priority: "medium", createdAt: new Date() },
]

const analytics = {
  totalUsers: users.length,
  activeUsers: users.filter((u) => u.isActive).length,
  totalCourses: courses.length,
  activeCourses: courses.filter((c) => c.status === "active").length,
  revenue: 45678,
  activeSessions: 567,
}

// Utility Functions
const generateToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: "24h" })
}

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

const comparePassword = async (password, hashedPassword) => {
  // For demo purposes, we'll use simple comparison
  // In production, use: return await bcrypt.compare(password, hashedPassword);
  const validPasswords = {
    "admin@edusolver.com": "admin123",
    "user@example.com": "user123",
    "student@edusolver.com": "student123",
  }
  return validPasswords[password] || password === "user123" || password === "admin123" || password === "student123"
}

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ message: "Access token required" })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" })
    }
    req.user = user
    next()
  })
}

// Middleware for admin-only routes
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" })
  }
  next()
}

// Middleware for client routes
const requireClient = (req, res, next) => {
  if (req.user.role !== "client") {
    return res.status(403).json({ message: "Client access required" })
  }
  next()
}

// ==================== AUTH ROUTES ====================

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password required" })
    }

    // Find user
    const user = users.find((u) => u.username === username || u.email === username)
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check password
    const isValidPassword = await comparePassword(username, password)
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Generate token
    const token = generateToken(user)

    // Return user data (without password)
    const { password: _, ...userWithoutPassword } = user

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Verify token endpoint
app.get("/api/auth/verify", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id)
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  const { password: _, ...userWithoutPassword } = user
  res.json({ user: userWithoutPassword })
})

// ==================== ADMIN ROUTES ====================

// Get admin dashboard analytics
app.get("/api/admin/analytics", authenticateToken, requireAdmin, (req, res) => {
  res.json({
    analytics: {
      ...analytics,
      recentActivity: [
        { action: "New user registration", details: "john.doe@example.com", timestamp: new Date() },
        { action: "Course updated", details: "Advanced Mathematics", timestamp: new Date(Date.now() - 15 * 60000) },
        { action: "Support ticket resolved", details: "Ticket #1234", timestamp: new Date(Date.now() - 60 * 60000) },
      ],
    },
  })
})

// Get all users (admin only)
app.get("/api/admin/users", authenticateToken, requireAdmin, (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...user }) => user)
  res.json({ users: usersWithoutPasswords })
})

// Create new user (admin only)
app.post("/api/admin/users", authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { username, email, password, role, name } = req.body

    // Validation
    if (!username || !email || !password || !role || !name) {
      return res.status(400).json({ message: "All fields are required" })
    }

    // Check if user already exists
    const existingUser = users.find((u) => u.username === username || u.email === email)
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" })
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: await hashPassword(password),
      role,
      name,
      createdAt: new Date(),
      isActive: true,
    }

    users.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    res.status(201).json({ message: "User created successfully", user: userWithoutPassword })
  } catch (error) {
    console.error("Create user error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Update user (admin only)
app.put("/api/admin/users/:id", authenticateToken, requireAdmin, (req, res) => {
  try {
    const userId = Number.parseInt(req.params.id)
    const { name, email, role, isActive } = req.body

    const userIndex = users.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update user
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
      role: role || users[userIndex].role,
      isActive: isActive !== undefined ? isActive : users[userIndex].isActive,
    }

    const { password: _, ...userWithoutPassword } = users[userIndex]
    res.json({ message: "User updated successfully", user: userWithoutPassword })
  } catch (error) {
    console.error("Update user error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Delete user (admin only)
app.delete("/api/admin/users/:id", authenticateToken, requireAdmin, (req, res) => {
  try {
    const userId = Number.parseInt(req.params.id)
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" })
    }

    // Don't allow deleting admin users
    if (users[userIndex].role === "admin") {
      return res.status(403).json({ message: "Cannot delete admin users" })
    }

    users.splice(userIndex, 1)
    res.json({ message: "User deleted successfully" })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Get all courses (admin only)
app.get("/api/admin/courses", authenticateToken, requireAdmin, (req, res) => {
  res.json({ courses })
})

// Create new course (admin only)
app.post("/api/admin/courses", authenticateToken, requireAdmin, (req, res) => {
  try {
    const { title, instructor, status } = req.body

    if (!title || !instructor) {
      return res.status(400).json({ message: "Title and instructor are required" })
    }

    const newCourse = {
      id: courses.length + 1,
      title,
      instructor,
      students: 0,
      status: status || "active",
    }

    courses.push(newCourse)
    res.status(201).json({ message: "Course created successfully", course: newCourse })
  } catch (error) {
    console.error("Create course error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Get support tickets (admin only)
app.get("/api/admin/tickets", authenticateToken, requireAdmin, (req, res) => {
  const ticketsWithUserInfo = supportTickets.map((ticket) => {
    const user = users.find((u) => u.id === ticket.userId)
    return {
      ...ticket,
      userName: user ? user.name : "Unknown User",
      userEmail: user ? user.email : "Unknown Email",
    }
  })

  res.json({ tickets: ticketsWithUserInfo })
})

// Update support ticket (admin only)
app.put("/api/admin/tickets/:id", authenticateToken, requireAdmin, (req, res) => {
  try {
    const ticketId = Number.parseInt(req.params.id)
    const { status, priority } = req.body

    const ticketIndex = supportTickets.findIndex((t) => t.id === ticketId)
    if (ticketIndex === -1) {
      return res.status(404).json({ message: "Ticket not found" })
    }

    supportTickets[ticketIndex] = {
      ...supportTickets[ticketIndex],
      status: status || supportTickets[ticketIndex].status,
      priority: priority || supportTickets[ticketIndex].priority,
    }

    res.json({ message: "Ticket updated successfully", ticket: supportTickets[ticketIndex] })
  } catch (error) {
    console.error("Update ticket error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// ==================== CLIENT ROUTES ====================

// Get client profile
app.get("/api/client/profile", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id)
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  const { password: _, ...userWithoutPassword } = user
  res.json({ user: userWithoutPassword })
})

// Update client profile
app.put("/api/client/profile", authenticateToken, (req, res) => {
  try {
    const { name, email } = req.body
    const userIndex = users.findIndex((u) => u.id === req.user.id)

    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" })
    }

    // Update user profile
    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
    }

    const { password: _, ...userWithoutPassword } = users[userIndex]
    res.json({ message: "Profile updated successfully", user: userWithoutPassword })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Get client dashboard data
app.get("/api/client/dashboard", authenticateToken, (req, res) => {
  const user = users.find((u) => u.id === req.user.id)
  if (!user) {
    return res.status(404).json({ message: "User not found" })
  }

  // Mock client-specific data
  const dashboardData = {
    user: {
      name: user.name,
      email: user.email,
      joinDate: user.createdAt,
    },
    stats: {
      coursesEnrolled: 3,
      coursesCompleted: 1,
      totalHours: 24,
      certificates: 1,
    },
    recentActivity: [
      { action: "Completed lesson", details: "Mathematics Chapter 5", timestamp: new Date() },
      {
        action: "Started course",
        details: "Physics Fundamentals",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        action: "Earned certificate",
        details: "Basic Chemistry",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    ],
    enrolledCourses: courses.filter((c) => c.status === "active").slice(0, 2),
  }

  res.json({ dashboard: dashboardData })
})

// Get available courses for client
app.get("/api/client/courses", authenticateToken, (req, res) => {
  const availableCourses = courses.filter((c) => c.status === "active")
  res.json({ courses: availableCourses })
})

// Create support ticket (client)
app.post("/api/client/tickets", authenticateToken, (req, res) => {
  try {
    const { subject, description, priority } = req.body

    if (!subject || !description) {
      return res.status(400).json({ message: "Subject and description are required" })
    }

    const newTicket = {
      id: supportTickets.length + 1,
      userId: req.user.id,
      subject,
      description,
      status: "open",
      priority: priority || "medium",
      createdAt: new Date(),
    }

    supportTickets.push(newTicket)
    res.status(201).json({ message: "Support ticket created successfully", ticket: newTicket })
  } catch (error) {
    console.error("Create ticket error:", error)
    res.status(500).json({ message: "Internal server error" })
  }
})

// Get client's support tickets
app.get("/api/client/tickets", authenticateToken, (req, res) => {
  const userTickets = supportTickets.filter((t) => t.userId === req.user.id)
  res.json({ tickets: userTickets })
})

// ==================== GENERAL ROUTES ====================

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() })
})

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "API endpoint not found" })
})

// Error handler
app.use((error, req, res, next) => {
  console.error("Server error:", error)
  res.status(500).json({ message: "Internal server error" })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 Admin Panel API: http://localhost:${PORT}/api/admin/*`)
  console.log(`👤 Client API: http://localhost:${PORT}/api/client/*`)
  console.log(`🔐 Auth API: http://localhost:${PORT}/api/auth/*`)
})

module.exports = app
