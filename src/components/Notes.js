import React, { useState } from "react";

const Notes = ({
  Title,
  content,
  TagLine,
  onDelete,
  id,
  todo,
  todos,
  setTodos,
  modal,
  onPin,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({
    Title: todo.Title,
    content: todo.content,
  });

  function handleEditClick(todo) {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  }
  function handleEditInputChange(e) {
    const { name, value } = e.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  }
  function handleUpdateTodo(id, updatedTodo) {
    if (
      updatedTodo.Title !== "" &&
      updatedTodo.content !== "" &&
      updatedTodo.TagLine !== ""
    ) {
      const updatedItem = todos.map((todo, index) => {
        return index === id ? updatedTodo : todo;
      });
      setIsEditing(false);
      setTodos(updatedItem);
    }
  }
  return (
    <>
      {isEditing ? (
        <div className="note noteUpadte">
          <input
            type="text"
            placeholder="Edit Title"
            onChange={handleEditInputChange}
            name="Title"
            value={currentTodo.Title}
          />
          <input
            type="text"
            placeholder="Edit TagLine"
            onChange={handleEditInputChange}
            name="TagLine"
            value={currentTodo.TagLine}
          />
          <p>
            <textarea
              placeholder="Edit content"
              value={currentTodo.content}
              onChange={handleEditInputChange}
              name="content"
            ></textarea>
          </p>
          <div className="buttonContainer">
            <button onClick={() => handleUpdateTodo(id, currentTodo)}>
              Upadte
            </button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="note" style={{ zIndex: `${modal ? "-1" : "1"}` }}>
          <h1>{Title}</h1>
          <p>{TagLine}</p>
          <p>{content}</p>
          <div className="buttonContainer">
            <button onClick={() => onDelete(id)}>Delete</button>
            <button onClick={() => handleEditClick(todo)}>Edit</button>
            <button onClick={() => onPin(id)}>📌</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
