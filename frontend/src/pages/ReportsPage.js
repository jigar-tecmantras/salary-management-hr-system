import { useEffect, useState } from 'react';
import { fetchReports } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './ReportsPage.css';

function ReportsPage() {
  const { token } = useAuth();
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchReports(token)
      .then(setSummary)
      .catch(() => setSummary(null));
  }, [token]);

  return (
    <div className="reports-page">
      <h2>Reports & Alerts</h2>
      {summary ? (
        <div className="reports-card">
          <p>
            <span>Total Net Payroll</span>
            <strong>${summary.TotalPayroll.toFixed(2)}</strong>
          </p>
          <p>
            <span>Pending Approvals</span>
            <strong>{summary.PendingApprovals}</strong>
          </p>
          <p>
            <span>Last Processed Period</span>
            <strong>{summary.LastPayrollPeriod}</strong>
          </p>
        </div>
      ) : (
        <p>Unable to load reports.</p>
      )}
    </div>
  );
}

export default ReportsPage;
