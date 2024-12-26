//  ./routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
  
// Routes
router.post('/add', userController.addUser); // Add a new user
router.get('/all', userController.getAllUsers); // Get all users

module.exports = router;
 