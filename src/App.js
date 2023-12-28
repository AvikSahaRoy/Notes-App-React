import React, { useState, useEffect } from 'react';
import './App.css';
import Logo from './Logo.png';
import pic from './Note.png';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newTitle, setNewTitle] = useState('');  // Added new state for title
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
    if (newTitle.trim() === '' || newTodo.trim() === '') {
      return;
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.toDateString()} ${currentDate.toLocaleTimeString()}`;

    if (editIndex !== -1) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = {
        ...updatedTodos[editIndex],
        title: newTitle,
        content: newTodo,
      };
      setTodos(updatedTodos);
      setNewTodo('');
      setNewTitle('');
      setEditIndex(-1);
    } else {
      const newTodoObject = {
        title: newTitle,
        content: newTodo,
        createdDate: formattedDate,
      };
      const updatedTodos = [...todos, newTodoObject];
      setTodos(updatedTodos);
      setNewTodo('');
      setNewTitle('');
    }

    // Clear the input fields ------------
    const inputField = document.getElementById('todo-input');
    const titleField = document.getElementById('title-input');
    if (inputField && titleField) {
      inputField.value = '';
      titleField.value = '';
    }
  };

  // Edit Todos -----------------
  const handleTodoEdit = (index) => {
    setEditIndex(index);
    setNewTitle(todos[index].title);
    setNewTodo(todos[index].content);
  };

  // Remove Todos -------------------
  const handleTodoRemove = (index) => {
    const shouldRemove = window.confirm('Are you sure you want to delete this note?');
    if (shouldRemove) {
      const updatedTodos = todos.slice();
      updatedTodos.splice(index, 1);
      setTodos(updatedTodos);
      setEditIndex(-1);
    }
  };

  // Remove default Image -----------
  useEffect(() => {
    setShowDefaultImage(todos.length === 0);
  }, [todos]);

  return (
    <div>
      {/* Navbar -----------------------------------------*/}
      <nav className="container navbar navbar-dark bg-dark mb-3">
        <div className="container-fluid">
          <span className="navbar-brand h1">
            <img src={Logo} alt='logo' />
            <span className='appname'> Quicks Notes</span>
          </span>
          <span className='text-white'>Welcome to my Quicks Notes App!</span>
        </div>
      </nav>

      {/* Add Todos input box ---------- */}
      <div className='addTodo card text-white bg-dark' style={{ maxWidth: "32rem" }}>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter title"
            id="title-input"  // Added ID for title input
            className="form-control mb-3"
            required />
          <textarea
            type="text"
            onChange={handleInputChange}
            placeholder="Enter description"
            id="todo-input"
            className="form-control mb-3"
            required />
          <div class="d-grid gap-2 col-4 mx-auto">
            <button type="submit" className="addBtn">Add</button>
          </div>
        </form>
      </div>

      {/* Showing Default Image */}
      {showDefaultImage &&
        <div className='defautImg container'>
          <img src={pic} alt="Default Img" className='mx-auto d-block img-fluid'
            style={{ width: '250px' }} />
          <h1 className='text-center mt-3'>Quicks Notes</h1>
          <p className='text-center'>Your digital companion for efficient note-taking and organization, anytime, anywhere.</p>
        </div>
      }

      {/* Show Todos field ----------------- */}
      <div className='row showTodo text-center' style={{ marginBottom: "80px" }}>
        {todos.map((todo, index) => (
          <div key={index} className='col-sm-12 col-md-6 col-lg-4 mt-2' style={{ maxWidth: "25rem" }}>
            <div className='card text-white bg-dark'>
              <div className="card-body">
                <p className="card-text">
                  {index === editIndex ? (
                    <>
                      <input
                        type="text"
                        className="form-control mb-2"
                        placeholder="Enter title..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        required />
                      <textarea
                        type="text"
                        className="form-control"
                        placeholder="Enter description..."
                        value={newTodo}
                        onChange={handleInputChange}
                        required />
                    </>
                  ) : (
                    <>
                      <div>
                        <span className='todoTitle'>{todo.title}</span><br />
                        <textarea className='todoDes mt-1' readOnly>{todo.content}</textarea>
                      </div>
                    </>
                  )}
                </p>
              </div>
              <div className="card-footer mb-1">
                <div>
                  {index === editIndex ? (
                    <button type="submit" onClick={handleFormSubmit} className='saveBtn'>Save</button>
                  ) : (
                    <>
                      <button onClick={() => handleTodoEdit(index)} className="editBtn mx-2" >Edit</button>
                      <button onClick={() => handleTodoRemove(index)} className="removeBtn mx-2 ">Remove</button>
                    </>
                  )}
                </div>
                <div className=" small mt-2">{todo.createdDate}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="container footer fixed-bottom  bg-dark text-white text-center p-2" >
        <div className="container">
          <span>
            – Thanks for visiting! – <br />
            Quicks Notes | <span className="far fa-copyright" aria-hidden="true"></span> 2023 All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default TodoApp;

