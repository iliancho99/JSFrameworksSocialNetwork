var socialNetwork = angular.module("SocialNetwork", ['ngRoute', 'base64Images']);

socialNetwork.constant("baseServiceUrl", "http://softuni-social-network.azurewebsites.net/api/");
if(!sessionStorage["access_token"]){
    socialNetwork.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "partials/welcome.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    });
} else {
    socialNetwork.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "partials/home.html"
            })
            .when('/profile', {
                templateUrl: "partials/editProfile.html",
                controller: "EditUserController"
            })
            .when('/logout', {
                templateUrl: "partials/logout.html",
                controller: "LogoutController"
            })
            .when('/profile/password', {
                templateUrl: "partials/changePassword.html",
                controller: "ChangePasswordController"
            })
            .otherwise({
                redirectTo: "/"
            })
    });
}
