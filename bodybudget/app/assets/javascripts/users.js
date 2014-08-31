

// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready(function(){

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


	var ctx = $('#chart-area')[0].getContext("2d");
	var myDoughnut = new Chart(ctx).Doughnut(data, {
			responsive : true,
			animateRotate: true,
			animateScale: false,
			percentageInnerCutout: 70,
			animationEasing : "easeInOutQuart"
	});

  function updateData() {
      data.forEach(function(entry) {
          entry.value += 10;
      });
  }

  document.getElementById("button").onclick = function() {
	updateData(); // for demo only
	var index = 0;

    myDoughnut.segments[0].forEach(function(segment) {
      segment.value = data[index++].value;
    });
      myDoughnut.update();
  };
});



