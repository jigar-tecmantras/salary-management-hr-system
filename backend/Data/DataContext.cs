using System.Collections.Generic;
using System.Linq;
using SalaryManagement.API.Models;

namespace SalaryManagement.API.Data;

public class DataContext
{
    private readonly List<Employee> _employees = new();
    private readonly List<SalaryComponent> _components = new();
    private readonly List<PayrollRecord> _payrollRecords = new();
    private readonly List<ApprovalRequest> _approvals = new();

    public IReadOnlyList<Employee> Employees => _employees;
    public IReadOnlyList<SalaryComponent> SalaryComponents => _components;
    public IReadOnlyList<PayrollRecord> PayrollRecords => _payrollRecords;
    public IReadOnlyList<ApprovalRequest> ApprovalRequests => _approvals;

    public DataContext()
    {
        var sophia = new Employee
        {
            Id = Guid.NewGuid(),
            FullName = "Sophia Patel",
            Department = "HR Operations",
            Position = "HR Manager",
            Email = "sophia.patel@company.com",
            BaseSalary = 95000m
        };

        var liam = new Employee
        {
            Id = Guid.NewGuid(),
            FullName = "Liam Gomez",
            Department = "Engineering",
            Position = "Senior Software Engineer",
            Email = "liam.gomez@company.com",
            BaseSalary = 88000m
        };

        var ava = new Employee
        {
            Id = Guid.NewGuid(),
            FullName = "Ava Roth",
            Department = "Finance",
            Position = "Payroll Analyst",
            Email = "ava.roth@company.com",
            BaseSalary = 78000m
        };

        _employees.AddRange(new[] { sophia, liam, ava });

        _components.AddRange(new[]
        {
            new SalaryComponent
            {
                Id = Guid.NewGuid(),
                EmployeeId = sophia.Id,
                Name = "Housing Allowance",
                ComponentType = SalaryComponentType.Allowance,
                Amount = 3500m
            },
            new SalaryComponent
            {
                Id = Guid.NewGuid(),
                EmployeeId = sophia.Id,
                Name = "Transport Allowance",
                ComponentType = SalaryComponentType.Allowance,
                Amount = 900m
            },
            new SalaryComponent
            {
                Id = Guid.NewGuid(),
                EmployeeId = sophia.Id,
                Name = "Health Deduction",
                ComponentType = SalaryComponentType.Deduction,
                Amount = 600m
            },
            new SalaryComponent
            {
                Id = Guid.NewGuid(),
                EmployeeId = liam.Id,
                Name = "Housing Allowance",
                ComponentType = SalaryComponentType.Allowance,
                Amount = 2800m
            },
            new SalaryComponent
            {
                Id = Guid.NewGuid(),
                EmployeeId = liam.Id,
                Name = "Project Bonus (pending)",
                ComponentType = SalaryComponentType.Allowance,
                Amount = 1200m
            },
            new SalaryComponent
            {
                Id = Guid.NewGuid(),
                EmployeeId = liam.Id,
                Name = "Taxes",
                ComponentType = SalaryComponentType.Deduction,
                Amount = 1100m
            },
            new SalaryComponent
            {
                Id = Guid.NewGuid(),
                EmployeeId = ava.Id,
                Name = "Travel Stipend",
                ComponentType = SalaryComponentType.Allowance,
                Amount = 600m
            },
            new SalaryComponent
            {
                Id = Guid.NewGuid(),
                EmployeeId = ava.Id,
                Name = "Benefits Deduction",
                ComponentType = SalaryComponentType.Deduction,
                Amount = 750m
            }
        });

        _approvals.Add(new ApprovalRequest
        {
            Id = Guid.NewGuid(),
            EmployeeId = liam.Id,
            EmployeeName = liam.FullName,
            Comment = "Need approval for a one-time bonus release for the secure launch.",
            RequestedBy = "HR Admin",
            Status = ApprovalStatus.Pending,
            RequestedOn = DateTime.UtcNow.AddDays(-2)
        });
    }

    public void AddEmployee(Employee employee) => _employees.Add(employee);

    public void AddSalaryComponent(SalaryComponent component) => _components.Add(component);

    public void AddApproval(ApprovalRequest approval) => _approvals.Add(approval);

    public bool UpdateApprovalStatus(Guid id, ApprovalStatus status)
    {
        var request = _approvals.FirstOrDefault(a => a.Id == id);
        if (request is null)
        {
            return false;
        }

        request.Status = status;
        return true;
    }

    public IEnumerable<SalaryComponent> GetComponentsForEmployee(Guid employeeId)
        => _components.Where(c => c.EmployeeId == employeeId).ToList();

    public IEnumerable<PayrollRecord> ProcessPayroll(int year, int month)
    {
        _payrollRecords.RemoveAll(record => record.Period.Year == year && record.Period.Month == month);
        var created = new List<PayrollRecord>();

        foreach (var employee in _employees)
        {
            var components = GetComponentsForEmployee(employee.Id).ToList();
            var allowances = components.Where(c => c.ComponentType == SalaryComponentType.Allowance).Sum(c => c.Amount);
            var deductions = components.Where(c => c.ComponentType == SalaryComponentType.Deduction).Sum(c => c.Amount);
            var gross = employee.BaseSalary + allowances;
            var net = Math.Max(0, gross - deductions);

            var payroll = new PayrollRecord
            {
                Id = Guid.NewGuid(),
                EmployeeId = employee.Id,
                EmployeeName = employee.FullName,
                Period = new DateTime(year, month, 1),
                GrossSalary = decimal.Round(gross, 2),
                NetSalary = decimal.Round(net, 2),
                Components = components
            };

            _payrollRecords.Add(payroll);
            created.Add(payroll);
        }

        return created;
    }
}
