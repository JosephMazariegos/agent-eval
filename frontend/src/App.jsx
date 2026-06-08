import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const API_BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const [toolName, setToolName] = useState("");
  const [promptUsed, setPromptUsed] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [iterationCount, setIterationCount] = useState(1);
  const [manualEdits, setManualEdits] = useState(0);
  const [timeSpendSeconds, setTimeSpendSeconds] = useState(0);

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
  function fetchSubmissions(taskId) {
    fetch(`${API_BASE_URL}/tasks/${taskId}/submissions`)
      .then((response) => response.json())
      .then((data) => {
        setSubmissions(data);
      })
      .catch((error) => {
        console.error("Error fetching submissions:", error);
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
        fetch(`${API_BASE_URL}/tasks/${editingTaskId}`, {
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

    function handleViewSubmissions(task) {
      setSelectedTask(task);
      fetchSubmissions(task.id);
    }

    function handleSubmissionSubmit(event) {
      event.preventDefault();

      if (selectedTask === null) {
        return;
      }

      const submissionData = {
        tool_name: toolName,
        prompt_used: promptUsed,
        generated_code: generatedCode,
        iteration_count: Number(iterationCount),
        manual_edits: Number(manualEdits),
        time_spent_seconds: Number(timeSpendSeconds),
      };

      fetch(`${API_BASE_URL}/tasks/${selectedTask.id}/submissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      })
        .then((response) => response.json())
        .then(() => {
          setToolName("");
          setPromptUsed("");
          setGeneratedCode("");
          setIterationCount(1);
          setManualEdits(0);
          setTimeSpendSeconds(0);

          fetchSubmissions(selectedTask.id);
        })
        .catch((error) => {
          console.error("Error creating submission:", error);
        });
    }

    return (
      <div style={{ padding: "2rem", fontFamily: "Arial" }}>
        <h1>AgentEval</h1>

        <TaskForm
        // title, description, editingTaskId, etc... are all props passed to the TaskForm component
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
          handleViewSubmissions={handleViewSubmissions}
        />

        {selectedTask && (
          <div>
            <hr />

            <h2>Submissions for: {selectedTask.title}</h2>

            <h3>Add Submission</h3>
            <form onSubmit={handleSubmissionSubmit}>
              <div>
                <label>Tool Name</label>
                <br />
                <input
                  type="text"
                  value={toolName}
                  onChange={(event) => setToolName(event.target.value)}
                  placeholder="e.g. Cursor, Copilot, Claude Code"
              />
              </div>

              <div>
                <label>Prompt Used</label>
                <br />
                <textarea
                  value={promptUsed}
                  onChange={(event) => setPromptUsed(event.target.value)}
                  placeholder="Paste the prompt that was used."
                />
              </div>

              <div>
                <label>Generated Code</label>
                <br />
                <textarea
                  value={generatedCode}
                  onChange={(event) => setGeneratedCode(event.target.value)}
                  placeholder="Paste the generated code."
                  rows={8}
                  cols={80}
                />
              </div>

              <div>
                <label>Iteration Count</label>
                <br />
                <input
                  type="number"
                  value={iterationCount}
                  onChange={(event) => setIterationCount(event.target.value)}
                />
              </div>

              <br />

              <div>
                <label>Manual Edits</label>
                <br />
                <input
                  type="number"
                  value={manualEdits}
                  onChange={(event) => setManualEdits(event.target.value)}
                />
              </div>

              <br />
              <div>
                <label>Time Spent (seconds)</label>
                <br />
                <input
                  type="number"
                  value={timeSpendSeconds}
                  onChange={(event) => setTimeSpendSeconds(event.target.value)}
                />
              </div>

              <br />
              <button type="submit">Add Submission</button>
            </form>

            {submissions.length === 0? (
              <p>No submissions found for this task.</p>
            ) : (
              <ul>
                {submissions.map((submission) => (
                  <li key={submission.id}>
                    <strong>{submission.tool_name}</strong>
                    <p>
                      <strong>Prompt:</strong>{submission.prompt_used}
                    </p>
                    <pre>{submission.generated_code}</pre>
                    <p>
                      Iterations: {submission.iteration_count} | Manual edits: {" "}
                      {submission.manual_edits} | Time: {" "}
                      {submission.time_spent_seconds} s
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}  
      </div>
    );
}

export default App;