/* =========================================================
// jquery.panorama.js
// Author: Arnault PACHOT & Frédéric Martini
// Copyright (c) 2009 
// licence : GPL
========================================================= */
(function($) {
	$.fn.panorama = function(options) {
		this.each(function(){ 
			var settings = {
				viewport_width: 600,
				speed: 20000,
				direction: 'left',
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

			var ratio = elemWidth / 200;
			if((Math.floor(elemHeight / ratio) + 22) < 50){
			  var FooterHeight = 50;
			}else{
			  var FooterHeight = (Math.floor(elemHeight / ratio) + 22);
			}
			var halfFrame = Math.floor((settings.viewport_width / ratio) / 2);
			// --------------------------------------------------
			$("#Panorama").css('border', settings.cont_border + 'px solid ' + settings.cont_border_color).css('width', (settings.cont_border) * 2 + settings.viewport_width + 'px');

			var currentElement = this;
			var panoramaViewport, panoramaContainer;
				
			$(this).css('position', 'relative')
				.css('margin', '0')
				.css('padding', '0')
				.css('border', 'none')
				.wrap("<div class='panorama-container'></div>");
			if (settings.mode_360) 
				$(this).clone().insertAfter(this);
			
			panoramaContainer = $(this).parent();
			panoramaContainer.wrap("<div class='panorama-viewport'></div>").parent().css('width',settings.viewport_width + 'px').css('height', elemHeight+'px');
			
			if (settings.footer_display == 'invisible') {
				$("div.panorama-viewport").append("<div class='panorama-control'><a href='#' class='panorama-control-incspeed'>&#9650;</a> <a href='#' class='panorama-control-decspeed'>&#9660;</a> <a href='#' class='panorama-control-left'>&#9668;</a> <a href='#' class='panorama-control-pause'>&#9632;</a> <a href='#' class='panorama-control-right'>&#9658;</a> </div>");
				$("div.panorama-control").css('margin-left', ((settings.viewport_width - $("div.panorama-control").width()) / 2) + 'px');
			}
			
/**************************************************************/
// Gestion du "Footer du panorama"
			if (settings.footer_display == 'visible') {
				$("#Panorama").append("<div id='panoramaFooter' class='panorama-footer'><div class='footer-control'><a href='#' class='panorama-control-incspeed'>&#9650;</a><a href='#' class='panorama-control-decspeed'>&#9660;</a><a href='#' class='panorama-control-left'>&#9668;</a> <a href='#' class='panorama-control-pause'>&#9632;</a> <a href='#' class='panorama-control-right'>&#9658;</a></div><div id='panoramaCaption'></div><div id='panoramaThumb'></div></div>");

				$("#panoramaFooter").css('padding','0px')
					.css('height',FooterHeight)
					.css('background-color', settings.footer_color);
				$("#panoramaFooter a").css('color', settings.footer_control_color).css('border-color', settings.footer_control_color);
				$("#panoramaCaption").css('color', settings.caption_color).html(settings.img_name);
				$("#panoramaThumb").css('height', (Math.floor(elemHeight / ratio) + 1)).css('width', '200').append("<img src='" + $(this).attr('src') + "' width=200 height=" + (Math.floor(elemHeight / ratio) + 1) + "></img><div id='thumbFrame'></div>");

				if(window.ie) { var ieheightadjust = 1;	} else { var ieheightadjust = 3; }
				$("#thumbFrame").css('position','relative')
					.css('width', (Math.floor(settings.viewport_width / ratio) + 1))
					.css('height', (Math.floor(elemHeight / ratio) + 2))
					.css('top', -(Math.floor(elemHeight / ratio) + ieheightadjust + 1));
				
				$("#thumbFrame" ).draggable({
					axis : "x",
					containment: "#panoramaThumb",
					drag: function( event, ui ) {
						var x = Math.floor(ui.position.left * ratio);
						$(".panorama-container").css('margin-left', - x);
					}
				}); 
				
				
				$("#panoramaThumb").bind('click', function(e) {
					var x = Math.floor((e.pageX - this.offsetLeft) - halfFrame);
					if(x < 0) { 
						x = 0;
					}
					else if (x > 200 - $("#thumbFrame").width()) {
						x = 200 - $("#thumbFrame").width();
					}
					$("#thumbFrame").animate({left: x}, 2000 , 'swing');
					x = - Math.floor(x * ratio);
					$("div.panorama-container").animate({marginLeft: x}, 2000 , 'swing');
					return false;
				});
			}

/**********************************************************/
// Gestion des boutons de contrôle du panorama
			$("div.panorama-viewport").bind('click', function() {
				panorama_stop(panoramaContainer, ratio);
				return false;
			});
 
			if (settings.footer_display == 'visible') panoramaViewport = $("#panoramaFooter"); else panoramaViewport = panoramaContainer.parent();
			
			panoramaViewport.find('a.panorama-control-left').bind('click', function() {
				$(panoramaContainer).stop();
				settings.direction = 'right';
				panorama_animate(panoramaContainer, elemWidth, settings);
				return false;
			});

			panoramaViewport.find('a.panorama-control-right').bind('click', function() {
				$(panoramaContainer).stop();
				settings.direction = 'left';
				panorama_animate(panoramaContainer, elemWidth, settings);
				return false;
			});

			panoramaViewport.find('a.panorama-control-pause').bind('click', function() {
				panorama_stop(panoramaContainer, ratio);
				return false;
			});
			
			panoramaViewport.find('a.panorama-control-incspeed').bind('click', function() {
				panoramaContainer.stop().clearQueue();
				if (settings.speed > 5000) settings.speed -= 2500;
				panorama_animate(panoramaContainer, elemWidth, settings);
				return false;
			});	

			panoramaViewport.find('a.panorama-control-decspeed').bind('click', function() {
				panoramaContainer.stop().clearQueue();
				if (settings.speed < 130000) settings.speed += 2500;
				panorama_animate(panoramaContainer, elemWidth, settings);
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
		$(this).parent().css('margin-left', '-'+settings.start_position+'px');
		if (settings.auto_start) panorama_animate(panoramaContainer, elemWidth, settings);
	});

/**************************************************************/
// Scroll horizontal du panorama		
		function panorama_animate(element, elemWidth, settings) {
			currentPosition = 0-parseInt($(element).css('margin-left'));
			if (settings.footer_display == 'visible') $("#thumbFrame").hide();
			if (settings.direction == 'right') {
				$(element).animate({marginLeft: 0}, ((settings.speed / elemWidth) * (currentPosition)) , 'linear', function (){ 
					if (settings.footer_display == 'visible') panorama_stop(element, elemWidth / 200);
					if (settings.mode_360) {
						$(element).css('marginLeft', '-'+(parseInt(parseInt(elemWidth))+'px'));
						panorama_animate(element, elemWidth, settings);
					} else if (settings.loop_180) {
						settings.direction = 'left'; // changement de sens 
						panorama_animate(element, elemWidth, settings);
					}
				});
			} else {
				var rightlimit;
				if (settings.mode_360) rightlimit = elemWidth; else rightlimit = elemWidth - settings.viewport_width;
				$(element).animate({marginLeft: -rightlimit}, (settings.speed / elemWidth) * (rightlimit - currentPosition), 'linear', function (){ 
					if (settings.footer_display == 'visible') panorama_stop(element, elemWidth / 200);
					if (settings.mode_360) {
						$(element).css('margin-left', 0); 
						panorama_animate(element, elemWidth, settings);
					} else if (settings.loop_180) {
						settings.direction = 'right'; // changement de sens
						panorama_animate(element, elemWidth, settings);
					}
				});
			}
		}

/**************************************************************/
// Arrêt du défilement et repositionnement de l'index		
		function panorama_stop(element, rapport) {
			$(element).stop();
			$("#thumbFrame").show();
			var x = -Math.floor(parseInt($("div.panorama-container").css('margin-left')) / rapport);
			$("#thumbFrame").css('left', x);
			return false;
		}
	};

$(document).ready(function(){
	$("img.panorama").panorama();
});
})(jQuery);
