using Microsoft.EntityFrameworkCore;
using backend.data;

public static class CreateSmHandler
{
    public static async Task<IResult> CreateSmHandle(
        CreateSmRequest request, gameflowDb db, CancellationToken cancellationToken)
    {
        var supermarkt = new Supermarkt { Naam = request.Naam};

        var team = await db.Teams
            .FirstOrDefaultAsync(team => team.Id == request.team, cancellationToken);

        if (team is null)
        {
            return TypedResults.BadRequest("No such team found");
        }
        
        db.Supermarkt.Add(supermarkt);
        await db.SaveChangesAsync(cancellationToken);

        var response = new CreateSmResponse(supermarkt.Id, supermarkt.Naam);
        
        return TypedResults.CreatedAtRoute(
            response,
            routeName: "GetSupermarkt",
            routeValues: new { id = supermarkt.Id });
    }
}
