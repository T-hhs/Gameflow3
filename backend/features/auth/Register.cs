using Microsoft.AspNetCore.Identity;
using backend.dtos;

namespace backend.features.auth;

public static class Register
{
    public static void MapRegisterEndpoint(this WebApplication app)
    {
        app.MapPost("/register", async (
            RegisterDto dto,
            UserManager<IdentityUser> userManager) =>
        {
            var user = new IdentityUser
            {
                UserName = dto.Gebruikersnaam
            };

            var result = await userManager.CreateAsync(user, dto.Wachtwoord);

            if (!result.Succeeded)
            {
                return Results.BadRequest(result.Errors);
            }

            if (dto.Rol != "Team" && dto.Rol != "Spelleider")
            {
                return Results.BadRequest("Ongeldige rol.");
            }

            var roleResult = await userManager.AddToRoleAsync(user, dto.Rol);

            if (!roleResult.Succeeded)
            {
                return Results.BadRequest(roleResult.Errors);
            }

            return Results.Ok("Gebruiker geregistreerd");
        });
    }
}