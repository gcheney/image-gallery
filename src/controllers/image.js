/* GET '/images/view' */
module.exports.view = function(req, res) {
    res.render('image/view', { 
        title: 'View Image',
        image: {
            url: "http://i.imgur.com/qK42fUu.jpg",
            title: "Golden Gate",
            description: "The Golden Gate Bridge at night"
        }
    });
};

/* GET '/images/add' */
module.exports.add = function(req, res) {
    res.render('image/new', { title: 'Add a New Image'});
};