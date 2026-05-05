import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  function fetchTasks() {
    fetch(`${API_BASE_URL}/tasks`)
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

      if (editingTaskId === null) {
        fetch(`${API_BASE_URL}/tasks`, {
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
        fetch(`${API_URL_BASE}/tasks/${editingTaskId}`, {
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
      fetch(`${API_BASE_URL}/tasks/${id}`, {
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
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>AgentEval</h1>

        <TaskForm
          title={title}
          description={description}
          editingTaskId={editingTaskId}
          setTitle={setTitle}
          setDescription={setDescription}
          setEditingTaskId={setEditingTaskId}
          handleSubmit={handleSubmit}
        />

        <hr />

        <TaskList
          tasks={tasks}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    );
}

export default App;