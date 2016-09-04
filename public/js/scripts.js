$(document).ready(function(){
    
    //add image transition on hover
    $('.img-hover').hover(function() {
        $(this).addClass('transition');  
    }, function() {
        $(this).removeClass('transition');
    });
    
    // like button change
    $('#btn-like').on('click', function(e){
        $(this).toggleClass('btn-default');
        $(this).toggleClass('btn-success');
    });
    
    // format the date for image
    var datetext = $('#date').text();
    var date = new Date(datetext);
    var monthNames = [ "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December" ];
    var d = date.getDate();
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();
    var formattedDate = d + ' ' + m + ' ' + y;
    $('#date').text(formattedDate);
});