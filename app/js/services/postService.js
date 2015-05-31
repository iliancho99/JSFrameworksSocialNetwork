socialNetwork.factory('postService', ['$http', 'authentication','baseServiceUrl' , function ($http, authentication, baseServiceUrl) {

    function AddPost(content, username){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + '/posts',
            method: 'POST',
            headers: headers,
            data: {
                "postContent": content,
                "username": username
            }
        });
    }

    function LikePost(postId){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + '/Posts/' + postId + '/likes',
            method: 'POST',
            headers: headers
        });
    }

    function UnlikePost(postId){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + '/Posts/' + postId + '/likes',
            method: 'DELETE',
            headers: headers
        });
    }

    function DeletePost(postId){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'Posts/' + postId,
            method: 'DELETE',
            headers: headers
        });
    }

    function GetPostComments(postId){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'posts/' + postId+ '/comments',
            method: 'GET',
            headers: headers
        });
    }

    function LikeComment(postId, commentId){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'posts/' + postId + '/comments/' + commentId + '/likes',
            method: 'POST',
            headers: headers
        });
    }

    function UnlikeComment(postId, commentId){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'posts/' + postId + '/comments/' + commentId + '/likes',
            method: 'DELETE',
            headers: headers
        });
    }

    function DeleteComment(postId, commentId){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'posts/' + postId + '/comments/' + commentId,
            method: 'DELETE',
            headers: headers
        });
    }

    function EditComment(postId, commentId, text){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'posts/' + postId + '/comments/' + commentId,
            method: 'PUT',
            headers: headers,
            data : {
                commentContent: text
            }
        });
    }

    function GetNewsFeed(startId){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'me/feed?StartPostId=' + startId + '&PageSize=5',
            method: 'GET',
            headers: headers
        });
    }

    function GetUserWall(startId, owner){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + '/users/' + owner + '/wall?StartPostId=' + startId + '&PageSize=5',
            method: 'GET',
            headers: headers
        });
    }

    function EditPost(postId, text){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'posts/' + postId,
            method: 'PUT',
            headers: headers,
            data: {
                postContent: text
            }
        });
    }

    function AddComment(postId, text){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'posts/' + postId + '/comments',
            method: 'POST',
            headers: headers,
            data: {
                commentContent: text
            }
        });
    }

    return {
        addPost: AddPost,
        likePost: LikePost,
        unlikePost: UnlikePost,
        deletePost: DeletePost,
        getPostComments: GetPostComments,
        likeComment: LikeComment,
        unlikeComment: UnlikeComment,
        deleteComment: DeleteComment,
        getNewsFeed: GetNewsFeed,
        getUserWall: GetUserWall,
        editComment: EditComment,
        editPost: EditPost,
        addComment: AddComment
    }
}]);