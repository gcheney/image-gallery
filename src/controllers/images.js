/* GET '/images/view' */
module.exports.view = function(req, res) {
    res.render('images/view', { title: 'View Image' });
};

/* GET '/images/add' */
module.exports.add = function(req, res) {
    res.render('images/new', { title: 'Add a New Image' });
};