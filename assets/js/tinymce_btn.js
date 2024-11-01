/**
 * 
 */
jQuery(document).ready(function() {
	jQuery('.tc_icon').click(function(e){
		e.preventDefault();
		image_posts_list='';
			tbWidth = 810;
	 			tbHeight = 480;
	 			var jQueryroot = jQuery("#TC-shortcode");
	 			if (!jQueryroot.length) {
	 				jQuery("body").append('<div style="display:none;" id="TC-shortcode" />');
	 				jQueryroot = jQuery("#TC-shortcode");
	 			}
	
	 			var html = '<div id="dialog" title="Time Counter`s parameters"><form id="addCounter"><div id="left">';
            		html += '<p>Date And Time: <input id="datetimepicker_mask" type="text" value=""></input><br />Specifies the datetime to count.</p>';
            		html += '<script type="text/javascript">jQuery("#datetimepicker_mask").focus(function(){jQuery("#datetimepicker_mask").datetimepicker({ mask:"9999/19/39 29:59:00"});});</script>';
            		html += '<p>TimeZone: <input type="text" id="timeZone" /> <br />specify GMT timezone number. eg. -5.5 <a href="http://www.timetemperature.com/time-zone-maps/large-world-time-zone-map.shtml">Find Timezone number</a></p>';
            		html += '<p>Count Type: <select id="past"><option value="true">count-ups</option><option value="false">count-downs</option></select></p>';
            		html += '<p>Show Days: <select id="showDay"><option value="true">True</option><option value="false">False</option></select></p>';
            		html += '<p>Show Hours: <select id="showHour"><option value="true">True</option><option value="false">False</option></select></p>';
            		html += '<p>Show Minutes: <select id="showMinute"><option value="true">True</option><option value="false">False</option></select></p>';
            		html += '<p>Show Seconds: <select id="showSecond"><option value="true">True</option><option value="false">False</option></select></p></div>';
            		html += '<div id="right"><p>Day Text: <input type="text" id="dayText" value="Days" /></p>';
            		html += '<p>Hour Text: <input type="text" id="hourText" value="Hours" /></p>';
            		html += '<p>Minute Text: <input type="text" id="minuteText" value="Minutes" /></p>';
            		html += '<p>Second Text: <input type="text" id="secondText" value="Seconds" /></p>';
            		html += '<p>Skin: <select id="skin"><option value="default">Default</option><option value="green">Green</option><option value="yellow">Yellow</option><option value="white">White</option><option value="red">Red</option><option value="blue">Blue</option><option value="modern">Modern</option></select></p>';
            		html += '<p>On Finish Message: <textarea id="onFinish" cols="30" rows="4" ></textarea></p></div>';
        		html += '<div class="ui-dialog-buttonset">';
        		html += '<button id="tc_submit_btn" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" type="button" role="button" aria-disabled="false">';
        		html += '<span class="ui-button-text">Add Counter</span></button></div></div>';
            		html += '</form></div>';
	 			jQueryroot.html(html);
	             			                   
	             tb_show('Time Counter`s parameters', '#TB_inline?height=' + tbHeight + '&width=' + tbWidth + '&inlineId=TC-shortcode');
	        	 jQuery("#TB_window").height('auto').width('auto');
	        	 
	        	 
	        	 jQuery("#tc_submit_btn").click(function(e){
	        		e.preventDefault();
            	 
            									var timenow = new Date();
            									var now = timenow.getFullYear()+'/'+timenow.getMonth()+'/'+timenow.getDate()+'/';
            										now += ' '+timenow.getHours()+':'+timenow.getMinutes();
            										
            									var datesetup = jQuery('#datetimepicker_mask').val();

            									if(new Date(datesetup) > new Date()){
            										jQuery('#past').val("false");
            									}
            									if(new Date(datesetup) < new Date()){
            										jQuery('#past').val("true");
            									}
            									var shortcode = "[TimeCounter ";
            										shortcode += ' date="'+jQuery('#datetimepicker_mask').val()+':00"';
            										shortcode += ' past="'+jQuery('#past').val()+'"';
            										shortcode += ' timeZone='+jQuery('#timeZone').val();
            										shortcode += ' showDay="'+jQuery('#showDay').val()+'"';
            										shortcode += ' showHour="'+jQuery('#showHour').val()+'"';
            										shortcode += ' showMinute="'+jQuery('#showMinute').val()+'"';
            										shortcode += ' showSecond="'+jQuery('#showSecond').val()+'"';
            										shortcode += ' dayText="'+jQuery('#dayText').val()+'"';
            										shortcode += ' hourText="'+jQuery('#hourText').val()+'"';
            										shortcode += ' minuteText="'+jQuery('#minuteText').val()+'"';
            										shortcode += ' secondText="'+jQuery('#secondText').val()+'"';
            										shortcode += ' imagefolder="'+jQuery('#skin').val()+'"';
            										shortcode += ' onFinish="'+jQuery('#onFinish').val()+'"';
            										shortcode += ']';
						window.send_to_editor(shortcode);
					  	tb_remove();
        });
		return false;
    });
});
