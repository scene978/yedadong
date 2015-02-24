var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var ejs = require('ejs');
var mysql = require('mysql');

var routes = require('./routes/index');
var mypage = require('./routes/mypage');
var groupHome = require('./routes/groupHome');
//var groupFamily = require('./routes/groupFamily');
var groupBoard = require('./routes/groupBoard');
var groupSettingMember = require('./routes/groupSetting_member');
var groupSettingBoard = require('./routes/groupSetting_board');
var movepage = require('./routes/movepage');
var header = require('./routes/header');

var app = express();

var server = http.createServer(app);

// view engine setup
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(session({secret: 'good'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,function(){
    console.log("App Started on PORT 3000");
});


//index
app.get('/', routes.index);
app.post('/login', routes.login);
app.post('/signin', routes.signin);


//mypage
app.get('/mypage', mypage.index);
app.post('/mypage/getGroupList', mypage.getGroupList);
app.post('/mypage/getWaitingList', mypage.getWaitingList);
app.post('/mypage/createGroup', mypage.createGroup);
app.post('/mypage/changeState', mypage.changeState);
app.post('/mypage/moveGroup', mypage.moveGroup);


//groupHome
app.get('/groupHome', groupHome.index);


//groupBoard
app.get('/groupBoard', groupBoard.index);


//groupFamily


//groupSettingMember
app.get('/groupSettingMember', groupSettingMember.index);


//groupSettingBoard
app.get('/groupSettingBoard', groupSettingBoard.index);


//movepage
app.get('/moveHome', movepage.moveHome);
app.get('/moveBoard', movepage.moveBoard);
//app.get('/moveFamily', movepage.moveFamily);
app.get('/moveSettingMember', movepage.moveSettingMember);
app.get('/moveSettingBoard', movepage.moveSettingBoard);


//header
app.get('/logout', header.logout);
app.get('/helloMessage', header.helloMessage);
app.get('/scrollGroupList', header.scrollGroupList);
app.get('/moveMypage', header.moveMypage);
