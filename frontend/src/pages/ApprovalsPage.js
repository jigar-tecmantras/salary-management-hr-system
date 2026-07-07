import { useEffect, useState } from 'react';
import { createApproval, fetchApprovals, updateApproval } from '../api/api';
import './ApprovalsPage.css';

const statuses = ['Pending', 'Approved', 'Rejected'];

const ApprovalsPage = () => {
  const [approvals, setApprovals] = useState([]);
  const [form, setForm] = useState({ employeeId: '', comment: '', requestedBy: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadApprovals = () => {
    fetchApprovals().then(setApprovals).catch(() => setApprovals([]));
  };

  useEffect(() => {
    loadApprovals();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      await createApproval(form);
      setMessage('Approval request submitted.');
      setForm({ employeeId: '', comment: '', requestedBy: '' });
      loadApprovals();
    } catch (err) {
      setError('Unable to submit approval request.');
    }
  };

  const handleDecision = async (id, status) => {
    setMessage('');
    setError('');
    try {
      await updateApproval(id, status);
      loadApprovals();
    } catch (err) {
      setError('Failed to update status.');
    }
  };

  return (
    <section>
      <header className="page-header">
        <h2>Approvals</h2>
        <p>Track salary-related approval requests.</p>
      </header>
      {message && <div className="info-card">{message}</div>}
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input name="employeeId" value={form.employeeId} onChange={handleChange} placeholder="Employee ID" required />
          <input name="requestedBy" value={form.requestedBy} onChange={handleChange} placeholder="Requested by" required />
          <textarea name="comment" value={form.comment} onChange={handleChange} placeholder="Approval comment" rows="2" required />
        </div>
        <div style={{ marginTop: '12px' }}>
          <button className="primary" type="submit">
            Create approval
          </button>
        </div>
      </form>
      <table className="data-table" style={{ marginTop: '16px' }}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Comment</th>
            <th>Requested By</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {approvals.map((request) => (
            <tr key={request.id}>
              <td>{request.employeeName}</td>
              <td>{request.comment}</td>
              <td>{request.requestedBy}</td>
              <td>{request.status}</td>
              <td>
                <select value={request.status} onChange={(event) => handleDecision(request.id, event.target.value)}>
                  {statuses.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
          {approvals.length === 0 && (
            <tr>
              <td colSpan={5}>No approvals yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default ApprovalsPage;
