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
    this.activeList;
    //get all articles
    $http.get(mainRoute + '/blog/articles')
      .then((res)=>{
        this.blogData = res.data;
        console.log(JSON.stringify(this.blogData));
      });

    //admin/blog
    this.postNewBlog = function(){
      $http.post(mainRoute + '/admin/blog',this.newPost)
        .then((res)=>{
          console.log('res : ' + JSON.stringify(res));
        });
    };

    this.toggleArticle = function(list){
      this.activeList = list;
    };


  }]);//end of controller
};//endo of module.exports
