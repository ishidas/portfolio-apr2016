'use strict';
const angular = require('angular');

require('angular-route');
const app = angular.module('myApp',['ngRoute']);

require(__dirname + '/directives/directives.js')(app);
require(__dirname + '/controllers/github-ctrl.js')(app);
require(__dirname + '/controllers/blog-ctrl.js')(app);
require(__dirname + '/controllers/about-ctrl.js')(app);


//route providers
app.config(['$routeProvider','$httpProvider', function($routeProvider, $httpProvider){
  $httpProvider.defaults.useXDomain = true;
  $httpProvider.defaults.withCredentials = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.headers.common['Accept'] = 'application/json';
  $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';

  $routeProvider
    .when('/', {
      templateUrl: './templates/home.html'
    })
    .when('/home', {
      templateUrl: './templates/home.html'
    })
    .when('/projects', {
      templateUrl: 'templates/github-view.html',
      controller: 'GithubController'
    })
    .when('/about', {
      templateUrl: 'templates/about-view.html'
    })
    .when('/blog', {
      templateUrl: 'templates/blog-view.html',
      controller: 'BlogController'
    })
    .when('/animations', {
      templateUrl: 'templates/animations-view.html'
    })
    .when('/admin/blog',{
      templateUrl: 'templates/blog-admin.html',
      controller: 'BlogController'
    });

}]);
