<?php 

/*
 Plugin Name: WP Time Counter
Plugin URI: http://club.wpeka.com/product/wp-time-counter/
Version: 1.1
Author: WPEka Club
Author URI: http://www.club.wpeka.com/
Description: WP Time Counter is a WordPress plugin that allows you to create easy and fast countdown/countup timers for your website.
*/


if(!defined('ABSPATH')) {exit;}

if(!class_exists('WP_Time_Counter')) :

class WP_Time_Counter {
	
	public static $_instance;
	
	private $TC_shortcode;
	public function __construct() {
		
		$this->define_constants();
		add_action('wp_enqueue_scripts' , array($this, 'TC_shortcode_scripts'),999);
		add_action('admin_enqueue_scripts' , array($this, 'load_admin_assets'),999);
		add_action('admin_head', array($this, 'TC_add_Tinymce_btn'));
		$this->TC_shortcode = new TC_Shortcode();
		
	}
	
	public static function instance() {
		if ( is_null( self::$_instance ) ) {
			self::$_instance = new self();
		}
		return self::$_instance;
	}
	
	public function load_admin_assets() {
		global $post;
		if( is_a( $post, 'WP_Post' )) {
			wp_register_style('TC_Counter_CSS_js_ui' , TC_PLUGIN_URL."/assets/jquery-date-time/jquery-ui.css");
			wp_register_style('TC_Counter_admin_CSS_js_ui' , TC_PLUGIN_URL."/assets/css/admin.css");
			wp_register_script( 'TC_Counter_Date_time' , TC_PLUGIN_URL.'/assets/jquery-date-time/jquery.datetimepicker.js');
			wp_register_style( 'TC_Counter_Date_time_css' , TC_PLUGIN_URL.'/assets/jquery-date-time/jquery.datetimepicker.css');
			wp_register_script( 'TC_Counter_admin_js', TC_PLUGIN_URL.'/assets/js/tinymce_btn.js');

			
			
			wp_enqueue_style('TC_Counter_CSS_js_ui');
			wp_enqueue_style('TC_Counter_admin_CSS_js_ui');
			wp_enqueue_script('TC_Counter_admin_js');
			wp_enqueue_script('TC_Counter_Date_time');
			wp_enqueue_style('TC_Counter_Date_time_css');
			

			
		}		
	}		
	public function define_constants() {
		$plugindir=explode('/', __DIR__);
		$plugindir=$plugindir[count($plugindir)-1];
		if(!defined('TC_PLUGIN_URL')) define('TC_PLUGIN_URL', WP_PLUGIN_URL.'/'.$plugindir);
		if(!defined('TC_PLUGIN_DIR')) define('TC_PLUGIN_DIR', $plugindir);
		if(!defined('WP_PLUGIN_URL_SLLSAFE')) define( 'WP_PLUGIN_URL_SLLSAFE', str_replace(array('http://', 'https://'),'//',TC_PLUGIN_URL) );
	}
	
	public function TC_add_Tinymce_btn(){
		global $typenow;
		// check user permissions
		if ( !current_user_can('edit_posts') && !current_user_can('edit_pages') ) {
			return;
		}
		// verify the post type
		if( ! in_array( $typenow, array( 'post', 'page' ) ) )
			return;
		// check if WYSIWYG is enabled
		if ( get_user_option('rich_editing') == 'true') {
			add_action('media_buttons_context',  'wpsc_post_editor_links');
			function wpsc_post_editor_links($context) {
			
				$context .= '<a href="#" class="button tc_icon" title="TimeCounter"><span class="wp-media-buttons-icon"></span>TimeCounter</a>';
			
				return $context;
				
		}
	}
	}	
	
	function TC_shortcode_scripts() {
		global $post;
		
		if( is_a( $post, 'WP_Post' ) && has_shortcode( $post->post_content, $this->TC_shortcode->shortcode) ) {
			wp_enqueue_script('jquery');
			wp_enqueue_script( 'TC_Counter_Js' , TC_PLUGIN_URL.'/assets/js/jquery.countdown-timer.js');
			wp_enqueue_style('TC_Counter_custom_Css', TC_PLUGIN_URL.'/assets/css/custom.css');
		}
	}
}

endif;


if(!class_exists('TC_Shortcode')) :


class TC_Shortcode {
	
	public $shortcode;
	
	public function __construct() {
		$this->shortcode = 'TimeCounter';
		add_shortcode($this->shortcode , array($this , 'TC_Handler_'.$this->shortcode));
	}
	
	public function TC_Handler_TimeCounter($atts) {
		$options = shortcode_atts(array(
						'date'	=> '2050/01/01 00:00:00',
						'timezone'	=>0,
						'past'	=> true,
						'showday'	=> true,
						'showhour'	=> true,
						'showminute'	=> true ,
						'showsecond'	=> true,
						'daytext'	=> 'Days',
						'hourtext'	=> 'Hours',
						'minutetext'	=> 'Minutes',
						'secondtext'	=> 'Seconds',
						'onfinish'	=>	'',
						'imagefolder'	=> 'default',
						'daytextnumber'	=> '2'
							), $atts);
		
		
		$options = array(
				'date'	=> $options['date'],
				'timeZone'	=>$options['timezone'],
				'past'	=> $options['past'],
				'showDay'	=> $options['showday'],
				'showHour'	=> $options['showhour'],
				'showMinute'	=> $options['showminute'] ,
				'showSecond'	=> $options['showsecond'],
				'dayText'	=> $options['daytext'],
				'hourText'	=> $options['hourtext'],
				'minuteText'	=> $options['minutetext'],
				'secondText'	=> $options['secondtext'],
				'onfinish'	=>	$options['onfinish'],
				'imageFolder'	=> TC_PLUGIN_URL.'/images/'.$options['imagefolder'].'/',
				'dayTextNumber'	=> $options['daytextnumber']
		);
		$options['past'] = ($options['past'] == 'true') ? true : false;
		$options['showDay'] = ($options['showDay'] == 'true') ? true : false;
		$options['showHour'] = ($options['showHour'] == 'true') ? true : false;
		$options['showMinute'] = ($options['showMinute'] == 'true') ? true : false;
		$options['showSecond'] = ($options['showSecond'] == 'true') ? true : false;
		
		$skin = basename($options['imageFolder']);
		if($skin == 'modern')
		{	
			
			
			wp_register_style('TC_Counter_modern_ui' , TC_PLUGIN_URL.'/modern.css');	//modern css
			
					
			
			wp_enqueue_style('TC_Counter_modern_ui');

			

			wp_register_script('tc_counter_main_js' , TC_PLUGIN_URL.'/assets/js/tc_counter.js');
		
			wp_localize_script( 'tc_counter_main_js', 'tc_options', $options );
		
			wp_enqueue_script('tc_counter_main_js');
			include_once("modern_view.php");
		}
		else
		{

			wp_register_script('tc_counter_main_js' , TC_PLUGIN_URL.'/assets/js/tc_counter.js');
		
			wp_localize_script( 'tc_counter_main_js', 'tc_options', $options );
		
			wp_enqueue_script('tc_counter_main_js');


		
			return '<div id="counter-box"><div class="countdown-timer"></div></div>';

		}
		
	}
	
}

endif;


$TC = WP_Time_Counter::instance();

function wp_time_counter_css() {
	wp_enqueue_style('wp_time_counter', plugins_url('/assets/css/style.css', __FILE__));
}
add_action('admin_enqueue_scripts', 'wp_time_counter_css');

define('WP_TIME_COUNTER_PLUGIN_DIR_PATH',plugin_dir_path(__FILE__) );
define('WP_TIME_COUNTER_PLUGIN_FILE_PATH',__FILE__);
?>
