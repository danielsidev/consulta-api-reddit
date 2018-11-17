let express    = require('express');
let appRouter  = express(); 
let Posts       = require("./posts.router.js"); 
appRouter.use('/posts',Posts);

module.exports = appRouter;