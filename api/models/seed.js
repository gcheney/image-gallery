var mongoose = require('mongoose');
var Image = require('./image');

var images = [
        { 
            url: "http://i.imgur.com/qK42fUu.jpg", 
            title: "Golden Gate", 
            description: "A nice picture of the Golden Gate Bridge", 
            likes: 12,
            creator: 'Homer'
        },
        { 
            url: 'https://images.unsplash.com/photo-1435771112039-1e5b2bcad966?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450', 
            title: 'Sand', 
            description: 'A portrait of sand',
            likes: 12
        },
        { 
            url: 'https://images.unsplash.com/photo-1442406964439-e46ab8eff7c4?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450', 
            title: 'Escher', 
            description: 'Is this an Escher painting?',
            likes: 13
        },
        { 
            url: 'https://images.unsplash.com/photo-1444090542259-0af8fa96557e?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450', 
            title: 'Clouds', 
            description: 'Clouds at sunset',
            likes: 9
        },
        { 
            url: 'https://images.unsplash.com/photo-1434543177303-ef2cc7707e0d?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450', 
            title: 'Water', 
            description: 'Water that goes forever',
            likes: 8
        },
        { 
            url: 'https://images.unsplash.com/photo-1436262513933-a0b06755c784?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450', 
            title: 'Girl on Yellow', 
            description: 'A person walking on a yellow background',
        },
        { 
            url: 'https://images.unsplash.com/photo-1439396087961-98bc12c21176?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450',
            title: 'San Fransisco', 
            description: 'An image of San Fransisco',
        }
    ];
    

function seedDB(){
    //remove all images in the DB
    Image.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log('Removed current images.');        
            //Add new images to the DB
            images.forEach(function(image){
                Image.create(image, function(err, addedImage){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Added a new image to the DB:');
                        console.log(addedImage);                       
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
