function TaskItem({ task, handleEdit, handleDelete }) {
    return (
        <li>
            <strong>{task.title}</strong> - {task.description}

            <button
              onClick={() => handleEdit(task)}
              style={{ marginLeft: "10px"}}
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(task.id)}
              style={{ marginLeft: "10px"}}
            >
              Delete
            </button>
        </li>
    );
}

export default TaskItem;