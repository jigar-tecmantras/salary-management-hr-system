namespace SalaryManagement.API.Models;

public class PayrollRecord
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public DateTime Period { get; set; }
    public decimal GrossSalary { get; set; }
    public decimal NetSalary { get; set; }
    public List<SalaryComponent> Components { get; set; } = new();
}
