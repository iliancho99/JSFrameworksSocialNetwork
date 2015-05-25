var socialNetwork = angular.module("SocialNetwork", ['ngRoute']);

socialNetwork.constant("baseSurviceUrl", "http://softuni-social-network.azurewebsites.net/api/");
if(!sessionStorage["userAccessToken"]){
    socialNetwork.config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: "partials/welcome.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    });
}
