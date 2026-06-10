function MetricsSummary({ submissions, evaluationsBySubmission }) {
  const allEvaluations = submissions.flatMap((submission) => {
    return evaluationsBySubmission[submission.id] || [];
  });

  const totalSubmissions = submissions.length;
  const totalEvaluations = allEvaluations.length;

  function average(values) {
    if (values.length === 0) {
      return 0;
    }

    const total = values.reduce((sum, value) => sum + value, 0);
    return total / values.length;
  }

  const averageScore = average(
    allEvaluations.map((evaluation) => evaluation.score),
  );
  const averageTestsPassed = average(
    allEvaluations.map((evaluation) => evaluation.tests_passed),
  );
  const averageTestsFailed = average(
    allEvaluations.map((evaluation) => evaluation.tests_failed),
  );
  const averageRuntimeMs = average(
    allEvaluations.map((evaluation) => evaluation.runtime_ms),
  );
  const averageLintErrors = average(
    allEvaluations.map((evaluation) => evaluation.lint_errors),
  );

  return (
    <div>
      <h4>Metrics Summary</h4>

      <p>
        <strong> Total submissions:</strong> {totalSubmissions}
      </p>

      <p>
        <strong> Total evaluations:</strong> {totalEvaluations}
      </p>

      <p>
        <strong> Average score:</strong> {averageScore.toFixed(1)}
      </p>

      <p>
        <strong> Average tests passed:</strong> {averageTestsPassed.toFixed(1)}
      </p>

      <p>
        <strong> Average tests failed:</strong> {averageTestsFailed.toFixed(1)}
      </p>

      <p>
        <strong> Average runtime (ms):</strong> {averageRuntimeMs.toFixed(1)} ms
      </p>

      <p>
        <strong> Average lint errors:</strong> {averageLintErrors.toFixed(1)}
      </p>
    </div>
  );
}

export default MetricsSummary;
