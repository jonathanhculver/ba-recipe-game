$(document).ready(function() {
    ba.game.init();
});

var ba = window.ba || {};

ba.game = (function(){
	var self = {};

	self.init = function() {
		var $loading = $('#loading');
		ba.game.recipe.init();
		ba.helper.ajax('/api/menu/', {}, function(data){
			populateRecipes(data);
			$loading[0].style.display = 'none';
		});
	};

	var populateRecipes = function(data) {
		var $recipesContainer = $('#recipesContainer');
		for(var i =0; i<data.length; i++) {
			ba.game.recipe.buildRecipe(data[i], function($recipeHtml){
				if(i> 0 && i % 3 == 0) {
					$recipesContainer.append("<div class='grid_clear'></div>");
				}
				$recipesContainer.append($recipeHtml);
			});
		}
		$recipesContainer[0].style.display = 'block';
	};

	return self;
})();

ba.game.recipe = (function(){
	var self = {},
		template;

	self.init = function() {
		template = $('#recipes .recipe')[0];
	};

	self.buildRecipe = function(recipe, cb) {
		var $recipeHtml = $(template).clone(),
			img = $recipeHtml.find('img');
		console.log(img);
		$recipeHtml[0].style.display = 'block';
		img.attr('src', recipe.recipe.c_main_dish_image.high_feature);
		cb($recipeHtml);
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
