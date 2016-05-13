module.exports = function(app){
  app.controller('BlogController',['$http',function($http){
    var mainRoute = 'http://localhost:3000';
    this.blogData = {};
    this.newPost = {
      title: '',
      auther: '',
      body: ''
    };
    this.showFull = false;

    //get all articles
    $http.get(mainRoute + '/blog/articles')
      .then((res)=>{
        this.blogData = res.data;
      });

    //admin/blog
    this.postNewBlog = function(){
      $http.post(mainRoute + '/admin/blog',this.newPost)
        .then((res)=>{
          console.log('res : ' + JSON.stringify(res));
        });
    };

    this.showFullArticle = function(){
      if(this.showFull === false){
        console.log('hit ' + this.showFull)
        this.showFull = true;
      } else {
        this.showFull = false;
      }
    };

  }]);//end of controller
};//endo of module.exports
