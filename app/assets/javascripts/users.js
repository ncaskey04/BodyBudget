// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready(function() {

var course = "";
var date = new Date();
var timeNow = date.getHours()+":"+date.getMinutes()

var time = date.getHours();
var ctx = $("#chart-area")[0].getContext("2d");
var ctz = $("#bar-chart")[0].getContext("2d");
var foodResults = gon.results_food;


var milesResult = parseInt(gon.miles["activities-tracker-distance"][0].value)   ;
var foodResult = gon.food;
var calsInResult = parseInt(gon.calsIn["foods-log-caloriesIn"][0].value);
var calsOutResult = parseInt(gon.calsOut["activities-tracker-calories"][0].value);
var stepsResult = gon.steps["activities-tracker-steps"][0].value;
var calGoal = gon.calGoal["goals"]["caloriesOut"];
var netCal = calsInResult - calsOutResult;
var calBudget = calGoal - netCal; 

var yummlyId = gon.yummlyId;
var yummlyKey = gon.yummlyKey;
var projectedCal = netCal;

if (foodResult.length <= 9){
    foodResultLength = foodResult.length;
} else {
    foodResultLength = 9;
}

for (var i = 0; i < foodResultLength; i++) {
    if (foodResult[i].name != undefined){
        $(".food").append("<li>"+foodResult[i].name+"</li>");
    }
};

$(".miles span").append(milesResult);
$(".cal-goal").append("<p> You have "+netCal+" CAL out of "+calGoal+" CAL</p><p>"+calBudget+" CAL left in your budget");
$(".steps span").append(stepsResult);
$(".cals").append("Cals In: "+calsInResult+" Cals Out: "+calsOutResult)
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
   labels: ["Projected Cal", "Current Cal.", "Calorie In", "Calorie Out"],
   datasets: [
     	{
         label: "Calories",
         fillColor: "#46BFBD",
         strokeColor: "rgba(220,220,220,0.8)",
         highlightFill: "rgba(220,220,220,1)",
         highlightStroke: "rgba(220,220,220,1)",
         data: [0, netCal ,calsInResult, calsOutResult]
     	},
     	{
         label: "My First dataset",
         fillColor: "red",
         strokeColor: "rgba(220,220,220,0.8)",
         highlightFill: "rgba(220,220,220,0.75)",
         highlightStroke: "rgba(220,220,220,1)",
         data: [projectedCal, 0, 0, 0]
     	}
   ]
};

$('.time-now').append("<p>TIME: "+timeNow+"</p >");

window.myDoughnut = new Chart(ctx).Doughnut(data, {
  responsive : false,
  animateRotate: true,
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

window.myBarChart = new Chart(ctz).Bar(barData, {
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
	var calorie = $(this).find(".ENERC_KCAL").attr("data-calories");
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
    projectedCal = netCal + parseInt(calorie);
    console.log("myBarChart.datasets", myBarChart.datasets)
    myBarChart.datasets[1].bars[0].value = projectedCal;
    myBarChart.update();
});


if (time >= 5 && time < 12){
	course = "Breakfast and Brunch";
	$('.course-time').append("<p>TIME: "+timeNow+" "+course+" time</p>");
} else if (time >= 12 && time < 16){
	course = "Lunch";
	$('.course-time').append("<p>TIME: "+timeNow+" "+course+" time</p>");
} else if (time >=16 && time < 24) {
	course = "Main Dishes";
	$('.course-time').append("<p>TIME: "+timeNow+" Dinner time</p>");
} else {
	$('.course-time').append("<p>TIME: "+timeNow+" You should be asleep </p>");
}



function searchFood(search){
	return $.ajax({
		url: "http://api.yummly.com/v1/api/recipes?_app_id="+yummlyId+"&_app_key="+yummlyKey+"&q="+search,
		data: {
			'maxResult': 6,
			"rating": 5,
			"allowedCourse[]": "course^course-"+course,
            "nutrition.PROCNT.min": 1,
			"nutrition.ENERC_KCAL.min": 1,
			"nutrition.ENERC_KCAL.max": calBudget,
			"requirePictures": true,
			format: "json"
		},
		dataType: "jsonp"
	});
}

function searchFoodId(id){
	return $.ajax({
		url: "http://api.yummly.com/v1/api/recipe/"+id+"?_app_id="+yummlyId+"&_app_key="+yummlyKey,
		dataType: "jsonp"
	});
}

	$(".getInfo").on('submit', function(e){
		e.preventDefault();
		$(".user-data").html("");
		var recipe = $('.recipeName').val();

		//defered promise
		$.when(searchFood(recipe)).done(function(result){
			if(result.matches.length === 0){
				$('.user-data').append("<h2>Sorry nothing came up!</h2>");
			} else {
			$('.user-data').html("");
				// console.log(result);

				result.matches.forEach(function (itm){
					$.when(searchFoodId(itm.id)).done(function(data){
						console.log(data);
						var compiledTemplate = HandlebarsTemplates['users/show']({result: data, taco: result});
						$(".user-data").append(compiledTemplate);
					});
				});

			}
		} );
		});
	});



