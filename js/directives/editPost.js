socialNetwork.directive("editPost", function () {
    return {
        controller: 'EditPostController',
        restrict: "EA",
        templateUrl: 'partials/editPost.html',
        replace: true
    }
});