socialNetwork.controller("friendsController", ['$scope', 'friendsService', function ($scope, friendsService) {
    $scope.searchUsersByName = function (name) {
        console.log(name);
        friendsService.getUsersByName(name)
            .success(function (data) {
                $scope.searchUserDropDownShown = true;
                $scope.searchUserResults = data;
            });
    }
}]);