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
		ba.game.timer.init(120);
		ba.helper.ajax('/api/menu/', {}, function(data){
			populateRecipes(data);
			$loading.hide();
			ba.game.timer.start();
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
		//show containers and attach events
		$recipesContainer.show();
		$cardsContainer.closest('#cards').show();
		$('.draggable').draggable();
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
		 template = $('#cardsContainer .card_container')[0];$
	};

	self.buildCard = function(card, cb) {
		card = card.recipe;
		var $cardHtml = $(template).clone(),
			$card = $cardHtml.find('.card'),
			$title = $card.find('.title'),
			$description = $card.find('.description');

		$card.show();
		$card.attr('data-recipeid', card.id);
		$card.addClass('draggable');
		$title.html(card.main_title);
		$description.html(card.sub_title);

		cb($cardHtml);
	};

	return self;
})();

ba.game.timer = (function(){
	var self = {},
		$m,
		$s,
		seconds,
		timerId;

	self.init = function(s) {
		setSeconds(s);
		$m = $('#minutes');
		$s = $('#seconds');
	};

	self.start = function() {
		var timeObj = convert(getSeconds());
		updateTime(timeObj.m, timeObj.s);
        timerId = setInterval(keepTime, 1000);
	};

	var keepTime = function() {
		var time = setSeconds(getSeconds()-1),
			timeObj = convert(time),
			m = timeObj.m,
			s = timeObj.s;

		updateTime(m, s);

		if(m === 0 && s === 0) {
			stop();
		}
	};

	var updateTime = function(m, s) {
		if(s< 10) {
			s = '0'+s;
		}
		$s.html(s)
		$m.html(m);
	};

	var setSeconds = function(s) {
		seconds = s;
		return s;
	};

	var getSeconds = function(s) {
		return seconds;
	};

	var convert = function(time) {
		m = Math.floor(time/60),
		s = time - m * 60;

		return {'m':m, 's':s};
	};

	var stop = function() {
		clearInterval(timerId);
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
