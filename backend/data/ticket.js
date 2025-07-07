// Mock support ticket data
const supportTickets = [
  {
    id: 1,
    userId: 2,
    subject: "Login Issues",
    description: "Cannot access my account after password reset",
    status: "open",
    priority: "high",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 2,
    userId: 3,
    subject: "Course Access",
    description: "Unable to access enrolled course materials",
    status: "resolved",
    priority: "medium",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  },
  {
    id: 3,
    userId: 4,
    subject: "Payment Issue",
    description: "Payment was deducted but course not unlocked",
    status: "in-progress",
    priority: "high",
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
]

module.exports = supportTickets
