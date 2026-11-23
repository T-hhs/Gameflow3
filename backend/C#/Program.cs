using System.Diagnostics.CodeAnalysis;
using Microsoft.AspNetCore.Identity;

var roles = new[] { "Admin", "Spelleider", "Team"};

using var scope = app.Services.CreateScope();

var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

foreach (var role in roles)
{
    if (!await roleManager.RoleExistAsync(role))
    {
        await roleManager.CreateAsync(new IdentityRole(role));
    }
}