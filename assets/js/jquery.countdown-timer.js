/**************************************************************************
 * jQuery Countdown Timer
 * @info: http://www.codegrape.com/item/jquery-countdown-timer/1192
 * @version: 1.0 (12.12.2011)
 * @requires: jQuery v1.7 or later (tested on 1.10.2)
 * @author: flashblue - http://www.codegrape.com/user/flashblue
**************************************************************************/

;(function($) {
	$.fn.countdownTimer = function(options) {		
		
		//Default variables
		var defaults = {
			date:"",
			timeZone:0,
			past:false,
			
			//The number of days to be shown
			dayTextNumber:2,
			
			//Show-Hide Day, Hour, Minute, Second
			showDay:true,
			showHour:true,
			showMinute:true,
			showSecond:true,
			
			//Texts
			dayText:"Days",
			hourText:"Hours",
			minuteText:"Minutes",
			secondText:"Seconds",
			
			//Timer on finish function
			onFinish:function() {},
			
			//Image folder
			imageFolder:"images/countdown/"
		};
		
		//Options
		var options = $.extend({}, defaults, options);
		
		//Window
		var win = $(window);
		
		//Create timer
		return this.each(function() {
			var container = $(this);
			container.addClass("countdown-timer");
			var timer = new CountDownTimer($(this), options);
			timer.init();
		});
		
		//Countdown Timer class
		function CountDownTimer($obj, options) {
			
			//Variables
			var $timer;
			var days = [], daysCurrent = [], daysUpBack = [], daysDownBack = [], daysUp = [], daysDown = [];
			var hours = [], hoursCurrent = [], hoursUpBack = [], hoursDownBack = [], hoursUp = [], hoursDown = [];
			var minutes = [], minutesCurrent = [], minutesUpBack = [], minutesDownBack = [], minutesUp = [], minutesDown = [];
			var seconds = [], secondsCurrent = [], secondsUpBack = [], secondsDownBack = [], secondsUp = [], secondsDown = [];
			var cls = "";
			var currentTime, time, timeDiff;
			var flip_once = false;
			var width = 0;
			var intervalId = null;
			
			//Dimensions
			var bgH = 0, bgW = 0, marginLeft = 0, next = false;
			
			//Back
			var $bg = $('<div class="bg" />');
			var $back = $('<div class="back" />');
			var $upperHalfBack = $('<div class="upperHalfBack" />');
			var $lowerHalfBack = $('<div class="lowerHalfBack" />');
			
			//Front
			var $front = $('<div class="front" />');
			var $upperHalf = $('<div class="upperHalf" />');
			var $lowerHalf = $('<div class="lowerHalf" />');
			
			//Sub texts
			var $subTexts = $('<div class="sub-texts"><span class="day">'+options.dayText+'</span><span class="hour">'+options.hourText+'</span><span class="minute">'+options.minuteText+'</span><span class="second">'+options.secondText+'</span></div>');
			
			//Count of numbers
			var dayTextNumber = parseInt(options.dayTextNumber)>2 ? parseInt(options.dayTextNumber) : 2;
			var hourTextNumber = 2;
			var minuteTextNumber = 2;
			var secondTextNumber = 2;
			
			//Timer on finish function
			var onFinish = typeof(options.onFinish)=="function" ? options.onFinish : function() {};
			
			//Init
			this.init = function() {
				var that = this;
				$timer = $obj;
				
				//Convert date string to time
				this.convertToTime();
				
				//BG
				$timer.append($bg);
				
				//Append sub texts to timer
				$timer.append($subTexts);
				
				//Back
				$timer.append($back);
				$upperHalfBack.html('<img src="'+options.imageFolder+'spacer.png" />');
				$lowerHalfBack.html('<img src="'+options.imageFolder+'spacer.png" />');
				$back.append($upperHalfBack);
				$back.append($lowerHalfBack);
				
				//Front
				$timer.append($front);
				$upperHalf.html('<img src="'+options.imageFolder+'spacer.png" />');
				$lowerHalf.html('<img src="'+options.imageFolder+'spacer.png" />');
				$front.append($upperHalf);
				$front.append($lowerHalf);
				
				//Window resize
				$(window).resize(function() {
					that.windowResized();					
				});
				this.windowResized();
				
				//Day
				this.addItem(options.showDay, dayTextNumber, "day", days, daysCurrent, daysUpBack, daysDownBack, daysUp, daysDown);
				
				//Hour
				this.addItem(options.showHour, hourTextNumber, "hour", hours, hoursCurrent, hoursUpBack, hoursDownBack, hoursUp, hoursDown);
				
				//Minute
				this.addItem(options.showMinute, minuteTextNumber, "minute", minutes, minutesCurrent, minutesUpBack, minutesDownBack, minutesUp, minutesDown);
				
				//Second
				this.addItem(options.showSecond, secondTextNumber, "second", seconds, secondsCurrent, secondsUpBack, secondsDownBack, secondsUp, secondsDown);	
				
				//On finish event
				$timer.onFinish = onFinish;
				
				//Start timer			
				this.intervalId = setInterval(function() {that.checkTime();}, 1000);
				that.checkTime();
			};
			
			//Convert string to time
			this.convertToTime = function() {
				var time = options.date.split("/").join(" ").split(":").join(" ").split(" ");
				var y = parseInt(time[0], 10);
				var m = parseInt(time[1], 10)-1;
				var d = parseInt(time[2], 10);
				var h = parseInt(time[3], 10);
				var i = parseInt(time[4], 10)-options.timeZone*60;
				var s = parseInt(time[5], 10);
				options.date = new Date(y, m, d, h, i, s, 0).getTime();
			};
			
			//Window resize handler
			this.windowResized = function() {
				var w = $(window).width();
				
				if (w>=960) {
					bgH = 35;
					bgW = 68;
					marginLeft = 23;
				} else if (w>=768 && w<=959) {
					bgH = 35;
					bgW = 68;
					marginLeft = 23;
				} else if (w>=480 && w<=767) {
					bgH = 29;
					bgW = 54;
					marginLeft = 9;
				} else if (w>=340 && w<=479) {
					bgH = 19;
					bgW = 35;
					marginLeft = 5;
				} else if(w>0 && w<=339) {
					bgH = 15;
					bgW = 25;
					marginLeft = 3;
				}
				
				next = false;	
				
				//Day
				this.resizeText(options.showDay, dayTextNumber, "day");
				
				//Hour
				this.resizeText(options.showHour, hourTextNumber, "hour");
				
				//Minute
				this.resizeText(options.showMinute, minuteTextNumber, "minute");
				
				//Second
				this.resizeText(options.showSecond, secondTextNumber, "second");
			};
			
			//Resize text
			this.resizeText = function(show, textNumber, className) {
				if (show) {
					var $text = $subTexts.find("."+className);
					$text.width(textNumber*bgW);
					if (next) {
						$text.css("margin-left", marginLeft+"px");	
					}
					next = true;
				}
			};
			
			//Add item
			this.addItem = function(show, textNumber, className, arr, arrCurrent, upBack, downBack, up, down) {
				var $text = $subTexts.find("."+className);
				for (i=0; i<textNumber; i++) {
					arr[i] = arrCurrent[i] = -1;
					if (show) {
						if (i==0 && cls!="") {
							$bg.append($('<img class="bg-dot" src="'+options.imageFolder+'bg-dot.png" />'));
						}
						var next = i==0 ? cls : "";
						upBack[i] = $('<img class="'+className+next+' bg-img" src="'+options.imageFolder+'0u.png" />');
						$upperHalfBack.append(upBack[i]);
						downBack[i] = $('<img class="'+className+next+'" src="'+options.imageFolder+'0n.png" />');
						$lowerHalfBack.append(downBack[i]);
						up[i] = $('<img class="'+className+next+'" src="'+options.imageFolder+'0u.png" />');
						$upperHalf.append(up[i]);
						down[i] = $('<img class="'+className+next+'" src="'+options.imageFolder+'0n.png" />');
						$lowerHalf.append(down[i]);
						$bgImg = $('<img src="'+options.imageFolder+'bg-number.png" />');
						$bg.append($bgImg);
						cls = " next";						
					}
				}
				if (!show) {
					$text.hide();
				}
			};
			
			//Check current time
			this.checkTime = function() {
				time = new Date();
				currentTime = time.getTime()+time.getTimezoneOffset()*60*1000;
				timeDiff = !options.past ? options.date-currentTime : currentTime-options.date;
				if (timeDiff<0) {						
					clearInterval(this.intervalId);
					timeDiff = 0;
					$timer.onFinish.call(this);
				}
				var currentTimeText = this.timeFormat(timeDiff);				
				var currentTimeChars = currentTimeText.split("");
				var i = 0, v = 0;
				
				//Day
				for(i = 0; i<dayTextNumber; i++) {
					days[i] = parseInt(currentTimeChars.shift());				
				}
				var n = days.length-1;
				if (options.showDay && days[n]!=daysCurrent[n]) {					
					this.flip(days[n], daysUpBack[n], daysDownBack[n], daysUp[n], daysDown[n]);
					daysCurrent[n] = days[n];
					if (n>0) {						
						for (i=0; i<n; i++) {
							if((!options.past && daysCurrent[n]==9) || (options.past && daysCurrent[1]==0) || !flip_once) {								
								this.flip(days[i], daysUpBack[i], daysDownBack[i], daysUp[i], daysDown[i]);
							}
						}
					}
				}
				
				//Hour				
				for(i = 0; i<hourTextNumber; i++) {
					hours[i] = parseInt(currentTimeChars.shift());					
				}	
				if (options.showHour && hours[1]!=hoursCurrent[1]) {
					this.flip(hours[1], hoursUpBack[1], hoursDownBack[1], hoursUp[1], hoursDown[1]);
					hoursCurrent[1] = hours[1];						
					if((!options.past && hoursCurrent[1]==9) || (options.past && hoursCurrent[1]==0) || !flip_once) {
						this.flip(hours[0], hoursUpBack[0], hoursDownBack[0], hoursUp[0], hoursDown[0]);
					}
					if(hoursCurrent[0]<1 && hoursCurrent[1]<2) {
						this.flip(hours[0], hoursUpBack[0], hoursDownBack[0], hoursUp[0], hoursDown[0]);
					}
					hoursCurrent[0] = hours[0];
				}
				
				//Minute				
				for(i = 0; i<minuteTextNumber; i++) {
					minutes[i] = parseInt(currentTimeChars.shift());					
				}
				if (options.showMinute && minutes[1]!=minutesCurrent[1]) {
					this.flip(minutes[1], minutesUpBack[1], minutesDownBack[1], minutesUp[1], minutesDown[1]);
					minutesCurrent[1] = minutes[1];						
					if((!options.past && minutesCurrent[1]==9) || (options.past && minutesCurrent[1]==0) || !flip_once) {
						this.flip(minutes[0], minutesUpBack[0], minutesDownBack[0], minutesUp[0], minutesDown[0]);
					}
					minutesCurrent[0] = minutes[0];
				}
				
				//Second
				for(i = 0; i<secondTextNumber; i++) {
					seconds[i] = parseInt(currentTimeChars.shift());
				}				
				if (options.showSecond && seconds[1]!=secondsCurrent[1]) {
					this.flip(seconds[1], secondsUpBack[1], secondsDownBack[1], secondsUp[1], secondsDown[1]);
					secondsCurrent[1] = seconds[1];					
					if((!options.past && secondsCurrent[1]==9) || (options.past && secondsCurrent[1]==0) || !flip_once) {
						this.flip(seconds[0], secondsUpBack[0], secondsDownBack[0], secondsUp[0], secondsDown[0]);
					}					
					secondsCurrent[0] = seconds[0];
					flip_once = true;					
				}
			};
			
			//Text format
			this.textFormat = function(text, length, fillChar) {
				text = text.toString();
				while (text.length<length) {
					text = fillChar+text;
				}
				if(text.length>length) {
					text = text.substr(text.length-length,length);
				}
				return text;
			};

			//Time format
			this.timeFormat = function(msec) {
				var time = Math.floor(msec/1000);
				var s = time%60;
				var i = Math.floor(time%(60*60)/60);
				var h = Math.floor(time%(24*60*60)/(60*60));
				var d = Math.floor(time/(24*60*60));
				return this.textFormat(d, dayTextNumber, "0")+this.textFormat(h, hourTextNumber, "0")+this.textFormat(i, minuteTextNumber, "0")+this.textFormat(s, secondTextNumber, "0");
			};
			
			//Flip effect
			this.flip = function(changeNumber, upBack, downBack, up, down) {
				src = $(up).attr("src");
				ind = src.lastIndexOf("\/");
				path = src.substr(0, ind+1);				
				$(up)
					.attr("src", $(upBack).attr("src"))
					.height(bgH)
					.css({"visibility": "visible"});
				$(upBack).attr("src", path+changeNumber+"u.png");
				$(down)
					.attr("src", path+changeNumber+"n.png")
					.height("0px")
					.css({"visibility": "visible"});
				$(up).animate({"height":0}, {"duration":190, defaultEasing:'easeinout', 'complete':
					function() {
						$(down).animate({"height":bgH}, {"duration":190, defaultEasing:"easeinout", "complete":
							function() {
								$(downBack).attr("src", $(down).attr("src"));
								$(up).height("0px").css({"visibility": "hidden"});
								$(down).height("0px").css({"visibility": "hidden"});
							}
						})
					}
				});
			};
			
			//On finish event handler
			this.onFinish = function() {};
		}
	};		
})(jQuery);
