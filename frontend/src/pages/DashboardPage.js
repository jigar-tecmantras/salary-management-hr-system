import { useEffect, useMemo, useState } from 'react';
import { fetchDashboard } from '../api/api';
import './DashboardPage.css';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value ?? 0);

const DashboardPage = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const summary = dashboard?.summary ?? {};
  const recentPayrolls = dashboard?.recentPayrolls ?? [];
  const pendingApprovals = dashboard?.pendingApprovals ?? [];

  useEffect(() => {
    setLoading(true);
    fetchDashboard()
      .then(setDashboard)
      .catch(() => setError('Unable to load dashboard metrics.'))
      .finally(() => setLoading(false));
  }, []);

  const headerLabel = useMemo(() => {
    if (summary.lastPayrollPeriod) {
      return `Last processed: ${summary.lastPayrollPeriod}`;
    }
    return 'Payroll metrics are updated when payroll is processed.';
  }, [summary.lastPayrollPeriod]);

  return (
    <section className="dashboard-page">
      <header className="page-header">
        <h2>Dashboard</h2>
        <p>{headerLabel}</p>
      </header>
      {error && <div className="alert">{error}</div>}
      {loading ? (
        <p>Loading dashboard...</p>
      ) : (
        <>
          <div className="dashboard-grid">
            <div className="card">
              <span>Total Payroll</span>
              <strong>{formatCurrency(summary.totalPayroll)}</strong>
              <small>{summary.employeeCount ?? 0} employees</small>
            </div>
            <div className="card">
              <span>Average Base Salary</span>
              <strong>{formatCurrency(summary.averageBaseSalary)}</strong>
              <small>Across {summary.employeeCount ?? 0} employees</small>
            </div>
            <div className="card">
              <span>Pending Approvals</span>
              <strong>{summary.pendingApprovals ?? 0}</strong>
              <small>Awaiting review</small>
            </div>
            <div className="card">
              <span>Last Payroll Batch</span>
              <strong>{summary.lastPayrollPeriod ?? 'Not processed'}</strong>
              <small>Updated monthly</small>
            </div>
          </div>
          <div className="dashboard-sections">
            <div className="section-card">
              <header>
                <h3>Recent Payrolls</h3>
              </header>
              {recentPayrolls.length === 0 ? (
                <p>No payroll batches processed yet.</p>
              ) : (
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Period</th>
                      <th>Gross</th>
                      <th>Net</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentPayrolls.map((record) => (
                      <tr key={`${record.employeeName}-${record.period}`}>
                        <td>{record.employeeName}</td>
                        <td>{record.period}</td>
                        <td>{formatCurrency(record.grossSalary)}</td>
                        <td>{formatCurrency(record.netSalary)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="section-card">
              <header>
                <h3>Pending Approvals</h3>
              </header>
              {pendingApprovals.length === 0 ? (
                <p>No approval requests pending.</p>
              ) : (
                <ul className="approval-list">
                  {pendingApprovals.map((request) => (
                    <li key={`${request.employeeName}-${request.requestedOn}`}>
                      <strong>{request.employeeName}</strong>
                      <p>{request.comment}</p>
                      <small>
                        Requested by {request.requestedBy} · {request.requestedOn}
                      </small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default DashboardPage;
