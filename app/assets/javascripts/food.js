$(document).ready(function() {
	// body...
	
$('.loading').hide();
	function getFoods(search){
	return $.getJSON("http://api.yummly.com/v1/api/recipe/" + id + "_app_id=c1253ae0&_app_key=93339743e1f51102f39071380a7c414c" + search);
	}

		$(".movieSearch").on("submit", function(e){
			e.preventDefault();
			$(".loading").show();
			$("#movieData").html("");

			var search = $("#title").val();
			$.when(getFoods(search)).done(function(result){
				if(typeof result.Search === "undefined") {
					$("#movieData").html("<h1>Sorry nothing came up</h1>");
				}
				else {
					var compliedTemplate = HandlebarsTemplates['demo/index']({result: result});
					$("#movieData").append(compliedTemplate);
				}
				$('.loading').hide();
			});
			$("#title").val("");
		});
});



