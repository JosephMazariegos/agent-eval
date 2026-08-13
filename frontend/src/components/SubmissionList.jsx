import SubmissionItem from "./SubmissionItem";

function SubmissionList ({
    submissions,
    evaluationsBySubmission,
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
    handleDeleteEvaluation,
    handleEditEvaluation,
    editingEvaluationId,
}) {
    return (
        <>
          {submissions.length === 0 ? (
            <p> No submissions found for this task.</p>
          ) : (
            <ul>
                {submissions.map((submission) => (
                    <SubmissionItem 
                      key={submission.id} 
                      submission={submission}
                      evaluations={evaluationsBySubmission[submission.id] || []}
                      handleDeleteEvaluation={handleDeleteEvaluation}
                      evaluationFormSubmissionId={evaluationFormSubmissionId}
                      setEvaluationFormSubmissionId={setEvaluationFormSubmissionId}
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
                      handleEditEvaluation={handleEditEvaluation}
                      editingEvaluationId={editingEvaluationId}
                    />
                ))}
            </ul>
          )}
        </>
    );
}

export default SubmissionList;