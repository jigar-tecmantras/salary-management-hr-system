import { useEffect, useState } from 'react';
import { fetchEmployees } from '../api/api';
import './EmployeesPage.css';

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchEmployees()
      .then((data) => {
        if (mounted) {
          setEmployees(data);
        }
      })
      .catch(() => setEmployees([]))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="employees-page">
      <h2>Employee Directory</h2>
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Position</th>
              <th>Base Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.fullName}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>${employee.baseSalary.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmployeesPage;
