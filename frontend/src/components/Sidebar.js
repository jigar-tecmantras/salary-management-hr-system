import { NavLink } from 'react-router-dom';

const navLinks = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/employees', label: 'Employees' },
  { to: '/salaries', label: 'Salary Setup' },
  { to: '/payroll', label: 'Payroll' },
  { to: '/approvals', label: 'Approvals' },
  { to: '/reports', label: 'Reports' }
];

const Sidebar = () => (
  <aside className="sidebar">
    <div className="brand">HR Payroll</div>
    <nav>
      {navLinks.map((link) => (
        <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
