socialNetwork.factory('userService', ['$http', 'authentication','baseServiceUrl' , function ($http, authentication, baseServiceUrl) {
    function LoginUser(user){
        return $http({
            url: baseServiceUrl + 'users/Login',
            method: 'POST',
            headers: authentication.getHeaders,
            data: user
        });
    }

    function EditProfile(user){
        return $http({
            url: baseServiceUrl + 'me',
            method: 'PUT',
            headers: authentication.getHeaders,
            data: user
        });
    }

    function GetLoggedUserData(){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'me',
            method: 'GET',
            headers: headers
        });
    }

    return {
        login: LoginUser,
        getLoggedUserData: GetLoggedUserData,
        editProfile: EditProfile
    }
}]);