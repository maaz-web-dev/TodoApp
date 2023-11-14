import React, { useState, useEffect } from "react";
import "./App.css";
// import Example from "./component/ModalPop";
import ModalPop from "./component/ModalPop";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import ListComponent from "./component/ListComponent";
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

  return (
    <>
      <Navbar />
      <Chatbot />
      <div className="parent">
        <div className="box">
          {show && (
            <ModalPop
              isEdited={isEdited}
              setInputValue={setInputValue}
              editingItem={editingItem}
              inputValue={inputValue}
              open={show}
              addingNewItem={addingNewItem}
              setYellow={setYellow}
            />
          )}
          <ListComponent
            data={data}
            page={page}
            itemsPerPage={itemsPerPage}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            yellow={yellow}
          />
          <Footer
            add={add}
            page={page}
            setPage={setPage}
            data={data}
            itemsPerPage={itemsPerPage}
          />
        </div>
      </div>
    </>
  );
}

export default App;
