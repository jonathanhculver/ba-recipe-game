# Blue Apron - Recipe Matching Game

[Live Demo](http://ba-recipe-game.herokuapp.com)

### Set Up

- `git clone https://github.com/jonathanhculver/ba-recipe-game.git`
- `cd ba-recipe-game`
- `npm install`
- `npm start`

### Description

Users have two minutes to match a recipe card with a recipe image. You can earn 10 points for a correct match and lose 5 points for an incorrect match.

### Technical Vision 

The code is intended to be as module and templated as possible. The entire functionality is encapsulated in a global ba namespace to prevent conflicts. The JS is written using the revealing module pattern to only expose public methods and keep private methods and variables hidden. For example we hide the ability to add or subtract the score but expose the ability to reset the score at the end of a game.

Each html template corresponds directly to a JS module. i.e. ```recipe.ejs``` corresponds to a JS object ```ba.game.recipe``` which builds the template with all the correct data and is then appended to the DOM to be rendered in the view.  This allows us to create and reuse objects such as recipes, cards, etc.

The drag and drop functionality was written as a custom jQuery plugin. The idea was to create a generic plugin that could give the drag/drop functionality to any DOM element. 

### Challenges 

The biggest challenge I faced was getting a droppable div to detect a mouseover while another item was being dragged. To solve this challenge, I created a transparent ```.drop_zone``` class with a higher z-index than the card being dragged. I then positioned the drop_zone div on top of the droppable recipe so it could detect the mouseover and mouseout events. 

```css
.drop_zone {
	width: 100%;
	height: 100%;
	position: absolute;
	z-index: 10001;
	background-color: #fff;
	left: 0px;
	opacity: 0;
}
```

```html
	<div class="drop_zone"></div>
```

### V2


For V2 there are a number of features and improvements I would make:

- Shuffle recipe cards
 - Currently the cards are appending in the same order as the recipes. It would be more challenging if the order varied. 

- Move timer obj to a jQuery plugin 
 - the timer is generic enough that it could be created as a plugin to be used on different pages or in different applications.
- High scores / Leaderboard
 - I would create a leaderboard to store highscores.
 - This could potentially keep scores for previous week's recipes too 
- Responsive 

- Performance enhancements 
 - cache API response on the server side
 - minify/cache js and css files
 - IE, most likely does not work on IE

