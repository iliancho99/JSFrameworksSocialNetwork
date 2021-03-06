socialNetwork.controller("EditUserController", ['$scope','userService', '$location', 'notifyService',
    function ($scope, userService, $location, notifyService) {

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
                notifyService.showError('Name can\'t be empty!');
            }
            else if(userEditData.email == ''){
                notifyService.showError('Email can\'t be empty!');
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
                        notifyService.showInfo('Profile Edited Successfully!');
                        $location.path('/')})
                    .error(function(error){
                        notifyService.showError('Profile Edit Failed! Try again!');
                    });
            }
        }
    }
]);