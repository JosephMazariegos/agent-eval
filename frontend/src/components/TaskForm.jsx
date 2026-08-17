function TaskForm({
    title,
    description,
    editingTaskId,
    setTitle,
    setDescription,
    setEditingTaskId,
    handleSubmit,
    category,
    setCategory,
    difficulty,
    setDifficulty,
    language,
    setLanguage,
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

            <div>
              <label>Category</label>
              <br/>
              <input
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="e.g. Algorithms"
                />
            </div>

            <div>
              <label>Difficulty</label>
              <br/>
              <select
                value={difficulty}
                onChange={(event) => setDifficulty(event.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div>
              <label>Language</label>
              <br/>
              <input
                type="text"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                placeholder="e.g. Python"
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