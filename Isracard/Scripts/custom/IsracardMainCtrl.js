mainApp.controller('IsracardMainController', function ($scope, IsracardMainService) {
    $scope.search = '';
    $scope.bookmarks = [];

    // @@ Function for Getting User Bookmarks
    IsracardMainService.getBookmarks().then(function (data) {
        $scope.bookmarks = (data.data != null) ? data.data : [];
    });

    // @@ Function for Searching GitHub Repositories
    $scope.searchRepos = function () {
        $.blockUI({ message: $('#loaderPreview').html() });
        $scope.showBookmarks = false;

        IsracardMainService.getRepos($scope.userBase64, $scope.search).then(function (data) {
            $scope.repos = data.data.items;
        }).catch(function (data) {

        }).finally($.unblockUI);
    };

    //@@ Function for Handling Bookmarks, When a User Checks or Unchecked a Repository Returned from Search
    $scope.manageBookmark = function (repo) {
        var checkBookmark = $scope.bookmarks.filter(bk => bk.name == repo.name && bk.avatar == repo.owner.avatar_url);
        if (checkBookmark.length > 0) {
            $scope.bookmarks = $scope.bookmarks.filter(bk => bk.name != repo.name && bk.avatar != repo.owner.avatar_url);
        }
        else {
            $scope.bookmarks.push({
                name: repo.name,
                url: repo.html_url,
                avatar: repo.owner.avatar_url
            });
        }

        IsracardMainService.saveBookmarks($scope.bookmarks);
    };

    //@@ Function to Determine if A Repository is Already Bookmarked
    $scope.isBookmark = function (repo) {
        return $scope.bookmarks.find(bk => bk.name == repo.name && bk.avatar == repo.owner.avatar_url) != undefined;
    };
});

//@@ Directive for Binding the "Enter" Key for Searching GitHub Repositories (Search Button)
mainApp.directive('enterkey', ['IsracardLoginService', function (svc) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            elem.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.searchRepos();
                }
            });
        }
    }
}]);