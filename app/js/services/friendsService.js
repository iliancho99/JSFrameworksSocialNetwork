socialNetwork.service('friendsService', ['$http', 'authentication','baseServiceUrl',
    function ($http, authentication, baseServiceUrl) {
        function GetUserRequests(){
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

        function ApproveRequest(id){
            var headers = authentication.getHeaders();
            return $http({
                url: baseServiceUrl + "me/requests/" + id+ "?status=approved",
                method: 'PUT',
                headers : headers
            });
        }

        function RejectRequest(id){
            var headers = authentication.getHeaders();
            return $http({
                url: baseServiceUrl + "me/requests/" + id+ "?status=rejected",
                method: 'PUT',
                headers : headers
            });
        }

        function GetMyFriends(){
            var headers = authentication.getHeaders();
            return $http({
                url: baseServiceUrl + "/me/friends",
                method: 'GET',
                headers : headers
            });
        }

        function GetUserFriends(user){
            var headers = authentication.getHeaders();
            return $http({
                url: baseServiceUrl + 'users/' + user + '/friends',
                method: 'GET',
                headers : headers
            });
        }

        function GetUserFullData(user){
            var headers = authentication.getHeaders();
            return $http({
                url: baseServiceUrl + 'users/' + user,
                method: 'GET',
                headers : headers
            });
        }

        function SendRequest(username){
            var headers = authentication.getHeaders();
            return $http({
                url: baseServiceUrl + 'me/requests/' + username,
                method: 'POST',
                headers : headers
            });
        }



        return {
            getFriendRequests: GetUserRequests,
            getUsersByName: GetUserByName,
            RejectRequest: RejectRequest,
            ApproveRequest: ApproveRequest,
            GetMyFriends: GetMyFriends,
            GetUserFriends: GetUserFriends,
            getUserFullData: GetUserFullData,
            SendRequest: SendRequest
        }
}]);