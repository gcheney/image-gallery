var mongoose = require('mongoose');
var Image = require('./image');

var images = [
        { 
            url: "http://i.imgur.com/qK42fUu.jpg", 
            title: "Golden Gate", 
            description: "A nice picture of the Golden Gate Bridge", 
            isPublic: true,
            likes: 12,
            comments: [
                {
                    author: 'test user',
                    text: 'Nice!'
                }
            ]
        },
        { 
            url: "https://images.unsplash.com/photo-1435771112039-1e5b2bcad966?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Sand", 
            description: "A portrait of sand",
            isPublic: true,
            likes: 12
        },
        { 
            url: "https://images.unsplash.com/photo-1442406964439-e46ab8eff7c4?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Escher", 
            description: "Is this an Escher painting?",
            isPublic: true,
            likes: 13
        },
        { 
            url: "https://images.unsplash.com/photo-1444090542259-0af8fa96557e?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Clouds", 
            description: "Clouds at sunset",
            isPublic: true,
            likes: 9
        },
        { 
            url: "https://images.unsplash.com/photo-1434543177303-ef2cc7707e0d?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Water", 
            description: "Water that goes forever",
            isPublic: true,
            likes: 8
        },
        { 
            url: "https://images.unsplash.com/photo-1436262513933-a0b06755c784?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Girl on Yellow", 
            description: "A person walking on a yellow background",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1439396087961-98bc12c21176?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450",
            title: "San Fransisco", 
            description: "An image of San Fransisco",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Mountain Ranges", 
            description: "Beautiful mountain ranges",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1467392952473-8e2e1528c533?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Flower Blossums", 
            isPublic: false
        },
    { 
            url: "http://i.imgur.com/qK42fUu.jpg", 
            title: "Golden Gate", 
            description: "A nice picture of the Golden Gate Bridge", 
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1435771112039-1e5b2bcad966?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Sand", 
            description: "A portrait of sand",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1442406964439-e46ab8eff7c4?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Escher", 
            description: "Is this an Escher painting?",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1444090542259-0af8fa96557e?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Clouds", 
            description: "Clouds at sunset",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1434543177303-ef2cc7707e0d?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Water", 
            description: "Water that goes forever",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1436262513933-a0b06755c784?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Girl on Yellow", 
            description: "A person walking on a yellow background",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1439396087961-98bc12c21176?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450",
            title: "San Fransisco", 
            description: "An image of San Fransisco",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1439694458393-78ecf14da7f9?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Mountain Ranges", 
            description: "Beautiful mountain ranges",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1467392952473-8e2e1528c533?dpr=2&fit=crop&fm=jpg&h=825&q=50&w=1450", 
            title: "Flower Blossums", 
            isPublic: false
        }
    ];
    

function seedDB(){
    //remove all images in the DB
    Image.remove({}, function(err){
        if (err) {
            console.log(err);
        } else {
            console.log("Removed current images.");        
            //Add new images to the DB
            images.forEach(function(image){
                Image.create(image, function(err, addedImage){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Added a new image to the DB:");
                        console.log(addedImage);                       
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
