socialNetwork.directive("addComment", function () {
    return {
        controller: 'AddCommentController',
        restrict: "EA",
        templateUrl: 'partials/addComment.html',
        replace: true
    }
});