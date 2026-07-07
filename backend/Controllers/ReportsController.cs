using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SalaryManagement.API.Data;
using SalaryManagement.API.Models;

namespace SalaryManagement.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly DataContext _context;

    public ReportsController(DataContext context) => _context = context;

    [HttpGet("summary")]
    public IActionResult Summary()
    {
        var totalPayroll = _context.PayrollRecords.Sum(r => r.NetSalary);
        var lastPeriod = _context.PayrollRecords.OrderByDescending(r => r.Period).FirstOrDefault();
        var pendingApprovals = _context.ApprovalRequests.Count(a => a.Status == ApprovalStatus.Pending);
        var averageBaseSalary = _context.Employees.Any() ? _context.Employees.Average(e => e.BaseSalary) : 0;

        return Ok(new
        {
            TotalPayroll = decimal.Round(totalPayroll, 2),
            LastPayrollPeriod = lastPeriod is null ? "Not processed" : lastPeriod.Period.ToString("Y"),
            PendingApprovals = pendingApprovals,
            AverageBaseSalary = decimal.Round(averageBaseSalary, 2)
        });
    }
}
