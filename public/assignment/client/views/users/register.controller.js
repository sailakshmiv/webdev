/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location, UserService, $rootScope){
        
        var vm=this;
        
        vm.register=register;
        vm.$location=$location;
        
        (function init() {

        })();
        //console.log("In Register conyroller");

        function register(username, password, vpassword, emailId){
            console.log("Register Called");

            var user={
                "_id":0,
                "username":username,
                "password":password,
                "roles": ["student"],
                "emailId":emailId
            };

            console.log(user);
            UserService.createUser(user, function(response) {

                //console.log("response from service"+response.username);
                if(response=="OK"){
                    UserService.setCurrentUser(user);
                    $location.url("profile");

                }

            });

        }

    }
})();