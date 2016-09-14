(function () {
    angular
        .module('imageGalleryApp')
        .service('authentication', authentication);
    
    authentication.$inject = ['$window'];
    
    function authentication($window) {
        var saveToken = function(token) {
            $window.localStorage['imageGallery-token'] = token;
        };

        var getToken = function () {
            return $window.localStorage['imageGallery-token'];
        };
        
        // post to register endpoint and save token
        var register = function(user) {
            return $http.post('/api/register', user)
                .success(function(data){
                    saveToken(data.token);
                });
        };
        
        // post to login endpoint and save token
        var login = function(user) {
            return $http.post('/api/login', user)
                .success(function(data) {
                    saveToken(data.token);
                });
        };
        
        // delete token to logout user 
        var logout = function() {
            $window.localStorage.removeItem('loc8r-token');
        };
        
        // returns true or false based on token
        var isLoggedIn = function() {
            var token = getToken();
            
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
            return false;
            }
        };
        
        // get information about current user from payload
        var currentUser = function() {          
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return {
                    email : payload.email,
                    name : payload.name
                };
            }
        };

        return {
            saveToken : saveToken,
            getToken : getToken
        };
    }
})();