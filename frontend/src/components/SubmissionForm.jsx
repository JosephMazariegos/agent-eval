function SubmissionForm({
    toolName,
    promptUsed,
    generatedCode,
    iterationCount,
    manualEdits,
    timeSpendSeconds,
    setToolName,
    setPromptUsed,
    setGeneratedCode,
    setIterationCount,
    setManualEdits,
    setTimeSpendSeconds,
    handleSubmissionSubmit,
}) {
    return (
        <>
          <h3>Add Submission</h3>
          
          <form onSubmit={handleSubmissionSubmit}>
            <div>
                <label>Tool Name</label>
                <br />
                <input
                  type="text"
                  value={toolName}
                  onChange={(event) => setToolName(event.target.value)}
                  placeholder="e.g. Cursor, Copilot, Claude"
                />
            </div>

            <br />

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
                <label>Genereated Code</label>
                <br />
                <textarea
                  value={generatedCode}
                  onChange={(event) => setGeneratedCode(event.target.value)}
                  placeholder="Paste the generated code."
                  rows={8}
                  cols={80}
                />
            </div>

            <br />

            <div>
                <label> Iteration Count</label>
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
        </>
    );
}

export default SubmissionForm