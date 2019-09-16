{combine_css path="plugins/Panoramas/css/AS_Panorama.css"}

{combine_script id="jquery.panoramav" require="jquery" path="plugins/Panoramas/js/jquery.panoramav.js"}
{footer_script require="jquery.panoramav" require='jquery.ui.draggable'}
jQuery(document).ready(function(){ldelim}
    var w = Math.round({$ASP.viewport_heightv} );
	var s = (100 - {$ASP.speed}) * 2000;
	var p = Math.round(Math.min(Math.max({$ASP.height} * ( {$ASP.start_position} / 100 ), 0), {$ASP.height}));
	if ({$ASP.height} > w) {ldelim}
		$("#theImage img").attr({ldelim}width:{$ASP.width},height:{$ASP.height}});
		var options = {ldelim}
					viewport_height: w,
					speed: s,
					direction: 'bottom',
					control_display: '{$ASP.control_display}',
					start_position : p,
					auto_start : {$ASP.auto_start},
					mode_360 : 0,
					loop_180 : {$ASP.loop_180},
					img_name: '{$ASP.name}',
					cont_border: {$ASP.cont_border},
					cont_border_color: '{$ASP.cont_border_color}',
					footer_display : '{$ASP.footer_display}',
					footer_color: '{$ASP.footer_color}',
					caption_color: '{$ASP.caption_color}',
					footer_control_color: '{$ASP.footer_control_color}'
			 };
		$("#theImage img").panoramav(options);
	};
});
{/footer_script}

	<!-- Adapted simply by the "Panoramas" plugin (version {$ASP.Ver}): {$ASP.Dir}/template/AS_panorama_content.tpl -->
	<!-- for: {$ASP.image_name} ({$ASP.width}x{$ASP.height}) -->
	<div id="Panorama">
		{$ASP.content}
	</div>
	<br />