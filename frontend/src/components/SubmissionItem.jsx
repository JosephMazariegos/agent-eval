function SubmissionItem({ submission }) {
    return (
        <li>
            <strong>{submission.tool_name}</strong>

            <p>
                <strong>Prompt:</strong> {submission.prompt_used}
            </p>

            <pre>{submission.generated_code}</pre>

            <p>
                Iterations: {submission.iteration_count} | Manual edits:{""}
                {submission.manual_edits} | Time: {submission.time_spent_seconds}s
            </p>
        </li>
    );
}

export default SubmissionItem;