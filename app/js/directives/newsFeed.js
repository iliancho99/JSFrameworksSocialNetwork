socialNetwork.directive("newsFeed", function () {
    return {
        controller: 'newsFeedController',
        restrict: 'EA',
        templateUrl: 'partials/newsFeed.html',
        replace: true
    }
});