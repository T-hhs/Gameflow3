using Microsoft.EntityFrameworkCore;





public class gameflowDb : DbContext
{
    public gameflowDb(DbContextOptions<gameflowDb> options) : base(options)
    {}
    public DbSet<Team> Teams => Set<Team>();

    public DbSet<Serious_game> Games => Set<Serious_game>();
}