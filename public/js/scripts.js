$(document).ready(function(){
    
    //add image transition on hover
    $('.img-hover').hover(function() {
        $(this).addClass('transition');  
    }, function() {
        $(this).removeClass('transition');
    });
    
    // format the date for image
    var date = new Date($('#date').text());
    var monthNames = [ "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December" ];
    var d = date.getDate();
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();
    var output = d + ' ' + m + ' ' + y;
    $('#date').text(output);
});