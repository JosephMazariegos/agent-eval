function TaskForm({
    title,
    description,
    editingTaskId,
    setTitle,
    setDescription,
    setEditingTaskId,
    handleSubmit,
}) {
    return (
      <>
        <h2>{editingTaskId == null ? "Create Task" : "Edit Task"}</h2>

        <form onSubmit={handleSubmit}>
            <div>
                <label>Title</label>
                <br />
                <input
                  type="text"
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
            <button type="submit">
                {editingTaskId == null ? "Create Task" : "Save Changes"}
            </button>

            {editingTaskId !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingTaskId(null);
                    setTitle("");
                    setDescription("");
                  }}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
            )}
        </form>
      </>
    );
}

export default TaskForm;