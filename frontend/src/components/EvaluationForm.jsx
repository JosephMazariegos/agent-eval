function EvaluationForm({
    testsPassed,
    testsFailed,
    runtimeMs,
    lintErrors,
    score,
    evaluationNotes,
    setTestsPassed,
    setTestsFailed,
    setRuntimeMs,
    setLintErrors,
    setScore,
    setEvaluationNotes,
    handleEvaluationSubmit,
}) {
    return (
        <form onSubmit={handleEvaluationSubmit}>
            <h4>Add Evaluation</h4>

            <div>
                <label>Tests Passed</label>
                <br />
                <input
                  type="number"
                  value={testsPassed}
                  onChange={(event) => setTestsPassed(event.target.value)}
                />
            </div>

            <br />

            <div>
                <label>Tests Failed</label>
                <br />
                <input
                  type="number"
                  value={testsFailed}
                  onChange={(event) => setTestsFailed(event.target.value)}
                />
            </div>

            <br />

            <div>
                <label>Runtime (ms)</label>
                <br />
                <input
                  type="number"
                  value={runtimeMs}
                  onChange={(event) => setRuntimeMs(event.target.value)}
                />
            </div>

            <br />

            <div>
                <label>Lint Errors</label>
                <br />
                <input
                  type="number"
                  value={lintErrors}
                  onChange={(event) => setLintErrors(event.target.value)}
                />
            </div>

            <br />

            <div>
                <label>Score</label>
                <br />
                <input
                  type="number"
                  value={score}
                  onChange={(event) => setScore(event.target.value)}
                />
            </div>

            <br />

            <div>
                <label>Notes</label>
                <br />
                <textarea
                  value={evaluationNotes}
                  onChange={(event) => setEvaluationNotes(event.target.value)}
                  placeholder="Notes about correctness, style, issues, etc..."
                />
            </div>

            <br />
            <button type="submit">Add Evaluation</button>
        </form>
    );
}

export default EvaluationForm;