import React, { useState } from "react";

const Progress = () => {
  const [task, setTask] = useState(""); // Current task input
  const [todoTasks, setTodoTasks] = useState([]); // Tasks in To-Do list
  const [doingTasks, setDoingTasks] = useState([]); // Tasks in Doing list
  const [doneTasks, setDoneTasks] = useState([]); // Tasks in Done list
  const [editingTask, setEditingTask] = useState(null); // Track task being edited
  const [editedText, setEditedText] = useState(""); // Edited text for task

  // Handle task input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Handle adding a new task to a list
  const handleAddTask = (list) => {
    if (task.trim() === "") return;

    if (list === "todo") {
      setTodoTasks([...todoTasks, task]);
    } else if (list === "doing") {
      setDoingTasks([...doingTasks, task]);
    } else if (list === "done") {
      setDoneTasks([...doneTasks, task]);
    }

    setTask(""); // Reset task input field
  };

  // Handle editing task
  const handleEditTask = (list, index) => {
    let taskToEdit = "";
    if (list === "todo") taskToEdit = todoTasks[index];
    else if (list === "doing") taskToEdit = doingTasks[index];
    else if (list === "done") taskToEdit = doneTasks[index];

    setEditingTask({ list, index });
    setEditedText(taskToEdit);
  };

  // Handle task update
  const handleUpdateTask = () => {
    if (editedText.trim() === "") return;

    const { list, index } = editingTask;

    if (list === "todo") {
      const updatedTodoTasks = [...todoTasks];
      updatedTodoTasks[index] = editedText;
      setTodoTasks(updatedTodoTasks);
    } else if (list === "doing") {
      const updatedDoingTasks = [...doingTasks];
      updatedDoingTasks[index] = editedText;
      setDoingTasks(updatedDoingTasks);
    } else if (list === "done") {
      const updatedDoneTasks = [...doneTasks];
      updatedDoneTasks[index] = editedText;
      setDoneTasks(updatedDoneTasks);
    }

    setEditingTask(null);
    setEditedText(""); // Reset edited text
  };

  return (
    <div className="progress-container">
      <h1>Progress Tracking</h1>

      {/* Task input */}
      <div className="task-input">
        <input
          type="text"
          value={task}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button onClick={() => handleAddTask("todo")}>Add to To-Do</button>
        <button onClick={() => handleAddTask("doing")}>Add to Doing</button>
        <button onClick={() => handleAddTask("done")}>Add to Done</button>
      </div>

      {/* Task Lists */}
      <div className="task-lists">
        <div className="list">
          <h3>To-Do</h3>
          <ul>
            {todoTasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleEditTask("todo", index)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="list">
          <h3>Doing</h3>
          <ul>
            {doingTasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleEditTask("doing", index)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="list">
          <h3>Done</h3>
          <ul>
            {doneTasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleEditTask("done", index)}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Editing Task */}
      {editingTask && (
        <div className="edit-task">
          <h3>Edit Task</h3>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleUpdateTask}>Update Task</button>
        </div>
      )}
    </div>
  );
};

export default Progress;
