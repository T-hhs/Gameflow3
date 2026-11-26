
public static class CreateSmEndpoint
{
    public static RouteHandlerBuilder MapCreateSmEndpoint(this RouteGroupBuilder routeGroupBuilder)
    {
        return routeGroupBuilder.MapPost("/create", CreateTeamHandler.CreateTeamHandle)
            .WithName("CreateSupermarkt");
    }
}
