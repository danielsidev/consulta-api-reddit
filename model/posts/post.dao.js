const MySQLClient  = require('../connection/MySQLClient');
class PostsDao extends MySQLClient{
  constructor(){
    super();
    this.db    = this.getConnection();
    this.table = "posts";
  }
  getPostsPeriod(dtStart, dtEnd, typeOrder,callback){
    if(typeOrder==="comments"){
this.db.query("Select * from "+this.table+" where created BETWEEN ? AND ? order by comments desc",[dtStart, dtEnd],callback);
    }else{
this.db.query("Select * from "+this.table+" where created BETWEEN ? AND ? order by ups desc",[dtStart, dtEnd],callback);
    }
  }
  
  getPostsTypeOrder(typeOrder,callback){
    if(typeOrder==="comments"){
      this.db.query("Select * from "+this.table+" order by comments desc",callback);
    }else{
      this.db.query("Select * from "+this.table+" order by ups desc",callback);
    }
    
  }
  addPost(Post,callback){
      let id_posts = null
          this.db.query("Insert into "+this.table+" values(?,?,?,?,?,?,?)",
          [id_posts, Post.title, Post.author, Post.ups, Post.comments, Post.created,Post.data_created],callback);
  }
}
module.exports = PostsDao;
