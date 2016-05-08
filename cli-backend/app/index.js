'use strict';
const angular = require('angular');

require('angular-route');
const app = angular.module('myApp',['ngRoute']);

require(__dirname + '/directives/directives.js')(app);



app.config(['$routeProvider', function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './templates/home.html'
    });
}]);
