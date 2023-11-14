// routes/api.js
const express = require('express');
const router = express.Router();

// Import controllers
const valuesController = require('../controllers/valuesController');

// Define API routes
router.get('/values', valuesController.getAllValues);
router.post('/addValue', valuesController.addValue);
// router.delete('/deleteValue/:itemId', valuesController.deleteValue);

module.exports = router;
