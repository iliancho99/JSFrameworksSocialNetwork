socialNetwork.controller("friendsRequestController", ['$scope','friendsService', 'notifyService',
    function ($scope, friendsService, notifyService) {
        $scope.reject = function (id) {
            friendsService.RejectRequest(id)
                .success(function (data) {
                    notifyService.showInfo("You approved reject successfully!")
                    friendsService.getFriendRequests()
                        .success(function (data) {
                            user.friendRequests = data;
                        });
                })
                .error(function (data) {
                    notifyService.showError(data.error_description);
                });
        };

        $scope.approve = function (id) {
            friendsService.RejectRequest(id)
                .success(function (data) {
                    notifyService.showInfo("You approved reject successfully!")
                    friendsService.getFriendRequests()
                        .success(function (data) {
                            user.friendRequests = data;
                        });
                })
                .error(function (data) {
                    notifyService.showError(data.error_description);
                });
        };
    }
]);