using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;

namespace Isracard.Models
{
    public class GitHubRepositoryItem
    {
        [Description("Name of Repository")]
        public string name { get; set; }

        [Description("Url of Repository")]
        public string url { get; set; }

        [Description("Repository's User's Avatar")]
        public string avatar { get; set; }
    }
}