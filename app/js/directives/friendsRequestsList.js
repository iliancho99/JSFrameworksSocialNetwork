socialNetwork.directive("requests", function () {
    return {
        controller: 'friendsRequestController',
        restrict: "EA",
        templateUrl: 'partials/friendsRequestsList.html',
        replace: true
    }
});