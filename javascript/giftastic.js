var topicArray = ['Dogs', 'Cats', 'Kids', 'Stunts'];

function buttons(){

	$('#buttons').empty();

	for (var i = 0; i < topicArray.length; i++) {
		var b = $('<button class="btn pill">');
		b.text(topicArray[i]);
		b.attr('data-topic', topicArray[i]);
		$('#buttons').append(b);
	}
};

function retrieveImages(){
	$('button').on('click', function(){

		$('.carousel-inner').empty();

		var t = $(this).data('topic');

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=funny+" + t + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({url: queryURL, method: 'GET'})
		 .done(function(response) {
		     console.log(response);

		     var results = response.data;

		     for (var i = 0; i < results.length; i++) {
		     	var imageDiv = $('<div>');
		     	var topicImage = $('<img>');
		     	var divID = i;
		     	imageDiv.attr('id',i);
			    topicImage.attr('src',results[i].images.original_still.url);
			    topicImage.attr('data-still', results[i].images.original_still.url);
			    topicImage.attr('data-animate', results[i].images.fixed_height.url);
			    topicImage.attr('data-state', 'still');
			    topicImage.addClass('topicImage');
			    topicImage.addClass('img-responsive');
			    if (i != 0) {
			    	imageDiv.addClass('item');
			     	$('.carousel-inner').append(imageDiv);
		     		$('#' + divID).append(topicImage);
			    } else {
			    	imageDiv.addClass('item active');
		     		$('.carousel-inner').append(imageDiv);
			     	topicImage.addClass('active')
			     	$('#' + divID).append(topicImage);
			    }
			 }
		}); 
	})

	// addTopic();

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

function addTopic(){
	$('#addTopic').on('click', function() {

		var topic = $('#topicInput').val().trim();

		topicArray.push(topic);

		buttons();

		retrieveImages();

		changeState();

		return false;
	});
}

$(document).ready(function(){

	buttons();

	addTopic();

	retrieveImages();	

	changeState();

});