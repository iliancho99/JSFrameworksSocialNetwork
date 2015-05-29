socialNetwork.controller("friendsRequestController", ['$scope','friendsService', 'notifyService',
    function ($scope, friendsService, notifyService) {
        $scope.reject = function (id) {
            friendsService.RejectRequest(id)
                .success(function (data) {
                    notifyService.showInfo("You approved reject successfully!")
                })
                .error(function (data) {
                    notifyService.showError(data.error_description);
                });
        };

        $scope.approve = function (id) {
            friendsService.RejectRequest(id)
                .success(function (data) {
                    notifyService.showInfo("You approved reject successfully!")
                })
                .error(function (data) {
                    notifyService.showError(data.error_description);
                });
        };
    }
]);