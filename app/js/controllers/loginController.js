socialNetwork.controller("LoginController", ['$scope','userService', 'authentication',
    function ($scope, userService, authentication) {
    $scope.login = function (user) {
        if(user.username && user.password){
            userService.login(user)
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
                            window.location.reload();

                        })
                        .error(function (data) {
                            alertify.error(data.error_description);
                        });
                })
                .error(
                function (data) {
                    alertify.error(data.error_description);
                }
            );
        }
    };
}]);