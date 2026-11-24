using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Identity;

namespace GameflowApi.Endpoints;

public static class Register
{
    public static void MapRegisterEndpoint(this WebApplication app)
    {
        app.MapPost("/register", async (
            UserManager<IdentityUser> userManager,
            RegisterDto async dto =>
            {
                var user = new IdentityUser
                {
                    UserName = dto.Gebruikersnaam
                };

                var result = await userManager.CreateAsync(user, dto.Wachtwoord);

                if (!result.Succeeded)
                {
                    return Return.
                }
            }
        ))
    }
}