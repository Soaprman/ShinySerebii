// ==UserScript==
// @name        serebii
// @namespace   serebii
// @include     http://www.serebii.net/pokedex*
// @version     1
// @grant       none
// @require		https://code.jquery.com/jquery-3.1.1.min.js
// ==/UserScript==

// If you want to not use any of these, change true to false.
// Make sure to keep any commas in order to prevent the script from failing!
var SerebiiEnhancementConfig = SerebiiEnhancementConfig || {
	reformatAttackTypes: true, // Change attack types from images to colored cells (like on Bulbapedia)
	reformatWeaknessTypes: true, // Change weakness types from images to colored cells (like on Bulbapedia)
	useLightColorScheme: true, // Use a lighter color scheme
	increaseTextSize: true // Make the important text on the page a little bigger
};


var SerebiiEnhancementSuite = SerebiiEnhancementSuite || (function ($, undefined) {
	var self = this;
	
	self.CONSTS = {
		rootUrl: 'http://www.serebii.net'
	};
	
	self.getPokemonTypeCell = function () {
		var topTable = $('.dextable')[0];
		return $(topTable).find('td.cen')[0];
	};
	
	self.reformatAttackTypes = function () {
		var pokemonTypeCell = self.getPokemonTypeCell();
		
		var dextableCells = $('.dextable td.cen, .dextable td.fooinfo');
		for (var i = 0; i < dextableCells.length; i++) {
			var dexTableCell = dextableCells[i];
			
			if (dexTableCell === pokemonTypeCell) continue; // Skip the pokemon type cell (otherwise dual types get overwritten)
			
			var $dextableCell = $(dextableCells[i]);
			
			var typeIcon = $dextableCell.find("img[src^='/pokedex-bw/type/'], img[src^='/pokedex-dp/type/']"); // Example: /pokedex-bw/type/grass.gif (this checks the source and not the DOM)
			if (!typeIcon || !typeIcon.length > 0) continue;
			
			var typeUrl = $(typeIcon).attr('src').split('/');
			var type = typeUrl[typeUrl.length - 1]; // Image filename
			type = type.split('.')[0]; // Remove file extension
			
			var bgColor = '00ff00'; // Obnoxious fallback color to say something went wrong
			switch (type) {
				case 'bug': bgColor = 'A8B820'; break;
				case 'dark': bgColor = '705848'; break;
				case 'dragon': bgColor = '7038F8'; break;
				case 'electric': bgColor = 'F8D030'; break;
				case 'fairy': bgColor = 'EE99AC'; break;
				case 'fighting': bgColor = 'C03028'; break;
				case 'fire': bgColor = 'F08030'; break;
				case 'flying': bgColor = 'A890F0'; break;
				case 'ghost': bgColor = '705898'; break;
				case 'grass': bgColor = '78C850'; break;
				case 'ground': bgColor = 'E0C068'; break;
				case 'ice': bgColor = '98D8D8'; break;
				case 'normal': bgColor = 'A8A878'; break;
				case 'poison': bgColor = 'A040A0'; break;
				case 'psychic': bgColor = 'F85888'; break;
				case 'rock': bgColor = 'B8A038'; break;
				case 'steel': bgColor = 'B8B8D0'; break;
				case 'water': bgColor = '6890F0'; break;
				case 'physical': bgColor = 'C92112'; break;
				case 'special': bgColor = '4F5870'; break;
				case 'other': bgColor = '8C888C'; break;
				case 'curse': bgColor = '68A090'; break; // The "???" type
			}
			bgColor = '#' + bgColor;
			
			$dextableCell
				.text(type.substring(0, 1).toUpperCase() + type.substring(1))
				.css({
					'background-color': bgColor,
					'color': 'white'
				});
			
			$(typeIcon).remove();
		}	
	};
	
	self.reformatWeaknessTypes = function () {
		var dextableCells = $('.dextable td.footype');
		for (var i = 0; i < dextableCells.length; i++) {
			var $dextableCell = $(dextableCells[i]);
			
			var typeIcon = $dextableCell.find("img[src^='/games/type/']"); // Example: /pokedex-bw/type/grass.gif (this checks the source and not the DOM)
			if (!typeIcon || !typeIcon.length > 0) continue;
			
			var typeUrl = $(typeIcon).attr('src').split('/');
			var type = typeUrl[typeUrl.length - 1]; // Image filename
			type = type.split('.')[0]; // Remove file extension
			type = type.substring(0, type.length - 1); // Remove 2
			
			var bgColor = '00ff00'; // Obnoxious fallback color to say something went wrong
			switch (type) {
				case 'bug': bgColor = 'A8B820'; break;
				case 'dark': bgColor = '705848'; break;
				case 'dragon': bgColor = '7038F8'; break;
				case 'electric': bgColor = 'F8D030'; break;
				case 'fairy': bgColor = 'EE99AC'; break;
				case 'fighting': bgColor = 'C03028'; break;
				case 'fire': bgColor = 'F08030'; break;
				case 'flying': bgColor = 'A890F0'; break;
				case 'ghost': bgColor = '705898'; break;
				case 'grass': bgColor = '78C850'; break;
				case 'ground': bgColor = 'E0C068'; break;
				case 'ice': bgColor = '98D8D8'; break;
				case 'normal': bgColor = 'A8A878'; break;
				case 'poison': bgColor = 'A040A0'; break;
				case 'psychic': bgColor = 'F85888'; break;
				case 'rock': bgColor = 'B8A038'; break;
				case 'steel': bgColor = 'B8B8D0'; break;
				case 'water': bgColor = '6890F0'; break;
			}
			bgColor = '#' + bgColor;
			
			$dextableCell
				.css({
					'background-color': bgColor,
					'color': 'white'
				})
				.find('a') // Attackdex link
				.text(type.substring(0, 1).toUpperCase() + type.substring(1));
			
			$(typeIcon).remove();
		}	
	};
	
	self.increaseTextSize = function () {
		$('font').removeAttr('size');
		
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
		
		$('body').css({
			'background-color': 'white',
			'color': 'black'
		});
		
		$('select').css({
			'background-color': 'white',
			'color': 'black'
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
		$('.evochain').css({
			'background-color': 'transparent',
		});
		
		$('.pkmn').css({
			'background-color': 'a0a0a0',
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
		
		$('.fooinfo, .footype, .cen').css({
			'background-color': '#e0e0e0',
			'color': 'black'
		});
		
		$('.fooinfo > a, .cen > a').css({
			'color': '#303060',
			'font-weight': 'bold'
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
		reformatAttackTypes: self.reformatAttackTypes,
		reformatWeaknessTypes: self.reformatWeaknessTypes,
		increaseTextSize: self.increaseTextSize,
		useLightColorScheme: self.useLightColorScheme
	};
})(jQuery);

// Execute (the order here matters)
if (SerebiiEnhancementConfig.useLightColorScheme) SerebiiEnhancementSuite.useLightColorScheme();
if (SerebiiEnhancementConfig.increaseTextSize) SerebiiEnhancementSuite.increaseTextSize();
if (SerebiiEnhancementConfig.reformatAttackTypes) SerebiiEnhancementSuite.reformatAttackTypes();
if (SerebiiEnhancementConfig.reformatWeaknessTypes) SerebiiEnhancementSuite.reformatWeaknessTypes();