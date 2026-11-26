using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.data;

public class gameflowDb : IdentityDbContext<IdentityUser>
{
    public gameflowDb(DbContextOptions<gameflowDb> options) : base(options)
    {}
    public DbSet<Team> Teams => Set<Team>();

    public DbSet<Serious_game> Games => Set<Serious_game>();

    public DbSet<Supermarkt> Supermarkt => Set<Supermarkt>();
}