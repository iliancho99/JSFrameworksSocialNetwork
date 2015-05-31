socialNetwork.directive("header", function () {
    return {
        controller: 'HeaderController',
        restrict: 'EA',
        templateUrl: 'partials/header.html',
        replace: true
    }
});