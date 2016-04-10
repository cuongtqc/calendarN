var express = require('express');
var session = require('express-session');
var mongodb = require('mongodb');
//var clientjs = require(__dirname.slice(0, __dirname.length - 6) +'\\public\\javascripts\\app.js');

var db = require('monk')('mongodb://quangcuong0808:kiwihoabattu95@ds011790.mlab.com:11790/cdcnapp');
var router = express.Router();

var users = db.get('users');
var tasks = db.get('task');

var app = express();
app.use(session({secret: 'duanaohachduocpassnayAhihi'}));


/* GET home page. */
//var sess = {}; //session variable
//sess.user = sess.user||{};

router.get('/', function(req, res, next) {
	sess = req.session||{};
	sess.user = sess.user||{};

	sess.user.act = 'view';
	sess.user.name = sess.user.name||"Guest";	
	res.render('index', {sess: sess});
});

router.post('/login', function(req, res, next){
	sess = req.session||{};
	sess.user = sess.user||{};
	users.find( { username:req.body.username, password:req.body.password}, function(err, docs){
		if (err) { 
			console.log(err)
		}
		else {
			
			if (docs) {
				for(var i = 0; i < docs.length; i++){
					sess.user.name = docs[i].name;
					sess.user.logged = 1;
					sess.user.act = 'view';
					sess.user.username = docs[i].username;
					sess.user.password = docs[i].password;
					sess.user.task = docs[i].task;
				}
			};
			res.redirect("/");	
		}

	});
});

router.get('/logout', function(req, res, next){
	req.session.destroy();
	//db.close();
	res.redirect('/');
});

router.post('/register', function(req, res, next){
	sess = req.session;

	users.find({ username:req.body.username}, function(err, docs){
		if (err) { 
			console.log(err);
		}
		else {
			//Chưa có task nên là chưa lấy task về
			sess.user.logged = false;
			if (docs.username != req.body.username) {
				
				users.insert({username:req.body.username, name:req.body.name, password:req.body.password, task:[]});
				
			} else console.log('Account invalid');
			res.redirect("/");	
		}

	});
		
});

router.get('/:act', function(req, res, next){
	sess = req.session||{};
	sess.user.act = req.params.act;
	sess.user.name = sess.user.name;
	res.render('index',{sess: sess});
});

router.post('/them', function(req, res, next){
	sess = req.session||{};
	var a = sess.user.task||[];
	sess.user.task.push({content: req.body.task_name, deadline: req.body.task_deadline});
	//console.log(sess.user.task);
	users.findAndModify({username : sess.user.username}, 
		{ $set: {task : sess.user.task}} ,
		{upsert : true},
		function (err, result) {
    	console.log(err);
	});
	res.redirect('/');
});

router.get('/del/:id', function(req, res, next) {
	sess = req.session;
	var task = sess.user.task;
	task.splice(req.params.id, 1);
	users.findAndModify({username : sess.user.username}, 
		{ $set: {task : task}} ,
		{upsert : true},
		function (err, result) {
    	console.log(err);
	});
    res.redirect('/');

});

router.post('/edit/:id', function(req, res, next) {
	sess = req.session;
	var task = sess.user.task;
	task.splice(req.params.id, 1,{content:req.body.task_name, deadline: req.body.task_deadline});
	users.findAndModify({username : sess.user.username}, 
		{ $set: {task : task}} ,
		{upsert : true},
		function (err, result) {
    	console.log(err);
	});
    res.redirect('/');

});

module.exports = router;
