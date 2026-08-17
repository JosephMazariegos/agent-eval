function TaskItem({ task, handleEdit, handleDelete, handleViewSubmissions }) {
    return (
        <li>
          <div>
            <strong>{task.title}</strong>
            
            <p>{task.description}</p>

            <p>
              <strong>Category:</strong> {task.category} | {" "}
              <strong>Difficulty:</strong> {task.difficulty} | {" "}
              <strong>Language: </strong>{task.language}
            </p>
          </div>

          <div>
              <button
                onClick={() => handleEdit(task)}
                style={{ marginLeft: "10px"}}
              >
                Edit
              </button>

              <button
                onClick={ () => handleViewSubmissions(task)}
                style={{ marginLeft: "10px"}}
              >
                View Submissions
              </button>

              <button
                onClick={() => handleDelete(task.id)}
                style={{ marginLeft: "10px"}}
              >
                Delete
              </button>
          </div>
        </li>
    );
}

export default TaskItem;