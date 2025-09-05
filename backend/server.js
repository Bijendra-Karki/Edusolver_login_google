//installed gareko kura haru npm install cookie-parser cors dotenv express mongoose jsonwebtoken express-jwt bcrypt
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/authRoutes.js';
import queryRoutes from './routes/queryRoutes.js';
import responseRoutes from './routes/responseRoutes.js';
import examRoutes from './routes/examRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();

const app = express();

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// ===== Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/response', responseRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/payment', paymentRoutes);

// ===== Health check =====
app.get('/', (req, res) => {
    res.send('EduSolver API is running!');
});

// ===== Error handling =====
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Invalid token' });
    } else {
        res.status(500).json({ error: err.message });
    }
});

// ===== Connect to MongoDB and start server =====
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
    console.error('MongoDB connection error:', err.message);
});
