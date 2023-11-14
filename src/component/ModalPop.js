import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalPop(props) {
  const {inputValue, isEdited,setYellow ,setInputValue, open, addingNewItem, editingItem } = props;
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleButtonClick = (updatedValue ) => {
    if (isEdited.isEdited) {
      
      editingItem(isEdited.itemId,updatedValue);
    } else {
      addingNewItem();
    }
    setYellow(true)
    // Clear the input value by setting it to an empty string
    setInputValue('');
  };
  return (
    <Modal
      keepMounted
      open={open}
      onClose={addingNewItem}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <TextField
          label="Input"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button
          onClick={() => handleButtonClick(inputValue)}
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Submit
        </Button>
       
      </Box>
    </Modal>
  );
}
