using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SalaryManagement.API.Data;
using SalaryManagement.API.Models;

namespace SalaryManagement.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ApprovalsController : ControllerBase
{
    private readonly DataContext _context;

    public ApprovalsController(DataContext context) => _context = context;

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.ApprovalRequests);
    }

    [HttpPost]
    public IActionResult Create([FromBody] ApprovalCreateRequest request)
    {
        var employee = _context.Employees.FirstOrDefault(e => e.Id == request.EmployeeId);

        if (employee is null)
        {
            return NotFound(new { message = "Employee not found." });
        }

        if (string.IsNullOrWhiteSpace(request.Comment) || string.IsNullOrWhiteSpace(request.RequestedBy))
        {
            return BadRequest(new { message = "Comment and requester name are required." });
        }

        var approval = new ApprovalRequest
        {
            Id = Guid.NewGuid(),
            EmployeeId = employee.Id,
            EmployeeName = employee.FullName,
            Comment = request.Comment,
            RequestedBy = request.RequestedBy,
            Status = ApprovalStatus.Pending,
            RequestedOn = DateTime.UtcNow
        };

        _context.AddApproval(approval);

        return Ok(approval);
    }

    [HttpPut("{id}")]
    public IActionResult Update(Guid id, [FromBody] ApprovalUpdateRequest request)
    {
        if (!_context.UpdateApprovalStatus(id, request.Status))
        {
            return NotFound(new { message = "Approval request not found." });
        }

        var approval = _context.ApprovalRequests.First(a => a.Id == id);

        return Ok(approval);
    }

    public record ApprovalCreateRequest(Guid EmployeeId, string Comment, string RequestedBy);
    public record ApprovalUpdateRequest(ApprovalStatus Status);
}
