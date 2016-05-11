module.exports = function(app){
  app.controller('BlogController',['$http',function($http){
    var mainRoute = 'http://localhost:3000';
    this.blogData = {};
    this.newPost = {
      title: '',
      auther: '',
      body: ''
    };
    //get all articles
    $http.get(mainRoute + '/blog/articles')
      .then((res)=>{
        this.blogData = res.data;
        console.log('res : ' + JSON.stringify(this.blogData));
        console.log('res.data : ' + JSON.stringify(res.data));
      });

    //admin/blog
    this.postNewBlog = function(){
      console.log('hitting ' + JSON.stringify(this.newPost))
      $http.post(mainRoute + '/admin/blog',this.newPost)
        .then((res)=>{
          console.log('res : ' + JSON.stringify(res));
        });
    };

  }]);//end of controller
};//endo of module.exports
