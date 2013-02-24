var Mongolian = require("mongolian");
var ObjectId = Mongolian.ObjectId;

var db;
if (process.env.MONGOLAB_URI){
  db = new Mongolian(process.env.MONGOLAB_URI);
} else {
  var server = new Mongolian;
  db = server.db("playshare");
}


var games = db.collection("games");
var users = db.collection("users");

/* MIN VIABLE
 * GET /
 * show the main page
 */
module.exports.main_page = function(req, res){
  console.log(req.facebook);
  if (req.facebook.token){
/*    req.facebook.get('/me/friends', {}, function(friends) {
      users.findOne({$or:friends},function(err,doc){
        console.log("USER MATCHED: ", doc);
      });
      */
    console.log('about to query games');
    games.find({}).limit(12).toArray(function(err,games_arr){
      console.log("games_arr: ",games_arr);
      return res.render("index", {app:{id:process.env.FACEBOOK_APP_ID}, games:games_arr});
    });
  } else {
    //return not-logged in
    return res.render("index", {app:{id:process.env.FACEBOOK_APP_ID, games: false}});
  }
};

/* MIN VIABLE
 * POST /wishlist/:game_id
 * add the game to the user's wish list
 */
module.exports.add_want = function(req, res){
  req.facebook.me(function(me){
    console.log("me", me);
    var userobj = {
      name: me.name,
      fbid: me.id
    };
    console.log("what is: ", {_id:req.params.game_id}, {$addToSet:{users:userobj}});
    games.update({_id:req.params.game_id}, {$addToSet:{users:userobj}}, true,function(){
      res.redirect('/');
    });
  });
};

/* MIN VIABLE
 * GET /purchase/new/:game_id
 * a page where purchase requests can be made
 */
module.exports.buy_request_page = function(req, res){
  res.send('a page where purchase requests can be made');
};

/* MIN VIABLE
 * POST /purchase/new/:game_id
 * create a new purchase on the database, notify target user
 */
module.exports.submit_buy_request = function(req, res){
  res.send('create a new purchase on thedatabase, notify target user');
};

/* MIN VIABLE
 * GET /purchase/accept/:purchase_id
 * page where a user is asked to accept or decline a purchase offer
 */
module.exports.accept_purchase_page = function(req,res){
  res.send('page where a user is asked to accept or decline a purchase offer');
};

/* MIN VIABLE
 * POST /purchase/accept/:purchase_id
 * react to the user's decision. i.e. let the request go through or not (redirect to paypal if yes)
 */
module.exports.accept_purchase_action = function(req, res){
  res.send('react to user\'s purchase decision');
};

/*
 * GET /games/:gameid
 * show page where game details are available
 */
module.exports.game_details = function(req, res){
  res.send('show page where game details are available');
};
