/* MIN VIABLE
 * GET /
 * show the main page
 */
module.exports.main_page = function(req, res){
  res.render('new');
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
