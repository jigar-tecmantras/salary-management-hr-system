import { useEffect, useState } from 'react';
import apiClient from '../api/axios';
import SalaryTable from '../components/SalaryTable';

const initialForm = {
  employeeId: '',
  name: '',
  componentType: 'Allowance',
  amount: ''
};

const SalarySetupPage = () => {
  const [salaryData, setSalaryData] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [formValues, setFormValues] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadSalaries = () => {
    apiClient
      .get('/salaries')
      .then((res) => setSalaryData(res.data))
      .catch(() => setError('Unable to fetch salary data.'));
  };

  const loadEmployees = () => {
    apiClient
      .get('/employees')
      .then((res) => setEmployees(res.data))
      .catch(() => setError('Unable to fetch employees.'));
  };

  useEffect(() => {
    loadSalaries();
    loadEmployees();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    try {
      await apiClient.post('/salaries/components', {
        employeeId: formValues.employeeId,
        name: formValues.name,
        componentType: formValues.componentType,
        amount: Number(formValues.amount)
      });
      setMessage('Component added.');
      setFormValues(initialForm);
      loadSalaries();
    } catch (err) {
      setError('Failed to add salary component.');
    }
  };

  return (
    <section>
      <header className="page-header">
        <h2>Salary Setup</h2>
        <p>Review and extend allowances or deductions per employee.</p>
      </header>
      {message && <div className="info-card">{message}</div>}
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <select name="employeeId" value={formValues.employeeId} onChange={handleChange} required>
            <option value="">Select employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.fullName}
              </option>
            ))}
          </select>
          <input name="name" value={formValues.name} onChange={handleChange} placeholder="Component name" required />
          <select name="componentType" value={formValues.componentType} onChange={handleChange}>
            <option value="Allowance">Allowance</option>
            <option value="Deduction">Deduction</option>
          </select>
          <input
            name="amount"
            value={formValues.amount}
            onChange={handleChange}
            placeholder="Amount"
            type="number"
            min="0"
            step="0.01"
            required
          />
        </div>
        <div style={{ marginTop: '12px' }}>
          <button className="primary" type="submit">
            Save component
          </button>
        </div>
      </form>
      <SalaryTable data={salaryData} />
    </section>
  );
};

export default SalarySetupPage;
