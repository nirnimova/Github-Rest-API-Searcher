loginApp.controller('IsracardLoginController', function ($scope, $rootScope, $base64, IsracardLoginService) {
    //@@ Function for Login GitHub User
    $scope.submitLogin = function () {
        $rootScope.username = $scope.username;
        $rootScope.userBase64 = $base64.encode($scope.username + ':' + $scope.password);
        
        IsracardLoginService.ZenMe($rootScope.userBase64).then(function (data) {
            $rootScope.userValidated = true;
        }).catch(function () {
            $rootScope.userValidated = false;
        }).finally(function () {
            angular.element('#cancel').click();
        });
    };
});

//@@ Directive for Determining if Username Entered by User is a GitHub User Account
loginApp.directive('githubuser', ['IsracardLoginService', function (svc) {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            ctrl.$parsers.unshift(function (value) {
                svc.IsGitHubUser(value).then(function (data) {
                    ctrl.$setValidity('gitHubUser', (typeof data.data.message === 'undefined'));
                }).catch(function (data)
                {
                    ctrl.$setValidity('gitHubUser', false);
                });
                return value;
            });
        }
    }
}]);