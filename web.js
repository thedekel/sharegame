var async   = require('async');
var express = require('express');
var util    = require('util');

var routes = require('./routes');

// create an express webserver
var app = express();

app.set("view engine", "ejs");
app.use( express.logger());
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: process.env.SESSION_SECRET || 'secret123' }));
app.use(require('faceplate').middleware({
  app_id: process.env.FACEBOOK_APP_ID,
  secret: process.env.FACEBOOK_SECRET,
  scope:  'user_likes,user_photos,user_photo_video_tags'
}));

// listen to the PORT given to us in the environment
var port = process.env.PORT || 3000;

app.use(function(req, res, next){
  res.locals.host = req.headers['host'];
  next();
});
app.use(function(req, res, next){
  res.locals.scheme = function(req, res){
    return req.headers['x-forwarded-proto'] || 'http';
  };
  next();
});
app.use(function(req, res, next){
  res.locals.url_no_scheme = function(path){
    return "://" + res.locals.host + path;
  };
  next();
});
app.use(function(req, res, next){
  res.locals.url = function(path){
    return res.locals.scheme(req,res) + res.locals.url_no_scheme(path);
  };
  next();
});
/*
app.locals({
  'host': function(req, res) {
    return req.headers['host'];
  },
  'scheme': function(req, res) {
    req.headers['x-forwarded-proto'] || 'http'
  },
  'url': function(req, res) {
    return function(path) {
      return app.locals.scheme(req, res) + app.locals.url_no_scheme(path);
    }
  },
  'url_no_scheme': function(req, res) {
    return function(path) {
      return '://' + app.locals.host(req, res) + path;
    }
  },
});
*/
function render_page(req, res) {
  req.facebook.app(function(app) {
    req.facebook.me(function(user) {
      res.render('index.ejs', {
        layout:    false,
        req:       req,
        app:       app,
        user:      user
      });
    });
  });
}

function handle_facebook_request(req, res) {
  console.log("facebook req object:",req.facebook);

  // if the user is logged in
  if (req.facebook.token) {
    console.log('access token exists');

    async.parallel([
      function(cb) {
        // query 4 friends and send them to the socket for this socket id
        req.facebook.get('/me/friends', { limit: 4 }, function(friends) {
          req.friends = friends;
          cb();
        });
      },
      function(cb) {
        // query 16 photos and send them to the socket for this socket id
        req.facebook.get('/me/photos', { limit: 16 }, function(photos) {
          req.photos = photos;
          cb();
        });
      },
      function(cb) {
        // query 4 likes and send them to the socket for this socket id
        req.facebook.get('/me/likes', { limit: 4 }, function(likes) {
          req.likes = likes;
          cb();
        });
      },
      function(cb) {
        // use fql to get a list of my friends that are using this app
        req.facebook.fql('SELECT uid, name, is_app_user, pic_square FROM user WHERE uid in (SELECT uid2 FROM friend WHERE uid1 = me()) AND is_app_user = 1', function(result) {
          req.friends_using_app = result;
          cb();
        });
      }
    ], function() {
      render_page(req, res);
    });

  } else {
    render_page(req, res);
  }
}

app.get('/', routes.main_page);//handle_facebook_request);
app.post('/', routes.main_page);//handle_facebook_request);
app.post('/wishlist/:gameid', routes.add_want);//handle_facebook_request);
app.get('/wishlist/:gameid', routes.game_details);

app.listen(port, function() {
  console.log("Listening on " + port);
});


