import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

const ListItemComponent = ({ item, index, yellow, handleEditClick, handleDeleteClick }) => {
  const listItemClass = "custom-list-item";
  const yellowItemClass = "yellow-item";
  const buttonClass = "custom-button";

  return (
    <ListItem
      key={index}
      className={`${listItemClass} ${yellow && index === 0 ? yellowItemClass : ""}`}
      style={{
        marginBottom: "8px",
        display: "flex",
        backgroundColor: "aqua",
        alignItems: "center",
      }}
    >
      <ListItemText primary={item.title} style={{ flexGrow: 1 }} />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleEditClick(item, index)}
        className={buttonClass}
        style={{ marginRight: "10px" }}
      >
        Edit
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleDeleteClick(item)}
        className={buttonClass}
      >
        Delete
      </Button>
    </ListItem>
  );
};

export default ListItemComponent;