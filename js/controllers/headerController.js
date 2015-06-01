socialNetwork.controller('HeaderController', ['$scope','friendsService', 'userService', 'baseProfileImage', 'baseCoverImage', 'notifyService',
    function ($scope, friendsService, userService, baseProfileImage, baseCoverImage, notifyService) {
        var user = {};

        $scope.showRequestDetails = function () {
            $scope.requestDetailsShow = true;
        };
        $scope.closeRequestDetails = function () {
            $scope.requestDetailsShow = false;
        };

        friendsService.getFriendRequests()
            .success(function (data) {
               user.friendRequests = data;
            });

        userService.getLoggedUserData()
            .success(function (data) {
                var gender = "Other";
                if(data.gender == 1){
                    gender = "Male"
                } else if(data.gender == 2) {
                    gender = "Female"
                }

                user.username = data.username;
                if(!data.profileImageData){
                    user.profileImageData = "data:image/jpg;base64," + baseProfileImage;
                } else {
                    user.profileImageData = data.profileImageData;
                }

                if(!data.coverImageData){
                    user.coverImageData =  "data:image/jpg;base64," + baseCoverImage;
                } else {
                    user.coverImageData =   data.coverImageData;
                }
                user.name = data.name;
                user.id = data.id;
                user.email = data.email;
                user.gender = gender;

                $scope.user = user;
            })
            .error(function (data) {
                notifyService.showError("Error, try again later!");
            });

}]);