(function () {

    angular
        .module('imageGalleryApp')
        .directive('imageHover', imageHover);

    function imageHover () {
        return {
            restrict: 'EA',
            link: function (scope, element, attr) {
                element.hover(function () {
                    $(this).addClass('transition');
                 },
                 function () {
                     $(this).removeClass('transition');
                 });
            }
        }
    }

})();