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

		var t = $(this).data('topic');

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + t + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({url: queryURL, method: 'GET'})
		 .done(function(response) {
		     console.log(response);

		     var results = response.data;

		     for (var i = 0; i < results.length; i++) {
		     	
		     	var topicImage = $('<img>');
		     	topicImage.attr('src', results[i].images.fixed_height.url);

		     	$('#gif').append(topicImage);


		     }
		}); 
	})
}

$(document).ready(function(){

	buttons();

	retrieveImages();

});