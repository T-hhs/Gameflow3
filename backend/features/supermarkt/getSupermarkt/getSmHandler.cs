using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace PortfolioBackend.Features.Blogs.GetBlog;

public static class GetSmHandler
{
    public static async Task<IResult> GetSmHandle(
        int id, gameflowDb dbContext, CancellationToken cancellationToken)
    {
        var supermarkt = await dbContext.Supermarkt
            .Where(sm => sm.Id == id)
            .Select(sm => new GetSmResponse(sm.Id, sm.Naam))
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);

        return supermarkt is null ? TypedResults.NotFound() : TypedResults.Ok(supermarkt);
    }
}
