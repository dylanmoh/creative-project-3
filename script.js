$(document).ready(function() {	
	var imageIndex = -1;
	var spriteNames = ['front_default','back_default', 'front_shiny', 'back_shiny'];
	var images = [];
	$('#searchButton').click(function(e) {
		e.preventDefault();
		var inputText = $("#searchInput").val();
		var myurl = "https://pokeapi.co/api/v2/pokemon/" + inputText;
		$.ajax({
		    url : myurl,
		    dataType : "json",
		    success : function(json) {
		    	imageIndex = 0;
		    	images = [];
		    	for (var i = 0; i < spriteNames.length; i++) {
		    		images.push(json['sprites'][spriteNames[i]])
		    	}
		    	var screen = '<div class="screen" style="background-color: lightsteelblue; background-image: url(' + images[imageIndex] + ');"></div>';
		    	var info = '';
		    	info += '<label class="pId">PokeDex Id: ' + json['id'] + '</label>';
		    	info += '<label class="pName">Name: ' + json['name'] + '</label>';
				info += '<label class="pHeight">Height: ' + json['height'] + '</label>';
		    	info += '<label class="pHeight">Weight: ' + json['weight'] + '</label>';
		    	
		    	var typesListMax = $('.types-list')[0].children.length;
		    	$('.type-item').html('');
		    	for (var i = 0; i < json.types.length; i++) {
		    		if (i == typesListMax) { break; }
		    	 	$($('.types-list')[0].children[i]).html('<p>' + json['types'][i]['type']['name'] + '</p>');
		    	}
		    	$('.image-screen').html(screen);
		    	$('.info').html(info);
		    	if (spriteNames[imageIndex] == "front_default") {
		    		$('.image-position').html("<p>Front</p>");
		    		$('.image-shiny').html("<p>Default</p>");
		    	}
		    	else if (spriteNames[imageIndex] == "back_default") {
		    		$('.image-position').html("<p>Back</p>");
		    		$('.image-shiny').html("<p>Default</p>");
		    	}
		    	else if (spriteNames[imageIndex] == "front_shiny") {
		    		$('.image-position').html("<p>Front</p>");
		    		$('.image-shiny').html("<p>Shiny</p>");
		    	}
		    	else if (spriteNames[imageIndex] == "back_shiny") {
		    		$('.image-position').html("<p>Back</p>");
		    		$('.image-shiny').html("<p>Shiny</p>");
		    	}
		    },
		    error: function(json) {
				var info = '';
		    	info += '<label class="pId">Error: ' + 'Invalid ID number' + '</label>';
		    	$('.info').html(info);
		    }
		});
	})
	$('.image-toggle').click(function(e) {
		if (imageIndex != -1) {
			if ($(this).hasClass('image-toggle-left')) {
				imageIndex--;
				if (imageIndex <= -1) {
					imageIndex = images.length - 1;
				}
				while (images[imageIndex] == null) {
					imageIndex--;
					if (imageIndex <= -1) {
						imageIndex = images.length - 1;
					}
				}
				$('.image-screen').html('<div class="screen" style="background-color: lightsteelblue; background-image: url(' + images[imageIndex] + ');"></div>');
			}
			else if ($(this).hasClass('image-toggle-right')) {
				imageIndex++;
				if (imageIndex >= images.length) {
					imageIndex = 0;
				}
				while (images[imageIndex] == null) {
					imageIndex++;
					if (imageIndex >= images.length) {
						imageIndex = 0;
					}
				}
				$('.image-screen').html('<div class="screen" style="background-color: lightsteelblue; background-image: url(' + images[imageIndex] + ');"></div>');
			}

			if (spriteNames[imageIndex] == "front_default") {
		    	$('.image-position').html("<p>Front</p>");
		    	$('.image-shiny').html("<p>Default</p>");
		    }
		    else if (spriteNames[imageIndex] == "back_default") {
		    	$('.image-position').html("<p>Back</p>");
		    	$('.image-shiny').html("<p>Default</p>");
		    }
		    else if (spriteNames[imageIndex] == "front_shiny") {
		    	$('.image-position').html("<p>Front</p>");
		    	$('.image-shiny').html("<p>Shiny</p>");
		    }
		    else if (spriteNames[imageIndex] == "back_shiny") {
		    	$('.image-position').html("<p>Back</p>");
		    	$('.image-shiny').html("<p>Shiny</p>");
		    }
		}
	});
});