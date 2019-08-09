mainApp.service('IsracardMainService', function ($http) {
    this.getRepos = function (auth, str) {
        return $http.get('https://api.github.com/search/repositories?q=' + str + '&per_page=50', { headers: { 'Authorization': 'Basic ' + auth } });
    };

    this.getBookmarks = function () {
        return $http.get('/api/sessions/Repositories');
    };

    this.saveBookmarks = function (bookmarks) {
        return $http.post('/api/sessions/Repositories', JSON.stringify(bookmarks));
    };
});