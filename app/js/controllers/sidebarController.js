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
            friendsService.GetUserFriends($routeParams.username)
                .success(function (data) {
                    data.forEach(function(friend){
                        if(!friend.profileImageData){
                            friend.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                        }
                    });

                    $scope.friendsToShow = data.slice(0,6);
                })
                .error(function (error) {
                    alertify.error("Error, try again later");
                });
        }
    }]);