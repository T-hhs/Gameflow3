



public static class TeamEndpoints
{
    public static RouteGroupBuilder MapAllTeamEndpoints(this IEndpointRouteBuilder endpoints)
    {
        RouteGroupBuilder teamGroup = endpoints.MapGroup("/team").WithTags("Teams");

        teamGroup.MapTeamLoginEndpoint();
        teamGroup.MapCreateTeamEndpoint();

        return teamGroup;
    }
}