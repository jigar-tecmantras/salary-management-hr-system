using Microsoft.AspNetCore.Mvc;
using SalaryManagement.API.Data;

namespace SalaryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PayrollController : ControllerBase
{
    private readonly DataContext _context;

    public PayrollController(DataContext context) => _context = context;

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(_context.PayrollRecords);
    }

    [HttpPost("process")]
    public IActionResult Process([FromBody] PayrollProcessRequest request)
    {
        if (request.Month < 1 || request.Month > 12 || request.Year < 2000)
        {
            return BadRequest(new { message = "Provide a valid month and year." });
        }

        var records = _context.ProcessPayroll(request.Year, request.Month);

        return Ok(records);
    }

    public record PayrollProcessRequest(int Year, int Month);
}
