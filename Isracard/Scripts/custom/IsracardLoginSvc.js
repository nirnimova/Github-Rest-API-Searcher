loginApp.service('IsracardLoginService', function ($http, $base64) {
    this.ZenMe = function (auth) {
        return $http.get('https://api.github.com/zen', { headers: { 'Authorization': 'Basic ' + auth } });
    }
    this.IsGitHubUser = function (usr) {
        //@@ In Case GitHub Rest API Makes Trouble!!!!!
        //var auth = $base64.encode('usr:pass');
        //return $http.get('https://api.github.com/users/' + usr, { headers: { 'Authorization': 'Basic ' + auth } });

        return $http.get('https://api.github.com/users/' + usr);
    }
});