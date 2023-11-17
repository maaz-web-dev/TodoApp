const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const socketIo = require('socket.io');
// const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('./models/userModel');

const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes'); 
require('./utils/db');

app.use(cors());

app.use(express.json());


// Setup session middleware
app.use(require('express-session')({
  secret: 'todos',
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());



// Configure Passport with local strategy
passport.use(new LocalStrategy(UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());

app.use('/todos', todoRoutes);
app.use('/auth', authRoutes);
const io = socketIo(server, {
    cors: {
      origin: 'http://localhost:3000', 
      methods: ['GET', 'POST'],
    },
  });
  
  const connectedUsers = new Set();

  io.on('connection', (socket) => {
    if (!connectedUsers.has(socket.id)) {
      console.log(`A user connected with socket ID: ${socket.id}`);
      connectedUsers.add(socket.id); 
    }
  
    socket.on('chat message', (msg) => {
      console.log(`Received message from user with socket ID ${socket.id}: ${msg}`);

      io.emit('chat message', msg);
    });
  
    socket.on('disconnect', () => {
      console.log(`User disconnected with socket ID: ${socket.id}`);
      connectedUsers.delete(socket.id); 
    });
  });


server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

