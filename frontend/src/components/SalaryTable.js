const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value ?? 0);

const SalaryTable = ({ data }) => (
  <table className="data-table">
    <thead>
      <tr>
        <th>Employee</th>
        <th>Department</th>
        <th>Base</th>
        <th>Allowances</th>
        <th>Deductions</th>
        <th>Net</th>
      </tr>
    </thead>
    <tbody>
      {data.length === 0 && (
        <tr>
          <td colSpan={6}>No salary data available.</td>
        </tr>
      )}
      {data.map((row) => (
        <tr key={row.employeeId}>
          <td>{row.fullName}</td>
          <td>{row.department}</td>
          <td>{formatCurrency(row.baseSalary)}</td>
          <td>{formatCurrency(row.allowances)}</td>
          <td>{formatCurrency(row.deductions)}</td>
          <td>{formatCurrency(row.netSalary)}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default SalaryTable;
