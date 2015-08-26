/** This is an extra javascript file which used to do some jquery jobs on page.
*
*/

// This is used for validating the form before it sends the request.
function formValidating() {
    // Get the input value.
    var inputValue = $('#search-input').val();
    if (inputValue.trim().length == 0) {
        $('#search-input').val("");
        // alert("false");
        return false;
    }
    else {
        // alert("true");
        return true;
    }
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
        active = (active==true)?false:true;
        // if(active) {
        //     active = true;
        //     // $collapse.collapse('show');
        // }

        // else {
        //     active = false;
        //     // $collapse.collapse('hide');
        // }
    });
});

// This is for table page.
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
            window.open('/easymap/home' + '?data=' + data);
        }
    }
    else {
        new Messi('You have to choose at least one location!', {title: 'ERROR info', modal: true, titleClass: 'anim warning', buttons: [{id: 0, label: 'Close', val: 'X'}]});
    }
    // var cells = [];
    // val +=1;
    // var data = [['name',cat_name],['numbers',values]];
})

    // $("#numbers-box").data("numbers",values);

    // $.ajax({
    //     type: 'GET',
    //     // data: { data: "G12 9BH" }, // if necesarry
    //     // data: data,
    //     url: '/easymap/querylist',
    //     // beforeSend: function() {
    //     //     $('#loading').show();
    //     // },
    //     success: function(data) {
    //         // alert();
    //         // ...redirect...
    //     },
    //     cache: false
    // });

// this funciton is for manually hiding map-menu-bar.
function hideMenuBar() {
   // var status = $('.collapse').collapse('');

           if (active) {
                // alert();
                active = false;
                $('.collapse').collapse('toggle');
            };

    $('#map-inputs').hide("slow");
   // alert($('.collapse').is('active'));
    // Hide the inputs button with inputs fields.
   // setTimeout( function() {
   // },100);
}

// This is for displaying the newsest categories.
$("#whats-new-btn").click(function() { 

        $.ajax({ 
            type: "Get",
            url: '/easymap/news/',
            success: function(data) { 


            // To judge if div of map exists on page.
            if( $('#map-canvas').length == 0 ) {
            

            }
            else {


            }


                // on success..
                // $("#alter").html(data); // update the DIV
                // window.reload();
                // $('#map-canvas').load(document.URL + ' #alter');
                // location.replace("/easymap/");

                //  $('#map-canvas').fadeOut('fast', function() {
                //     document.getElementById("map-canvas").setAttribute("id", "alter");
                //     $("#alter").css("background-color", "lightgreen");
                //     $("#alter").fadeIn('fast').html(data);
                //  });
                // $("#alter").fadeIn('fast').html(data);
                // initialiseChart(data);
            }
        });
        return false;
});



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
                $("#alter").css("background-color", "lightgreen");

                // This is used to create a div inside div "alter" and so make the charts in the newly created div.
                $("#alter").fadeIn('fast').html('<div id="chart-container" style="min-width: 310px; height: 400px; max-width: 600px; margin: 0 auto"></div>');
                initialiseChart(data);
             
                hideMenuBar();
             });

            }

        }
        });
    return false;
    });


$("#all-btn").click(function() { 
            // data: $(this).serialize(), // get the form data

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
                        $("#alter").css("background-color", "lightgreen");
                        $("#alter").fadeIn('fast').html(data);

                        $( ".cat-btns" ).first().show( "fast", function showNext() {
                            $( this ).next( ".cat-btns" ).show( "fast", showNext );
                        });
                        hideMenuBar();
                    });
                }

            }
        });
    return false;
                //  $('#map-inputs').hide("slow");

                // $( ".cat-divs" ).first().show( "fast", function showNext() {
                //     $( this ).next( ".cat-divs" ).show( "fast", showNext );
                // });                
                // $("#alter").html(data);

});




// This function is adapted from http://www.datatables.net/index;
// and http://stackoverflow.com/questions/9607428/loop-through-datatables-table-to-get-all-cells-content
// which is mainly used to cope with data processing in table in HTML.
$("#").click(function() {

        $.get( "/easymap/", function( data ) {
          $( "#search" ).html( data );
          alert( "Load was performed." );
        });

            // $( "#search" ).load( "/easymap/querylist" );

        // $.get('/easymap/querylist',{query_numbers: values, name: cat_name}, function(data){

        // });
    
        // $.get('/easymap/querylist', {query_numbers: values, name: cat_name}
        //     ,function(data) {
        // 	alert(data);
        // 	// $("#geometry").data("info",data);
        // }
        // );
    //     $.ajax({
    //         type: "GET",
    //         url: "/easymap/querylist",
    //         data: {query_numbers: values, name: cat_name},
    //         // dataType: "json",
    //         success: function(data, textStatus) {
    //         alert(data);
    //     if (data) {
    //         alert("Ready to Redirect!");
    //         // data.redirect contains the string URL to redirect to
    //         // window.location.href = data.redirect;
    //         // window.onload(data)
    //         // $('.main-container').load(data);
    //         window.location = data;
    //     }
    //     else {
    //         alert("ERROR");
    //         // data.form contains the HTML for the replacement form
    //         // $("#myform").replaceWith(data.form);
    //         // }
    //      }
    //     }
    // });

});











