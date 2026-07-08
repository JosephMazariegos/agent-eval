function ToolComparison({submissions, evaluationsBySubmission}) {
    const toolStats = {};

    submissions.forEach((submission) => {
        const toolName = submission.tool_name;

        if (!toolStats[toolName]) {
            toolStats[toolName] = {
                submissionCount: 0,
                evaluationCount: 0,
                totalScore: 0,
                totalRuntimeMs: 0,
                totalLintErrors: 0,
                totalIterations: 0,
                totalManualEdits: 0,
                totalTimeSpentSeconds: 0,
            };
        }

        toolStats[toolName].submissionCount += 1;
        toolStats[toolName].totalIterations += submission.iteration_count;
        toolStats[toolName].totalManualEdits += submission.manual_edits;
        toolStats[toolName].totalTimeSpentSeconds += submission.time_spent_seconds

        const evaluations = evaluationsBySubmission[submission.id] || [];

        evaluations.forEach((evaluation) => {
            toolStats[toolName].evaluationCount += 1;
            toolStats[toolName].totalScore += evaluation.score;
            toolStats[toolName].totalRuntimeMs += evaluation.runtime_ms;
            toolStats[toolName].totalLintErrors += evaluation.lint_errors;
        });
    });

    const toolRows = Object.entries(toolStats).map(([toolName, stats]) => {
        const averageScore = stats.evaluationCount === 0 ? 0 : stats.totalScore / stats.evaluationCount;

        const averageRuntimeMs = stats.evaluationCount === 0 ? 0 : stats.totalRuntimeMs / stats.evaluationCount;

        const averageLintErrors = stats.evaluationCount === 0 ? 0 : stats.totalLintErrors / stats.evaluationCount;

        const averageIterations = stats.submissionCount === 0 ? 0 : stats.totalIterations/ stats.submissionCount;

        const averageManualEdits = stats.submissionCount === 0 ? 0 : stats.totalManualEdits / stats.submissionCount;

        const averageTimeSpentSeconds = stats.submissionCount === 0 ? 0 : stats.totalTimeSpentSeconds / stats.submissionCount;

        return {
            toolName,
            submissionCount: stats.submissionCount,
            evaluationCount: stats.evaluationCount,
            averageScore,
            averageRuntimeMs,
            averageLintErrors,
            averageIterations,
            averageManualEdits,
            averageTimeSpentSeconds
        };
    });

    if (toolRows.length === 0) {
        return (
            <div>
                <h3>Tool Comparison</h3>
                <p>No tools to compare yet.</p>
            </div>
        );
    }

    return (
        <div>
            <h3> Tool Comparison</h3>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Tool</th>
                        <th>Submissions</th>
                        <th>Evaluations</th>
                        <th>Average Score</th>
                        <th>Average Runtime (ms)</th>
                        <th>Average Lint Errors</th>
                        <th>Average Iterations</th>
                        <th>Average Manual Edits</th>
                        <th>Average Time Spent</th>
                    </tr>
                </thead>

                <tbody>
                    {toolRows.map((tool) => (
                        <tr key={tool.toolName}>
                            <td>{tool.toolName}</td>
                            <td>{tool.submissionCount}</td>
                            <td>{tool.evaluationCount}</td>
                            <td>{tool.averageScore.toFixed(1)}</td>
                            <td>{tool.averageRuntimeMs.toFixed(1)}</td>
                            <td>{tool.averageLintErrors.toFixed(1)}</td>
                            <td>{tool.averageIterations.toFixed(1)}</td>
                            <td>{tool.averageManualEdits.toFixed(1)}</td>
                            <td>{tool.averageTimeSpentSeconds.toFixed(1)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ToolComparison;