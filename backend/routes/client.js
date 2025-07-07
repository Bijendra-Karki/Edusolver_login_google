const express = require("express")
const router = express.Router()
const { authenticateToken } = require("../middleware/auth")

// Mock data
const users = require("../data/users")
const courses = require("../data/courses")
const supportTickets = require("../data/tickets")

// Apply authentication to all routes
router.use(authenticateToken)

// Get client profile
router.get("/profile", (req, res) => {
  const user = users.find((u) => u.id === req.user.id)
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    })
  }

  const { password: _, ...userWithoutPassword } = user
  res.json({ success: true, user: userWithoutPassword })
})

// Update client profile
router.put("/profile", (req, res) => {
  try {
    const { name, email } = req.body
    const userIndex = users.findIndex((u) => u.id === req.user.id)

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
      updatedAt: new Date(),
    }

    const { password: _, ...userWithoutPassword } = users[userIndex]
    res.json({
      success: true,
      message: "Profile updated successfully",
      user: userWithoutPassword,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Get client dashboard data
router.get("/dashboard", (req, res) => {
  const user = users.find((u) => u.id === req.user.id)
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    })
  }

  const dashboardData = {
    user: {
      name: user.name,
      email: user.email,
      joinDate: user.createdAt,
      picture: user.picture || null,
    },
    stats: {
      coursesEnrolled: 3,
      coursesCompleted: 1,
      totalHours: 24,
      certificates: 1,
      currentStreak: 7,
    },
    recentActivity: [
      {
        action: "Completed lesson",
        details: "Mathematics Chapter 5",
        timestamp: new Date(),
        type: "achievement",
      },
      {
        action: "Started course",
        details: "Physics Fundamentals",
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        type: "enrollment",
      },
      {
        action: "Earned certificate",
        details: "Basic Chemistry",
        timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        type: "certificate",
      },
    ],
    enrolledCourses: courses.filter((c) => c.status === "active").slice(0, 3),
    upcomingDeadlines: [
      {
        course: "Advanced Mathematics",
        assignment: "Final Project",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        course: "Physics Fundamentals",
        assignment: "Lab Report",
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      },
    ],
  }

  res.json({ success: true, dashboard: dashboardData })
})

// Get available courses
router.get("/courses", (req, res) => {
  const availableCourses = courses.filter((c) => c.status === "active")
  res.json({ success: true, courses: availableCourses })
})

// Enroll in course
router.post("/courses/:id/enroll", (req, res) => {
  try {
    const courseId = Number.parseInt(req.params.id)
    const course = courses.find((c) => c.id === courseId)

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      })
    }

    if (course.status !== "active") {
      return res.status(400).json({
        success: false,
        message: "Course is not available for enrollment",
      })
    }

    // In a real app, you'd check if user is already enrolled
    course.students += 1

    res.json({
      success: true,
      message: "Successfully enrolled in course",
      course,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Create support ticket
router.post("/tickets", (req, res) => {
  try {
    const { subject, description, priority } = req.body

    if (!subject || !description) {
      return res.status(400).json({
        success: false,
        message: "Subject and description are required",
      })
    }

    const newTicket = {
      id: Math.max(...supportTickets.map((t) => t.id)) + 1,
      userId: req.user.id,
      subject,
      description,
      status: "open",
      priority: priority || "medium",
      createdAt: new Date(),
    }

    supportTickets.push(newTicket)
    res.status(201).json({
      success: true,
      message: "Support ticket created successfully",
      ticket: newTicket,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    })
  }
})

// Get client's support tickets
router.get("/tickets", (req, res) => {
  const userTickets = supportTickets.filter((t) => t.userId === req.user.id)
  res.json({ success: true, tickets: userTickets })
})

module.exports = router
