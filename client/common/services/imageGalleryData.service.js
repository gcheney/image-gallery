(function() {

    angular
        .module('imageGalleryApp')
        .service('imageGalleryData', imageGalleryData);

    imageGalleryData.$inject = ['$http'];
    
    function imageGalleryData($http) {
        
        var getAllImages = function() {
            return $http.get('/api/images');
        };
        
        var getImageById = function(imageid) {
            return $http.get('/api/images/' + imageid)
        };
        
        var addCommentById = function(imageid, commentData) {
            return $http.post('/api/images/' + imageid + '/comments', commentData);
        };
        
        return {
            getAllImages: getAllImages,
            getImageById: getImageById,
            addCommentById: addCommentById
        };   
    }
    
})();