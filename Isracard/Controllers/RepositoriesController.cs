using Isracard.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Isracard.Controllers
{
    public class RepositoriesController : ApiController
    {
        // api/sessions/Repositories

        [HttpGet]
        [Description("Get User's Bookmarks")]
        public List<GitHubRepositoryItem> GetRepos()
        {
            List<GitHubRepositoryItem> repositories = null;

            if (HttpContext.Current.Session["repos"] != null)
                repositories = (List<GitHubRepositoryItem>)HttpContext.Current.Session["repos"];

            return repositories;
        }

        [HttpPost]
        [Description("Upsert User's Bookmark List")]
        public HttpResponseMessage SaveRepos(List<GitHubRepositoryItem> repositories)
        {
            if (!ModelState.IsValid)
            {
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            HttpContext.Current.Session["repos"] = repositories;

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
