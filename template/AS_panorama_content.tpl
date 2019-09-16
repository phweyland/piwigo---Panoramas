{combine_css path="plugins/Panoramas/css/AS_Panorama.css"}

{combine_script id="jquery.panorama" require="jquery" path="plugins/Panoramas/js/jquery.panorama.js"}
{footer_script require="jquery.panorama" require='jquery.ui.draggable'}
jQuery(document).ready(function(){ldelim}
    var w = $("#imageToolBar").width();
	if (w === null) {ldelim} w = $("#theImage").width(); }
	if (w < {$ASP.min_viewport_width}) {ldelim} w = .75 * $("#theImage").width(); }
	w = w * ( Math.min( Math.max({$ASP.viewport_width} / 100, .5) , 1 ));
	w = Math.round(Math.min( {$ASP.max_viewport_width} , Math.max( {$ASP.min_viewport_width}, w) ));
	var s = (100 - {$ASP.speed}) * 2000;
	var p = Math.round(Math.min(Math.max({$ASP.width} * ( {$ASP.start_position} / 100 ), 0), {$ASP.width}));
	if ({$ASP.width} > w) {ldelim}
		$("#theImage img").eq(0).removeAttr("style").attr({ldelim}width:{$ASP.width},height:{$ASP.height}});
		var options = {ldelim}
					viewport_width: w,
					speed: s,
					direction: '{$ASP.direction}',
					control_display: '{$ASP.control_display}',
					start_position : p,
					auto_start : {$ASP.auto_start},
					mode_360 : {$ASP.mode_360},
					loop_180 : {$ASP.loop_180},
					img_name: '{$ASP.name}',
					cont_border: {$ASP.cont_border},
					cont_border_color: '{$ASP.cont_border_color}',
					footer_display : '{$ASP.footer_display}',
					footer_color: '{$ASP.footer_color}',
					caption_color: '{$ASP.caption_color}',
					footer_control_color: '{$ASP.footer_control_color}'
			 };
		$("#theImage img").panorama(options);
	};
});
{/footer_script}

	<!-- Adapted simply by the "Panoramas" plugin (version {$ASP.Ver}): {$ASP.Dir}/template/AS_panorama_content.tpl -->
	<!-- for: {$ASP.image_name} ({$ASP.width}x{$ASP.height}) -->
	<div id="Panorama">
		{$ASP.content}
	</div>
	<br />