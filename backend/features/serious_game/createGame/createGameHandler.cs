using Microsoft.EntityFrameworkCore;
using backend.data;

public static class CreateGameHandler
{
    public static async Task<IResult> CreateGameHandle(
        gameflowDb db, CancellationToken cancellationToken)
    {
        var game = new Serious_game {};
        
        db.Games.Add(game);
        await db.SaveChangesAsync(cancellationToken);
        
        return TypedResults.CreatedAtRoute(
            routeName: "GetGame",
            routeValues: new { id = game.Id });
    }
}
