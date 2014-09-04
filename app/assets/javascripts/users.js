// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready(function() {
  
  var data = [
    {
        value: 30,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Protein"
    },
    {
        value: 30,  
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Fat",
        labelColor : 'black',
        labelFontSize : '16'
    },
    {
        value: 30,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Carbs"
    }
];

var barData = {
   labels: ["Current Cal.", "Calorie In", "Calorie Out"],
   datasets: [
     	{
         label: "My First dataset",
         fillColor: "#46BFBD",
         // strokeColor: "rgba(220,220,220,0.8)",
         highlightFill: ["blue", "red", "green"],
         // highlightStroke: "rgba(220,220,220,1)",
         data: [60 ,60, 0]
     	},
     	// {
      //    label: "My First dataset",
      //    fillColor: "red",
      //    // strokeColor: "rgba(220,220,220,0.8)",
      //    // highlightFill: "rgba(220,220,220,0.75)",
      //    // highlightStroke: "rgba(220,220,220,1)",
      //    data: [60, 60, 0]
     	// },
     	// {
      //    label: "My First dataset",
      //    fillColor: "#46BFBD",
      //    // strokeColor: "rgba(220,220,220,0.8)",
      //    // highlightFill: "rgba(220,220,220,0.75)",
      //    // highlightStroke: "rgba(220,220,220,1)",
      //    data: [0, 60, 0]
     	// }
   ]
};


//refactoring search api code
//search yummly api
var course = "";
var date = new Date();

var time = date.getHours();
var ctx = $("#chart-area")[0].getContext("2d");
var ctz = $("#bar-chart")[0].getContext("2d");
var foodResults = gon.results_food;

var foodResult = gon.miles;

console.log(foodResult);


window.myDoughnut = new Chart(ctx).Doughnut(data, {
  responsive : false,
  animateRotate: false,
  animateScale: false,
  percentageInnerCutout: 80,
  animationEasing : "easeInOutQuart",
  labelColor : 'black',
  labelFontSize : 24,
  labelFontFamily : "Arial",
  labelFontStyle : "normal",
  labelFontColor : "black",
  tooltipFontSize: 20,
});

var myBarChart = new Chart(ctz).Bar(barData, {
    //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
    scaleBeginAtZero : true,

    //Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : false,

    //String - Colour of the grid lines
    scaleGridLineColor : "rgba(0,0,0,.05)",

    //Number - Width of the grid lines
    scaleGridLineWidth : 1,

    //Boolean - If there is a stroke on each bar
    barShowStroke : false,

    //Number - Pixel width of the bar stroke
    barStrokeWidth : 1,

    //Number - Spacing between each of the X value sets
    barValueSpacing : 1,

    //Number - Spacing between data sets within X values
    barDatasetSpacing : 1,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

});

$(".user-data").on("click",".food", function(){
	var fat = $(this).find(".FAT").attr("data-fat");
	var carbs = $(this).find(".CHOCDF").attr("data-carbs");
	var protein = $(this).find(".PROCNT").attr("data-protein");
	var calorie = $(this).find(".ENERC_KJ").attr("data-calories");
	myDoughnut.segments[0].value = parseFloat(fat);
	myDoughnut.segments[1].value = parseFloat(protein);
	myDoughnut.segments[2].value = parseFloat(carbs);
	$(".cal-caption").html("<p>"+calorie+"</p>").countTo({
            from: 0, 
            to: calorie, 
            speed: 1000,
            refreshInterval: 50 });
	$(".protein-caption span").html(parseInt(calorie));
	myDoughnut.update();
});




if (time >= 5 && time < 12){
	course = "Breakfast and Brunch";
	$('.course-time').append("<h2>"+course+" time</h2>");
} else if (time >= 12 && time < 16){
	course = "Lunch";
	$('.course-time').append("<h2>"+course+" time</h2>");
} else if (time >=16 && time < 24) {
	course = "Main Dishes";
	$('.course-time').append("<h2> Dinner time</h2>");
} else {
	$('.course-time').append("<h2> You should be asleep </h2>");
}



function searchFood(search){
	return $.ajax({ 
		url: "http://api.yummly.com/v1/api/recipes?_app_id=25e7217b&_app_key=26571850ea53d59ce432e9b9448f16b9&q="+search,
		data: {
			'maxResult': 12,
			"rating": 5,
			"allowedCourse[]": "course^course-"+course,
			// "flavor.meaty.min": 0,
			// "flavor.meaty.max": 0,
			// "flavor.sweet.min": 0,
			// "flavor.sweet.max": 0,
			// "flavor.sweet.min": 0,
			// "flavor.sweet.max": 0,
			// "flavor.piquant.min": 0,
			// "flavor.piquant.max": 0,
			// "nutrition.ENERC_KCAL.min": 100,
			// "nutrition.ENERC_KCAL.max": 300,
			"nutrition.PROCNT.min": 1,
			"requirePictures": true,
			format: "json"
		},
		dataType: "jsonp"
	});
}

function searchFoodId(id){
	return $.ajax({
		url: "http://api.yummly.com/v1/api/recipe/"+id+"?_app_id=25e7217b&_app_key=26571850ea53d59ce432e9b9448f16b9",
		dataType: "jsonp"
	});
}

// function searchFitBit(data) {
// 	return $.getJSON({fitbit/show
// 	})
// }



	$(".getInfo").on('submit', function(e){
		e.preventDefault();
		$(".user-data").html("");
		var recipe = $('.recipeName').val();
	
		//defered promise
		$.when(searchFood(recipe)).done(function(result){
			if(result.matches.length === 0){
				$('.user-data').append("<h2>Sorry nothing came up!</h2>");
			} else {
			
			}
			$('.user-data').html("");
				// console.log(result);

				result.matches.forEach(function (itm){


					$.when(searchFoodId(itm.id)).done(function(data){ 
						console.log(data)
						var compiledTemplate = HandlebarsTemplates['users/show']({result: data, taco: result});
						$(".user-data").append(compiledTemplate);
					});
				});
				
			}
		);
		});
	});



