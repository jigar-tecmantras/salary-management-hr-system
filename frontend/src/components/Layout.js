import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/employees', label: 'Employees' },
  { to: '/salaries', label: 'Salary Setup' },
  { to: '/payroll', label: 'Payroll' },
  { to: '/approvals', label: 'Approvals' },
  { to: '/reports', label: 'Reports' }
];

const Layout = () => (
  <div className="app-shell">
    <aside className="sidebar">
      <div className="brand">HR Payroll</div>
      <nav>
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
    <div className="content-area">
      <header className="top-bar">
        <div>
          <h1>Salary Management</h1>
          <p>HR control center</p>
        </div>
      </header>
      <main className="page-body">
        <Outlet />
      </main>
    </div>
  </div>
);

export default Layout;
