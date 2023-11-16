import React from "react";
import List from "@mui/material/List";
import ListItemComponent from "./ListItemComponent";

function ListComponent({ data, page, itemsPerPage, handleEditClick, handleDeleteClick, yellow }) {
  return (
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
  );
}

export default ListComponent;