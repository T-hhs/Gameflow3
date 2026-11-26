

using PortfolioBackend.Features.Blogs.GetBlog;

public static class GameEndpoints
{
    public static RouteGroupBuilder MapAllGameEndpoints(this IEndpointRouteBuilder endpoints)
    {
        RouteGroupBuilder gameGroup = endpoints.MapGroup("/game").WithTags("Serious_Games");

        gameGroup.MapGetGameEndpoint();
        gameGroup.MapCreateGameEndpoint();

        return gameGroup;
    }
}