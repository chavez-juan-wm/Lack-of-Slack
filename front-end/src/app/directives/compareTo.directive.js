/*
    Author: Juan M. Chavez
    Date: 3-13-17
    File: compareTo.directive.js
    Description: A custom angular directive that checks if two passwords match

    3/13
        Created this directive and added the function

*/
export function CompareToDirective ($parse){
    'ngInject';

    return{
        // Not mandatory, but in this case it's helpful to let it know that it will be in an ng-model
        require: 'ngModel',

        // Scope, element, attributes
        link: function(scope, elm, attrs, ngModel){
            var mainModel = $parse(attrs.compareTo);
            var secondModel = $parse(attrs.ngModel);

            // Watches for changes and if there is a change then it checks if the passwords equal each other
            scope.$watch(attrs.ngModel, function(newValue){
                ngModel.$setValidity(attrs.name, newValue === mainModel(scope));
            });

            // Watches for changes and if there is a change then it checks if the passwords equal each other
            scope.$watch(attrs.compareTo, function(newValue){
                ngModel.$setValidity(attrs.name, newValue === secondModel(scope));
            });
        }
    }
}