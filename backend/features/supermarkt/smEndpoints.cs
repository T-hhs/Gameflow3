

using PortfolioBackend.Features.Blogs.GetBlog;

public static class SmEndpoints
{
    public static RouteGroupBuilder MapAllSmEndpoints(this IEndpointRouteBuilder endpoints)
    {
        RouteGroupBuilder smGroup = endpoints.MapGroup("/team").WithTags("Teams");

        smGroup.MapGetSmEndpoint();
        smGroup.MapCreateSmEndpoint();

        return smGroup;
    }
}