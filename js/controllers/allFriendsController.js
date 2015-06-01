socialNetwork.controller("allFriendsController", ['$scope','userService', 'friendsService', '$routeParams',
    'notifyService', 'baseProfileImage',
    function ($scope,userService, friendsService, $routeParams, notifyService, baseProfileImage) {
        $scope.username = $routeParams.username;
        if($routeParams.username == sessionStorage['username']){
            friendsService.GetMyFriends()
                .success(function (data) {
                    data.forEach(function(friend){
                        if(friend.profileImageData == null){
                            friend.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                        }
                    });

                    $scope.userFriends = data;
                })
                .error(function (data) {
                    notifyService.showError("Error, try again later!")
                });
        }else{
            friendsService.GetUserFriends($routeParams.username)
                .success(function (data) {
                    data.forEach(function(friend){
                        if(friend.profileImageData == null){
                            friend.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                        }
                    });

                    $scope.userFriends = data;
                })
                .error(function (data) {
                    notifyService.showError("Error, try again later!")
                });
        }

    }
]);