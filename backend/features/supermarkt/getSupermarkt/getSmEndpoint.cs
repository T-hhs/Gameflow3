using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace PortfolioBackend.Features.Blogs.GetBlog;

public static class GetSmEndpoint
{
    public static RouteHandlerBuilder MapGetSmEndpoint(this RouteGroupBuilder routeGroupBuilder)
    {
        return routeGroupBuilder.MapGet("/get/{id:int}", GetSmHandler.GetSmHandle)
            .WithName("GetSupermarkt");
    }
}
