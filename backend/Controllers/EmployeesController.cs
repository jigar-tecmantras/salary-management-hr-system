using Microsoft.AspNetCore.Mvc;
using SalaryManagement.API.Data;
using SalaryManagement.API.Models;

namespace SalaryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeesController : ControllerBase
{
    private readonly DataContext _context;

    public EmployeesController(DataContext context) => _context = context;

    [HttpGet]
    public IActionResult Get() => Ok(_context.Employees);

    [HttpPost]
    public IActionResult Create([FromBody] EmployeeCreateRequest request)
    {
        if (request.BaseSalary <= 0 || string.IsNullOrWhiteSpace(request.FullName))
        {
            return BadRequest(new { message = "Full name and base salary are required." });
        }

        var employee = new Employee
        {
            Id = Guid.NewGuid(),
            FullName = request.FullName,
            Department = request.Department,
            Position = request.Position,
            Email = request.Email,
            BaseSalary = request.BaseSalary
        };

        _context.AddEmployee(employee);

        return CreatedAtAction(nameof(Get), new { id = employee.Id }, employee);
    }

    public record EmployeeCreateRequest(string FullName, string Department, string Position, string Email, decimal BaseSalary);
}
