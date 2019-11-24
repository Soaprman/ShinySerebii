// ==UserScript==
// @name        ShinySerebii
// @namespace   ShinySerebii
// @description	A collection of tweaks that might make serebii.net easier to read.
// @include     http://www.serebii.net*
// @include     https://www.serebii.net*
// @include     http://serebii.net*
// @include     https://serebii.net*
// @version     1
// @grant       none
// @require		https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

// If you want to not use any of these, change true to false.
// Make sure to keep any commas in order to prevent the script from failing!
var ShinySerebiiConfig = ShinySerebiiConfig || {
	shinifyTypeBoxes: true, // Change type boxes from images to colored cells (like on Bulbapedia)
	useLightColorScheme: true, // Use a lighter color scheme
	increaseTextSize: true // Enforce a minimum text size of 1em and make important text bigger
};


var ShinySerebii = ShinySerebii || (function ($, undefined) {
	var self = this;

	self.typeColors = {
		bug: 'A8B820',
		dark: '705848',
		dragon: '7038F8',
		electric: 'F8D030',
		fairy: 'EE99AC',
		fighting: 'C03028',
		fire: 'F08030',
		flying: 'A890F0',
		ghost: '705898',
		grass: '78C850',
		ground: 'E0C068',
		ice: '98D8D8',
		normal: 'A8A878',
		poison: 'A040A0',
		psychic: 'F85888',
		rock: 'B8A038',
		steel: 'B8B8D0',
		water: '6890F0',
		physical: 'C92112',
		special: '4F5870',
		other: '8C888C',
		curse: '68A090', // "???" type
		beauty: '6890F0',
		cool: 'F08030',
		cute: 'F85888',
		clever: '78C850',
		smart: '78C850',
		tough: 'F8D030',
		shadow: '604E82',
		na: 'transparent'
	};

	self.capitalize = function (str) {
		return str.substring(0, 1).toUpperCase() + str.substring(1);
	};

	self.createTypeBox = function (typeName) {
		return $('<div class="typeBox" style="background-color:#' + self.typeColors[typeName] + '">' + self.capitalize(typeName) + '</div>');
	};

	self.shinifyTypeBoxes = function () {
		var typeBoxStyle = $('<style type="text/css">.typeBox {padding: 0.25em; color: white; font-weight: normal; border: 1px #606060 solid; border-radius: 3px; box-sizing: border-box;} .fooinfo .typeBox {max-width: 40%; display: inline-block;}</style>');
		$('head').append(typeBoxStyle);

		var oldTypeBoxes = $.find("img[src^='/pokedex-bw/type/'], img[src^='/pokedex-dp/type/'], img[src^='/pokedex-rs/type/'], img[src^='/games/type/'], img[src^='/attackdex-bw/type/'], img[src^='/attackdex-dp/type/'], img[src^='/attackdex/type/']");
		for (var i = 0; i < oldTypeBoxes.length; i++) {
			var $oldTypeBox = $(oldTypeBoxes[i]);

			var typeUrl = $oldTypeBox.attr('src').split('/');
			var type = typeUrl[typeUrl.length - 1]; // Image filename
			type = type.split('.')[0]; // Remove file extension
			if (type.charAt(type.length - 1) === '2') type = type.substring(0, type.length - 1); // Remove 2

			if (type !== 'na') { // Spacer used in trainer displays for single-type pokemon
				$oldTypeBox.parent().append(self.createTypeBox(type));
			}
			$oldTypeBox.remove();
		}
	};

	self.increaseTextSize = function () {
		// Remove hardcoded sizes
		$('font').removeAttr('size');

		// Set everything to minimum 14px
		$('*').css({
			'font-size': '14px'
		});

		$('.dextable').css({
			'margin-bottom': '0.5em'
		});

		$('.dextable td').css({
			'font-size': '1em'
		});

		$('#menu a').css({
			'font-size': 'small',
			'display': 'inline-block',
			'margin-bottom': '0.2em'
		});

		$('select').css({
			'font-size': '1em'
		});
	};

	self.useLightColorScheme = function () {
		// Remove hardcoded bgcolors
		$('*').removeAttr('bgcolor');
		$('font').removeAttr('color');

		$('body').css({
			'background-color': 'white',
			'color': 'black'
		});

		$('select').css({
			'background-color': 'white',
			'color': 'black'
		});

		$('a').css({
			'color': '#303060'
		});

		// Enough of the other pages to make them readable
		$('.post, .info').css({
			'color': 'black'
		});
		$('.post a').css({
			'color': '#303060',
			'font-weight': 'bold'
		});
		$('.interact, .leveltitle, .detailhead').css({
			'background-color': 'a0a0a0',
		});
		$('.dextable, .extradextable, .poketab, .trainer, .eventpoke, .extra').css({
			'background-color': 'c0c0c0',
		});

		// Top menu
		$('#menu').css({
			'background-color': '#eeeeee',
			'color': 'black'
		});

		// Left menu
		$('#menu').parent().attr('bgcolor', '#eeeeee');

		// Right menu
		$('.art').css({
			'background-color': 'a0a0a0',
			'margin-bottom': '1em'
		});

		$('.tooltabhead').css({
			'background-color': '#a0a0a0',
			'color': 'black'
		});

		$('.tooltabcon').css({
			'background-color': '#e0e0e0',
			'color': 'black'
		});

		// Pokedex stuff
		$('.dextable, .poketab, .trainer').css({
			'background-color': '#d0d0d0'
		});

		$('.leveltitle, .detailhead').css({
			'background-color': '#c0c0c0'
		});

		$('.dextable td').css({
			'border-color': '#a0a0a0'
		});

		$('.evochain').css({
			'background-color': 'transparent',
		});

		$('.pkmn, .pkmnblock').css({
			'background-color': '#a0a0a0',
		});

		$('.footop').css({
			'background-color': 'white',
			'border-width': '0'
		});

		$('.footop > a').css({
			'color': '#303060',
			'font-size': '2em',
			'font-weight': 'bold',
			'text-decoration': 'none'
		});

		// There are a few things that look worse because of this, but it does way more good than harm
		$('td').css({
			'color': 'black'
		});

		$('.foo, .fooevo').css({
			'background-color': '#507C36',
			'color': 'white'
		});

		$('.lochead, .attheader, .foobreinfo').css({
			'background-color': '#a0a0a0',
			'color': 'black'
		});

		$('.fooinfo, .footype, .cen, .foocontent, .picturetd').css({
			'background-color': '#e0e0e0',
			'color': 'black'
		});

		$('.fooextra').css({
			'background-color': '#c0ffc0',
			'color': 'black'
		});

		$('.fooinfo > a, .cen > a').css({
			'color': '#303060',
			'font-weight': 'bold'
		});

		$('.footype > a').css({
			'color': 'white'
		});

		$('.fooblack').css({
			'background-color': '#808080',
			'color': 'black'
		});

		$('.foohin').css({
			'background-color': '#c0c0ff',
			'color': 'black'
		});

		$('.fooben').css({
			'background-color': '#ffc0c0',
			'color': 'black'
		});
	};

	// Public
	return {
		shinifyTypeBoxes: self.shinifyTypeBoxes,
		increaseTextSize: self.increaseTextSize,
		useLightColorScheme: self.useLightColorScheme
	};
})(jQuery);

// Execute (the order here matters)
if (ShinySerebiiConfig.useLightColorScheme) ShinySerebii.useLightColorScheme();
if (ShinySerebiiConfig.increaseTextSize) ShinySerebii.increaseTextSize();
if (ShinySerebiiConfig.shinifyTypeBoxes) ShinySerebii.shinifyTypeBoxes();
