
public static class CreateSmEndpoint
{
    public static RouteHandlerBuilder MapCreateSmEndpoint(this RouteGroupBuilder routeGroupBuilder)
    {
        return routeGroupBuilder.MapPost("/create", CreateSmHandler.CreateSmHandle)
            .WithName("CreateSupermarkt");
    }
}
