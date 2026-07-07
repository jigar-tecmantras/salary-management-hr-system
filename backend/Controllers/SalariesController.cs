using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SalaryManagement.API.Data;
using SalaryManagement.API.Models;

namespace SalaryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SalariesController : ControllerBase
{
    private readonly DataContext _context;

    public SalariesController(DataContext context) => _context = context;

    [HttpGet]
    public IActionResult Get()
    {
        var salaries = _context.Employees.Select(employee =>
        {
            var components = _context.GetComponentsForEmployee(employee.Id).ToList();
            var allowances = components.Where(c => c.ComponentType == SalaryComponentType.Allowance).Sum(c => c.Amount);
            var deductions = components.Where(c => c.ComponentType == SalaryComponentType.Deduction).Sum(c => c.Amount);
            var net = employee.BaseSalary + allowances - deductions;

            return new EmployeeSalaryDto(
                employee.Id,
                employee.FullName,
                employee.Department,
                employee.Position,
                employee.BaseSalary,
                allowances,
                deductions,
                decimal.Round(net, 2));
        });

        return Ok(salaries);
    }

    [HttpPost("components")]
    public IActionResult AddComponent([FromBody] SalaryComponentRequest request)
    {
        if (!_context.Employees.Any(e => e.Id == request.EmployeeId))
        {
            return NotFound(new { message = "Employee not found." });
        }

        if (request.Amount <= 0 || string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new { message = "Component name and amount are required." });
        }

        var component = new SalaryComponent
        {
            Id = Guid.NewGuid(),
            EmployeeId = request.EmployeeId,
            Name = request.Name,
            ComponentType = request.ComponentType,
            Amount = request.Amount
        };

        _context.AddSalaryComponent(component);

        return Ok(component);
    }

    public record SalaryComponentRequest(Guid EmployeeId, string Name, SalaryComponentType ComponentType, decimal Amount);

    public record EmployeeSalaryDto(
        Guid EmployeeId,
        string FullName,
        string Department,
        string Position,
        decimal BaseSalary,
        decimal Allowances,
        decimal Deductions,
        decimal NetSalary);
}
