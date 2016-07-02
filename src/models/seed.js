var mongoose = require('mongoose');
var Image = require('./image');

var images = [
        { 
            url: "http://i.imgur.com/qK42fUu.jpg", 
            title: "Golden Gate", 
            description: "A nice picture of the Golden Gate Bridge", 
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1435771112039-1e5b2bcad966", 
            title: "Sand", 
            description: "A portrait of sand",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1442406964439-e46ab8eff7c4", 
            title: "Escher", 
            description: "Is this an Escher painting?",
            isPublic: true
        },
        { 
            url: "http://www.freedigitalphotos.net/images/img/homepage/87357.jpg",
            title: "Ducks", 
            description: "Awww baby ducks",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1444090542259-0af8fa96557e", 
            title: "Clouds", 
            description: "Clouds at sunset",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1434543177303-ef2cc7707e0d", 
            title: "Water", 
            description: "Water that goes forever",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1436262513933-a0b06755c784", 
            title: "Girl on Yellow", 
            description: "A person walking on a yellow background",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1439396087961-98bc12c21176",
            title: "San Fransisco", 
            description: "An image of San Fransisco",
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1439694458393-78ecf14da7f9", 
            title: "Mountain Ranges", 
            isPublic: true
        },
        { 
            url: "https://images.unsplash.com/photo-1467392952473-8e2e1528c533", 
            title: "FLower Blossums", 
            isPublic: false
        }
    ];
    

function seedDB(){
    //remove all images in the DB
    Image.remove({}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("Removed current images.");        
            //Add new images to the DB
            images.forEach(function(imageData){
                Image.create(imageData, function(err, campground){
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Add a new campground to the DB:");
                        console.log(imageData);                       
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
