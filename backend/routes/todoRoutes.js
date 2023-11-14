// const express = require('express');
// const router = express.Router();
// const TodoModel = require('../models/model');

// router.get('/', async (req, res) => {
//         try {
//           const todos = await TodoModel.find();

//           res.status(200).json({ todos });
//           console.log(res);
//         } catch (err) {
//           console.error('Error fetching to-do items:', err);
//           res.status(500).json({ error: 'Failed to retrieve to-do items' });
//         }
//       });

// router.post('/add', async (req, res) => {
//     try {
//         const { title, description } = req.body;
//         if (!title) {
//             return res.status(400).json({ error: 'Title is required' });
//         }
//         const newTodo = new TodoModel({
//             title,
//             description,
//         });
//         await newTodo.save();
//         console.log('To-do item added successfully.');
//         res.status(200).json({ message: 'To-do item added successfully' });
//     } catch (err) {
//         console.error('Error adding to-do item:', err);
//         res.status(500).json({ error: 'Failed to add the to-do item' });
//     }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const TodoModel = require('../models/model');

router.get('/', async (req, res) => {

    try {
        const todos = await TodoModel.find();
        res.status(200).json({ todos });
    } catch (err) {
        console.error('Error fetching to-do items:', err);
        res.status(500).json({ error: 'Failed to retrieve to-do items' });
    }
});

router.post('/addValue', async (req, res) => {
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
});

router.delete('/delete/:id', async (req, res) => {
  const todoId = req.params.id;
  const deletedTodo = await TodoModel.findByIdAndDelete(todoId);
  
  if (!deletedTodo) {
    return res.status(404).json({ error: 'To-do item not found' });
  }
  
  console.log('To-do item deleted successfully.');
  res.status(200).json({ message: 'To-do item deleted successfully', deletedTodo });
  
});
// Edit a to-do item
router.put('/edit/:id', async (req, res) => {
  try {
    const todoId = req.params.id;
    const { title, description } = req.body;

    // Check if the required fields are provided
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Set a default value for description if not provided
    const updatedDescription = description || 'Default Description';

    // Use the TodoModel to find and update the to-do item by ID
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      todoId,
      { title, description: updatedDescription },
      { new: true } // Return the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'To-do item not found' });
    }

    console.log('To-do item updated successfully.');
    res.status(200).json({ message: 'To-do item updated successfully', updatedTodo });
  } catch (err) {
    console.error('Error updating to-do item:', err);
    res.status(500).json({ error: 'Failed to update the to-do item' });
  }
});


module.exports = router;
