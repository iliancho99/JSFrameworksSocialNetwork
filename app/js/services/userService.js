socialNetwork.factory('userService', ['$http', 'authentication','baseServiceUrl' , function ($http, authentication, baseServiceUrl) {
    function LoginUser(user){
        return $http({
            url: baseServiceUrl + 'users/Login',
            method: 'POST',
            headers: authentication.getHeaders,
            data: user
        });
    }

    function LogoutUser(){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'users/Logout',
            method: 'POST',
            headers: headers
        });
    }

    function RegisterUser(user){
        return $http({
            url: baseServiceUrl + 'users/Register',
            method: 'POST',
            headers: authentication.getHeaders,
            data: user
        });
    }

    function EditProfile(user){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'me',
            method: 'PUT',
            headers: headers,
            data: user
        });
    }

    function ChangePassword(passwordData){
        var headers = authentication.getHeaders();
        return $http({
            url: baseServiceUrl + 'me/ChangePassword',
            method: 'PUT',
            headers: headers,
            data: passwordData
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
        register: RegisterUser,
        getLoggedUserData: GetLoggedUserData,
        editProfile: EditProfile,
        logout: LogoutUser,
        changePassword: ChangePassword
    }
}]);