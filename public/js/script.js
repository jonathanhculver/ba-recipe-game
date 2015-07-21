$(document).ready(function() {
    ba.game.init();
});

var ba = window.ba || {};

ba.game = (function(){
	var self = {};

	self.init = function() {

		ba.helper.ajax('/api/menu/', {}, function(data){
			console.log(data);
		});
	
	};

	return self;
})();

ba.helper = (function(){
	var self = {};

	self.ajax = function(url, params, callback) {
    	callback = callback || noop;
		$.ajax({
			type: 'GET',
			url: url,	
			data: params
		})
		.success(function(data) {
			callback(data);
		});
    };

	return self;
})();
