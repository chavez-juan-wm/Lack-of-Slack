/*
    Author: Juan M. Chavez
    Date: 3-14-17
    File: compareTo.directive.js
    Description: A custom angular directive that checks if two passwords match

    3/14
        Created the auth controller
        Added a register method to send the information from the registration form to our backend

 */
export class AuthController {
    constructor($auth, $window){
        'ngInject';

        this.$auth = $auth;
        this.$window = $window;
    }

    register(){
        var vm = this;

        this.$auth.signup(this.user).then(function(token){
            vm.$auth.setToken(token);
        });
    }

    login(){
        var vm = this;

        this.$auth.login(this.login.user)
            .then(function(token){
                vm.$auth.setToken(token);
                vm.$window.location.href = '';
            }
        );
    }
}