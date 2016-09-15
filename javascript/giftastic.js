var topicArray = ['Dogs', 'Cats', 'Kids', 'Stunts'];

function buttons(){
	for (var i = 0; i < topicArray.length; i++) {
		var b = $('<button>');
		b.text(topicArray[i]);
		$('#buttons').append(b);
	}
};

function retrieveImages(){
	$('button').on('click', function(){

		var queryURL = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

		$.ajax({url: queryURL, method: 'GET'})
		 .done(function(response) {
		     console.log(response);
		}); 
	})
}

$(document).ready(function(){

	buttons();

	retrieveImages();

});