socialNetwork.controller("EditUserController", ['$scope','userService', '$location',
    function ($scope, userService, $location) {
        $scope.editUser = function(editUser){

            editUser.name = editUser.name | $scope.user.name;
            editUser.email = editUser.email | $scope.user.email;

            if(typeof editUser.profileImageData == "object"){
                editUser.profileImageData = "data:image/jpg;base64," + editUser.profileImageData.base64;
            }

            if(typeof editUser.coverImageData == "object"){
                editUser.coverImageData = "data:image/jpg;base64," + editUser.coverImageData.base64;
            }

            userService.editProfile(editUser)
                .success(function (data) {
                    alertify.success('Profile Edited Successfully!');
                    $scope.user = editUser;

                    $localStorage['profileImageData'] = editUser.profileImageData;
                    $localStorage['coverImageData'] = editUser.coverImageData;
                    $localStorage['name'] = editUser.name;
                    $localStorage['email'] = editUser.email;
                    $localStorage['gender'] = editUser.gender;
                    $location.path('/');
                })
                .error(function(error){
                    alertify.error('Profile Edit Failed! Try again!');
                });
        }
    }
]);