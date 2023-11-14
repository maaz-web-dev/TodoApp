// controllers/valuesController.js
const TodoModel = require('../models/model');

// Controller functions

async function getAllValues(req, res) {
 
    try {
        console.log("from get function ");
        // Retrieve all to-do items from your database using the correct model.
        const todos = await TodoModel.find();
    
        // Respond with the list of to-do items.
        res.status(200).json({ todos });
      } catch (err) {
        console.error('Error fetching to-do items:', err);
        res.status(500).json({ error: 'Failed to retrieve to-do items' });
      }
}

async function addValue(req, res) {
  console.log(req.body);
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Create a new to-do item using the model
    const newTodo = new TodoModel({
      title,
      description,
    });

    // Save the new to-do item to the database
    await newTodo.save();
    console.log('To-do item added successfully.');
    res.status(200).json({ message: 'To-do item added successfully' });
  } catch (err) {
    console.error('Error adding to-do item:', err);
    res.status(500).json({ error: 'Failed to add the to-do item' });
  }

}



module.exports = { getAllValues, addValue };
