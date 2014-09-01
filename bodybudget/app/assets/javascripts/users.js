// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready(function() {
  
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
	

  // function updateData() {
  //     data.forEach(function(entry) {
  //         entry.value += 10;
  //     });
  // }
//refactoring search api code


  $(".getInfo")[0].onsubmit = function (e){
	e.preventDefault();
	var recipe = $('.recipeName').val();
	// var yummlyId = ENV["YUMMLY_ID"];
	// var yummlyKey = ENV["YUMMLY_KEY"];

	$.ajax({
		url: "http://api.yummly.com/v1/api/recipes?_app_id=25e7217b&_app_key=26571850ea53d59ce432e9b9448f16b9&q="+recipe,
		data: {
			requirePictures: "true",
			format: "json"
	},
	dataType: "jsonp",
	success: function (response){
		// console.log(response);
		response.matches.forEach(function (itm){
			console.log(itm)
			$(".user-data").append("<p>"+itm.recipeName+"</p>")
		})
		$(".user-data").remove;
  }
})

    var ctx = $("#chart-area")[0].getContext("2d");
    var myDoughnut = new Chart(ctx).Doughnut(data, {
      responsive : true,
      animateRotate: true,
      animateScale: false,
      percentageInnerCutout: 70,
      animationEasing : "easeInOutQuart"
	  });
	
	// console.log(myDoughnut)
 //  updateData(); // for demo only
	// var index = 0;

 //    myDoughnut.segments.forEach(function(segment) {
 //      segment.value = data[index++].value;
 //    });
 //      myDoughnut.update();
  };
});



