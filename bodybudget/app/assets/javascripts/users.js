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

//refactoring search api code
//search yummly api
function searchFood(search){
	return $.ajax({ 
		url: "http://api.yummly.com/v1/api/recipes?_app_id=25e7217b&_app_key=26571850ea53d59ce432e9b9448f16b9&q="+search,
		data: {
			"requirePictures": "true",
			format: "json"
		},
		dataType: "jsonp"
	});
}

	$(".getInfo").on('submit', function(e){
		e.preventDefault();
		$(".user-data").html("");
		var recipe = $('.recipeName').val();
			//defered promise

		$.when(searchFood(recipe)).done(function(result){
			$('.user-data').html("");
			
			if(result.matches.length === 0){
				$('.user-data').append("<h2>Sorry nothing came up!</h2>");
			} else {
				result.matches.forEach(function (itm){
					$(".user-data").append("<p>"+itm.recipeName+"</p>")
				})
			}
		});
	});
});



