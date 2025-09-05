import express from 'express';
import {
    postUser,
    postEmailConfirmation,
    signIn,
    signout,
    forgetPassword,
    resetPassword,
    userList,
    userDetails,
    requireUser,
    requireAdmin
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', postUser);
router.get('/email/confirmation/:token', postEmailConfirmation);
router.post('/signin', signIn);
router.post('/forget-password', forgetPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.get('/users', requireUser, requireAdmin, userList); // Admin only
router.get('/user/:id', requireUser, requireAdmin, userDetails); // Admin only
router.post('/signout', requireUser, signout);

export default router;
