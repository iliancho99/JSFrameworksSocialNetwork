socialNetwork.factory('authentication', [function(){
    function saveUserData(data){
        localStorage['access_token'] = data.access_token;
    }

    function saveUserDataInSession(data){
        sessionStorage['access_token'] = data.access_token;
    }

    function getHeaders(){
        var headers = {};
        var userToken = sessionStorage['access_token'];
        if(userToken){
            headers.Authorization = "Bearer " + userToken;
        }

        return headers;
    }

    function removeUser() {
        delete sessionStorage['access_token'];
    }

    return{
        saveUser: saveUserData,
        getHeaders: getHeaders,
        removeUser: removeUser,
        rememberUser: saveUserDataInSession
    }
}]);