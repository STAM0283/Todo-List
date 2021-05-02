import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [id, setId] = useState('');
  const [todo, setTodo] = useState(null);
  const [name, setTName] = useState('');
  const [date, setDate] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/alltodo').then((response) => {
      console.log(response.data);
      setTodo(response.data);
      setId(id + 1);
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  const handleName = (event) => {
    setTName(event.target.value);
  };
  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const formSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      date,
    };
    console.log(data);
    axios.post('http://localhost:5000/alltodo', data).then(() => {
      setTName('');
      setDate('');
      document.location.reload();
    });
  };
  const handleId = (event) => {
    setId(event.target.value);
  };
  const deleteTodo = (event) => {
    event.preventDefault();
    const todoId = parseInt(id, 10);
    axios.delete(`http://localhost:5000/alltodo?id=${todoId}`).then(() => {
      document.location.reload();
    }).catch((err) => {
      throw err;
    });
  };

  return todo !== null ? (
    <div className="App">
      <div className="todo">
        <h1>MA TODO LIST</h1>
        <div>
          {
            todo.map((item) => (
              <form className="todoList" onSubmit={deleteTodo}>
                <div className="id" style={{ width: '5px' }}>{item.id}</div>
                <input type="checkbox" />
                <div style={{ width: '50px' }}>{item.categoty}</div>
                <div style={{ width: '300px' }}>{item.name}</div>
                <div style={{ width: '50px' }}>{item.date}</div>
                <button type="submit" value={item.id} onClick={handleId}>Delete</button>
              </form>
            ))
          }
          <form className="addTodo" onSubmit={formSubmit}>
            <div className="inputInfos">
              <input type="text" value={name} onChange={handleName} id="inputName" placeholder="Ajouter un todo à la liste" />
              <input type="text" value={date} onChange={handleDate} id="inputDate" placeholder="Precisez la date" />
              <button type="submit">Ajouter</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <p>LOADING</p>
  );
}

export default App;
