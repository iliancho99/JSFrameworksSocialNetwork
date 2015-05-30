socialNetwork.controller("wallController", ['$scope','userService', 'friendsService', 'notifyService',
        '$routeParams', 'baseCoverImage', 'baseProfileImage',
    function ($scope, userService, friendsService, notifyService, $routeParams, baseCoverImage, baseProfileImage) {
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
                        data.coverImageData = baseCoverImage;
                    }

                    if(!data.profileImageData){
                        data.profileImageData = baseProfileImage;
                    }

                    $scope.userWall = data;
                })
                .error(function () {
                    notifyService.showError(data.error_description);
                });
        
        $scope.sendRequestUser = function (username) {
            
        };
        
        $scope.addPost = function (text) {
            
        }
    }
]);