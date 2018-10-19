<?php
  /*
    Plugin Name: WPGraphQL-Composer Plugin
    Version: 0.0.1
    Description: Patches 
    Author: Geoff Taylor
    Author URI: https://axistaylor.com
    Plugin URI: https://axistaylor.com
    Text Domain: wp-graphql-composer
  */
  namespace WPGraphQL\Composer;

  class WPGraphQLComposer {

    private static $route = 'composer';
    public static $plugin_name = "wp-graphql-composer";
    private static $plugin_version = '0.0.1';

    /**
     * WPGraphQL Composer constructor
     */
    public function __construct() {
      self::$route = apply_filters( self::$plugin_name.'_route', 'composer' );

      $this->constants();
      register_activation_hook( __FILE__, array( &$this, 'activate' ) );
      register_deactivation_hook( __FILE__, array( &$this, 'deactivate' ) );
      $this->actions_and_filters();
    }

    /**
     * WPGraphQL Composer constants
     */
    private function constants() {
      if( ! defined( strtoupper( self::$plugin_name ) . '_VERSION' ) ) {
        define( strtoupper( self::$plugin_name ) . '_VERSION', self::$plugin_version );
      }
      if( ! defined( strtoupper( self::$plugin_name ) . '_PATH' ) ) {
        define( strtoupper( self::$plugin_name ) . '_PATH', plugin_dir_path(__FILE__) );
      }
    }


    /**
     * Stuff to do when this plugin is activated
     */
    public function activate() {
      flush_rewrite_rules();
			update_option( self::$plugin_name . '_version', self::$plugin_version, 'no' );
    }

    /**
     * Stuff to do when this plugin is deactivated (cleanup and leave it as you found it)
     */
    public function deactivate() {
      flush_rewrite_rules();
			delete_option( self::$plugin_name . '_version' );
    }

    /**
     * Adds actions and filters in one place
     */
    private function actions_and_filters() {
      // Hooks for setting up plugin
      add_action( 'plugins_loaded', array( &$this, 'check_dependencies' ), 11 );
      add_action( 'init', array( &$this, 'add_rewrite_rule' ), 10 );
      add_filter( 'query_vars', array( &$this, 'add_query_vars' ), 10, 1);
      add_action( 'parse_request', array( &$this, 'parse_request' ) );
      add_action( 'graphql_register_types', array( &$this, 'patch_schema' ) );
      add_filter( 'graphql_jwt_auth_secret_key', array( &$this, 'jwt_auth' ) );

      // Register extra hooks go here
      add_action( 'after_setup_theme', array( &$this, 'demo_setup') );
      add_action( 'widgets_init', array( &$this, 'widgets_init' ) );
    }

    /**
     * Checks for installation WPGraphQL-related plug-ins
     */
    public function check_dependencies() {
      $error = null;

      if (! defined( 'WPGRAPHQL_VERSION' ) ) {
        $error = new \WP_Error(
          'missing_dependency',
          sprintf(
            __( "WPGraphQL must be installed and activated to use the %s plugin", self::$plugin_name ),
            self::$plugin_name
          )
        );
      }

      if (! defined( 'WPGRAPHQL_JWT_AUTHENTICATION_VERSION' ) ) {
        $error = new \WP_Error(
          'missing_dependency',
          sprintf(
            __( "WPGraphQL-JWT-Authenication must be installed and activated to use the %s plugin", self::$plugin_name ),
            self::$plugin_name
          )
        );
      }

      if ( is_wp_error( $error ) ) {
        echo $error->get_error_message();
      }
    }

    /**
     * Adds rewrite rule for app starting point
     */
    public function add_rewrite_rule() {
      add_rewrite_rule(
        self::$route,
        'index.php?' . self::$route . '=true',
        'top'
      );
    }

    /**
     * Adds query vars for app starting point request
     */
    public function add_query_vars( $query_vars ) {
      $query_vars[] = self::$route;
		  return $query_vars;
    }

    /**
     * Redirect to app starting point
     */
    public function parse_request( $request ) {
      
      // if the rule was matched, the query var will be set
      if( isset( $request->query_vars[self::$route] ) ){

        $assets = json_decode( file_get_contents( plugin_dir_path(__FILE__) . '/asset-manifest.json' ), true );
			
			  $css_url = plugin_dir_url(__FILE__) .  substr( $assets['main.css'], 1 );
			  $script_url = plugin_dir_url(__FILE__) . substr( $assets['main.js'], 1 );
        include plugin_dir_path(__FILE__) . '/index.php';
        exit;
      }
      return $request;
    }

    /**
     * Loads WPGraphQL customizations
     */
    public function patch_schema()  {
      require_once plugin_dir_path(__FILE__) . 'inc/wp-graphql/wp-graphql.php';
    }

    /**
     * Set WPGraphQL-JWT-Authenication salt here
     * @return string
     */
    public function jwt_auth() {
      return '';
    }

    // Extra Hooks go here
    public function demo_setup() {
      /*
      * Make theme available for translation.
      * Translations can be filed in the /languages/ directory.
      */
      load_theme_textdomain( self::$plugin_name, get_template_directory() . '/languages' );

      // Add default posts and comments RSS feed links to head.
      add_theme_support( 'automatic-feed-links' );

      /*
      * Let WordPress manage the document title.
      * By adding theme support, we declare that this theme does not use a
      * hard-coded <title> tag in the document head, and expect WordPress to
      * provide it for us.
      */
      add_theme_support( 'title-tag' );

      /*
      * Enable support for Post Thumbnails on posts and pages.
      *
      * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
      */
      add_theme_support( 'post-thumbnails' );

      /**
       * Add support for core custom logo.
       *
       * @link https://codex.wordpress.org/Theme_Logo
       */
      add_theme_support( 'custom-logo' );

      /**
       * Add support for Gutenburg Styling
       */
      add_theme_support( 'align-wide' );

      /**
       * Register Menu
       */
      register_nav_menus(
        array(
          'demo_main'     => __( 'Main Menu' ),
          'demo_links'    => __( 'Related-Links' ),
          'demo_menu_one' => __('Demo Menu One'),
          'demo_menu_two' => __('Demo Menu Two'),
        )
      );

		 	// Adding support for core block visual styles.
			add_theme_support( 'wp-block-styles' );

			// Add support for full and wide align images.
			add_theme_support( 'align-wide' );
			
			// Add support for custom color scheme.
			add_theme_support( 'editor-color-palette', array(
				array(
					'name'  => __( 'Strong Blue', 'gutenbergtheme' ),
					'slug'  => 'strong-blue',
					'color' => '#0073aa',
				),
				array(
					'name'  => __( 'Lighter Blue', 'gutenbergtheme' ),
					'slug'  => 'lighter-blue',
					'color' => '#229fd8',
				),
				array(
					'name'  => __( 'Very Light Gray', 'gutenbergtheme' ),
					'slug'  => 'very-light-gray',
					'color' => '#eee',
				),
				array(
					'name'  => __( 'Very Dark Gray', 'gutenbergtheme' ),
					'slug'  => 'very-dark-gray',
					'color' => '#444',
				),
			) );

      $GLOBALS['content_width'] = apply_filters( 'gutenbergtheme_content_width', 640 );

    }

    public function widgets_init() {
      register_sidebar(
        array(
          'name'          => __( 'Demo Widgets', self::$plugin_name ),
          'id'            => 'demo-widgets',
          'description'   => __( 'Add widgets here to appear in your sidebar.', self::$plugin_name ),
        )
      );
    }

    /**
     * Register Google Fonts
     */
    private function gutenbergtheme_fonts_url() {
      $fonts_url = '';

      /*
      *Translators: If there are characters in your language that are not
      * supported by Noto Serif, translate this to 'off'. Do not translate
      * into your own language.
      */
      $notoserif = esc_html_x( 'on', 'Noto Serif font: on or off', 'gutenbergtheme' );
      if ( 'off' !== $notoserif ) {

        $font_families = array();
        $font_families[] = 'Noto Serif:400,400italic,700,700italic';

        $query_args = array(
          'family' => urlencode( implode( '|', $font_families ) ),
          'subset' => urlencode( 'latin,latin-ext' ),
        );

        $fonts_url = add_query_arg( $query_args, 'https://fonts.googleapis.com/css' );
      }

      return $fonts_url;
    }

    /**
     * Queues up theme JS and CSS files to be loaded.
     */
    public function enqueue_scripts() {
      wp_enqueue_style( 'theme-docs', get_stylesheet_uri() );
      
      if( file_exists( gutenbergtheme_fonts_url() ) ) {
        wp_enqueue_style( 'gutenbergtheme-fonts', gutenbergtheme_fonts_url() );
      }

      if( file_exists( plugin_dir_path(__FILE__) . '/asset-manifest.json' ) ) {
        $assets = json_decode( file_get_contents( plugin_dir_path(__FILE__) . '/asset-manifest.json' ), true );
        
        wp_enqueue_style( 'composer-style', plugin_dir_url(__FILE__) . substr( $assets['main.css'], 1 ) );
        wp_enqueue_script( 'composer-react-script', plugin_dir_url(__FILE__) . substr( $assets['main.js'], 1 ), array(), self::$plugin_version, true );
      } else {
        wp_enqueue_style( 'gutenbergtheme-style', plugin_dir_url(__FILE__) . 'no-js/main.css' );
        wp_enqueue_style( 'gutenbergthemeblocks-style', plugin_dir_url(__FILE__) . 'no-js/blocks.css' );
      }
    }

  }

  new WPGraphQLComposer();
?>