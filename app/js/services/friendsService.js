socialNetwork.service('friendsService', ['$http', 'authentication','baseServiceUrl',
    function ($http, authentication, baseServiceUrl) {
        function getUserRequests(){
            var headers = authentication.getHeaders();

            return $http({
                url: baseServiceUrl + "me/requests",
                method: 'GET',
                headers : headers
            });
        }

        function GetUserByName(name){
            var headers = authentication.getHeaders();
            return $http({
                url: baseServiceUrl + "users/search?searchTerm=" + name,
                method: 'GET',
                headers : headers
            });
        }

        return {
            getFriendRequests: getUserRequests,
            getUsersByName: GetUserByName
        }
}]);