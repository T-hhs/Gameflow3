
using Microsoft.EntityFrameworkCore;

public static class CreateTeamHandler
{
    public static async Task<IResult> CreateTeamHandle(
        CreateTeamRequest request, gameflowDb dbContext, CancellationToken cancellationToken)
    {
        var team = new Team { Groepscode = request.Groepscode, Teamnaam = request.Teamnaam};

        var game = await dbContext.Games
            .FirstOrDefaultAsync(game => game.Id == request.game, cancellationToken);

        if (game is null)
        {
            return TypedResults.BadRequest("No such game found");
        }
        
        dbContext.Teams.Add(team);
        await dbContext.SaveChangesAsync(cancellationToken);

        var response = new CreateTeamResponse(team.Id, team.Groepscode, team.Teamnaam);
        
        return TypedResults.CreatedAtRoute(
            response,
            routeName: "TeamLogin",
            routeValues: new LoginRequest(team.Groepscode, team.Teamnaam));
    }
}
