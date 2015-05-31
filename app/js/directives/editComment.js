socialNetwork.directive("editComment", function () {
    return {
        controller: 'EditCommentController',
        restrict: "EA",
        templateUrl: 'partials/editComment.html',
        replace: true
    }
});