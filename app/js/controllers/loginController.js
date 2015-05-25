socialNetwork.controller("LoginController", ['$scope','userService', 'authentication', 'notyService',
    function ($scope, userService, authentication) {
    $scope.login = function (user) {
        if(user.username && user.password){
            userService.login(user)
                .success(function (data) {
                    authentication.rememberUser(data);
                    alertify.success("You Logged in successfully");
                    window.location.reload();
                    userService.getLoggedUserData()
                        .success(function (data) {
                            var gender = "Other";

                            if(data.gender == 1){
                                gender = "Male"
                            } else if(data.gender == 1) {
                                gender = "Famale"
                            }

                            sessionStorage['username'] = data.username;
                            sessionStorage['profileImageData'] = data.profileImageData;
                            sessionStorage['coverImageData'] = data.coverImageData;
                            sessionStorage['name'] = data.name;
                            sessionStorage['id'] = data.id;
                            sessionStorage['email'] = data.email;
                            sessionStorage['gender'] = gender;
                            sessionStorage['access_token'] = data.access_token;

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