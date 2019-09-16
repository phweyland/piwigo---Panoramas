<?php /*
Plugin Name: Panoramas
Version: 2.6.1
Description: A simple panorama viewer based on jQuery
Plugin URI: http://piwigo.org/ext/extension_view.php?eid=207
Author: Piwigo team & OpenStudio
Author URI: http://www.vdigital.org
*/

/* Specials thanks to: jquery.panorama authors: Arnault PACHOT & Frédéric Martini
   Copyright (c) 2009 
   Licence : GPL
   http://www.openstudio.fr/Un-viewer-de-panoramas-simple-en.html
   =========================================================  

 Synopsis: on picture-url if Picture-name contains _360 (by default) change picture display

History
  2014-08-31 2.6.1
			 Checked for Piwigo 2.6
  2013-05-08 2.5.1
			 New: Add vertical panorama (tilting)
  201x-xx-xx 2.5.a
			 Upgrade for Piwigo 2.5
  2012-12-23 2.4.6
			 New: Ajout de fonctionnalités de type Pamooramics
  2012-12-15 2.4.5
			 New: Add Viewport height parameter
			 Upgrade for Piwigo 2.4.5
  2010-05-27 2.1.a
			 New: jQuery function replacement
			 jquery.animated.innerfade has been removed
			 and jquery.panorama added
  2008-10-04 2.0.b (stable)
             IE7 bug, with jQuery script (Thanks to repié38 who find cause and solution)
  2008-09-29 2.0.a (stable)
             Smarty version for Piwigo (Don't use it with PhpWebGallery 1.7.x)
  2008-02-10 1.7.d (stable)
             IE6 bug: corrective for blank pictures
  2008-02-06 1.7.c
             High Resolution support
  2008-02-06 1.7.b (bugged)
             No title where no decription available
  2008-01-15 First release
*/
if (!defined('PHPWG_ROOT_PATH')) die('Hacking attempt!');
define('ASP_DIR' , basename(dirname(__FILE__)));
define('ASP_PATH' , PHPWG_PLUGINS_PATH . ASP_DIR . '/');
include_once( ASP_PATH . 'AS_Panorama.php');
?>