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
            return $http.get('/api/images/' + imageid);
        };
        
        var getImagesByUsername = function(username) {
            return $http.get('/api/images/' + '?user=' + username);
        };
        
        
        var addNewImage = function(imageData) {
            return $http.post('/api/images', imageData, {
                    headers : {
                        Authorization: 'Bearer ' + authentication.getToken()
                    }
            });
        };
        
        var updateImageById = function(imageid, imageData) {
            return $http.put('/api/images/' + imageid, imageData, {
                    headers : {
                        Authorization: 'Bearer ' + authentication.getToken()
                    }
            });
        };
        
        var deleteImageById = function(imageid) {
            return $http.delete('/api/images/' + imageid, {
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
        
        var updateCommentById = function(imageid, commentid, commentData) {
            var url = '/api/images/' + imageid + '/comments/' + commentid;
            return $http.put(url, commentData, {
                    headers : {
                        Authorization: 'Bearer ' + authentication.getToken()
                    }
            });
        };
        
        var deleteCommentById = function(imageid, commentid) {
            var url = '/api/images/' + imageid + '/comments/' + commentid;
            return $http.delete(url, {
                    headers : {
                        Authorization: 'Bearer ' + authentication.getToken()
                    }
            });
        };
        
        var updateLikesById = function(imageid, imageData) {
            return $http.put('/api/images/' + imageid + '/likes', imageData, {
                    headers : {
                        Authorization: 'Bearer ' + authentication.getToken()
                    }
            });
        };
        
        return {
            getAllImages: getAllImages,
            getImageById: getImageById,
            addNewImage: addNewImage,
            updateImageById: updateImageById,
            deleteImageById: deleteImageById,
            addCommentById: addCommentById,
            updateCommentById: updateCommentById,
            deleteCommentById: deleteCommentById,
            getImagesByUsername: getImagesByUsername,
            updateLikesById: updateLikesById
        };   
    }
    
})();