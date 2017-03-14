/*
    Author: Juan M. Chavez
    Date: 3-2-17
    File: main.controller.js
    Description: This is the controller used in main.html

    3/2
        Removed the sample content
        Added the $log service for testing
        Created the postMessage() method

    3/3
        Replaced the $log service with $http
        Added a post request in the postMessage() method with a message for debugging

    3/6
        Changed the data sent in the post request to what is in the textarea in main.html

    3/9
        Added a get messages method to retrieve the messages from the database and set them to a property
*/

export class MainController {
    constructor ($http, $log) {
        'ngInject';

        // Assign properties for this class
        this.$http = $http;
        this.$log = $log;
        this.getMessages();
    }

    // Method to handle initiating $http post requests for creating messages
    postMessage() {
        this.$http.post('http://localhost:8080/api/message', { msg: this.message });
    }

    getMessages(){
        // View model that is a reference to itself
        var vm = this;
        this.$http.get('http://localhost:8080/api/message')
        .then(
            function(result){
                vm.messages = result.data;
            },
            function(error){
                vm.$log.error(error);
            }
        );
    }
}