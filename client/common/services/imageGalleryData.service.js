(function() {

    angular
        .module('imageGalleryApp')
        .service('imageGalleryData', imageGalleryData);

    imageGalleryData.$inject = ['$http', 'authentication'];
    
    function imageGalleryData($http, authentication) {
        
        var getAllImages = function() {
            return $http.get('/api/images');
        };
        
        var getImageById = function(imageid) {
            return $http.get('/api/images/' + imageid)
        };
        
        var addNewImage = function(imageData) {
            return $http.post('/api/images', imageData, {
                    headers : {
                        Authorization: 'Bearer ' + authentication.getToken()
                    }
            });
        };
        
        var addCommentById = function(imageid, commentData) {
            return $http.post('/api/images/' + imageid + '/comments', commentData, {
                    headers : {
                        Authorization: 'Bearer ' + authentication.getToken()
                    }
            });
        };
        
        return {
            getAllImages: getAllImages,
            getImageById: getImageById,
            addNewImage: addNewImage,
            addCommentById: addCommentById
        };   
    }
    
})();