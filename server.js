let express		   = require('express');
let bodyParser   = require('body-parser');
let app			     = express();
let helmet       = require('helmet'); 
let compression  = require('compression');
let cors 				 = require('cors');
let PostSchedule = require('./controller/schedule/schedule.post.controller.js');
let Routes       = require('./routes/index');
let errorlog     = require('./util/logger').errorlog;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
app.use(cors());
app.use('/public', express.static(__dirname + '/public'));
app.use(compression());
app.use(helmet());
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
/******* Start - Routes *******/
app.use(function(err, req, res, next) {
  errorlog("ERROR 500 ",err);
  res.status(500).send('internal server error');
});
app.use('/api/v1',Routes);
app.get('/',(req,res) => res.render('index.html'));
/******* End - Routes *******/
PostSchedule.jobFindPostsReddit();


app.listen(30838,function(){
	console.log("Aplicação iniciada na porta: http://localhost:30838");
  console.log("Ambiente: "+process.env.NODE_ENV);

});