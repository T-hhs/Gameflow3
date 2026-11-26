using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;



public static class TeamLoginEndpoint
{
    public static RouteHandlerBuilder MapTeamLoginEndpoint(this RouteGroupBuilder routeGroupBuilder)
    {
        return routeGroupBuilder.MapPost("/login", TeamLoginHandler.TeamLoginHandle)
            .WithName("TeamLogin");
    }
}
