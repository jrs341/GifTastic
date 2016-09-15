var topicArray = ['Dogs', 'Cats', 'Kids', 'Stunts'];

function buttons(){
	for (var i = 0; i < topicArray.length; i++) {
		var b = $('<button>');
		b.text(topicArray[i]);
		$('#buttons').append(b);
	}
};


$(document).ready(function(){

	buttons();

});