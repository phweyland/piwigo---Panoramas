<?php
  $default = array(
	'Ver' => '2.6.1',
	'viewport_width' => 100,
	'viewport_height' => 500,
	'min_viewport_width' => 720,
	'max_viewport_width' => 1500,
	'viewport_heightv' => 500,
	'viewport_widthv' => 500,
	'speed' => 45,
	'direction' => 'left',
	'control_display' => 'auto',
	'start_position' => 50,
	'auto_start' => 1,
	'mode_360' => 0,
	'loop_180' => 1,
	'Dir' => ASP_DIR,
	'Path' => ASP_PATH,
	'in_mode_360' => '_360',
	'in_mode_180' => '_180',
	'in_mode_Vtc' => '_Vtc',
	'In_name_display_removal' => 1,
	'cont_border' => 2,
	'cont_border_color' => '#000000',
	'footer_display' => 'invisible',
	'footer_color' => '#000000',
	'caption_color' => '#000000',
	'footer_control_color' => '#FFFFFF'
  );
  if (!isset($conf['AS_panorama'])) $conf['AS_panorama'] = $default;
  else $conf['AS_panorama'] = array_merge( $default, unserialize($conf['AS_panorama']));
?>