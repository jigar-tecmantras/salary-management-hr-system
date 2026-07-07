import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:5001/api',
  timeout: 10000,
});

const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const login = ({ username, password }) =>
  apiClient.post('/auth/login', { username, password }).then((res) => res.data);

export const fetchEmployees = (token) =>
  apiClient.get('/employees', authHeaders(token)).then((res) => res.data);

export const fetchSalaries = (token) =>
  apiClient.get('/salaries', authHeaders(token)).then((res) => res.data);

export const fetchPayrollRecords = (token) =>
  apiClient.get('/payroll', authHeaders(token)).then((res) => res.data);

export const runPayroll = (token, { year, month }) =>
  apiClient.post('/payroll/process', { year, month }, authHeaders(token)).then((res) => res.data);

export const fetchApprovals = (token) =>
  apiClient.get('/approvals', authHeaders(token)).then((res) => res.data);

export const updateApproval = (token, id, status) =>
  apiClient.put(`/approvals/${id}`, { status }, authHeaders(token)).then((res) => res.data);

export const fetchReports = (token) =>
  apiClient.get('/reports/summary', authHeaders(token)).then((res) => res.data);
