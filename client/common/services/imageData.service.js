(function() {

    angular
        .module('imageGalleryApp')
        .service('imageData', imageData);

    imageData.$inject = ['$http'];
    
    function imageData($http) {
        
        var getAllImages = function() {
            return $http.get('/api/images');
        };
        
        var getImageById = function(imageid) {
            return $http.get('/api/images/' + imageid)
        };
        
        return {
            getAllImages: getAllImages,
            getImageById: getImageById
        };   
    }
    
})();