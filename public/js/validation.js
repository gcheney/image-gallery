/*
 * Validation scripts for image-gallery
 */

(function($, W, D)
{ 
    var JQUERY = {};

    JQUERY.VALIDATE =
    {
        validateCommentForm: function()
        {
            var $commentForm = $('#comment-form');
            $commentForm.on('submit', function(e) {
                var $contentInput = $('#content-input');
                var $authorInput = $('#author-input');
                
                //hide old validation messages
                $('.text-danger').hide();
                $contentInput.removeClass('validation-error');
                $authorInput.removeClass('validation-error');
                
                //check for vlaidation success
                var validtionSuccess = true;
                if (!$contentInput.val()) {
                    $contentInput.addClass('validation-error');
                    $commentForm.prepend('<ul class="text-danger"><li>Please include your comment content</li></ul>');
                    validtionSuccess = false;
                }              
                if (!$authorInput.val()) {
                    $authorInput.addClass('validation-error');
                    $commentForm.prepend('<ul class="text-danger"><li>Please include an author</li></ul>');
                    validtionSuccess = false;
                }
                    
                return validtionSuccess;
            });
        }
    };
        
    $(D).ready(function($) {
        JQUERY.VALIDATE.validateCommentForm();
    });
    
})(jQuery, window, document);
