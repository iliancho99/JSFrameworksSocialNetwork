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

    return {
        AddPost: AddPost
    }
}]);