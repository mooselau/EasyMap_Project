/** This is an extra javascript file which used to do some jquery jobs on page.
*
*/

// This is used for validating the searching form before it sends the request.
function formValidating() {
    // Get the input value.
    var inputValue = $('#search-input').val();

    // Below is a RegEx for filtering harmful inputs.
    // In this stage, give error when input has special chars except '-', 
    // but okay with 0-9, a-z, A-Z
    var regex = /^[a-zA-Z0-9-]+$/g;
    var matchResult = regex.test(inputValue);
    // alert(matchResult);
    if (inputValue.trim().length == 0) {
        Messi.alert("Sorry, it seems you haven't type anything..");
        $('#search-input').val("");
        // alert("false");
        return false;
    }
    else if (matchResult == false) {
        Messi.alert("Sorry, it seems you input some special characters..");
        $('#search-input').val("");
        // alert("false");
        return false;
        // alert("true");
    }
    else {
        return true;
    }
}

// this funciton is for manually hiding map-menu-bar.
function hideMenuBar() {
   // var status = $('.collapse').collapse('');
   if (active) {
        // alert();
        active = false;
        $('.collapse').collapse('toggle');
    };
    $('#map-inputs').hide("slow");
}


// This function is to help hide menu buttons under button "Show Map".
// The variable "active" is used to indicate whether the collapse menu is showing or hidden.
var active = false;
$( document ).ready(function() {
    $( "#map-inputs" ).click(function( event ) {
	    event.preventDefault();
	    var $this = $(this);
	    var $collapse = $this.closest('.collapse-group').find('.collapse');

        $collapse.collapse('toggle');
        // If "active" is true, after the collapse buttons change, it changes as well.
        active = (active==true)?false:true;
    });
});

// This is for displaying table on table page.
$(document).ready(function() {
    $('#category-table').dataTable( {
        "pagingType": "full_numbers"
    } );
} );


// For search function in Table page.
// !!!!Need to add limits to 10 when check the boxes.
$('#search-on-map').click(function(){
    var number = 0;
    var values = "";
    var rows = $("#category-table").dataTable().fnGetNodes();
    for(var i=0;i<rows.length;i++)
    {
        if ($(rows[i]).find('input[type="checkbox"]').is(':checked'))
        {   
            values += $(rows[i]).attr('number')+",";
            number += 1;
        }
    }
    if (values){
        if(number > 10){
            new Messi('You cannot choose more than 10 locations!', {title: 'ERROR info', modal: true, titleClass: 'anim warning', buttons: [{id: 0, label: 'Close', val: 'X'}]});
        }
        else {
            values = values.substring(0, values.length-1);
            var cat_name = $("#cat-table-title").attr("cat-name");
            var data = '{"name":'+cat_name+'%numbers":'+values+'}';
            // window.open('/easymap/home' + '?data=' + data);
            // window.open('/easymap/home' + '?data=' + data);
            location.replace('/easymap/home' + '?data=' + data);
        }
    }
    else {
        new Messi('You have to choose at least one location!', {title: 'ERROR info', modal: true, titleClass: 'anim warning', buttons: [{id: 0, label: 'Close', val: 'X'}]});
    }
    // var cells = [];
    // val +=1;
    // var data = [['name',cat_name],['numbers',values]];
})

// This is for displaying the newsest categories.
$("#whats-new-btn").click(function() { 
        $.ajax({ 
            type: "Get",
            url: '/easymap/news/',
            success: function(data) { 
                // To judge if div of map exists on page.
                if( $('#map-canvas').length == 0 ) {

                    // $("#alter").css("background-color", "");
                    $("#alter").html(data);
                    $('.news-list-li').hide();

                    $('.news-list .news-list-li:hidden:first').fadeIn( function showNext() {
                        $( this ).next( ".news-list-li" ).fadeIn( showNext );
                    });
                }
                else {

                 $('#map-canvas').fadeOut('fast', function() {
                    document.getElementById("map-canvas").setAttribute("id", "alter");
                    // $("#alter").css("background-color", "");
                    $("#alter").fadeIn('fast').html(data);
                    $('.news-list-li').hide();

                    $('.news-list .news-list-li:hidden:first').delay(50).fadeIn( function showNext() {
                        $( this ).next( ".news-list-li" ).delay(50).fadeIn( showNext );
                    });
                 
                    hideMenuBar();
                 });
                }
            }
        });
        return false;
});


// This if for showing the popular queries in a pie chart.
$("#whats-hot-btn").click(function(data) {
    $.ajax({ 
        type: "Get",
        url: '/easymap/popular/',
        success: function(data) {
            // To judge if div of map exists on page.
            if( $('#map-canvas').length == 0 ) {
                $("#alter").html('<div id="chart-container" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>');
                initialiseChart(data);
            }

            else {
             $('#map-canvas').fadeOut('fast', function() {
                document.getElementById("map-canvas").setAttribute("id", "alter");
                $("#alter").css("background-color", "white");

                // This is used to create a div inside div "alter" and so make the charts in the newly created div.
                $("#alter").fadeIn('fast').html('<div id="chart-container" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>');
                initialiseChart(data);
             
                hideMenuBar();
             });
            }
        }
    });
    return false;   //Important return!
});

// This is for show all categries.
$("#all-btn").click(function() { 
        $.ajax({ 
            type: "Get",
            url: '/easymap/categorys/',
            success: function(data) { // on success..

                // To judge if div of map exists on page.
                if( $('#map-canvas').length == 0 ) {

                    $("#alter").fadeIn('fast').html(data);
                    $( ".cat-btns" ).first().show( "fast", function showNext() {
                        $( this ).next( ".cat-btns" ).show( "fast", showNext );
                    });

                }

                else {

                    // Fadeout the map in case it occupies the div.
                    // And when get data sent back, rendering them on div and then 
                    // using jQuery to show them.
                    $('#map-canvas').fadeOut('fast', function() {
                        document.getElementById("map-canvas").setAttribute("id", "alter");
                        $("#alter").css("background-color", "white");
                        $("#alter").fadeIn('fast').html(data);

                        $( ".cat-btns" ).first().show( "fast", function showNext() {
                            $( this ).next( ".cat-btns" ).show( "fast", showNext );
                        });
                        hideMenuBar();
                    });
                }

            }
        });
    return false;   //Important return!
});













