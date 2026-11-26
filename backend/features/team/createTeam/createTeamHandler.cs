using Microsoft.EntityFrameworkCore;
using backend.data;

public static class CreateTeamHandler
{
    public static async Task<IResult> CreateTeamHandle(
        CreateTeamRequest request, gameflowDb db, CancellationToken cancellationToken)
    {
        var team = new Team { Groepscode = request.Groepscode, Teamnaam = request.Teamnaam};

        var game = await db.Games
            .FirstOrDefaultAsync(game => game.Id == request.game, cancellationToken);

        if (game is null)
        {
            return TypedResults.BadRequest("No such game found");
        }
        
        db.Teams.Add(team);
        await db.SaveChangesAsync(cancellationToken);

        var response = new CreateTeamResponse(team.Id, team.Groepscode, team.Teamnaam);
        
        return TypedResults.CreatedAtRoute(
            response,
            routeName: "TeamLogin",
            routeValues: new LoginRequest(team.Groepscode, team.Teamnaam));
    }
}
