import React, { useState, useEffect } from 'react';
import './App.css';
import Logo from './Logo.png';
import pic from './Note.png'

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [showDefaultImage, setShowDefaultImage] = useState(true);

  // To load data from local storage ----------
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // To save data to local storage --------------
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add New Todos ------------------
  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  // Form Submit --------------------
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newTodo.trim() === '') {
      return;
    }
    // setShowDefaultImage(false);

    if (editIndex !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = newTodo;
      setTodos(updatedTodos);
      setNewTodo('');
      setEditIndex(-1);
    } else {
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setNewTodo('');
    }
    // Clear the input field ------------
    const inputField = document.getElementById('todo-input');
    if (inputField) {
      inputField.value = '';
    }
  };

  // Edit Todos -----------------
  const handleTodoEdit = (index) => {
    setEditIndex(index);
    setNewTodo(todos[index]);
  };

  // Remove Todos -------------------
  const handleTodoRemove = (index) => {
    const updatedTodos = todos.slice();
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
    setEditIndex(-1);
  };

  // Remove default Image -----------
  useEffect(() => {
    setShowDefaultImage(todos.length === 0);
  }, [todos]);


  return (
    <div>
      {/* Navbar -----------------------------------------*/}
      <nav class="container navbar navbar-dark bg-dark mb-3">
        <div class="container-fluid">
          <span class="navbar-brand h1">
            <img src={Logo} alt='logo' />
            <span className='appname'> Quick Notes</span>
          </span>
          <span className='text-white'>Welcome to my Quick Notes App!</span>
        </div>
      </nav>



      {/* Add Todos input box ---------- */}
      <div className='addTodo card text-white bg-dark' style={{ maxWidth: "32rem" }}>
        <form onSubmit={handleFormSubmit} className='d-flex'>
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Enter a new note..."
            id="todo-input"
            class="form-control me-2"
          />
          <button type="submit" className="btn btn-outline-warning addBtn">Add</button>
        </form>
      </div>

      {/* Showing Default Image */}
      {showDefaultImage &&
        <div className='defautImg container'>
          <img src={pic} alt="Default Img" className='mx-auto d-block img-fluid'
            style={{ width: '350px' }} />
          <h1 className='text-center mt-3'>Quick Notes</h1>
          <p className='text-center'>Your digital companion for efficient note-taking and organization, anytime, anywhere.</p>
        </div>
      }

      {/* Show Todos field ----------------- */}
      <div className='row showTodo text-center' style={{ marginBottom: "60px" }}>
        {todos.map((todo, index) => (
          <div key={index} className='col-md-4 mx-2 mt-2 card text-white bg-dark' style={{ maxWidth: "20rem" }}>
            <div class="card-body">
              <p class="card-text">
                {index === editIndex ? (
                  <textarea
                    type="text"
                    value={newTodo}
                    onChange={handleInputChange}
                    style={{ width: '100%' }}
                  />
                ) : (
                  todo
                )}
              </p>
              <div class="card-footer">
                <div>
                  {index === editIndex ? (
                    <button onClick={handleFormSubmit} className='btn btn-outline-info btn-sm' style={{ float: 'right' }}>Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleTodoEdit(index)} className="btn btn-outline-info btn-sm mx-2" >Edit</button>
                      <button onClick={() => handleTodoRemove(index)} className="btn btn-outline-danger btn-sm mx-2 ">Remove</button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer class="container footer fixed-bottom  bg-dark text-white text-center " style={{ marginTop: "39px" }}>
        <div class="container">
          <span>
            – Thanks for visiting! – <br />
            Quick Notes | <span class="far fa-copyright" aria-hidden="true"></span> 2023 All Rights Reserved.
          </span>
        </div>
      </footer>

    </div>
  );
};

export default TodoApp;
