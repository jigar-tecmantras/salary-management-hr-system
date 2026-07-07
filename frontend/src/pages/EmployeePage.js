import { useEffect, useState } from 'react';
import apiClient from '../api/axios';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value ?? 0);

const initialForm = {
  fullName: '',
  department: '',
  position: '',
  email: '',
  baseSalary: ''
};

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [formValues, setFormValues] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadEmployees = () => {
    apiClient
      .get('/employees')
      .then((res) => setEmployees(res.data))
      .catch(() => setError('Unable to load employee directory.'));
  };

  useEffect(() => {
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
      await apiClient.post('/employees', {
        ...formValues,
        baseSalary: Number(formValues.baseSalary)
      });
      setMessage('Employee added successfully.');
      setFormValues(initialForm);
      loadEmployees();
    } catch (err) {
      setError('Failed to add employee.');
    }
  };

  return (
    <section>
      <header className="page-header">
        <h2>Employees</h2>
        <p>Manage employee records and salary caps.</p>
      </header>
      {message && <div className="info-card">{message}</div>}
      {error && <div className="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <input name="fullName" value={formValues.fullName} onChange={handleChange} placeholder="Full name" required />
          <input name="department" value={formValues.department} onChange={handleChange} placeholder="Department" />
          <input name="position" value={formValues.position} onChange={handleChange} placeholder="Position" />
          <input name="email" value={formValues.email} onChange={handleChange} placeholder="Email" type="email" />
          <input
            name="baseSalary"
            value={formValues.baseSalary}
            onChange={handleChange}
            placeholder="Base salary"
            type="number"
            min="0"
            step="0.01"
          />
        </div>
        <div style={{ marginTop: '12px' }}>
          <button className="primary" type="submit">
            Add employee
          </button>
        </div>
      </form>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Email</th>
            <th>Base Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.fullName}</td>
              <td>{employee.department}</td>
              <td>{employee.position}</td>
              <td>{employee.email}</td>
              <td>{formatCurrency(employee.baseSalary)}</td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan={5}>No employees yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default EmployeePage;
