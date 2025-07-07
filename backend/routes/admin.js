const express = require("express")
const router = express.Router()
const { authenticateToken, requireAdmin } = require("../middleware/auth")

// Mock data (in production, use database)
const users = require("../data/users")
const courses = require("../data/courses")
const supportTickets = require("../data/tickets")

// Apply authentication and admin middleware to all routes
router.use(authenticateToken)
router.use(requireAdmin)

// Get admin analytics
router.get("/analytics", (req, res) => {
  const analytics = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.isActive).length,
    totalCourses: courses.length,
    activeCourses: courses.filter((c) => c.status === "active").length,
    revenue: 45678,
    activeSessions: 567,
    recentActivity: [
      {
        action: "New user registration",
        details: "john.doe@example.com",
        timestamp: new Date(),
        type: "user",
      },
      {
        action: "Course updated",
        details: "Advanced Mathematics",
        timestamp: new Date(Date.now() - 15 * 60000),
        type: "course",
      },
      {
        action: "Support ticket resolved",
        details: "Ticket #1234",
        timestamp: new Date(Date.now() - 60 * 60000),
        type: "support",
      },
    ],
  }

  res.json({ success: true, analytics })
})

// User management routes
router.get("/users", (req, res) => {
  const usersWithoutPasswords = users.map(({ password, ...user }) => user)
  res.json({ success: true, users: usersWithoutPasswords })
})

router.post("/users", async (req, res) => {
  try {
    const { username, email, password, role, name } = req.body

    // Validation
    if (!username || !email || !password || !role || !name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      })
    }

    // Check if user exists
    const existingUser = users.find((u) => u.username === username || u.email === email)
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      })
    }

    const newUser = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      username,
      email,
      password: password, // In production, hash this
      role,
      name,
      createdAt: new Date(),
      isActive: true,
    }

    users.push(newUser)

    const { password: _, ...userWithoutPassword } = newUser
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

router.put("/users/:id", (req, res) => {
  try {
    const userId = Number.parseInt(req.params.id)
    const { name, email, role, isActive } = req.body

    const userIndex = users.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    users[userIndex] = {
      ...users[userIndex],
      name: name || users[userIndex].name,
      email: email || users[userIndex].email,
      role: role || users[userIndex].role,
      isActive: isActive !== undefined ? isActive : users[userIndex].isActive,
    }

    const { password: _, ...userWithoutPassword } = users[userIndex]
    res.json({
      success: true,
      message: "User updated successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

router.delete("/users/:id", (req, res) => {
  try {
    const userId = Number.parseInt(req.params.id)
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    if (users[userIndex].role === "admin") {
      return res.status(403).json({
        success: false,
        message: "Cannot delete admin users",
      })
    }

    users.splice(userIndex, 1)
    res.json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Course management routes
router.get("/courses", (req, res) => {
  res.json({ success: true, courses })
})

router.post("/courses", (req, res) => {
  try {
    const { title, instructor, status } = req.body

    if (!title || !instructor) {
      return res.status(400).json({
        success: false,
        message: "Title and instructor are required",
      })
    }

    const newCourse = {
      id: Math.max(...courses.map((c) => c.id)) + 1,
      title,
      instructor,
      students: 0,
      status: status || "active",
      createdAt: new Date(),
    }

    courses.push(newCourse)
    res.status(201).json({
      success: true,
      message: "Course created successfully",
      course: newCourse,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Support ticket management
router.get("/tickets", (req, res) => {
  const ticketsWithUserInfo = supportTickets.map((ticket) => {
    const user = users.find((u) => u.id === ticket.userId)
    return {
      ...ticket,
      userName: user ? user.name : "Unknown User",
      userEmail: user ? user.email : "Unknown Email",
    }
  })

  res.json({ success: true, tickets: ticketsWithUserInfo })
})

router.put("/tickets/:id", (req, res) => {
  try {
    const ticketId = Number.parseInt(req.params.id)
    const { status, priority } = req.body

    const ticketIndex = supportTickets.findIndex((t) => t.id === ticketId)
    if (ticketIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      })
    }

    supportTickets[ticketIndex] = {
      ...supportTickets[ticketIndex],
      status: status || supportTickets[ticketIndex].status,
      priority: priority || supportTickets[ticketIndex].priority,
      updatedAt: new Date(),
    }

    res.json({
      success: true,
      message: "Ticket updated successfully",
      ticket: supportTickets[ticketIndex],
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

module.exports = router
