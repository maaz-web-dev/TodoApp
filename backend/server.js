// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3001;
// const mongoose = require('mongoose');
// // app.use((req, res, next) => {
// //   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
// //   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// //   res.header('Access-Control-Allow-Headers', 'Content-Type');
// //   next();
// // });
// const corsMiddleware = require('./middleWare/Cores');
// // const TodoModel = require('./models/model');
// const todoRoutes = require('./routes/todoRoutes');
// require('./utils/db');
// app.use(corsMiddleware);


// // mongoose.connect('mongodb://localhost/todo', {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true
// // })
// //   .then(() => {
// //     console.log('Connected to MongoDB');
// //   })
// //   .catch((err) => {
// //     console.error('Error connecting to MongoDB:', err);
// //   });

// // const todoSchema = new mongoose.Schema({
// //   title: String,
// //   description: String,
// // });

// // const TodoModel = mongoose.model('Todo', todoSchema);


// app.use(express.json());
// app.use('/todos', todoRoutes);
// // app.get('/', async (req, res) => {
// //     try {
// //       // Retrieve all to-do items from your database using the correct model.
// //       const todos = await TodoModel.find();
  
// //       // Respond with the list of to-do items.
// //       res.status(200).json({ todos });
// //     } catch (err) {
// //       console.error('Error fetching to-do items:', err);
// //       res.status(500).json({ error: 'Failed to retrieve to-do items' });
// //     }
// //   });

  
// // // Add endpoint
// // app.post('/add', async (req, res) => {
// //   try {
// //     const { title, description } = req.body;

// //     if (!title) {
// //       return res.status(400).json({ error: 'Title is required' });
// //     }

// //     // Create a new to-do item using the model
// //     const newTodo = new TodoModel({
// //       title,
// //       description,
// //     });

// //     // Save the new to-do item to the database
// //     await newTodo.save();
// //     console.log('To-do item added successfully.');
// //     res.status(200).json({ message: 'To-do item added successfully' });
// //   } catch (err) {
// //     console.error('Error adding to-do item:', err);
// //     res.status(500).json({ error: 'Failed to add the to-do item' });
// //   }
// // });


// // app.delete('/delete/:itemId', async (req, res) => {
// //   try {
// //     const { itemId } = req.params;

// //     if (!itemId) {
// //       return res.status(400).json({ error: 'Item ID is required' });
// //     }

// //     // Use Mongoose to delete the item by its ID
// //     await TodoModel.findByIdAndRemove(itemId);

// //     console.log(`Item with ID ${itemId} deleted successfully.`);
// //     res.status(200).json({ message: `Item with ID ${itemId} deleted successfully` });
// //   } catch (err) {
// //     console.error('Error deleting item:', err);
// //     res.status(500).json({ error: 'Failed to delete the item' });
// //   }
// // });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3001;
// const cors = require('cors');
// const todoRoutes = require('./routes/todoRoutes');
// require('./utils/db');
// // Middleware
// app.use(cors()); // Use the cors package directly
// app.use(express.json());

// // Routes
// app.use('/todos', todoRoutes);

// // Server Listen
// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');

const todoRoutes = require('./routes/todoRoutes');
require('./utils/db');

// Middleware
app.use(cors());
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);

// Initialize Socket.io
const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000',  // Allow connections from this origin
      methods: ['GET', 'POST'],
    },
  });
  
  const connectedUsers = new Set(); // To store connected user socket IDs

  io.on('connection', (socket) => {
    if (!connectedUsers.has(socket.id)) {
      // Check if the socket ID is not in the set of connected users
      console.log(`A user connected with socket ID: ${socket.id}`);
      connectedUsers.add(socket.id); // Add the socket ID to the set
    }
  
    socket.on('chat message', (msg) => {
      // Handle incoming chat message here
      console.log(`Received message from user with socket ID ${socket.id}: ${msg}`);
      
      // You can also broadcast the message to all connected clients
      io.emit('chat message', msg);
    });
  
    socket.on('disconnect', () => {
      console.log(`User disconnected with socket ID: ${socket.id}`);
      connectedUsers.delete(socket.id); // Remove the socket ID from the set
    });
  });

// Server Listen
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

