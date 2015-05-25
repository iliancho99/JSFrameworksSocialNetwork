socialNetwork.directive("register", function () {
    return {
        controller: 'RegisterController',
        restrict: "EA",
        templateUrl: 'partials/register.html',
        replace: true
    }
});