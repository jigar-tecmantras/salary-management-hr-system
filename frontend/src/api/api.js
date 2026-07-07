import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://localhost:5001/api',
  timeout: 10000,
});

export const fetchEmployees = () => apiClient.get('/employees').then((res) => res.data);
export const createEmployee = (payload) => apiClient.post('/employees', payload).then((res) => res.data);
export const fetchSalaries = () => apiClient.get('/salaries').then((res) => res.data);
export const addSalaryComponent = (component) => apiClient.post('/salaries/components', component).then((res) => res.data);
export const fetchPayrollRecords = () => apiClient.get('/payroll').then((res) => res.data);
export const runPayroll = (body) => apiClient.post('/payroll/process', body).then((res) => res.data);
export const fetchApprovals = () => apiClient.get('/approvals').then((res) => res.data);
export const createApproval = (payload) => apiClient.post('/approvals', payload).then((res) => res.data);
export const updateApproval = (id, status) => apiClient.put(`/approvals/${id}`, { status }).then((res) => res.data);
export const fetchReports = () => apiClient.get('/reports/summary').then((res) => res.data);
