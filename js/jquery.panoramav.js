/* =========================================================
// jquery.panorama.js
// Author: Arnault PACHOT & Frédéric Martini
// Copyright (c) 2009 
// licence : GPL
========================================================= */
(function($) {
	$.fn.panoramav = function(options) {
		this.each(function(){ 
			var settings = {
				viewport_height: 600,
				speed: 20000,
				direction: 'bottom',
				control_display: 'auto',
				start_position: 0,
				auto_start: true,
				mode_360: true,
				loop_180: true,
				footer_display: 'visible',
				cont_border: 2,
				cont_border_color: '#000000',
				footer_color: '#000000',
				caption_color: '#CCCCCC',
				footer_control_color: '#000000',
			};
			if(options) $.extend(settings, options);

			var elemWidth =  parseInt($(this).attr('width'));
			var elemHeight = parseInt($(this).attr('height'));
			// --------------------------------------------------
			// Récupération automatique de la taille de l'image :
			// Si un des attributs width ou height est absent, 
			// on récupère la vrai taille de l'image :
			if (isNaN(elemWidth) || isNaN(elemHeight)) {
				var img = new Image();
				img.src = $(this).attr('src');
				if (isNaN(elemWidth)) elemWidth = img.width;
				if (isNaN(elemHeight)) elemHeight = img.height;
			}

			var mathRound = 100;
			var panoramaThumbWidth = 30;
			var ratio = Math.round((elemWidth * mathRound) / panoramaThumbWidth);
			var panoramaThumbHeight = Math.floor((elemHeight / ratio) * mathRound);
			var FooterWidth = 50;
//			var panoramaThumbHeight = 100;
//			ratio = Math.round((elemHeight * mathRound) / panoramaThumbHeight);
//			if((Math.floor((elemWidth / ratio) * mathRound) + 22) < 50){
//			  var FooterWidth = 50;
//			}else{
//			  var FooterWidth = (Math.floor((elemWidth / ratio) * mathRound) + 22);
//			}
			var halfFrame = Math.floor(((settings.viewport_height / ratio) * mathRound) / 2);
			// --------------------------------------------------
			if (settings.footer_display == 'visible') {
			  var TotalWidth = Math.floor(elemWidth + FooterWidth);
			}else{
			  var TotalWidth = elemWidth;
			}
			$("#Panorama").css('border', settings.cont_border + 'px solid ' + settings.cont_border_color).css('height', (settings.cont_border) * 2 + settings.viewport_height + 'px').css('width', (settings.cont_border) * 2 + TotalWidth + 'px');
//			$("#Panorama").css('border', settings.cont_border + 'px solid ' + settings.cont_border_color).css('width', (settings.cont_border) * 2 + TotalWidth + 'px');

//			var currentElement = this;
			var panoramaViewport, panoramaContainer;
				
			$(this).css('position', 'relative')
				.css('margin', '0')
				.css('padding', '0')
				.css('border', 'none')
				.wrap("<div class='panorama-container'></div>");
//			if (settings.mode_360) 
//				$(this).clone().insertAfter(this);
//			
			panoramaContainer = $(this).parent();
			panoramaContainer.wrap("<div class='panorama-viewport'></div>").parent().css('height',settings.viewport_height + 'px').css('width', elemWidth+'px').css('float', 'right');
			
			if (settings.footer_display == 'invisible') {
				$("div.panorama-viewport").append("<div class='panorama-control'><a href='#' class='panorama-control-incspeed'>&#9650;</a> <a href='#' class='panorama-control-decspeed'>&#9660;</a> <a href='#' class='panorama-control-left'>&#9668;</a> <a href='#' class='panorama-control-pause'>&#9632;</a> <a href='#' class='panorama-control-right'>&#9658;</a> </div>");
				$("div.panorama-control").css('margin-left', ((elemWidth - $("div.panorama-control").width()) / 2) + 'px');
			}
			
/**************************************************************/
// Gestion du "Footer du panorama"
			if (settings.footer_display == 'visible') {
				$("#Panorama").append("<div id='panoramaFooter' class='panorama-footer'><div class='footer-control'><a href='#' class='panorama-control-incspeed'>&#9650;</a><a href='#' class='panorama-control-decspeed'>&#9660;</a><a href='#' class='panorama-control-left'>&#9668;</a> <a href='#' class='panorama-control-pause'>&#9632;</a> <a href='#' class='panorama-control-right'>&#9658;</a></div><div id='panoramaCaption'></div><div id='panoramaThumb'></div></div>");

				$("#panoramaFooter").css('padding','0px')
					.css('width',FooterWidth)
					.css('height', settings.cont_border * 2 + settings.viewport_height)
					.css('position','absolute')
					.css('background-color', settings.footer_color);
				$("#panoramaFooter a").css('color', settings.footer_control_color).css('border-color', settings.footer_control_color);
//				$("#panoramaCaption").css('color', settings.caption_color).html(settings.img_name);
				$("#panoramaThumb").css('width', (panoramaThumbWidth + 1)).css('height', panoramaThumbHeight).css('position','absolute').css('bottom','0px').append("<img src='" + $(this).attr('src') + "' height=" + panoramaThumbHeight + " width=" + (panoramaThumbWidth + 1) + "></img><div id='thumbFrame'></div>");

				if(window.ie) { var ieheightadjust = 3;	} else { var ieheightadjust = 4; }
				$("#thumbFrame").css('position','relative')
					.css('height', (Math.floor((settings.viewport_height / ratio) * mathRound) + 1))
					.css('width', (panoramaThumbWidth + 2))
					.css('top', -(panoramaThumbHeight + ieheightadjust))
				;
				
				$("#thumbFrame" ).draggable({
					axis : "y",
					containment: "#panoramaThumb",
					drag: function( event, ui ) {
						var x = Math.floor((ui.position.top + panoramaThumbHeight + ieheightadjust) * ratio / mathRound);
						$(".panorama-container").css('margin-top', - x);
					}
				}); 
				
// désactivé car offsetTop ne donne pas une valeur fiable				
//				$("#panoramaThumb").bind('click', function(e) {
//					var x = Math.floor((e.pageY - this.offsetTop) - halfFrame);
//					if(x < 0) { 
//						x = 0;
//					}
//					else if (x > panoramaThumbHeight - $("#thumbFrame").height()) {
//						x = panoramaThumbHeight - $("#thumbFrame").height();
//					}
//					$("#thumbFrame").animate({top: x - (panoramaThumbHeight + ieheightadjust)}, 2000 , 'swing');
//					x = - Math.floor(x * ratio / mathRound);
//					$("div.panorama-container").animate({marginTop: x}, 2000 , 'swing');
//					return false;
//				});
			}

/**********************************************************/
// Gestion des boutons de contrôle du panorama
			$("div.panorama-viewport").bind('click', function() {
				panorama_stop(panoramaContainer, ratio / mathRound );
				return false;
			});
 
			if (settings.footer_display == 'visible') panoramaViewport = $("#panoramaFooter"); else panoramaViewport = panoramaContainer.parent();
			
			panoramaViewport.find('a.panorama-control-left').bind('click', function() {
				$(panoramaContainer).stop();
				settings.direction = 'bottom';
				panorama_animate(panoramaContainer, elemHeight, settings);
				return false;
			});

			panoramaViewport.find('a.panorama-control-right').bind('click', function() {
				$(panoramaContainer).stop();
				settings.direction = 'top';
				panorama_animate(panoramaContainer, elemHeight, settings);
				return false;
			});

			panoramaViewport.find('a.panorama-control-pause').bind('click', function() {
				panorama_stop(panoramaContainer, ratio / mathRound);
				return false;
			});
			
			panoramaViewport.find('a.panorama-control-incspeed').bind('click', function() {
				panoramaContainer.stop().clearQueue();
				if (settings.speed > 5000) settings.speed -= 2500;
				panorama_animate(panoramaContainer, elemHeight, settings);
				return false;
			});	

			panoramaViewport.find('a.panorama-control-decspeed').bind('click', function() {
				panoramaContainer.stop().clearQueue();
				if (settings.speed < 130000) settings.speed += 2500;
				panorama_animate(panoramaContainer, elemHeight, settings);
				return false;
			});	
			
			if (settings.control_display == 'yes') {
				panoramaViewport.find('.panorama-control').show();
			} else {
				panoramaViewport.bind('mouseover', function(){
					$(this).find('.panorama-control').show();
					return false;
				}).bind('mouseout', function(){
					$(this).find('.panorama-control').hide();
					return false;
				});
			}
		$(this).parent().css('margin-top', '-'+ settings.start_position +'px');
		if (settings.auto_start) panorama_animate(panoramaContainer, elemHeight, settings);
	});

/**************************************************************/
// Scroll vertical du panorama		
		function panorama_animate(element, elemHeight, settings) {
			currentPosition = 0-parseInt($(element).css('margin-top'));
			if (settings.footer_display == 'visible') $("#thumbFrame").hide();
			if (settings.direction == 'bottom') {
				$(element).animate({marginTop: 0},((settings.speed / elemHeight) * (currentPosition)) , 'linear', function (){ 
					settings.direction = 'top'; // changement de sens 
					panorama_animate(element, elemHeight, settings);
				});
			} else {
				var downlimit;
				downlimit = elemHeight - settings.viewport_height;
				$(element).animate({marginTop: -downlimit},((settings.speed / elemHeight) * (downlimit - currentPosition)), 'linear', function (){ 
					if (settings.loop_180) {
						settings.direction = 'bottom'; // changement de sens
						panorama_animate(element, elemHeight, settings);
					}
				});
			}
		}

/**************************************************************/
// Arrêt du défilement et repositionnement de l'index		
		function panorama_stop(element, rapport) {
			$(element).stop();
			$("#thumbFrame").show();
			var x = - $("#panoramaThumb").height() - Math.floor((parseInt($("div.panorama-container").css('margin-top'))) / rapport);
			$("#thumbFrame").css('top', x);
			return false;
		}
	};

$(document).ready(function(){
	$("img.panorama").panoramav();
});
})(jQuery);
