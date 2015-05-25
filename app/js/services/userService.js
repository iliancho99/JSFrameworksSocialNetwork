socialNetwork.factory('userService', ['$http', 'authentication','baseServiceUrl' , function ($http, authentication, baseServiceUrl) {
    function LoginUser(user){
        return $http({
            url: baseServiceUrl + 'users/Login',
            method: 'POST',
            headers: authentication.getHeaders,
            data: user
        });
    }

    function GetLoggedUserData(){
        return $http({
            url: baseServiceUrl + 'users/me',
            method: 'GET',
            headers: authentication.getHeaders
        });
    }

    return {
        login: LoginUser,
        getLoggedUserData: GetLoggedUserData()
    }
}]);