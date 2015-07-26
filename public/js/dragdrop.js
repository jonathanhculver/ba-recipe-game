/* custom jQuery plugin for drag and drop */
(function($) {
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
					$target.style.left = offsetX+ "px";
					$target.style.top = offsetY+ "px";
					$target = null;	
				}
			});
		};

		return this.each(function(){
			attachEvents(this);
		});
	};

	$.fn.droppable = function() {

	};
})(jQuery)
