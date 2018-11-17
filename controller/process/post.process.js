const moment = require("moment");
const rp = require('request-promise');
const errorlog = require('../../util/logger').errorlog;
const successlog = require('../../util/logger').successlog;
let   PostController = require('../posts/post.controller' );
class PostProcess extends PostController{
    constructor(url, methodRequest){
        super();
        this.options= {
            method: methodRequest,
            uri: url,
            headers:{'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36', "Content-Type": "application/json;charset=utf-8"},
            json: true
        } 
    }
    getPosts(){
        let dtNow = moment().format("YYYY-MM-DD HH:mm:ss");
        rp(this.options)
            .then( (response) => {
                //console.log(response);
                if(response.data.children !== undefined ){
                    let message = "Acessou a api com sucesso | "+dtNow;
                    successlog("GET API",message);
                    response.data.children.map( (data) => {
                        let Post = {
                            title        : data.data.title.replace(/"/g, ''),
                            author       : data.data.author.replace(/"/g, ''),
                            ups          : data.data.ups,
                            comments     : data.data.num_comments,
                            created      : moment(data.data.created).format("YYYY-MM-DD HH:mm:ss"),
                            data_created : dtNow
                        };
                        this.addNewPost(Post).then( (response) => {
                         successlog("POST: "+response,Post);
                        }).catch((error) => {
                            errorlog("ERROR | ADD POST | "+dtNow,error);
                        });
                    });
                }else{
                successlog("GET API","Not found posts");
                }
            })
            .catch(function (err) {
             errorlog("ERROR | GET API | "+dtNow,err);
            });
    }
} 

module.exports = PostProcess;

