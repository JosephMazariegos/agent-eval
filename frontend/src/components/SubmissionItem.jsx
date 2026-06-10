import EvaluationList from "./EvaluationList";
import EvaluationForm from "./EvaluationForm";

function SubmissionItem({ 
    submission,
    evaluations,
    evaluationFormSubmissionId,
    setEvaluationFormSubmissionId,
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

            <button onClick={() => setEvaluationFormSubmissionId(submission.id)}>
                Add Evaluation
            </button>

            {evaluationFormSubmissionId === submission.id && (
                <EvaluationForm
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
            )}

            <EvaluationList evaluations={evaluations} />
        </li>
    );
}

export default SubmissionItem;