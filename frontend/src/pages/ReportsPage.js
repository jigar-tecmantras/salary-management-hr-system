import { useEffect, useState } from 'react';
import apiClient from '../api/axios';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value ?? 0);

const ReportsPage = () => {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/reports/summary')
      .then((res) => setSummary(res.data))
      .catch(() => setError('Unable to load reports.'));
  }, []);

  return (
    <section>
      <header className="page-header">
        <h2>Reports</h2>
        <p>High-level payroll and approval analytics.</p>
      </header>
      {error && <div className="alert">{error}</div>}
      <div className="card-grid">
        <div className="info-card">
          <span>Total Payroll</span>
          <strong>{formatCurrency(summary?.totalPayroll)}</strong>
        </div>
        <div className="info-card">
          <span>Average Base Salary</span>
          <strong>{formatCurrency(summary?.averageBaseSalary)}</strong>
        </div>
        <div className="info-card">
          <span>Pending Approvals</span>
          <strong>{summary?.pendingApprovals ?? 0}</strong>
        </div>
        <div className="info-card">
          <span>Last Processed Period</span>
          <strong>{summary?.lastPayrollPeriod ?? 'Not processed'}</strong>
        </div>
      </div>
    </section>
  );
};

export default ReportsPage;
