socialNetwork.directive("login", function () {
    return {
        controller: 'LoginController',
        restrict: "EA",
        templateUrl: 'partials/login.html',
        replace: true
    }
});