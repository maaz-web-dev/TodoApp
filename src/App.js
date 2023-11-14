import React, { useState, useEffect } from "react";
import "./App.css";
import Example from "./component/ModalPop";
import Navbar from "./component/Navbar";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItemComponent from "./component/ListItemComponent";
import Chatbot from "./component/Chatbot";
import { fetchData, deleteValue, addValue, editValue } from "./api/apiService";

function App() {
  const [yellow, setYellow] = useState(false);
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isEdited, setIsEdited] = useState({ isEdited: false, itemId: null });
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData()
      .then((response) => {
        if (Array.isArray(response.todos)) {
          setData(response.todos.reverse());
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data]);
  function add() {
    setIsEdited({ isEdited: false, itemId: null });
    setShow(true);
  }
  const handleDeleteClick = async (item) => {
    deleteValue(item._id);
  };

  const editingItem = async (todoId, updatedData) => {
    setShow(false);
    setInputValue("");
    editValue(todoId, updatedData);
  };

  const handleEditClick = (inputValue, index) => {
    setShow(true);
    setIsEdited({ isEdited: true, itemId: inputValue._id });
    setInputValue(inputValue.title);
  };

  const addingNewItem = () => {
    if (!inputValue.trim()) {
      alert("plase fill the input");
      return;
    }
  
    setShow(false);
    addValue(inputValue);
    setInputValue("");
  };
  

  const buttonClass = "custom-button";
  const footerClass = "footer";

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
            {data.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((item, index) => (
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
          {data.length > itemsPerPage && (
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
                disabled={page >= Math.ceil(data.length / itemsPerPage) - 1}
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
