socialNetwork.controller("ChangePasswordController", ['$scope','userService', 'notifyService',
    function ($scope, userService, notifyService) {
        $scope.changePassword = function (passwordData) {
            userService.changePassword(passwordData)
                .success(function (data) {
                    notifyService.showInfo("You changed you password successfully!");
                })
                .error(function (data) {
                    notifyService.showError(data.error_description);
                });
        }
    }
]);