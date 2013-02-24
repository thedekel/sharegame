/* MIN VIABLE
 * GET /
 * show the main page
 */
module.exports.main_page = function(req, res){
  var pop_games = [
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg"
  },
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg"
  },
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg"
  },
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg"
  },
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg"
  },
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg"
  },
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg"
  },
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg"
  }
  ];
  var friends_games = [
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
      img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg",
      friends: [
      {
        name: "Jarvis Johnson",
        fbid: 3289423,
        prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
      },
      {
        name: "Jarvis Johnson",
        fbid: 3289423,
        prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
      },
      {
        name: "Jarvis Johnson",
        fbid: 3289423,
        prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
      },
      {
        name: "Jarvis Johnson",
        fbid: 3289423,
        prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
      }
    ]
  },
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg",
    friends: [
      ]
  },
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg",
    friends: [
    {
      name: "Jarvis Johnson",
      fbid: 3289423,
      prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
    },
    {
      name: "Jarvis Johnson",
      fbid: 3289423,
      prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
    },
    {
      name: "Jarvis Johnson",
      fbid: 3289423,
      prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
    },
    {
      name: "Jarvis Johnson",
      fbid: 3289423,
      prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
    }
    ]
  },
  {
    _id: "myidisastring"
      name: "Dragon Ball Z Bodokai tenkaichi 3",
    img: "http://buycds.files.wordpress.com/2009/01/boxart_eur_dragon-ball-z-budokai-tenkaichi-3.jpg",
    friends: [
    {
      name: "Jarvis Johnson",
      fbid: 3289423,
      prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
    },
    {
      name: "Jarvis Johnson",
      fbid: 3289423,
      prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
    },
    {
      name: "Jarvis Johnson",
      fbid: 3289423,
      prof_pic: "https://fbcdn-profile-a.akamaihd.net/hprofile-ak-snc6/260639_646922063_1318803919_q.jpg"
    },
    ]
  }
  ];
  res.render('new',{pop_games:pop_games, friends_games:friends_games});
};

/* MIN VIABLE
 * POST /wishlist/:game_id
 * add the game to the user's wish list
 */
module.exports.add_want = function(req, res){
  res.send('add the game to the user\'s wish list');
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
