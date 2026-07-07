import { useEffect, useState } from 'react';
import apiClient from '../api/axios';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value ?? 0);

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get('/reports/summary')
      .then((res) => setSummary(res.data))
      .catch(() => setError('Unable to load dashboard summary.'))
      .finally(() => setLoading(false));
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
          <strong>{formatCurrency(summary?.totalPayroll)}</strong>
        </div>
        <div className="card">
          <span>Average Base Salary</span>
          <strong>{formatCurrency(summary?.averageBaseSalary)}</strong>
        </div>
        <div className="card">
          <span>Pending Approvals</span>
          <strong>{summary?.pendingApprovals ?? 0}</strong>
        </div>
        <div className="card">
          <span>Last Processed Period</span>
          <strong>{summary?.lastPayrollPeriod ?? 'Not processed'}</strong>
        </div>
      </div>
      {loading && <p>Loading payroll insights...</p>}
    </section>
  );
};

export default DashboardPage;
