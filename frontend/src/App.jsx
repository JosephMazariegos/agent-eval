import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]); // state to store the list of tasks, initially empty array
  const [title, setTitle] = useState(""); // state to store title of new task, initially empty string
  const [description, setDescription] = useState(""); // state to store description of new task, initialy empty string
  const [editingTaskId, setEditingTaskId] = useState(null); // state to store the ID of the task being edited, initially null

  function fetchTasks() {
    fetch("http://localhost:8000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    const taskData = {
      title: title,
      description: description,
    };

    if (editingTaskId == null) {
      fetch("http://127.0.0.1:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
        .then((response) => response.json())
        .then(() => {
          setTitle("");
          setDescription("");
          fetchTasks();
        })
        .catch((error) => {
          console.error("Error creating task:", error);
        });
    } else {
      fetch(`http://127.0.0.1:8000/tasks/${editingTaskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      })
        .then((response) => response.json())
        .then(() => {
          setTitle("");
          setDescription("");
          setEditingTaskId(null);
          fetchTasks();
        })
        .catch((error) => {
          console.error("Error updating task:", error);
        });
    }
  }

  function handleDelete(id) {
    fetch(`http://127.0.0.1:8000/tasks/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  }

  function handleEdit(task) {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
  }

  return (
    <div style={{ padding: "2rem", frontFamily: "Arial" }}>
      <h1>AgentEval</h1>

      <h2>{editingTaskId == null ? "Create Task" : "Edit Task"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <br />
          <input
            tpye="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Two Sum"
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="e.g. Describe the task..."
          />
        </div>

        <br />

        <button type="submit">{editingTaskId == null ? "Create Task" : "Save Changes"}</button>
        {editingTaskId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingTaskId(null);
              setTitle("");
              setTitle("");
              setDescription("");
            }}
            style={{ marginLeft: "10px"}}>Cancel</button>
        )}
      </form>

      <hr />

      <h2>Tasks</h2>

      {tasks.length == 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <strong>{task.title}</strong> - {task.description}
              <button onClick={() => handleEdit(task)}
              style={{ marginLeft: "10px"}}>Edit</button>
              <button onClick={() => handleDelete(task.id)}
              style={{ marginLeft: "10px"}}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;