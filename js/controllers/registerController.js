socialNetwork.controller("RegisterController", ['$scope', 'userService', 'authentication', 'notifyService',
    function ($scope, userService, authentication, notifyService) {
    $scope.registerUser = function (user) {
        if(user.gender == 'male'){
            user.gender = 1
        } else if(user.gender == 'famale'){
            user.gender = 2
        } else if(user.gender == 'other'){
            user.gender = 0
        }

        userService.register(user)
            .success(function (data) {
                authentication.rememberUser(data);
                alertify.success("You Logged in successfully");
                userService.getLoggedUserData()
                    .success(function (data) {
                        var gender = "Other";
                        if(data.gender == 1){
                            gender = "Male"
                        } else if(data.gender == 2) {
                            gender = "Female"
                        }

                        sessionStorage['username'] = data.username;
                        sessionStorage['profileImageData'] = data.profileImageData;
                        sessionStorage['coverImageData'] = data.coverImageData;
                        sessionStorage['name'] = data.name;
                        sessionStorage['id'] = data.id;
                        sessionStorage['email'] = data.email;
                        sessionStorage['gender'] = gender;
                        sessionStorage['genderNum'] = data.gender;
                        window.location.reload();
                    })
                    .error(function (data) {
                        notifyService.showError(data.error_description);
                    });
            })
            .error(
            function (data) {
                notifyService.showError(data.error_description);
            }
        );
    }
}]);