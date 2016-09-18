var topicArray = ['Dogs', 'Cats', 'Kids', 'Stunts'];

function buttons(){

	$('#buttons').empty();

	for (var i = 0; i < topicArray.length; i++) {
		var b = $('<button>');
		b.text(topicArray[i]);
		b.attr('data-topic', topicArray[i]);
		$('#buttons').append(b);
	}
};

function retrieveImages(){
	$('button').on('click', function(){

		$('.carousel-inner').empty();

		var t = $(this).data('topic');

		var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+" + t + "&api_key=dc6zaTOxFJmzC&limit=10";

		$.ajax({url: queryURL, method: 'GET'})
		 .done(function(response) {
		     console.log(response);

		     var results = response.data;

		     for (var i = 0; i < results.length; i++) {
		     	var imageDiv = $('<div>');
		     	imageDiv.attr('id',i);
		     		if (i != 0) {
			     		imageDiv.addClass('display');
			     		$('.carousel-inner').append(imageDiv);
		     		} else {
		     			imageDiv.addClass('active');
		     			$('.carousel-inner').append(imageDiv);
		     		}	
			    }

		     for (var i = 0; i < results.length; i++) {
		     	var topicImage = $('<img>');
		     	var divID = i;
			    topicImage.attr('src',results[i].images.original_still.url);
			    topicImage.attr('data-still', results[i].images.original_still.url);
			    topicImage.attr('data-animate', results[i].images.fixed_height.url);
			    topicImage.attr('data-state', 'still');
			    if (i != 0) {
			     	topicImage.addClass('topicImage');
		     		$('#' + divID).append(topicImage);
			    } else {
			     	topicImage.addClass('topicImage active')
			     	$('#' + divID).append(topicImage);
			    }
			 }
		}); 
	})

	addTopic();
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

		return false;
	});
}

$(document).ready(function(){

	buttons();

	changeState();

	retrieveImages();



	

});