socialNetwork.controller('HeaderController', ['$scope','friendsService', 'userService',
    function ($scope, friendsService, userService) {
        var user = {};

        $scope.requestDetails = function () {
            $scope.requestDetailsShow = true;
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
                user.profileImageData = data.profileImageData;
                user.coverImageData = data.coverImageData;
                user.name = data.name;
                user.id = data.id;
                user.email = data.email;
                user.gender = gender;

                $scope.user = user;
            })
            .error(function (data) {
                alertify.error(data.error_description);
            });

}]);