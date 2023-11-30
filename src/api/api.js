
const API_BASE_URL = 'http://localhost:3001/todos';
const API_AUTH_URL ='http://localhost:3001/auth/'
export const API_ENDPOINTS = {
  ADD_VALUE: `${API_BASE_URL}/addValue`,
  SIGN_IN:`${API_AUTH_URL}/signin`,
  SIGN_UP:`${API_AUTH_URL}/signup`,
  DELETE_VALUE: (id) => `${API_BASE_URL}/delete/${id}`,
  FETCH_DATA:`${API_BASE_URL}`,
  EDIT_VALUE:(todoId)=> `http://localhost:3001/todos/edit/${todoId}`
};
