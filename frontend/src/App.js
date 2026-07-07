import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import EmployeePage from './pages/EmployeePage';
import SalarySetupPage from './pages/SalarySetupPage';
import PayrollPage from './pages/PayrollPage';
import ApprovalsPage from './pages/ApprovalsPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/salaries" element={<SalarySetupPage />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/approvals" element={<ApprovalsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
