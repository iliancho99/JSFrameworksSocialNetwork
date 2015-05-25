socialNetwork.service('friendsService', ['$http', 'authentication','baseServiceUrl',
    function ($http, authentication, baseServiceUrl) {
        function getUserRequests(){
            return $http({
                url: baseServiceUrl + "me/requests",
                method: 'GET',
                headers : authentication.getHeaders()
            });
        }

        return {
            getFriendRequests : getUserRequests
        }
}]);