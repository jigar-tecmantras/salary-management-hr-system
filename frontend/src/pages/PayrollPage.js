import { useState } from 'react';
import { runPayroll, fetchPayrollRecords } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './PayrollPage.css';

function PayrollPage() {
  const { token } = useAuth();
  const [form, setForm] = useState({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 });
  const [records, setRecords] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');

  const loadRecords = () => {
    fetchPayrollRecords(token)
      .then(setRecords)
      .catch(() => setRecords([]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setMessage('');

    try {
      const data = await runPayroll(token, form);
      setRecords(data);
      setMessage('Payroll processed successfully.');
    } catch (error) {
      setMessage('Failed to process payroll.');
    } finally {
      setProcessing(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: Number(value) }));
  };

  return (
    <div className="payroll-page">
      <h2>Payroll Processing</h2>
      <form className="payroll-form" onSubmit={handleSubmit}>
        <label>
          Year
          <input name="year" type="number" value={form.year} onChange={handleChange} min="2000" max="2100" required />
        </label>
        <label>
          Month
          <input name="month" type="number" value={form.month} onChange={handleChange} min="1" max="12" required />
        </label>
        <button type="submit" disabled={processing}>{processing ? 'Processing...' : 'Run Payroll'}</button>
      </form>
      {message && <p>{message}</p>}
      <section className="payroll-records">
        <h3>Latest Payroll Records</h3>
        {records.length === 0 ? (
          <p>No payroll records yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Period</th>
                <th>Gross</th>
                <th>Net</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id}>
                  <td>{record.employeeName}</td>
                  <td>{new Date(record.period).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
                  <td>${record.grossSalary.toLocaleString()}</td>
                  <td>${record.netSalary.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default PayrollPage;
