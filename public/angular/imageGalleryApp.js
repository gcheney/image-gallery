angular.module('imageGalleryApp', []);

var homepageController = function($scope, imageData) {
    $scope.message = 'Loading images...';
    imageData
        .success(function(data) {
            $scope.message = data.length > 0 ? '' : 'No images found';
            $scope.data = { images: data };
        })
        .error(function (e) {
            $scope.message = 'Sorry, there was an error with our system';
            console.log(e);
        });
};

// imageData service
var imageData = function ($http) {
    return $http.get('/api/images');
};



angular
    .module('imageGalleryApp')
    .controller('homepageController', homepageController)
    .directive('imageHover', imageHover)
    .service('imageData', imageData);

