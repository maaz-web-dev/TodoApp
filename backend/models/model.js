const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  description: {
    type: String,
    default: "Default Description" 
  },
});


module.exports = mongoose.model('Todo', todoSchema);
