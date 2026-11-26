
using Microsoft.EntityFrameworkCore;

public static class CreateGameHandler
{
    public static async Task<IResult> CreateGameHandle(
        gameflowDb dbContext, CancellationToken cancellationToken)
    {
        var game = new Serious_game {};
        
        dbContext.Games.Add(game);
        await dbContext.SaveChangesAsync(cancellationToken);
        
        return TypedResults.CreatedAtRoute(
            routeName: "GetGame",
            routeValues: new { id = game.Id });
    }
}
