import { useEffect, useState } from 'react';
import { fetchReports } from '../api/api';
import './ReportsPage.css';

const ReportsPage = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchReports()
      .then(setSummary)
      .catch(() => setSummary(null));
  }, []);

  return (
    <section>
      <header className="page-header">
        <h2>Reports & Alerts</h2>
        <p>High-level payroll and approval analytics.</p>
      </header>
      {summary ? (
        <div className="card-grid">
          <div className="info-card">
            <span>Total Payroll</span>
            <strong>${summary.TotalPayroll.toFixed(2)}</strong>
          </div>
          <div className="info-card">
            <span>Average Base Salary</span>
            <strong>${summary.AverageBaseSalary.toFixed(2)}</strong>
          </div>
          <div className="info-card">
            <span>Pending Approvals</span>
            <strong>{summary.PendingApprovals}</strong>
          </div>
          <div className="info-card">
            <span>Last Processed Period</span>
            <strong>{summary.LastPayrollPeriod}</strong>
          </div>
        </div>
      ) : (
        <p>Unable to load reports.</p>
      )}
    </section>
  );
};

export default ReportsPage;
