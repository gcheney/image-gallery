(function() {

    angular
        .module('imageGalleryApp')
        .service('imageData', imageData);

    imageData.$inject = ['$http'];
    
    function imageData ($http) {
        return $http.get('/api/images');
    };
    
})();