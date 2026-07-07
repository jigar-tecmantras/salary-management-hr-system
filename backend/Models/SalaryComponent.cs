namespace SalaryManagement.API.Models;

public enum SalaryComponentType
{
    Allowance,
    Deduction
}

public class SalaryComponent
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public string Name { get; set; } = string.Empty;
    public SalaryComponentType ComponentType { get; set; }
    public decimal Amount { get; set; }
}
