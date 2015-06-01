socialNetwork.controller("wallController", ['$scope','userService', 'friendsService', 'notifyService',
        '$routeParams', 'baseCoverImage', 'baseProfileImage', 'postService',
    function ($scope, userService, friendsService, notifyService, $routeParams, baseCoverImage, baseProfileImage, postService) {
        $scope.isLoggedUser = true;
        $scope.userWall = {};
        $scope.hasStatus = true;
        $scope.userStatus = '';
        $scope.sidebarVisible = true;

            friendsService.getUserFullData($routeParams.username).
                success(function (data) {
                    if(data.username == sessionStorage['username'])
                    {
                        $scope.isLoggedUser = true;
                        $scope.hasStatus = false;
                        $scope.sidebarVisible = true;

                    } else if(data.isFriend) {
                        $scope.isLoggedUser = false;
                        $scope.hasStatus = true;
                        $scope.sidebarVisible = true;
                        $scope.userStatus = 'Friend'
                    } else {
                        if(data.hasPendingRequest){
                            $scope.userStatus = 'Pending'
                        } else{
                            $scope.userStatus = 'Invite'
                        }
                        $scope.isLoggedUser = false;
                        $scope.sidebarVisible = false;
                    }

                    if(!data.coverImageData){
                        data.coverImageData = "data:image/jpg;base64," +  baseCoverImage;
                    }

                    if(!data.profileImageData){
                        data.profileImageData = "data:image/jpg;base64," +  baseProfileImage;
                    }

                    $scope.userWall = data;
                })
                .error(function () {
                    notifyService.showError(data.error_description);
                });
        
        $scope.sendRequestUser = function (username) {
            if($scope.userStatus == 'Invite'){
                friendsService.SendRequest(username)
                    .success(function (data) {
                        notifyService.showInfo("You sent friend request successfully");
                    })
                    .error(function (data) {
                        notifyService.showError(data.error_description);
                    });
            }
        };
        
        $scope.addPost = function (text) {
            if(text == ''){
                notifyService.showError("The text can not be empty")
            }
            postService.addPost(text, $scope.userWall.username)
                .success(function (data) {
                    notifyService.showInfo("The post posted successfully")
                    $scope.newsFeedData.unshift(data);
                })
                .error(function (data) {
                    notifyService.showError(data.error_description);
                });
        }

    }
]);