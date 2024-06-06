var elem_o = "<div class='status-offen' >Offen</div>";
var elem_b = "<div class='status-bald' >Schliesst bald</div>";
var elem_g = "<div class='status-geschlossen' >Geschlossen</div>";

var elem_g = document.createElement('div');
elem_g.innerHTML = "Geschlossen";
elem_g.className = "status-geschlossen";

var elem_b = document.createElement('div');
elem_b.innerHTML = "Offen bis 17.09";
elem_b.className = "status-bald-geschlossen";

var elem_o = document.createElement('div');
elem_o.innerHTML = "Offen ";
elem_o.className = "status-offen";


var status = "";
$(document).ready(function() {
    $.ajaxSetup({ cache: false });
  });
$.getJSON( "/js/status.json", function( data ) {
    console.log( data );
    status = data.badeplatz.status;
    console.log("Status: ",status)
    //var elem_status = document.getElementById("status");
   
    if( status == "geschlossen") {
      console.log("status geschlossen ")  
      document.getElementById('status').appendChild(elem_g);

    }else if( status == "offen"){
        document.getElementById('status').appendChild(elem_o);

    }else{
        document.getElementById('status').appendChild(elem_b);

    }
    
});
