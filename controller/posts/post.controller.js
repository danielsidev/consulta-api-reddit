
let PostDao = require('../../model/posts/post.dao');

class PostController extends PostDao{
    constructor(){
        super();        
    }
    getPostsPeriodControl(dtStart, dtEnd, typeOrder){
         return new Promise((resolve, reject) => {
            this.getPostsPeriod(dtStart, dtEnd, typeOrder,(err,rows) =>{
                this.closeConnection();
                console.log("result: "+JSON.stringify(rows));                
                (err)?reject(err):resolve(rows);
             });
        }); 
    }
    getPostsTypeOrderControl(typeOrder){
        return new Promise((resolve, reject) => {
            this.getPostsTypeOrder(typeOrder,(err,rows) =>{
                this.closeConnection();                  
                (err)?reject(err):resolve(rows);
            });
        }); 
    }
    addNewPost(Post){
        return new Promise((resolve, reject) => {
            this.addPost(Post, (err) => {
                (err)?reject(err):resolve("Post added with success!");
            });
        }); 
    }
 }
 module.exports=PostController;
