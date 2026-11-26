using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;




public static class TeamLoginHandler
{
    public static async Task<IResult> TeamLoginHandle(
        LoginRequest request, gameflowDb dbContext, CancellationToken cancellationToken)
    {
        var team = await dbContext.Teams
            .Where(team => team.Groepscode == request.Groepscode && team.Teamnaam==request.Teamnaam)
            .Select(team => new TeamLoginResponse(team.Groepscode, team.Teamnaam, team.game))
            .AsNoTracking()
            .FirstOrDefaultAsync(cancellationToken);
            
        return team is null ? TypedResults.NotFound() : TypedResults.Ok(team);
    }
}
