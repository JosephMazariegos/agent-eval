function EvaluationList({ 
  evaluations,
  submissionId,
  handleDeleteEvaluation,
  handleEditEvaluation,
}) {
  if (!evaluations || evaluations.length === 0) {
    return <p>No evaluations yet.</p>;
  }

  return (
    <div>
      <h4>Evaluation Results</h4>

      <ul>
        {evaluations.map((evaluation) => (
          <li key={evaluation.id} className="evaluation-card">
            <p>
              <strong>Score:</strong> {evaluation.score}
            </p>

            <p>
              <strong>Tests:</strong> {evaluation.tests_passed} passed /{" "}
              {evaluation.tests_failed} failed
            </p>

            <p>
              <strong>Runtime:</strong> {evaluation.runtime_ms} ms
            </p>

            <p>
              <strong>Lint errors:</strong> {evaluation.lint_errors}
            </p>

            {evaluation.notes && (
              <p>
                <strong>Notes:</strong> {evaluation.notes}
              </p>
            )}
            <button onClick={()=> handleEditEvaluation(evaluation)}>
              Edit Evaluation
            </button>

            <button
              className="danger"
              onClick={() =>
                handleDeleteEvaluation(evaluation.id, submissionId)
              }
            >
              Delete Evaluation
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EvaluationList;