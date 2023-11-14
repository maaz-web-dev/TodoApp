import styled from "styled-components";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const BoxContainer = styled.div`
  margin: 30px;
  width: -webkit-fill-available;
  height: fit-content;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
  border-radius: 4px;
`;

export const CustomListItem = styled(ListItem)`
  margin-bottom: 8px;
  display: flex;
  background-color: ${({ yellow }) => (yellow ? "aqua" : "inherit")};
  align-items: center;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
`;

export const StyledButton = styled(Button)`
  margin-right: 10px;
`;

export const PaginationButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
`;

export const ChatbotContent = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  display: none;

  &.visible {
    display: block;
  }
`;
