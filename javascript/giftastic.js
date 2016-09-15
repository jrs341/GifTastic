var topicArray = ['Dogs', 'Cats', 'Kids', 'Stunts'];

function buttons(){
	for (var i = 0; i < topicArray.length; i++) {
		var b = $('<button>');
		b.text(topicArray[i]);
		b.attr('data-topic', topicArray[i]);
		$('#buttons').append(b);
	}
};

function retrieveImages(){
	$('button').on('click', function(){

		$('#gif').empty();
		
		var t = $(this).data('topic');

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+" + t + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({url: queryURL, method: 'GET'})
		 .done(function(response) {
		     console.log(response);

		     var results = response.data;

		     for (var i = 0; i < results.length; i++) {
		     	
		     	var topicImage = $('<img>');
		     	topicImage.attr('src',results[i].images.original_still.url);
		     	topicImage.attr('data-still', results[i].images.original_still.url);
		     	topicImage.attr('data-animate', results[i].images.fixed_height.url);
		     	topicImage.attr('data-state', 'still');
		     	topicImage.addClass('topicImage');

		     	$('#gif').append(topicImage);

		     }
		}); 
	})
}

function changeState(){
	$(document).on('click', '.topicImage', function(){
		var state = $(this).attr('data-state');
		if (state == 'still'){
			$(this).attr('src', $(this).data('animate'));
			$(this).attr('data-state', 'animate');
		} else {
			$(this).attr('src', $(this).data('still'));
			$(this).attr('data-state', 'still');
		}
	});
}

$(document).ready(function(){

	buttons();

	changeState();

	retrieveImages();

	

});