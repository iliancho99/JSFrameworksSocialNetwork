socialNetwork.controller("EditUserController", ['$scope','userService', '$location',
    function ($scope, userService, $location) {

        $scope.editUserData = {
            'profileImageData': sessionStorage['profileImageData'],
            'coverImageData': sessionStorage['coverImageData'],
            'name': sessionStorage['name'],
            'email': sessionStorage['email'],
            'gender': sessionStorage['gender']
        };

        $scope.changeCoverImageData = function(){
            //console.log($scope.editUserData.coverImageData.base64);
            $scope.editUserData.coverImageData = "data:image/jpg;base64, " + $scope.editUserData.coverImageData.base64;
        };

        $scope.changeProfileImageData = function(){
            //console.log($scope.editUserData.profileImageData.base64);
            $scope.editUserData.profileImageData = "data:image/jpg;base64, " + $scope.editUserData.profileImageData.base64;
        };

        $scope.editUser = function(userEditData){

            var user = {};

            if(userEditData.name == ''){
                alertify.error('Name can\'t be empty!');
            }
            else if(userEditData.email == ''){
                alertify.error('Email can\'t be empty!');
            } else{

                if(userEditData.profileImageData){
                    user.profileImageData = userEditData.profileImageData;
                    sessionStorage['profileImageData'] = userEditData.profileImageData;
                }

                if(userEditData.coverImageData){
                    user.coverImageData = userEditData.coverImageData;
                    sessionStorage['coverImageData'] = userEditData.coverImageData;
                }

                user.name = userEditData.name;
                user.email = userEditData.email;
                user.gender = userEditData.gender;

                sessionStorage['name'] = userEditData.name;
                sessionStorage['email'] = userEditData.email;
                sessionStorage['gender'] = userEditData.gender;

                userService.editProfile(user)
                    .success(function (data) {
                        alertify.success('Profile Edited Successfully!');
                        $location.path('/')})
                    .error(function(error){
                        alertify.error('Profile Edit Failed! Try again!');
                    });
            }
        }
    }
]);