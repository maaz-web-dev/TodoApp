
import { API_ENDPOINTS } from '../api/api';

async function handleResponse(response) {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
}

export function fetchData() {
  return fetch(API_ENDPOINTS.FETCH_DATA)
    .then(handleResponse)
    .catch(error => {
      console.error("Error fetching data:", error);
      throw error;
    });
}


export function addValue(title) {
  const data ={title};
  return fetch(API_ENDPOINTS.ADD_VALUE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponse);
}
export function editValue(todoId, title){
  const description ="default";
    return fetch(API_ENDPOINTS.EDIT_VALUE(todoId), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: title, description }),
    }).then(handleResponse);
  }

export function deleteValue(id) {
  return fetch(API_ENDPOINTS.DELETE_VALUE(id), {
    method: 'DELETE',
  })
    .then(handleResponse);
}
