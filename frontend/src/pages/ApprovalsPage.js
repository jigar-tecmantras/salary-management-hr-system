import { useEffect, useState } from 'react';
import { fetchApprovals, updateApproval } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './ApprovalsPage.css';

function ApprovalsPage() {
  const { token } = useAuth();
  const [approvals, setApprovals] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const loadApprovals = () => {
    fetchApprovals(token)
      .then((data) => setApprovals(data))
      .catch(() => setApprovals([]))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    loadApprovals();
  }, [token]);

  const handleDecision = async (id, status) => {
    try {
      await updateApproval(token, id, status);
      loadApprovals();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="approvals-page">
      <h2>Approval Workflow</h2>
      {refreshing ? (
        <p>Loading requests...</p>
      ) : approvals.length === 0 ? (
        <p>No approval requests.</p>
      ) : (
        <div className="approvals-grid">
          {approvals.map((approval) => (
            <article key={approval.id}>
              <header>
                <strong>{approval.employeeName}</strong>
                <span>{new Date(approval.requestedOn).toLocaleDateString()}</span>
              </header>
              <p>{approval.comment}</p>
              <p>
                Requested By: <em>{approval.requestedBy}</em>
              </p>
              <div className="status">Status: {approval.status}</div>
              {approval.status === 'Pending' && (
                <div className="actions">
                  <button type="button" onClick={() => handleDecision(approval.id, 'Approved')}>
                    Approve
                  </button>
                  <button type="button" onClick={() => handleDecision(approval.id, 'Rejected')}>
                    Reject
                  </button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ApprovalsPage;
