/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("BanquetApp")
        .config(configuration);

    function configuration($routeProvider){
        $routeProvider
            .when("/home",{
                templateUrl:"client/views/home/home.view.html",
                controller:"HomeController"
            })
            .when("/register", {
                templateUrl:"client/views/users/loginAndRegister.view.html",
                controller:"LoginRegisterController",
                controllerAs:"model"
            })
            .when("/login", {
                templateUrl:"client/views/users/loginAndRegister.view.html",
                controller:"LoginRegisterController",
                controllerAs:"model"
            })
            .when("/profile", {
                templateUrl:"client/views/users/profile.view.html",
                controller:"ProfileController",
                controllerAs:"model",
                resolve: {
                    checkLoggedIn: checkLoggedIn
                }
            })
            .when("/admin", {
                templateUrl:"client/views/admin/admin.view.html",
                controller:"AdminController",
                controllerAs:"model",
                resolve: {
                    checkAdmin: checkAdmin
                }

            })

            .when("/forms", {
                templateUrl:"views/forms/colors.view.html",
                controller:"FormController",
                controllerAs:"model"
            })

            .when("/search/:propertyAddress", {
                templateUrl:"client/views/search/search.property.view.html",
                controller:"PropertySearch",
                controllerAs:"model"

            })

            .when("/property/:propertyId/propertyDetails", {
                templateUrl:"client/views/property/properties.view.html",
                controller:"PropertyController",
                controllerAs:"model"

            })

            .otherwise({
                redirectTo:"/home"
            });
    }


    // session mgmt functions

    function checkLoggedIn(UserService, $q, $location) {

        var deferred = $q.defer();

        UserService.getCurrentUser().then(function (response) {

            var currentUser = response.data;

            if (currentUser) {

                UserService.setCurrentUser(currentUser);
                deferred.resolve();

            } else {

                deferred.reject();
                $location.url("/home");
            }
        });

        return deferred.promise;
    }


    var checkAdmin = function($q, $timeout, $location, UserService)
    {
        var deferred = $q.defer();

        UserService.getCurrentUser().then(function (response) {

            var currentUser = response.data;

            if (currentUser && currentUser.roles.indexOf('admin') != -1) {

                UserService.setCurrentUser(currentUser);
                deferred.resolve();

            } else {

                deferred.reject();
                $location.url("/home");
            }
        });

        return deferred.promise;
    };



})();