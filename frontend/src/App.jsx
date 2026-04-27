import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]); // state to store the list of tasks, initially empty array
  const [title, setTitle] = useState(""); // state to store title of new task, initially empty string
  const [description, setDescription] = useState(""); // state to store description of new task, initialy empty string

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

    const newTask = {
      title: title,
      description: description,
    };

    fetch("http://127.0.0.1:800/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
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
  }

  return (
    <div style={{ padding: "2rem", frontFamily: "Arial" }}>
      <h1>AgentEval</h1>

      <h2>Create Task</h2>

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

        <button type="submit">Create Task</button>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;