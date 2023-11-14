import { useState, useEffect } from 'react';
import { fetchData }from './api/apiService';

export function useTodoData() {
  const [data, setData] = useState([]);
//   const [page, setPage] = useState(0);
//   const [yellow, setYellow] = useState(false);

  useEffect(() => {
    fetchData()
      .then((response) => {
        if (Array.isArray(response.todos)) {
          setData(response.todos.reverse());
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [data]);

  return { data };
}