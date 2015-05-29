socialNetwork.directive("requests", function () {
    return {
        controller: 'HeaderController',
        restrict: "EA",
        templateUrl: 'partials/friendsRequestsList.html',
        replace: true
    }
});