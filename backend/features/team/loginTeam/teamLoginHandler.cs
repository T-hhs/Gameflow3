using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using backend.data;



public static class TeamLoginHandler
{
    public static async Task<IResult> TeamLoginHandle(
        LoginRequest request, gameflowDb db, CancellationToken cancellationToken)
    {
        var team = await db.Teams
            .Where(team => team.Groepscode == request.Groepscode && team.Teamnaam==request.Teamnaam)
            .Select(team => new TeamLoginResponse(team.Groepscode, team.Teamnaam, team.game))
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);
            
        return team is null ? TypedResults.NotFound() : TypedResults.Ok(team);
    }
}
