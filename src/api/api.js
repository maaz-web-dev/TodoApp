
const API_BASE_URL = 'http://localhost:3001/todos';
export const API_ENDPOINTS = {
  ADD_VALUE: `${API_BASE_URL}/addValue`,
  
  DELETE_VALUE: (id) => `${API_BASE_URL}/delete/${id}`,
  FETCH_DATA:`${API_BASE_URL}`,
  EDIT_VALUE:(todoId)=> `http://localhost:3001/todos/edit/${todoId}`
};
