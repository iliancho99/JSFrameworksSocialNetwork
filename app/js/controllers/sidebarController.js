socialNetwork.controller("sidebarController",
    ['$scope', 'friendsService', 'baseProfileImage', '$routeParams', 'notifyService', '$location',
        function($scope, friendsService, baseProfileImage, $routeParams, notifyService, $location){
        $scope.friends = [];
        $scope.sidebarOwnerUsername = $routeParams.username;

        if(!$routeParams.username || $routeParams.username == sessionStorage['username']){
            friendsService.GetMyFriends()
                .success(function (data) {
                    data.forEach(function(friend){
                        if(friend.profileImageData == null){
                            friend.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                        }
                    });

                    $scope.friendsToShow = data.slice(0,6);
                })
                .error(function (error) {
                    alertify.error(error.data.message);
                });
        }
        else{
            friendsService.getUserFullData($routeParams.username)
                .success(function (data) {
                    if(data.isFriend){
                        $scope.sidebarOwnerUsername = $routeParams.username;
                        friendsService.GetUserFriends($scope.userWall.username)
                            .success(function (data) {
                                data.friends.forEach(function(friend){
                                    if(friend.profileImageData == null){
                                        friend.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                                    }
                                });

                                $scope.friends = data.friends.slice(0,6);
                            })
                            .error(function (data) {
                                notifyService.showError("Error, try again");
                                $location.path('/');
                            });
                    }
                    else{
                        $scope.sidebarOwnerUsername = $routeParams.username;
                        $scope.friendsSidebarVisible = false;
                    }
                });
        }
    }]);