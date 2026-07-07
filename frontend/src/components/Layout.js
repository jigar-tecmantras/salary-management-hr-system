import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="content-area">
        <header className="top-bar">
          <div>
            <h1>Salary Management</h1>
            <p>HR control center</p>
          </div>
          <div className="user-actions">
            <span>{user?.name ?? 'HR Team'}</span>
            <button className="ghost-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>
        <main className="page-body">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
