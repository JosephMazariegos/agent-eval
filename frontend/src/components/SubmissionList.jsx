import SubmissionItem from "./SubmissionItem";

function SubmissionList ({submissions}) {
    return (
        <>
          {submissions.length === 0 ? (
            <p> No submissions found for this task.</p>
          ) : (
            <ul>
                {submissions.map((submission) => (
                    <SubmissionItem key={submission.id} submission={submission} />
                ))}
            </ul>
          )}
        </>
    );
}

export default SubmissionList;