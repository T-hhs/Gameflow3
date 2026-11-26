using Microsoft.AspNetCore.Identity;
using backend.dtos;

namespace backend.features.auth;

public static class Login
{
    public static void MapLoginEndpoint(this WebApplication app)
    {
        app.MapPost("/login", async (
            LoginDto dto, SignInManager<IdentityUser> signInManager) =>
        {
            var result = await signInManager.PasswordSignInAsync(
                dto.Gebruikersnaam,
                dto.Wachtwoord,
                false,
                false);
            
            if (!result.Succeeded)
            {
                return Results.BadRequest(
                    "Ongeldige gebruikersnaam of wachtwoord.");
            }

            return Results.Ok();
        });
    }
}