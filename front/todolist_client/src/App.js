import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [id, setId] = useState(1);
  const [todo, setTodo] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:5000/alltodo').then((response) => {
      console.log(response.data);
      setTodo(response.data);
      setId(id + 1);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return todo !== null ? (
    <div className="App">
      <div className="todo">
        <h1>MA TODO LIST</h1>
        <div>
          {
            todo.map((item) => (
              <div className="todoList">
                <div className="id" style={{ width: '5px' }}>{item.id}</div>
                <input type="checkbox" />
                <div style={{ width: '50px' }}>{item.categoty}</div>
                <div style={{ width: '200px' }}>{item.name}</div>
                <div style={{ width: '50px' }}>{item.date}</div>
                <button style={{ width: '50px' }} type="button">Delete</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  ) : (
    <p>LOADING</p>
  );
}

export default App;
