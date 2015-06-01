socialNetwork.controller("friendsController", ['$scope', 'friendsService', 'baseProfileImage', function ($scope, friendsService, baseProfileImage) {
    $scope.searchUsers = function(searchUser) {
        if (searchUser == '') {
            $scope.searchUserDropDownShown = false;
        }
        else {
            friendsService.getUsersByName(searchUser)
                .success(function (data) {
                    if (data.length > 0) {
                        data.forEach(function (user) {
                            if (!user.profileImageData) {
                                user.profileImageData = "data:image/jpg;base64, " + baseProfileImage;
                            }
                        });
                        $scope.searchUsersByNameResults = data;
                        $scope.searchUserDropDownShown = true;
                    }
                    else {
                        $scope.searchUsersResults = [];
                        $scope.searchUserDropDownShown = false;
                    }
                })
                .error(function () {
                    $scope.searchShown = false;
                });
        }
    }
}]);