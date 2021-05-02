import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [id, setId] = useState('');
  const [todo, setTodo] = useState(null);
  const [name, setTName] = useState('');
  const [categoty, setCategory] = useState('');
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
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleDate = (event) => {
    setDate(event.target.value);
  };
  const formSubmit = (event) => {
    event.preventDefault();
    const data = {
      name,
      categoty,
      date,
    };
    console.log(data);
    axios.post('http://localhost:5000/alltodo', data).then(() => {
      setTName('');
      setCategory('');
      setDate('');
    });
  };
  const handleId = (event) => {
    setId(event.target.value);
  };
  const deleteTodo = (event) => {
    event.preventDefault();
    const todoId = parseInt(id, 10);
    axios.delete(`http://localhost:5000/alltodo?id=${todoId}`).then(() => {

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
                <div style={{ width: '200px' }}>{item.name}</div>
                <div style={{ width: '50px' }}>{item.date}</div>
                <button type="submit" value={item.id} onClick={handleId}>Delete</button>
              </form>
            ))
          }
        </div>
        <form className="addTodo" onSubmit={formSubmit}>
          <div className="radioTodo">
            <label htmlFor="radio1">Administration</label>
            <input type="radio" value="Administration" onChange={handleCategory} name="category" id="radio1" />
            <label htmlFor="radio2">Famille</label>
            <input type="radio" value="Famille" onChange={handleCategory} name="category" id="radio2" />
            <label htmlFor="radio3">Achat</label>
            <input type="radio" value="Achat" onChange={handleCategory} name="category" id="radio3" />
          </div>
          <div className="inputInfos">
            <input type="text" value={name} onChange={handleName} id="inputName" />
            <input type="text" value={date} onChange={handleDate} id="inputDate" />
          </div>
          <button type="submit">Ajouter</button>
        </form>
      </div>
    </div>
  ) : (
    <p>LOADING</p>
  );
}

export default App;
