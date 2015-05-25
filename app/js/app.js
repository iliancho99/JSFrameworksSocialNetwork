var socialNetwork = angular.module("SocialNetwork", ['ngRoute']);

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
            .otherwise({
                redirectTo: "/"
            })
    });
}
