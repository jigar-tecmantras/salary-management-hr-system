using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SalaryManagement.API.Data;
using SalaryManagement.API.Models;

namespace SalaryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly DataContext _context;

    public ReportsController(DataContext context) => _context = context;

    [HttpGet("summary")]
    public IActionResult Summary()
    {
        var summary = BuildSummary();
        return Ok(summary);
    }

    [HttpGet("dashboard")]
    public IActionResult Dashboard()
    {
        var summary = BuildSummary();
        var recentPayrolls = _context.PayrollRecords
            .OrderByDescending(r => r.Period)
            .Take(5)
            .Select(r => new
            {
                r.EmployeeName,
                Period = r.Period.ToString("Y"),
                r.GrossSalary,
                r.NetSalary
            })
            .ToList();

        var pendingApprovals = _context.ApprovalRequests
            .Where(a => a.Status == ApprovalStatus.Pending)
            .OrderByDescending(a => a.RequestedOn)
            .Take(5)
            .Select(a => new
            {
                a.EmployeeName,
                a.Comment,
                a.RequestedBy,
                RequestedOn = a.RequestedOn.ToString("d")
            })
            .ToList();

        return Ok(new
        {
            Summary = summary,
            RecentPayrolls = recentPayrolls,
            PendingApprovals = pendingApprovals
        });
    }

    private object BuildSummary()
    {
        var totalPayroll = _context.PayrollRecords.Sum(r => r.NetSalary);
        var lastPeriod = _context.PayrollRecords.OrderByDescending(r => r.Period).FirstOrDefault();
        var pendingApprovals = _context.ApprovalRequests.Count(a => a.Status == ApprovalStatus.Pending);
        var employees = _context.Employees;
        var averageBaseSalary = employees.Any() ? employees.Average(e => e.BaseSalary) : 0m;

        return new
        {
            TotalPayroll = decimal.Round(totalPayroll, 2),
            LastPayrollPeriod = lastPeriod is null ? "Not processed" : lastPeriod.Period.ToString("Y"),
            PendingApprovals = pendingApprovals,
            AverageBaseSalary = decimal.Round(averageBaseSalary, 2),
            EmployeeCount = employees.Count
        };
    }
}
