<?php
/* Configuration of Panoramas */
if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');
if (!defined('IN_ADMIN') or !IN_ADMIN) die('Hacking attempt!');
load_language('plugin.lang', ASP_PATH);

global $conf, $template;
$errors = array();
$infos = array();
$conf['template_combine_files'] = false;

$asp = & $conf['AS_panorama'];

$sub = ( isset($_POST['submit']) ) ? true : false;

if ( $sub ) {
	// 'in_mode_360' => '_360',
  // Picture name substring to display in Mode 360 	
	// 'in_mode_180' => '_180', #
  // Picture name substring to display in Mode 180
  $nsp = array_merge($asp, $_POST);
	if ( $nsp['viewport_width']=='' or !is_numeric($nsp['viewport_width']) or $nsp['viewport_width'] < 50 or $nsp['viewport_width'] > 100 )
    array_push($errors, l10n('Viewport width ratio is out of range (Correct range: 50-100).'));
	if ( $nsp['viewport_height']=='' or !is_numeric($nsp['viewport_height']) or $nsp['viewport_height'] < 500 or $nsp['viewport_height'] > 800 )
    array_push($errors, l10n('Viewport height is out of range (Correct range: 500-800).')); 
	if ( $nsp['min_viewport_width']=='' or !is_numeric($nsp['min_viewport_width']) or $nsp['min_viewport_width'] < 320 )
    array_push($errors, l10n('Minimal Viewport width is out of range (Correct range: 320/+).')); 
	if ( $nsp['max_viewport_width']=='' or !is_numeric($nsp['max_viewport_width']) or $nsp['max_viewport_width'] < $nsp['min_viewport_width'] )
    array_push($errors, l10n('Maximal Viewport width is out of range (Correct range: Minimal/+).')); 
	if ( $nsp['speed']=='' or !is_numeric($nsp['speed']) or $nsp['speed'] < 10 or $nsp['speed'] > 90 )
    array_push($errors, l10n('Relative speed factor is out of range (Correct range: 10-90).')); 
	if ( $nsp['start_position']=='' or !is_numeric($nsp['start_position']) or $nsp['start_position'] < 0 or $nsp['start_position'] > 99 )
    array_push($errors, l10n('Start position ratio is out of range (Correct range: 0-99).')); 
	if ( $nsp['start_position']=='' or !is_numeric($nsp['start_position']) or $nsp['start_position'] < 0 or $nsp['start_position'] > 99 )
    array_push($errors, l10n('Start position ratio is out of range (Correct range: 0-99).')); 
	if ( $nsp['cont_border']=='' or !is_numeric($nsp['cont_border']) or $nsp['cont_border'] < 0 or $nsp['cont_border'] > 10 )
    array_push($errors, l10n('Border Width ratio is out of range (Correct range: 0-10).')); 
  
  $nsp['in_mode_360'] = trim((string) $nsp['in_mode_360']);
  $nsp['in_mode_180'] = trim((string) $nsp['in_mode_180']);
 	if ( $nsp['in_mode_360']=='' or $nsp['in_mode_180']=='' )
    array_push($errors, l10n('Picture name substring could not be empty.')); 
 	if ( $nsp['in_mode_360'] == $nsp['in_mode_180'] )
    array_push($errors, l10n('Picture name substrings must be different.')); 

	if ( $nsp['viewport_heightv']=='' or !is_numeric($nsp['viewport_heightv']) or $nsp['viewport_heightv'] < 300 or $nsp['viewport_heightv'] > 1200 )
    array_push($errors, l10n('Viewport height is out of range (Correct range: 300-1200).'));
	if ( $nsp['viewport_widthv']=='' or !is_numeric($nsp['viewport_widthv']) or $nsp['viewport_widthv'] < 500 or $nsp['viewport_widthv'] > 1200 )
    array_push($errors, l10n('Viewport width is out of range (Correct range: 500-1200).')); 
  $nsp['in_mode_Vtc'] = trim((string) $nsp['in_mode_Vtc']);
 	if ($nsp['in_mode_Vtc']=='' )
    array_push($errors, l10n('Picture name substring could not be empty.')); 
	
	
  if ( count($errors) > 0 )
	array_push($errors, l10n('Your configuration is NOT saved due to above reasons.'));
  if ( !is_webmaster() and count($errors) == 0 )
    array_push($infos, l10n('You are not authorized to change this configuration (Webmaster only).'));
  if ( is_webmaster() and count($errors) == 0 )
  {
    $nsp = array_merge( $asp, $nsp );
    unset($nsp['submit'], $nsp['Ver'], $nsp['Path'], $nsp['Dir']);
    // var_dump($nsp);
    $confasp = serialize($nsp);
    conf_update_param('AS_panorama', $confasp);
   	array_push($infos, l10n('Your configuration is saved.'));
  }
  $asp = $nsp;
}
$template->set_filenames( array('AS_panorama_admin' => dirname(__FILE__).'/template/AS_Panorama_admin.tpl') );
foreach ($asp as $k => & $v) {
  if (is_string($v)) $asp[$k] = htmlspecialchars($v, ENT_QUOTES, 'utf-8');
  else $asp[$k] = $v;
}
if (count($errors) != 0) $template->assign('errors', $errors);
if (count($infos) != 0) $template->assign('infos', $infos);
$asp['Path'] = embellish_url($template->get_template_vars('ROOT_URL').ASP_PATH);
$asp = array_merge( $asp, array(
	'Dir' => ASP_DIR,
	'Path' => ASP_PATH,
  ));
$template->append('head_elements',
		   '<script type="text/javascript" src="./plugins/Panoramas/farbtastic/farbtastic.js"></script>
			<link rel="stylesheet" type="text/css" href="./plugins/Panoramas/farbtastic/farbtastic.css" />');
$template->assign( 'ASP', $asp );
$template->assign_var_from_handle('ADMIN_CONTENT', 'AS_panorama_admin');
?>