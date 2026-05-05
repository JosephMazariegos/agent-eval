import TaskItem from "./TaskItem";

function TaskList({ tasks, handleEdit, handleDelete}) {
    return (
        <>
          <h2>Tasks</h2>

          {tasks.length === 0? (
            <p>No tasks found.</p>
          ) : (
            <ul>
                {tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                ))}
            </ul>
          )}
        </>
    );
}

export default TaskList;