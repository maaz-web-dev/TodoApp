import React, { useEffect, useState } from 'react';
// import './Chatbot.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import io from 'socket.io-client'; // Import FontAwesome

// const classes = useStyles();
// socket.on('chat message', (msg) => {
//   io.emit('chat message', msg); // Emit the message to all connected clients
// });
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  let socket;
  useEffect(() => {
   socket = io('http://localhost:3001');
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  },[]);
  const toggleChatbot = () => {
    setIsVisible(!isVisible);
  };

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  }

  const handleSendMessage = () => {
    // if (userInput.trim() === '') return;

    // socket.emit('chat message', userInput);
    // setUserInput('');;

    setTimeout(() => {
      addBotMessage('Hello! This is a sample chatbot response.');
    }, 1000);
  }

  const addBotMessage = (text) => {
    setMessages([...messages, { text, isUser: false }]);
  }

  return (
    <div className="chatbot">
       
      <div className={`chatbot-container ${isVisible ? 'visible' : 'hidden'}`}>
      <button className="closed-button" onClick={toggleChatbot}>&times;</button>
        <div className="message-area">
          {messages.map((message, index) => (
            <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
              {message.text}
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button className="send-button" onClick={handleSendMessage}>Send</button>
      </div>
      <button className={`toggle-button ${isVisible ? 'chat-open' : 'chat-closed'}`} onClick={toggleChatbot}>
        {isVisible ? (
          <>
            <FontAwesomeIcon icon="fa-comment" />
            Close Chat
          </>
        ) : (
          <>
            <FontAwesomeIcon icon="fa-comment" />
            
          </>
        )}
      </button>
    </div>
  );
}

export default Chatbot;
