/** This is an extra javascript file which used to do some jquery jobs on page.
*
*/

// This function is to help hide menu buttons 
// $( document ).ready(function() {
//     $( ".menu-type" ).click(function( event ) {
// 	    event.preventDefault();
// 	    var $this = $(this);
// 	    var $collapse = $this.closest('.collapse-group').find('.collapse');
// 	    $collapse.collapse('toggle');
//     });
// });

$(document).ready(function() {
    $('#category-table').dataTable( {
        "pagingType": "full_numbers"
    } );
} );

// For search function in Table page.
$('#search').click(function(){

    // var val = 0;
    var values = "";
    // var cells = [];
    var rows = $("#category-table").dataTable().fnGetNodes();
    for(var i=0;i<rows.length;i++)
    {
        // Get HTML of 3rd column (for example)
        // cells.push($(rows[i]).find("td:eq(2)").html()); 
        if ($(rows[i]).find('input[type="checkbox"]').is(':checked'))
        {   
            // val +=1;
            values += $(rows[i]).attr('number')+",";
        }
    }
    if (values){
        values = values.substring(0, values.length-1);

        var cat_name = $("#cat-table-title").attr("cat-name");

        // var data = [['name',cat_name],['numbers',values]];

        var data = '{"name":'+cat_name+'%numbers":'+values+'}';

        window.open('/easymap/home' + '?data=' + data);
    }
    else {
        // alert("You have to choose at least one location!");
        new Messi('You have to choose at least one location!', {title: 'ERROR info', modal: true, titleClass: 'anim warning', buttons: [{id: 0, label: 'Close', val: 'X'}]});
    }

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
})




$("#whats-new-btn").click(function() { 

        $.ajax({ 
            type: "Get",
            url: '/easymap/news/',
            success: function(data) { // on success..
                // $("#alter").html(data); // update the DIV
                // window.reload();
                // $('#map-canvas').load(document.URL + ' #alter');
                // location.replace("/easymap/");

                 $('#map-canvas').fadeOut('fast', function() {
                    document.getElementById("map-canvas").setAttribute("id", "alter");
                    $("#alter").css("background-color", "lightgreen");
                    $("#alter").fadeIn('fast').html(data);
                 });
                $("#alter").fadeIn('fast').html(data);
            }
        });
        return false;
});



$("#whats-hot-btn").click(function(data) {
    
    $.ajax({ 
        type: "Get",
        url: '/easymap/popular/',

        success: function(data) {

             $('#map-canvas').fadeOut('fast', function() {
                document.getElementById("map-canvas").setAttribute("id", "alter");
                $("#alter").css("background-color", "lightgreen");
                $("#alter").fadeIn('fast').html(data);
             });

            $("#alter").html(data);
        }
        });
        return false;
    });


$("#all-btn").click(function() { 

        $.ajax({ 
            // data: $(this).serialize(), // get the form data
            type: "Get",
            url: '/easymap/categorys/',
            success: function(data) { // on success..
                // $("#alter").html(data); // update the DIV
                // substring(1,data.length-1)
                // da = $("#alter").append(data);
                // alert(da);

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
                });

                $("#alter").fadeIn('fast').html(data);

                // $( ".cat-divs" ).first().show( "fast", function showNext() {
                //     $( this ).next( ".cat-divs" ).show( "fast", showNext );
                // });                

                $( ".cat-btns" ).first().show( "fast", function showNext() {
                    $( this ).next( ".cat-btns" ).show( "fast", showNext );
                });


                // $("#alter").html(data);

            }
        });
        return false;
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











