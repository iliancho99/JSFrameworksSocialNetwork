socialNetwork.controller("friendsRequestController", ['$scope','friendsService', 'notifyService',
    function ($scope, friendsService, notifyService) {
        $scope.reject = function (id) {
            friendsService.RejectRequest(id)
                .success(function (data) {
                    notifyService.showInfo("You reject request successfully!")
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
            friendsService.ApproveRequest(id)
                .success(function (data) {
                    notifyService.showInfo("You approved request  successfully!");
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