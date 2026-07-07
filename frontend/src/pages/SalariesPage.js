import { useEffect, useState } from 'react';
import { fetchSalaries } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './SalariesPage.css';

function SalariesPage() {
  const { token } = useAuth();
  const [salaries, setSalaries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchSalaries(token)
      .then((data) => {
        if (active) {
          setSalaries(data);
        }
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [token]);

  return (
    <div className="salaries-page">
      <h2>Salary Breakdown</h2>
      {loading ? (
        <p>Loading salary data...</p>
      ) : (
        <div className="salary-grid">
          {salaries.map((salary) => (
            <article key={salary.employeeId}>
              <header>
                <strong>{salary.fullName}</strong>
                <span>{salary.department}</span>
              </header>
              <p>Base: ${salary.baseSalary.toLocaleString()}</p>
              <p>Allowances: ${salary.allowances.toLocaleString()}</p>
              <p>Deductions: ${salary.deductions.toLocaleString()}</p>
              <p>
                <strong>Net: ${salary.netSalary.toLocaleString()}</strong>
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default SalariesPage;
