socialNetwork.controller('AddCommentController',
    ['$scope', 'postService', 'notifyService',
        function ($scope, postService, notifyService) {
        $scope.addCommentPostData = [];

        $scope.cancelAddComment = function cancelAddComment() {
            $scope.addCommentPanelVisible = false;
        };

        $scope.addComment = function(postId, text){
            if($scope.addCommentPostData.author.username == sessionStorage['username'] ||
                $scope.addCommentPostData.wallOwner.isFriend ||
                $scope.addCommentPostData.wallOwner.username == sessionStorage['username'] ||
                $scope.addCommentPostData.author.isFriend) {
                postService.addComment(postId, text)
                .success(function (data) {
                        $scope.addCommentPostData.comments.unshift(data);
                        $scope.addCommentPostData.totalCommentsCount += 1;
                        if($scope.addCommentPostData.totalCommentsCount != $scope.addCommentPostData.comments.length){
                            $scope.addCommentPostData.comments = $scope.addCommentPostData.comments.slice(0,3);
                        }
                        notifyService.showInfo('Comment Added Successfully!');
                        $scope.addCommentPanelVisible = false;
                    })
                .error(function(){
                        notifyService.showError('Comment Add Failed! Try again!');
                    });
            }
            else{
                notifyService.showError('You can comment only your posts or friends posts!');
                $scope.addCommentPanelVisible = false;
            }
        }
    }]);


