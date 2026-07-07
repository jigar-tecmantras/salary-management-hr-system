import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="page-body" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '360px', padding: '24px', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 25px rgba(15,23,42,0.2)' }}>
        <h2 style={{ marginBottom: '16px' }}>HR Login</h2>
        {error && <div className="alert">{error}</div>}
        <div className="form-grid">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <button className="primary" type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
