using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http.WebHost;
using System.Web.Routing;

namespace Isracard.Infrastructure
{
    public class SessionEnabledHttpControllerRouteHandler : HttpControllerRouteHandler
    {
        /// <summary>
        /// For Working with Sessions in Web API!!!!
        /// </summary>
        /// <param name="requestContext"></param>
        /// <returns></returns>
        protected override IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new SessionEnabledControllerHandler(requestContext.RouteData);
        }
    }
}