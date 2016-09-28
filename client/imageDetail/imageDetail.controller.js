(function () {
    
    angular
        .module('imageGalleryApp')
        .controller('imageDetailController', imageDetailController);
    
    imageDetailController.$inject = ['$scope', '$routeParams', '$location', '$modal', 
                                     'imageGalleryData', 'authentication'];
    
    function imageDetailController ($scope, $routeParams, $location, $modal, 
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
                    vm.userIsImageCreator =  userIsContentOwner(creator);
                    var username = authentication.getCurrentUser().username;;
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
            if (!authentication.isLoggedIn()) {
                vm.error = 'You need to log in to like an image';
                return;
            }
            
            imageGalleryData
                .updateLikesById(vm.imageid, vm.data)
                .success(function(data) {
                    vm.data.image.likes = data.likes;
                    var username = authentication.getCurrentUser().username;
                    vm.hasLiked = vm.data.image.likes.includes(username);
                })
                .error(function(e) {
                    console.log(e);
                });
        };
        
        vm.updateCommentModal = function(originalComment) {
            var modalInstance = $modal.open({
                templateUrl: '/updateCommentModal/updateCommentModal.view.html',
                controller: 'updateCommentModalController as vm',
                resolve: {
                    imageData: function () {
                        return {
                            imageid : vm.imageid,
                            comment: originalComment
                        };
                    }
                }
            });
            
            modalInstance.result.then(function(updatedCommentData) {
                var comments = vm.data.image.comments;
                var index = comments.indexOf(originalComment);
                if (index !== -1) {
                    comments[index] = updatedCommentData
                }
                vm.data.image.comments = comments;
                console.log(vm.data.image.comments);
            });
        };
        
        $scope.deleteComment = function(comment) {
            imageGalleryData
                .deleteCommentById(vm.imageid, comment._id)
                .success(function() {
                    var comments = vm.data.image.comments;
                    var index = comments.indexOf(comment);
                    if (index > -1) {
                        comments.splice(index, 1);
                    }
                    vm.data.image.comments = comments;
                })
                .error(function(e) {
                    console.log(e);
                });
        };
        
        $scope.isCommentAuthor = function(username) {
            return authentication.isLoggedIn() ? userIsContentOwner(username) : false;
        };
        
        function userIsContentOwner(username) {
            return authentication.getCurrentUser().username === username;
        }
    }
    
})();