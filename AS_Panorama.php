<?php
/* A simple panorama */
if (!defined('PHPWG_ROOT_PATH') or !defined('ASP_DIR')) die('Hacking attempt!');
global $conf;
include_once( ASP_PATH . 'AS_Panorama_default.php');

if ( !function_exists( 'AS_panorama_content' ) ) {
	if ( !defined('IN_ADMIN') or !IN_ADMIN ) {
    add_event_handler('render_element_content', 'AS_panorama_content', 41, 2 );
    function AS_panorama_content($content, $image)
		{
		  global $conf, $template, $page;
		  $asp = & $conf['AS_panorama'];
	//echo "<pre>"; print_r($template); echo "</pre>"; exit;

	if (isset($template->files['slideshow'])) return $content;
	if ( !stristr($image['name'], $asp['in_mode_360']) and !stristr($image['name'], $asp['in_mode_180']) and !stristr($image['name'], $asp['in_mode_Vtc'])) return $content;
	if (!isset($image['path'])) return $content;
	if ( isset($page['slideshow']) and $page['slideshow'] ) return $content;
	if (stristr($image['name'], $asp['in_mode_Vtc'])) {
		if (isset($image['height']) and $image['height'] < $asp['viewport_heightv']) return $content;
		if ($image['width'] > $asp['viewport_widthv']) {
			$ratio = $image['height'] / $image['width'];
			$image['width'] = $asp['viewport_widthv'];
			$image['height'] = $asp['viewport_widthv'] * $ratio;
			}
		$content = "<img src=\"".str_replace( "./", "", $image['path'])."\" width=\"".$image['width']."\" height=\"".$image['height']."\" alt=\"".$image['file']."\" id=\"theMainImage\"></img>";
		$asp['image_name'] = $image['name'];
		$asp['width'] = $image['width'];
		$asp['height'] = $image['height'];
		$asp['name'] = str_replace($asp['in_mode_Vtc'],'', $image['name']);
		$asp['mode_360'] = 'false';
//		$asp['footer_view'] = 'false';
		$template->set_filenames(
		array('AS_panorama_content' => dirname(__FILE__) . '/template/AS_panoramav_content.tpl') );
		}
	else {
		if (isset($image['width']) and $image['width'] < $asp['min_viewport_width']) return $content;
		if ($image['height'] > $asp['viewport_height']) {
			$ratio = $image['width'] / $image['height'];
			$image['height'] = $asp['viewport_height'];
			$image['width'] = $asp['viewport_height'] * $ratio;
			}
		$content = "<img src=\"".str_replace( "./", "", $image['path'])."\" width=\"".$image['width']."\" height=\"".$image['height']."\" alt=\"".$image['file']."\" id=\"theMainImage\"></img>";
		$asp['image_name'] = $image['name'];
		$asp['width'] = $image['width'];
		$asp['height'] = $image['height'];
		if (stristr($image['name'], $asp['in_mode_180'])) {
			$asp['mode_360'] = 'false';
			$asp['name'] = str_replace($asp['in_mode_180'],'', $image['name']);
			}
		else  {
			$asp['name'] = str_replace($asp['in_mode_360'],'', $image['name']);
			}
//		$asp['footer_view'] = 'false';
		$template->set_filenames(
		array('AS_panorama_content' => dirname(__FILE__) . '/template/AS_panorama_content.tpl') );
		}
	
	$asp['Path'] = embellish_url($template->get_template_vars('ROOT_URL').ASP_PATH);
	$asp['content'] = $content;
	$template->assign( array( 'ASP' => $asp, ) );
	return $template->parse('AS_panorama_content', true);
}
}
}

if ( !function_exists( 'AS_panorama_title' ) ) {
	if ( $conf['AS_panorama']['In_name_display_removal'] ) {
		add_event_handler('loc_end_picture', 'AS_panorama_title');
		function AS_panorama_title()
		{
			global $conf, $template;
			$asp = & $conf['AS_panorama'];
			$picture = $template->get_template_vars('current');
			if ( isset($asp['name']) ) {
			$picture['TITLE'] = $asp['name'];
			$template->assign('current', $picture);
			$template->assign( array( 'ASP' => $asp, ) );
			}
		}
	}
}

if ( !function_exists( 'AS_panorama_menu' ) ) {
	if ( defined('IN_ADMIN') and IN_ADMIN ) {
		add_event_handler('get_admin_plugin_menu_links', 'AS_panorama_menu');
		function AS_panorama_menu($menu)
		{
			array_push($menu,
				array(
					'NAME' => 'Panoramas',
					'URL' => get_admin_plugin_menu_link(dirname(__FILE__).'/AS_Panorama_admin.php')
					)
			);
		return $menu;
		}
	}
}
?>