using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using backend.data;

namespace PortfolioBackend.Features.Blogs.GetBlog;

public static class GetGameHandler
{
    public static async Task<IResult> GetGameHandle(
        int id, gameflowDb db, CancellationToken cancellationToken)
    {
        var game = await db.Games
            .Where(game => game.Id == id)
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);

        return game is null ? TypedResults.NotFound() : TypedResults.Ok("Game Exists");
    }
}
