$(document).ready(function() {
    ba.game.init();
});

var ba = window.ba || {};

ba.game = (function(){
	var self = {};

	self.init = function() {
		var $loading = $('#loading');
		ba.game.recipe.init();
		ba.game.card.init();
		ba.helper.ajax('/api/menu/', {}, function(data){
			populateRecipes(data);
			$loading.hide();
		});
	};

	var populateRecipes = function(data) {
		var $recipesContainer = $('#recipesContainer'),
			$cardsContainer = $('#cardsContainer');
		for(var i =0; i<data.length; i++) {
			// build recipe tiles 
			ba.game.recipe.buildRecipe(data[i], function($recipeHtml){
				if(i> 0 && i % 3 === 0) {
					$recipesContainer.append("<div class='grid_clear'></div>");
				}
				$recipesContainer.append($recipeHtml);
			});
			//build recipe cards
			ba.game.card.buildCard(data[i], function($cardHtml){
				if(i> 0 && i % 3 === 0) {
					$cardsContainer.append("<div class='grid_clear'></div>");
				}
				$cardsContainer.append($cardHtml);	
			});
		}
		$recipesContainer.show();
		$cardsContainer.closest('#cards').show();
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
		recipe = recipe.recipe;
		var $recipeHtml = $(template).clone(),
			$img = $recipeHtml.find('.recipeImg'),
			$veggieleaf = $recipeHtml.find('.veggieLeaf');

		$recipeHtml.show();
		$recipeHtml.attr('data-recipeid', recipe.id);
		$img.attr('src', recipe.c_main_dish_image.high_feature);
		if(recipe.vegetarian) {
			$veggieleaf.show();
		}
		cb($recipeHtml);
	};

	return self;
})();

ba.game.card = (function(){
	var self = {},
		template;

	self.init = function() {
		 template = $('#cardsContainer .card')[0];$
	};

	self.buildCard = function(card, cb) {
		card = card.recipe;
		var $cardHtml = $(template).clone(),
			$title = $cardHtml.find('.title'),
			$description = $cardHtml.find('.description');

		$cardHtml.show();
		$cardHtml.attr('data-recipeid', card.id);
		$title.html(card.main_title);
		if(card.id === 244 && card.sub_title === '') {
			card.sub_title = 'with Aleppo pepper';
		}
		$description.html(card.sub_title);

		cb($cardHtml);
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
