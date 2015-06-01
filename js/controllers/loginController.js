socialNetwork.controller("LoginController", ['$scope','userService', 'authentication', 'notifyService', 'baseCoverImage', 'baseProfileImage',
    function ($scope, userService, authentication, notifyService, baseCoverImage, baseProfileImage) {
    $scope.login = function (user) {
        if(user.username && user.password){
            userService.login(user)
                .success(function (data) {
                    authentication.rememberUser(data);
                    userService.getLoggedUserData()
                        .success(function (data) {
                            var gender = "Other";
                            if(data.gender == 1){
                                gender = "Male"
                            } else if(data.gender == 2) {
                                gender = "Female"
                            }

                            sessionStorage['username'] = data.username;

                            if(!data.profileImageData){
                                sessionStorage['profileImageData'] = "data:image/jpg;base64," +   baseProfileImage;
                            } else {
                                sessionStorage['profileImageData'] = data.profileImageData;
                            }

                            if(!data.coverImageData){
                                sessionStorage['coverImageData'] =  "data:image/jpg;base64," + baseCoverImage;
                            } else {
                                sessionStorage['coverImageData'] =   data.coverImageData;
                            }

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
    };
}]);