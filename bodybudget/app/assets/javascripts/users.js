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
        label: "Fat"
    },
    {
        value: 30,
        color: "#FDB45C",
        opacity: 30,
        highlight: "#FFC870",
        label: "Carbs"
    }
];

//refactoring search api code
//search yummly api
var foodIdArray = [];
var course = "";
var date = new Date();

var time = date.getHours();
var ctx = $("#chart-area")[0].getContext("2d");


window.myDoughnut = new Chart(ctx).Doughnut(data, {
  responsive : true,
  animateRotate: false,
  animateScale: false,
  percentageInnerCutout: 80,
  animationEasing : "easeInOutQuart"
});

$(".user-data").on("click",".taco", function(){

	var fat = $(this).find(".FAT").attr("data-fat");
	var carbs = $(this).find(".CHOCDF").attr("data-carbs");
	var protein = $(this).find(".PROCNT").attr("data-protein");
	
	myDoughnut.segments[0].value = fat;
	myDoughnut.segments[1].value = protein;
	myDoughnut.segments[2].value = carbs;

	myDoughnut.update();
});

if (time >= 5 && time < 12){
	course = "Breakfast and Brunch";
	$('.course-time').append("<h2> It's "+course+" time</h2>");
} else if (time >= 12 && time < 16){
	course = "Lunch";
	$('.course-time').append("<h2> It's "+course+" time</h2>");
} else if (time >=16 && time < 24) {
	course = "Main Dishes";
	$('.course-time').append("<h2> It's "+course+" time</h2>");
} else {
	$('.course-time').append("<h2> You should be asleep </h2>");
}



function searchFood(search){
	return $.ajax({ 
		url: "http://api.yummly.com/v1/api/recipes?_app_id=25e7217b&_app_key=26571850ea53d59ce432e9b9448f16b9&q="+search,
		data: {
			'maxResult': 10,
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
			"nutrition.ENERC_KCAL.min": 100,
			"nutrition.ENERC_KCAL.max": 300,
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


// function searchFoodId(search){
// 	return $.getJSON(//api.yummly.com/v1/api/recipe/recipe-id?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY
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
				var compiledTemplate = HandlebarsTemplates['users/show']({result: data});
				$(".user-data").append(compiledTemplate);
						});
				});
				
			}
		);
		});
	});



