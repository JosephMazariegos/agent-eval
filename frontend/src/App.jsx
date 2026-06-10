import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SubmissionForm from "./components/SubmissionForm";
import SubmissionList from "./components/SubmissionList";
import MetricsSummary from "./components/MetricsSummary";

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

  const [evaluationsBySubmission, setEvaluationsBySubmission] = useState({});
  const [evaluationFormSubmissionId, setEvaluationFormSubmissionId] = useState(null);
  
  const [testsPassed, setTestsPassed] = useState(0);
  const [testsFailed, setTestsFailed] = useState(0);
  const [runtimeMs, setRuntimeMs] = useState(0);
  const [lintErrors, setLintErrors] = useState(0);
  const [score, setScore] = useState(0);
  const [evaluationNotes, setEvaluationNotes] = useState("");

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

        // also load evaluations for each submission
        data.forEach((submission) => {
          fetchEvaluations(submission.id);
        });
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

    function fetchEvaluations(submissionId) {
      fetch(`${API_BASE_URL}/submissions/${submissionId}/evaluation`)
        .then((response) => response.json())
        .then((data) => {
          setEvaluationsBySubmission((previousEvaluations) => ({
            ...previousEvaluations,
            [submissionId]: data,
          }));
        })
        .catch((error) => {
          console.error("Error fetching evaluations:", error);
        });
    }

    function handleEvaluationSubmit(event) {
      event.preventDefault();

      if (evaluationFormSubmissionId === null) {
        return;
      }

      const evaluationData = {
        tests_passed: Number(testsPassed),
        tests_failed: Number(testsFailed),
        runtime_ms: Number(runtimeMs),
        lint_errors: Number(lintErrors),
        score: Number(score),
        notes: evaluationNotes,
      };

      fetch(`${API_BASE_URL}/submissions/${evaluationFormSubmissionId}/evaluation`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(evaluationData),
        }
      )
        .then((response) => response.json())
        .then(() => {
          setTestsPassed(0);
          setTestsFailed(0);
          setRuntimeMs(0);
          setLintErrors(0);
          setScore(0);
          setEvaluationNotes("");
          setEvaluationFormSubmissionId(null);
          fetchEvaluations(evaluationFormSubmissionId);
        })
        .catch((error) => {
          console.error("Error creating evaluation:", error);
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

            <MetricsSummary submissions={submissions} evaluationsBySubmission={evaluationsBySubmission} />

            <SubmissionForm
              toolName={toolName}
              promptUsed={promptUsed}
              generatedCode={generatedCode}
              iterationCount={iterationCount}
              manualEdits={manualEdits}
              timeSpendSeconds={timeSpendSeconds}
              setToolName={setToolName}
              setPromptUsed={setPromptUsed}
              setGeneratedCode={setGeneratedCode}
              setIterationCount={setIterationCount}
              setManualEdits={setManualEdits}
              setTimeSpendSeconds={setTimeSpendSeconds}
              handleSubmissionSubmit={handleSubmissionSubmit}
            />

            <hr />

            <SubmissionList 
              submissions={submissions}
              evaluationsBySubmission={evaluationsBySubmission}
              evaluationFormSubmissionId={evaluationFormSubmissionId}
              setEvaluationFormSubmissionId={setEvaluationFormSubmissionId}
              testsPassed={testsPassed}
              testsFailed={testsFailed}
              runtimeMs={runtimeMs}
              lintErrors={lintErrors}
              score={score}
              evaluationNotes={evaluationNotes}
              setTestsPassed={setTestsPassed}
              setTestsFailed={setTestsFailed}
              setRuntimeMs={setRuntimeMs}
              setLintErrors={setLintErrors}
              setScore={setScore}
              setEvaluationNotes={setEvaluationNotes}
              handleEvaluationSubmit={handleEvaluationSubmit}
            />
          </div>
        )}
      </div>
    );
}

export default App;