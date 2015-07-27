/* custom jQuery plugin for drag and drop */
(function($) {
	
	var $dragging = null;
	
	$.fn.draggable = function() {
		var startX,
			startY,
			offset,
			offsetX,
			offsetY,
			$target = null;

		var attachEvents = function(obj) {
			$(obj).on('mousedown', function(event){
				var $emptyCard = $(this).closest('.card_container').find('.card_empty');
				startX = event.clientX;
				startY = event.clientY;
				offset = $(this).position();
				offsetX = offset.left;
				offsetY = offset.top;
				$target = this;

				this.style.position = 'absolute';
				this.style.top = offsetY+"px";
				this.style.left = offsetX+"px";
				this.style.zIndex = 1000;
				$(this).addClass('dragging');
				$dragging = this;

				$emptyCard.show();
				
				// prevents text selection
				return false;
			});
			$(document).on("mousemove", function(event) {
				// we are dragging something
				if($target !== null) {
					$target.style.left = (offsetX + event.clientX - startX) + "px";
					$target.style.top = (offsetY + event.clientY - startY) + "px";
				}
			});
			$(document).on('mouseup', function(event){
				if($target !== null) {
					ba.game.scoreboard.scoreMove($target, offsetX, offsetY);
					$($target).removeClass('dragging');
					$target = null;	
					$dragging = null;
				}
			});
		};

		return this.each(function(){
			attachEvents(this);
		});
	};

	$.fn.droppable = function() {

		var attachEvents = function(obj, image) {
			$(obj).on('mouseover', function(event){
				if($dragging !== null) {
					$(image).addClass('drag_over');
				}
			});

			$(obj).on('mouseout', function(event) {
				if($dragging !== null) {
					$(image).removeClass('drag_over');
				}
			});
		};

		return this.each(function(){
			attachEvents($(this).find('.drop_zone'), $(this).find('.recipeImg'));
		});
	};

})(jQuery)