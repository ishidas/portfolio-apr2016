module.exports = function(app){
  app.controller('AboutMeController',['$http','$window', function($http, $window){
    var mainRoute = $window._env.apiUrl;
    this.instagramData = {};
    $http.get(mainRoute)
    .then((res)=>{
      this.instagramData = res.data;
      console.log(res);
    });

  }]);//end of controller
};//end of module.exports
