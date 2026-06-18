import { useEffect, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
      setError("");
    } catch (err) {
      setError("Could not reach the API. Is the backend running on localhost:5000?");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTask(e) {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      isCompleted: false,
    };

    try {
      const created = await createTask(newTask);
      setTasks((prev) => [created, ...prev]);
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (err) {
      setError("Could not add task.");
    }
  }

  async function handleToggleComplete(task) {
    const updated = { ...task, isCompleted: !task.isCompleted };
    try {
      await updateTask(task.id, updated);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      setError("Could not update task.");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Could not delete task.");
    }
  }

  return (
    <div className="app">
      <h1>Task Tracker</h1>
      <p className="subtitle">React frontend &middot; ASP.NET Core (C#) API &middot; SQL Server</p>

      <form className="task-form" onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading tasks…</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.isCompleted ? "completed" : ""}>
              <label>
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleComplete(task)}
                />
                <span className="task-title">{task.title}</span>
              </label>
              {task.description && <p className="task-desc">{task.description}</p>}
              {task.dueDate && (
                <p className="task-due">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}
              <button className="delete-btn" onClick={() => handleDelete(task.id)}>
                Delete
              </button>
            </li>
          ))}
          {tasks.length === 0 && <p>No tasks yet. Add one above.</p>}
        </ul>
      )}
    </div>
  );
}

export default App;
