var express = require('express');
var session = require('express-session');
var mongodb = require('mongodb');

var db = require('monk')('mongodb://quangcuong0808:kiwihoabattu95@ds011790.mlab.com:11790/cdcnapp');
var router = express.Router();

var users = db.get('users');
var tasks = db.get('tasks');

var app = express();
app.use(session({secret: 'duanaohachduocpassnayAhihi'}));


/* GET home page. */
var sess; //session variable

router.get('/', function(req, res, next) {
	sess = req.session;
	//console.log("Logged = " + sess.logged);
	//console.log("Name = " + sess.name);
	var user = {};
	if (sess.logged) {
		user.name = sess.name || "Guest";
		user.logged = 1;
	} else {
		user.name = sess.name||"Guest";
		user.logged = 0;
	};	
	res.render('index', {user: user});
});

router.post('/login', function(req, res, next){
	sess = req.session;
	users.find( { username:req.body.username, password:req.body.password}, function(err, docs){
		if (err) { 
			console.log(err)
		}
		else {
			//Chưa có task nên là chưa lấy task về
			if (req.body.remember && docs) {
				for(var i = 0; i < docs.length; i++){
					sess.name = docs[i].name;
					sess.logged = 1;
					sess.username = docs[i].username;
					sess.password = docs[i].password;
				}
			}
			if (docs) {
				var user = {};
				for(var i = 0; i < docs.length; i++){
					sess.name = docs[i].name;
					user.name = docs[i].name;
					user.logged = 1;
				}
			};
			res.redirect("/");	
		}

	});
});

router.get('/logout', function(req, res, next){
	req.session.destroy();
	res.redirect('/');
});
router.get('/register', function(req, res, next){
	users.insert({username:"quangcuong0808", password:"123", name:"Cương Trần"});
});

module.exports = router;
