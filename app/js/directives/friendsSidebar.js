socialNetwork.directive("friendsSidebar", function () {
    return {
        controller: 'sidebarController',
        restrict: 'EA',
        templateUrl: 'partials/sidebarFriends.html',
        replace: true
    }
});