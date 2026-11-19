using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace PortfolioBackend.Features.Blogs.GetBlog;

public static class GetGameEndpoint
{
    public static RouteHandlerBuilder MapGetGameEndpoint(this RouteGroupBuilder routeGroupBuilder)
    {
        return routeGroupBuilder.MapGet("/get/{id:int}", GetGameHandler.GetGameHandle)
            .WithName("GetGame");
    }
}
