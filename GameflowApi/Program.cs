using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

using GameflowApi.Endpoints;
using GameflowApi.Data;

var builder = WebApplication.CreateBuilder(args);

//Services toevoegen
// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection")));

// Identity
builder.Services
    .AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Swagger/OpenAPI
builder.Services.AddOpenApi();

//Autorisatie
builder.Services.AddAuthorization();

var app = builder.Build();

// Rollen aanmaken
using (var scope = app.Services.CreateScope())
{
    var roleManager = scope.ServiceProvider
        .GetRequiredService<RoleManager<IdentityRole>>();

    string[] roles = { "Admin", "Spelleider", "Team" };

    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
        {
            await roleManager.CreateAsync(new IdentityRole(role));
        }
    }
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapRegisterEndpoint();

app.Run();