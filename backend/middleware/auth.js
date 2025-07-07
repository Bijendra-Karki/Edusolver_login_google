const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token required",
    })
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Invalid or expired token",
      })
    }
    req.user = user
    next()
  })
}

// Admin role middleware
const requireAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    })
  }
  next()
}

// Client role middleware
const requireClient = (req, res, next) => {
  if (req.user.role !== "client") {
    return res.status(403).json({
      success: false,
      message: "Client access required",
    })
  }
  next()
}

module.exports = {
  authenticateToken,
  requireAdmin,
  requireClient,
}
