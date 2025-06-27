// Mock user data
const users = [
  {
    id: 1,
    username: "Bikky kakri",
    email: "bikkykarki171@gmail.com",
    password: "admin123", // In production, this should be hashed
    role: "admin",
    name: "Administrator",
    createdAt: new Date("2024-01-01"),
    isActive: true,
  },
  {
    id: 2,
    username: "John Doe",
    email: "johndoe@example.com",
    password: "user123",
    role: "client",
    name: "John Doe",
    createdAt: new Date("2024-01-15"),
    isActive: true,
  },
  {
    id: 3,
    username: "Jane Smith",
    email: "janesmith@example.com",
    password: "student123",
    role: "client",
    name: "Jane Smith",
    createdAt: new Date("2024-02-01"),
    isActive: true,
  },
  {
    id: 4,
    username: "Dr. Michael Johnson",
    email: "drmichaeljohnson@example.com",
    password: "teacher123",
    role: "client",
    name: "Dr. Michael Johnson",
    createdAt: new Date("2024-01-20"),
    isActive: true,
  },
]

module.exports = users
