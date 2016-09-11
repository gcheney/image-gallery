(function() {
    
    angular 
        .module('imageGalleryApp')
        .filter('addHtmlLineBreaks', addHtmlLineBreaks);
    
    function addHtmlLineBreaks() {
        return function(text) {
            return text.replace(/\n/g, '<br/>');
        };
    }
    
})();