
using Microsoft.EntityFrameworkCore;

public static class CreateSmHandler
{
    public static async Task<IResult> CreateSmHandle(
        CreateSmRequest request, gameflowDb dbContext, CancellationToken cancellationToken)
    {
        var supermarkt = new Supermarkt { Naam = request.Naam};

        var team = await dbContext.Teams
            .FirstOrDefaultAsync(team => team.Id == request.team, cancellationToken);

        if (team is null)
        {
            return TypedResults.BadRequest("No such team found");
        }
        
        dbContext.Supermarkt.Add(supermarkt);
        await dbContext.SaveChangesAsync(cancellationToken);

        var response = new CreateSmResponse(supermarkt.Id, supermarkt.Naam);
        
        return TypedResults.CreatedAtRoute(
            response,
            routeName: "GetSupermarkt",
            routeValues: new { id = supermarkt.Id });
    }
}
