(function(){
  var angular = require('angular');
  var app = angular.module('myApp');

  app.directive('myNavBar', function(){
    return {
      restrict: 'E',
      templateUrl: 'templates/navbar.html'
    };
  });
  
})();
