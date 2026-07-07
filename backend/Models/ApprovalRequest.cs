namespace SalaryManagement.API.Models;

public enum ApprovalStatus
{
    Pending,
    Approved,
    Rejected
}

public class ApprovalRequest
{
    public Guid Id { get; set; }
    public Guid EmployeeId { get; set; }
    public string EmployeeName { get; set; } = string.Empty;
    public string Comment { get; set; } = string.Empty;
    public string RequestedBy { get; set; } = string.Empty;
    public ApprovalStatus Status { get; set; } = ApprovalStatus.Pending;
    public DateTime RequestedOn { get; set; }
}
