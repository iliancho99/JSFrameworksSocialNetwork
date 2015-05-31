socialNetwork.controller('EditCommentController',
    ['$scope', '$route', 'postService', 'notifyService',
        function ($scope, $route, postService, notifyService) {
        $scope.editCommentData = [];

        $scope.cancelEditComment = function cancelEditComment() {
            $scope.editCommentPostData.commentContent = $scope.editCommentOldText;
            $scope.editCommentPanelVisible = false;
        };

        $scope.editComment = function(commentId, text){
            postService.editComment($scope.editCommentPostId, commentId, text)
            .success(function () {
                    $scope.editCommentPostData.comentContent = text;
                    notifyService.showError('Comment Edited Successfully!');
                    $scope.editCommentPanelVisible = false;
                })
            .error(function(){
                    notifyService.showError('Comment Edit Failed! Try again!');
                });
        }

    }]);


