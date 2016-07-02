/* GET '/' */
module.exports.index = function(req, res) {
    var images = [
        { url: "http://i.imgur.com/qK42fUu.jpg", public: true},
        { url: "https://images.unsplash.com/photo-1435771112039-1e5b2bcad966", isPublic: true},
        { url: "https://images.unsplash.com/photo-1442406964439-e46ab8eff7c4", isPublic: true},
        { url: "http://www.freedigitalphotos.net/images/img/homepage/87357.jpg", isPublic: true},
        { url: "https://images.unsplash.com/photo-1444090542259-0af8fa96557e", isPublic: true},
        { url: "https://images.unsplash.com/photo-1434543177303-ef2cc7707e0d", isPublic: true},
        { url: "https://images.unsplash.com/photo-1436262513933-a0b06755c784", isPublic: true},
        { url: "https://images.unsplash.com/photo-1439396087961-98bc12c21176", isPublic: true},
        { url: "https://images.unsplash.com/photo-1439694458393-78ecf14da7f9", isPublic: true}
    ];
    
    res.render('home', { 
        title: 'Home',
        images: images
    });
};

/* GET '/about' */
module.exports.about = function(req, res) {
    res.render('home/about', { title: 'About'});
};

/* GET '/contact' */
module.exports.contact = function(req, res) {
    res.render('home/contact', { title: 'Contact'});
};