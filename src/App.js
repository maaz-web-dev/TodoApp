import React, { useState } from 'react';
import Example from './component/ModalPop';
import Navbar from './component/Navbar';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import ListItemComponent from './component/ListItemComponent';
import Chatbot from './component/Chatbot';
import { useTodoData } from './useTodoData';
import { deleteValue, addValue, editValue } from './api/apiService';

function App() {
  const {
    data,
    page,
    setPage,
    yellow,
    setYellow,
  } = useTodoData();

  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isEdited, setIsEdited] = useState({ isEdited: false, itemId: null });

  function add() {
    setIsEdited({ isEdited: false, itemId: null });
    setShow(true);
  }

  const handleDeleteClick = async (item) => {
    deleteValue(item._id);
  };

  const editingItem = async (todoId, updatedData) => {
    setShow(false);
    setInputValue('');
    editValue(todoId, updatedData);
  };

  const handleEditClick = (inputValue, index) => {
    setShow(true);
    setIsEdited({ isEdited: true, itemId: inputValue._id });
    setInputValue(inputValue.title);
  };

  const addingNewItem = () => {
    setShow(false);
    addValue(inputValue);
    setInputValue('');
  };

  const buttonClass = 'custom-button';
  const footerClass = 'footer';

  return (
    <>
      <Navbar />
      <Chatbot />
      <div className="parent">
        <div className="box">
          {show && (
            <Example
              isEdited={isEdited}
              setInputValue={setInputValue}
              editingItem={editingItem}
              inputValue={inputValue}
              open={show}
              addingNewItem={addingNewItem}
              setYellow={setYellow}
            />
          )}
          <List>
            {data.slice(page * 10, (page + 1) * 10).map((item, index) => (
              <ListItemComponent
                key={index}
                item={item}
                index={index}
                yellow={yellow}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            ))}
          </List>
          <div className={footerClass}>
            <Button variant="contained" color="primary" onClick={add}>
              Add
            </Button>
          </div>
          {data.length > 10 && (
            <div className={buttonClass}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className={buttonClass}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(data.length / 10) - 1}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );

}

export default App;
