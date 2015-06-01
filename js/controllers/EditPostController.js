socialNetwork.controller('EditPostController',
    ['$scope', '$route', 'postService', 'notifyService',
        function ($scope, $route, postService, notifyService) {
    $scope.editPostData = [];

    $scope.cancelEdit = function cancelEdit() {
        $scope.editPostData.postContent = $scope.editPostOldText;
        $scope.editPostShown = false;
    };

    $scope.editPost = function(postId, text){
        postService.editPost(postId, text)
            .success(function () {
                $scope.newsFeedData.forEach(function(post){
                    if(post.id == postId){
                        post.postContent = text;
                    }
                });
                notifyService.showInfo('Post Edited Successfully!');
                $scope.editPostShown = false;
            }, function(error){
                notifyService.showError('Post Edit Failed! Try again!');
            });
    }

    }]);

