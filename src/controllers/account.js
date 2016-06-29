/* GET '/images/view' */
module.exports.signup = function(req, res) {
    res.render('account/signup', { title: 'Sign Up'});
};

/* GET '/images/add' */
module.exports.login = function(req, res) {
    res.render('account/login', { title: 'Login'});
};