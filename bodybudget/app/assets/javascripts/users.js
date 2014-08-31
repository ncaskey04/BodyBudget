// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

var data = [
    {
        value: 30,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 30,	
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 30,
        color: "#FDB45C",
        opacity: 30,
        highlight: "#FFC870",
        label: "Yellow"
    }
];

window.onload = function(){
	var ctx = $('#chart-area').get(0).getContext("2d");
	window.myDoughnut = new Chart(ctx).Doughnut(data, {
		responsive : true,
		animateRotate: true,
		animateScale: false,
		percentageInnerCutout: 70,
		animationEasing : "easeInOutQuart"
	});

		$(".values p").hover(
	  function() {
	    $(this).append( $( "<span> ***</span>" ) );
	  }, function() {
	    $( this ).find( "span:last" ).remove();
	  }
	);
};



