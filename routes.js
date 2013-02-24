var Mongolian = require("mongolian");
var request = require('request');
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
var purchases = db.collection("users");

/* MIN VIABLE
 * GET /
 * show the main page
 */
module.exports.main_page = function(req, res){
  console.log(req.facebook);
  if (req.facebook.token){
    req.facebook.get('/me/friends', {}, function(friends) {
      games.find({}).limit(12).toArray(function(err,games_arr){
        for(var i = 0; i < games_arr.length; i += 1){
          games_arr[i].fcount = 0;
          games_arr[i].friends = [];
        }
        users.find({$or:friends}).forEach(function(friend){
          for(var i = 0; i < games_arr.length; i += 1){
            for (var j = 0; j < games_arr[i].users.length; j+=1){
              if (friend.id == games_arr[i].users[j].id){
                games_arr[i].fcount++;
                games_arr[i].friends.push(friend);
              }
            }
          }
        });
        return res.render("index", {app:{id:process.env.FACEBOOK_APP_ID}, games:games_arr});
      });
    });
  } else {
    //return not-logged in
    return res.render("index", {app:{id:process.env.FACEBOOK_APP_ID}, games: false});
  }
};

/* MIN VIABLE
 * POST /wishlist/:game_id
 * add the game to the user's wish list
 */
module.exports.add_want = function(req, res){
  req.facebook.me(function(me){
    console.log("me", me);
    games.update({_id:new ObjectId(req.params.game_id)}, {$addToSet:{users:me}}, function(){
      console.log("i'm about to redirect to where I belong");
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
  var game_id = req.params.game_id;
  req.facebook.me(function(me){
    var friend_id = req.body.friend_id,
    auction_link = req.body.auction_link,
    auction_price = req.body.auction_price,
    auction_pic = req.body.auction_pic,
    auction_title = req.body.auction_title,
    game_title = req.body.game_title,
    game_id = req.body.game_id;
    var new_p = {
      origin: me,
      friend: friend_id,
      auction: {
        link: auction_link,
        price: auction_price,
        pic:auction_pic,
        game: game_title,
        game_id: game_id,
        title: auction_title
      }
    };
    purchases.insert(new_p, function(err, doc){
      request.post("https://graph.facebook.com/" + friend_id + 
        "/notifications?acces_token=" + req.facebook.token + "&href=/purchase/accept/" + doc._id + 
        "&template=@[" + me.id + "] wants to buyy " + game_title + " with you!", function(e, r, body){
        res.redirect("/?msg=your%20purchase%20has%20been%20submitted");
      });
    });
  });
};

/* MIN VIABLE
 * GET /purchase/accept/:purchase_id
 * page where a user is asked to accept or decline a purchase offer
 */
module.exports.accept_purchase_page = function(req,res){
  purchases.findOne({_id:new ObjectId(req.params.purchase_id)}, function(err, pur){
    res.send(JSON.stringify(pur));
  });
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
