// Simple admin configuration for frontend validation
export const adminConfig = {
  // List of admin accounts (usernames or emails)
  adminAccounts: [
    "admin@edusolver.com",
    "administrator",
    "admin123",
    "superadmin",
    "admin@company.com",
    "admin",
    // Add more admin identifiers as needed
  ],

  // Routes
  adminRoute: "/AdminPanel",
  clientRoute: "/dashboard",

  // Function to check if user is admin
  isAdmin: (userIdentifier, userRole = null) => {
    const normalizedIdentifier = userIdentifier.toLowerCase().trim()
    return adminConfig.adminAccounts.includes(normalizedIdentifier) || userRole === "admin"
  },

  // Get route based on role
  getRouteForRole: (userIdentifier, userRole = null) => {
    return adminConfig.isAdmin(userIdentifier, userRole) ? adminConfig.adminRoute : adminConfig.clientRoute
  },
}
