using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SalaryManagement.API.Models;

namespace SalaryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtSettings _settings;

    public AuthController(IOptions<JwtSettings> settings)
    {
        _settings = settings.Value;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        if (string.Equals(request.Username, "hradmin", StringComparison.OrdinalIgnoreCase) && request.Password == "Password123")
        {
            return Ok(new AuthResponse("HR Admin", "HR Manager", GenerateToken()));
        }

        return Unauthorized(new { message = "Invalid credentials" });
    }

    private string GenerateToken()
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, "hradmin"),
            new Claim(ClaimTypes.Name, "HR Admin"),
            new Claim(ClaimTypes.Role, "HRManager")
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _settings.Issuer,
            audience: _settings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_settings.ExpiryMinutes),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public record LoginRequest(string Username, string Password);
    public record AuthResponse(string DisplayName, string Role, string Token);
}
