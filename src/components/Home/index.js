import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./index.css";

const Home = () => {
    const [todo, setTodo] = useState([]);
    const [input, setInput] = useState("");

    // Load todos from localStorage on first render
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        setTodo(savedTodos);
    }, []);

    // Save todos to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todo));
    }, [todo]);

    // Add new todo
    const onAddbtn = () => {
        if (input.trim() === "") {
            alert("Please add a todo");
            return;
        }

        const newTodos = [...todo, { text: input.trim(), completed: false }];
        setTodo(newTodos);
        setInput("");
    };

    // Toggle completed state
    const toggleTodo = (index) => {
        const newTodos = [...todo];
        newTodos[index].completed = !newTodos[index].completed;
        setTodo(newTodos);
    };

    // Delete a todo
    const deleteTodo = (index) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this todo?");
        if (isConfirmed) {
            const newTodos = todo.filter((_, i) => i !== index);
            setTodo(newTodos);
        }
    };

    return (
        <div className="todo-container">
            <div className="todo-content">
                <h1 className="todo-title">Create Your Todos Here</h1>

                <div className="form-group">
                    <label htmlFor="title" className="labels">Title:</label>
                    <input
                        type="text"
                        id="title"
                        className="title"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add a task..."
                    />
                </div>

                <button className="add-btn" onClick={onAddbtn}>Add your Todo</button>

                <h2>Your Todos</h2>

                {todo.length === 0 ? (
                    <p>No todos yet. Add one!</p>
                ) : (
                    todo.map((item, index) => (
                        <div key={index} className="todos-card">
                            <div className="saved-todo">
                                <ul className="lists">
                                    <li className="list-item">
                                        <input
                                            type="checkbox"
                                            checked={item.completed}
                                            onChange={() => toggleTodo(index)}
                                        />
                                        <p
                                            className={item.completed ? "line-through todo-text" : "todo-text"}
                                        >
                                            {item.text}
                                        </p>
                                        <FaTrash onClick={() => deleteTodo(index)} className="delete-btn" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="todo-image">
                <img
                    src="https://i.postimg.cc/W10sd13b/istockphoto-1746104990-612x612-1.jpg"
                    alt="home"
                    className="home-image-icon"
                />
            </div>
        </div>
    );
};

export default Home;
