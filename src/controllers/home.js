/* GET '/' */
module.exports.index = function(req, res) {
    var images = [
        { url: "http://i.imgur.com/qK42fUu.jpg", isPublic: true},
        { url: "https://images.unsplash.com/photo-1435771112039-1e5b2bcad966?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", isPublic: true},
        { url: "https://images.unsplash.com/photo-1442406964439-e46ab8eff7c4?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", isPublic: true},
        { url: "http://www.freedigitalphotos.net/images/img/homepage/87357.jpg", isPublic: true},
        { url: "https://images.unsplash.com/photo-1444090542259-0af8fa96557e?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", isPublic: true},
        { url: "https://images.unsplash.com/photo-1434543177303-ef2cc7707e0d?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", isPublic: true},
        { url: "https://images.unsplash.com/photo-1436262513933-a0b06755c784?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", isPublic: true},
        { url: "https://images.unsplash.com/photo-1439396087961-98bc12c21176?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", isPublic: true},
        { url: "https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", isPublic: true},
        { url: "https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", isPublic: false}
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