		jQuery(document).ready(function($) {
			tc_options.onFinish = function() {
				$(".countdown-timer").html('<p style="padding-left:60px;"><b>'+tc_options.onfinish+'</b></p>');
			}
			$(".countdown-timer").countdownTimer(tc_options);
		});
