
public static class CreateTeamEndpoint
{
    public static RouteHandlerBuilder MapCreateTeamEndpoint(this RouteGroupBuilder routeGroupBuilder)
    {
        return routeGroupBuilder.MapPost("/create", CreateTeamHandler.CreateTeamHandle)
            .WithName("CreateBlog");
    }
}
