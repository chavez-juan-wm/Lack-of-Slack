/*
    Author: Juan M. Chavez
    Date: 3-2-17
    File: main.controller.js
    Description: This is the controller used in main.html

    3/2 JMC
        Removed the sample content
        Added the $log service for testing
        Created the postMessage() method
*/

export class MainController {
    constructor ($log) {
        'ngInject';

        // Assign properties for this class
        this.$log = $log;
    }

    // Method to handle $http post requests for creating messages
    postMessage() {
        this.$log.log("Post");
    }
}