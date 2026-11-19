
public static class CreateGameEndpoint
{
    public static RouteHandlerBuilder MapCreateGameEndpoint(this RouteGroupBuilder routeGroupBuilder)
    {
        return routeGroupBuilder.MapPost("/create", CreateGameHandler.CreateGameHandle)
            .WithName("CreateGame");
    }
}
