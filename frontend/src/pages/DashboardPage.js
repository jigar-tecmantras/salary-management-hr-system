import { useEffect, useState } from 'react';
import { fetchReports } from '../api/api';
import './DashboardPage.css';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value ?? 0);

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReports()
      .then(setSummary)
      .catch(() => setError('Unable to load dashboard summary.'));
  }, []);

  return (
    <section>
      <header className="page-header">
        <h2>Dashboard</h2>
        <p>Payroll totals, pending approvals, and averages.</p>
      </header>
      {error && <div className="alert">{error}</div>}
      <div className="dashboard-grid">
        <div className="card">
          <span>Total Payroll</span>
          <strong>{formatCurrency(summary?.TotalPayroll)}</strong>
        </div>
        <div className="card">
          <span>Average Base Salary</span>
          <strong>{formatCurrency(summary?.AverageBaseSalary)}</strong>
        </div>
        <div className="card">
          <span>Pending Approvals</span>
          <strong>{summary?.PendingApprovals ?? 0}</strong>
        </div>
        <div className="card">
          <span>Last Processed Period</span>
          <strong>{summary?.LastPayrollPeriod ?? 'Not processed'}</strong>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
