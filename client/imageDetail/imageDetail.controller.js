(function () {
    
    angular
        .module('imageGalleryApp')
        .controller('imageDetailController', imageDetailController);
    
    imageDetailController.$inject = ['$routeParams', '$location', '$modal', 
                                     'imageGalleryData', 'authentication'];
    
    function imageDetailController ($routeParams, $location, $modal, 
                                     imageGalleryData, authentication) {
        var vm = this;
        
        vm.imageid = $routeParams.imageid;
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentPath = $location.path();
        
        imageGalleryData
            .getImageById(vm.imageid)
            .success(function(data) {
                vm.data = { image: data }
                if (vm.isLoggedIn) {
                    var creator = vm.data.image.creator;
                    vm.userIsImageCreator =  isImageCreater(creator);
                    var username = getCurrentUsername();
                    vm.hasLiked = vm.data.image.likes.includes(username);
                }
            })
            .error(function(e) {
                console.log(e);
            });
        
        vm.commentModal = function() {
            var modalInstance = $modal.open({
                templateUrl: '/commentModal/commentModal.view.html',
                controller: 'commentModalController as vm',
                resolve: {
                    imageData: function () {
                        return {
                            imageid : vm.imageid,
                            imageTitle : vm.data.image.title
                        };
                    }
                }
            });
            
            modalInstance.result.then(function(newCommentData) {
                vm.data.image.comments.push(newCommentData);
            });
        };
        
        vm.updateImageModal = function() {
            var modalInstance = $modal.open({
                templateUrl: '/updateImageModal/updateImageModal.view.html',
                controller: 'updateImageModalController as vm',
                resolve: {
                    imageData: function() {
                        return {
                            imageid : vm.imageid,
                            title : vm.data.image.title,
                            description: vm.data.image.description
                        };
                    }
                }
            });
            
            modalInstance.result.then(function(updatedImageData) {
                vm.data.image.title = updatedImageData.title;
                vm.data.image.description = updatedImageData.description;
            });
        };
        
        vm.deleteImageModal = function() {
            var modalInstance = $modal.open({
                templateUrl: '/deleteImageModal/deleteImageModal.view.html',
                controller: 'deleteImageModalController as vm',
                resolve: {
                    imageData: function () {
                        return {
                            imageid : vm.imageid,
                            imageTitle : vm.data.image.title
                        };
                    }
                }
            });
        };
        
        vm.updateImageLikes = function() {
            imageGalleryData
                .updateLikesById(vm.imageid, vm.data)
                .success(function(data) {
                    vm.data.image.likes = data.likes;
                    var username = getCurrentUsername();
                    vm.hasLiked = vm.data.image.likes.includes(username);
                })
                .error(function(e) {
                    console.log(e);
                });
        };
        
        function isImageCreater(username) {
            return getCurrentUsername() === username;
        }
        
        function getCurrentUsername() {
            return authentication.getCurrentUser().username;
        }
    }
    
})();