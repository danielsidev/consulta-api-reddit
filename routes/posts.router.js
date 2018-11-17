let errorlog       = require('../util/logger').errorlog;
let successlog     = require('../util/logger').successlog;
let express        = require('express');
let router         = express();
let PostController = require('../controller/posts/post.controller');

router.get('/type-order/:order',function(req,res,next){
    let typeOrder = req.params.order;
    if(typeOrder){
    let PostOrder = new PostController();    
    PostOrder.getPostsTypeOrderControl(typeOrder)
            .then((response) =>{
                if(response.length >0){
                    let data = { typeOrder:typeOrder};
                    successlog("Router: /posts/type-order ","We Found Posts in this period: "+data);
                    res.status(200).json({"response":200, "error":null, "body":response});
                }else{
                    successlog("Router: /posts/type-order ","We Not Found Posts in this period: "+data);
                    res.status(200).json({"response":200, "message":"We Not Found Posts in this period!","error":null, "body":response});
                }
            })
            .catch((error) => {
                errorlog("Router: /posts/type-order ",error);
                res.status(400).json({"response":400, "error":"Is not possible to find now. Try again later.", "body":null});
            });
    }else{
        errorlog("Router: /posts/type-order ","Type Order Undefined or Null");
                res.status(401).json({"response":401, "error":"Access denied.", "body":null});
    }
});

router.get('/period/type-order',function(req,res,next){
    let dtStart   = req.headers['x-access-dtstart'];
    let dtEnd     = req.headers['x-access-dtend'];
    let typeOrder = req.headers['x-access-type-order'];
    
    if(dtStart && dtEnd && typeOrder){

    let Post = new PostController();
    Post.getPostsPeriodControl(dtStart, dtEnd, typeOrder)
            .then((response) =>{
                if(response.length >0){
                    let data = { dtStart:dtStart, dtEnd:dtEnd, typeOrder:typeOrder};
                    successlog("Router: /posts/period/type-order ","We Found Posts in this period: "+data);
                    res.status(200).json({"response":200, "error":null, "body":response});
                }else{
                    successlog("Router: /posts/period/type-order ","We Not Found Posts in this period: "+data);
                    res.status(200).json({"response":200, "message":"We Not Found Posts in this period!","error":null, "body":response});
                }
            })
            .catch((error) => {
                errorlog("Router: /posts/period/type-order ",error);
                res.status(400).json({"response":400, "error":"Is not possible to find now. Try again later.", "body":null});
            });
                }else{
                    errorlog("Router: /posts/period/type-order ","dtStart, dtEnd and  Type Order Undefined or Null");
                    res.status(401).json({"response":401, "error":"Access denied.", "body":null});
    }
});

 module.exports=router;