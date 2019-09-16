{html_head}
<link rel="stylesheet" type="text/css" href="{$ASP.Path}css/AS_Panorama_admin.css">
{/html_head}
<div class="titrePage">
  <h2>Panoramas</h2>
</div>
<p>

{'Special thanks to:'|@translate} Arnault Pachot & Frédéric Martini - {'authors of'|@translate}
<a href="http://www.openstudio.fr/Un-viewer-de-panoramas-simple-en.html" title="" class="externalLink">jquery.panorama</a><br/>

</p>
<form method="post" action="" class="general">
 <fieldset id="ASP_Config">
  <legend>{'Panoramas configuration'|@translate}</legend>
  <table id="table" style="float:left">
    <tr>
	   <td class="label">{'Border width'|@translate}</td>
	   <td><input type="text" class="field" name="cont_border" value="{$ASP.cont_border}" size="20" maxlength="2"/></td>
    </tr>
    <tr>
	   <td class="label">{'Border color'|@translate}</td>
	   <td><input type="text" class="field colorwell" name="cont_border_color" value="{$ASP.cont_border_color}" size="20" maxlength="7"/></td>
    </tr>
    <tr>
      <td class="label">{'Control display'|@translate}</td>
	  <td>
		<input type="radio" value="auto" name="control_display" {if ($ASP.control_display=='auto')} checked="checked" {/if}/>{'Auto'|@translate}
		<input type="radio" value="yes"  name="control_display" {if ($ASP.control_display=='yes')}  checked="checked" {/if}/>{'Permanent'|@translate}
	  </td>
    </tr>
    <tr>
      <td class="label">{'Footer display'|@translate}</td>
	  <td>
		<input type="radio" value="visible" name="footer_display" {if ($ASP.footer_display=='visible')} checked="checked" {/if}/>{'Visible'|@translate}
		<input type="radio" value="invisible" name="footer_display" {if ($ASP.footer_display=='invisible')}  checked="checked" {/if}/>{'Invisible'|@translate}
	  </td>
    </tr>
    <tr>
      <td class="label">{'Relative speed factor [10-90]'|@translate}</td>
      <td><input type="text" class="field" name="speed" value="{$ASP.speed}"  size="20" maxlength="2"/></td>
    </tr>
    <tr>
	   <td class="label">{'Footer Color'|@translate}</td>
	   <td><input type="text" class="field colorwell" name="footer_color" value="{$ASP.footer_color}" size="20" maxlength="7"/></td>
    </tr>
    <tr>
	   <td class="label">{'Footer Control Color'|@translate}</td>
	   <td><input type="text" class="field colorwell" name="footer_control_color" value="{$ASP.footer_control_color}" size="20" maxlength="7"/></td>
    </tr>
    <tr>
	   <td class="label">{'Caption Color'|@translate}</td>
	   <td><input type="text" class="field colorwell" name="caption_color" value="{$ASP.caption_color}" size="20" maxlength="7"/></td>
    </tr>
    <tr>
      <td class="label">{'Start position [% between 0-99]'|@translate}</td>
      <td><input type="text" class="field" name="start_position" value="{$ASP.start_position}"  size="20" maxlength="2"/></td>
    </tr>
    <tr>
      <td class="label">{'Automatic start'|@translate}</td>
	  <td>
		<input type="radio" value="1"  name="auto_start" {if ($ASP.auto_start)}  checked="checked" {/if}/>{'On'|@translate}
		<input type="radio" value="0" name="auto_start" {if (!$ASP.auto_start)} checked="checked" {/if}/>{'Off'|@translate}
	  </td>
    </tr>
    <tr>
      <td class="label">{'Remove substring from picture title'|@translate}</td>
	  <td>
		<input type="radio" value="1"  name="In_name_display_removal" {if ($ASP.In_name_display_removal)}  checked="checked" {/if}/>{'On'|@translate}
		<input type="radio" value="0" name="In_name_display_removal" {if (!$ASP.In_name_display_removal)} checked="checked" {/if}/>{'Off'|@translate}
	  </td>
    </tr>
	
    <tr>  <td class="label">{'----------  Horizontal Panoramas  ----------'|@translate} </td></tr>
    <tr>
      <td class="label">{'Viewport height [pixels > 500]'|@translate}</td>
      <td><input type="text" class="field" name="viewport_height" value="{$ASP.viewport_height}" size="20" maxlength="3"/></td>
    </tr>
    <tr>
      <td class="label">{'Viewport width [% between 50-100]'|@translate}</td>
      <td><input type="text" class="field" name="viewport_width" value="{$ASP.viewport_width}" size="20" maxlength="3"/></td>
    </tr>
    <tr>
      <td class="label">{'Viewport minimal width [pixels > 320]'|@translate}</td>
      <td><input type="text" class="field" name="min_viewport_width" value="{$ASP.min_viewport_width}"  size="20" maxlength="4"/></td>
    </tr>
    <tr>
      <td class="label">{'Viewport maximal width [pixels >= minimal width]'|@translate}</td>
      <td><input type="text" class="field" name="max_viewport_width" value="{$ASP.max_viewport_width}"  size="20" maxlength="4"/></td>
    </tr>
    <tr>
      <td class="label">{'Rotation direction'|@translate}</td>
	  <td>
		<input type="radio" value="left"  name="direction" {if ($ASP.direction=='left')}  checked="checked" {/if}/>{'Left'|@translate}
		<input type="radio" value="right" name="direction" {if ($ASP.direction=='right')} checked="checked" {/if}/>{'Right'|@translate}
	  </td>
    </tr>
    <tr>
      <td class="label">{'Mode 360'|@translate}</td>
	  <td>
		<input type="radio" value="1"  name="mode_360" {if ($ASP.mode_360)}  checked="checked" {/if}/>{'On'|@translate}
		<input type="radio" value="0" name="mode_360" {if (!$ASP.mode_360)} checked="checked" {/if}/>{'Off'|@translate}
	  </td>
    </tr>
    <tr>
      <td class="label">{'Picture name substring to display in Mode 360'|@translate}</td>
      <td><input type="text" class="field" name="in_mode_360" value="{$ASP.in_mode_360}"  size="20"  maxlength="8"/></td>
    </tr>
    <tr>
      <td class="label">{'Picture name substring to display in Mode 180'|@translate}</td>
      <td><input type="text" class="field" name="in_mode_180" value="{$ASP.in_mode_180}"  size="20"  maxlength="8"/></td>
    </tr>
    <tr>
      <td class="label">{'Mode 180 (Alternative left-right restart)'|@translate}</td>
	  <td>
		<input type="radio" value="1"  name="loop_180" {if ($ASP.loop_180)}  checked="checked" {/if}/>{'On'|@translate}
		<input type="radio" value="0" name="loop_180" {if (!$ASP.loop_180)} checked="checked" {/if}/>{'Off'|@translate}
	  </td>
    </tr>

    <tr>  <td class="label">{'----------  Vertical Panoramas  ----------'|@translate} </td></tr>
    <tr>
      <td class="label">{'Viewport width [between 500-1200 pixels]'|@translate}</td>
      <td><input type="text" class="field" name="viewport_widthv" value="{$ASP.viewport_widthv}" size="20" maxlength="4"/></td>
    </tr>
    <tr>
      <td class="label">{'Viewport height [between 300-1200 pixels]'|@translate}</td>
      <td><input type="text" class="field" name="viewport_heightv" value="{$ASP.viewport_heightv}" size="20" maxlength="4"/></td>
    </tr>
    <tr>
      <td class="label">{'Picture name substring to display in Vertical'|@translate}</td>
      <td><input type="text" class="field" name="in_mode_Vtc" value="{$ASP.in_mode_Vtc}"  size="20"  maxlength="8"/></td>
    </tr>



	</table>
    <div id="colorpicker" style="float:right"></div>
 </fieldset>

 <p><input type="submit" value="{'Submit'|@translate}" name="submit" /></p>
</form>

<script type="text/javascript" charset="utf-8">
 $(document).ready(function() {ldelim}
     var f = $.farbtastic('#colorpicker');
     var selected;
     $('.colorwell')
       .each(function () {ldelim} f.linkTo(this);  })
       .focus(function() {ldelim}
       	f.linkTo(this);

       });
  });
 </script>
 
{html_head}
<script type="text/javascript">
jQuery(document).ready(function() {ldelim}
	jQuery(".infos").fadeOut(800).fadeIn(1200).fadeOut(400).fadeIn(800).fadeOut(400);
	jQuery(".errors").fadeOut(200).fadeIn(200).fadeOut(300).fadeIn(300).fadeOut(400).fadeIn(400); 
	jQuery('#theAdminPage #the_page').addClass('{$themeconf.name}');
	});
</script>

{/html_head}
