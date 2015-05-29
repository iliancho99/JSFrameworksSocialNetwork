socialNetwork.controller("LogoutController", ['$scope','userService', 'authentication', '$location',
    function ($scope, userService, authentication, $location) {
        userService.logout()
            .success(function (data) {
                authentication.removeUser();
                delete $scope.user;
                delete sessionStorage['username'];
                delete sessionStorage['profileImageData'];
                delete sessionStorage['coverImageData'];
                delete sessionStorage['name'];
                delete sessionStorage['id'];
                delete sessionStorage['email'];
                delete sessionStorage['gender'];
                delete sessionStorage['genderNum'];
                window.location.reload();
                $location.path('/');
                window.location.reload();
            })
            .error(function (data) {
               console.log(data);
            });
    }
]);