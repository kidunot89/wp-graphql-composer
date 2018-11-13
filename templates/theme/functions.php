<?php
/**
 * WPGraphQL-Composer Theme functions and definitions
 * 
 * @link https://github.com/kidunot89/wpgraphql-theme/
 * 
 * @package  wp-graphql-composer
 */
namespace WPGraphQL\Composer;

class WPGraphQLComposer {

	public static $theme_name = "wp-graphql-composer";
	private static $theme_version = '0.0.1';

	/**
	 * WPGraphQL Composer constructor
	 */
	public function __construct() {
		$this->constants();
		$this->actions_and_filters();
	}

	/**
	 * WPGraphQL Composer constants
	 */
	private function constants() {
		if( ! defined( strtoupper( self::$theme_name ) . '_VERSION' ) ) {
			define( strtoupper( self::$theme_name ) . '_VERSION', self::$theme_version );
		}
		if( ! defined( strtoupper( self::$theme_name ) . '_PATH' ) ) {
			define( strtoupper( self::$theme_name ) . '_PATH', plugin_dir_path(__FILE__) );
		}
	}

	/**
	 * Adds actions and filters in one place
	 */
	private function actions_and_filters() {
		// Hooks for setting up plugin
		add_action( 'plugins_loaded', array( &$this, 'check_dependencies' ), 11 );
		add_action( 'graphql_register_types', array( &$this, 'patch_schema' ) );
		add_filter( 'graphql_jwt_auth_secret_key', array( &$this, 'jwt_auth' ) );

		// Register extra hooks go here
		add_action( 'after_setup_theme', array( &$this, 'theme_setup') );
		add_action( 'widgets_init', array( &$this, 'widgets_init' ) );
		add_action( 'wp_enqueue_scripts', array( &$this, 'enqueue_scripts' ) );
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
					__( "WPGraphQL must be installed and activated to use the %s theme", self::$theme_name ),
					self::$theme_name
				)
			);
		}

		if (! defined( 'WPGRAPHQL_JWT_AUTHENTICATION_VERSION' ) ) {
			$error = new \WP_Error(
				'missing_dependency',
				sprintf(
					__( "WPGraphQL-JWT-Authenication must be installed and activated to use the %s theme", self::$theme_name ),
					self::$theme_name
				)
			);
		}

		if ( is_wp_error( $error ) ) {
			echo $error->get_error_message();
		}
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

	/**
	 * Sets up supports and registers menus
	 */
	public function theme_setup() {
		/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		*/
		load_theme_textdomain( self::$theme_name, get_template_directory() . '/languages' );

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
				'primary'     => __( 'Main Menu' ),
				'social'    => __( 'Social Links' ),
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

	/**
	 * Register widget area.
	 */
	public function widgets_init() {
		register_sidebar(
			array(
				'name'          => __( 'Widgets Area', self::$theme_name ),
				'id'            => 'main-widgets',
				'description'   => __( 'Add widgets here to appear in your sidebar.', self::$theme_name ),
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
		
		if( file_exists( self::gutenbergtheme_fonts_url() ) ) {
			wp_enqueue_style( 'gutenbergtheme-fonts', self::gutenbergtheme_fonts_url() );
		}

		if( file_exists( get_template_directory() . '/asset-manifest.json' ) ) {
			$assets = json_decode( file_get_contents( get_template_directory() . '/asset-manifest.json' ), true );
			foreach( $assets as $key => $value ) {
				if ( preg_match( '/^.*chunk.css$/', $key ) ) {
					$chunk_css_url = $value;
				}
				if ( preg_match( '/^main.css$/', $key ) ) {
					$css_url = $value;
				}
				if ( preg_match( '/^runtime~main.js$/', $key ) ) {
					$runtime_url = $value;
				}
				if ( preg_match( '/^.*chunk.js$/', $key ) ) {
					$chunk_js_url = $value;
				}
				if ( preg_match( '/^main.js$/', $key ) ) {
					$main_js_url = $value;
				}
			}
			wp_enqueue_style( 'main-style', $chunk_css_url );
			wp_enqueue_style( 'docs-style', $css_url );
			wp_enqueue_script( 'runtime-main', $runtime_url, array(), self::$theme_version, true );
			wp_enqueue_script( 'vendor-script', $chunk_js_url, array(), self::$theme_version, true );
			wp_enqueue_script( 'main-script', $main_js_url, array(), self::$theme_version, true );
		} else {
			wp_enqueue_style( 'gutenbergtheme-style', get_template_directory_uri() . '/no-js/main.css' );
			wp_enqueue_style( 'gutenbergthemeblocks-style', get_template_directory_uri() . '/no-js/blocks.css' );
		}
	}

	public static function the_endpoint() {
		$endpoint = apply_filters('graphql_endpoint', 'graphql');
		echo $endpoint;
	}
	
}

new WPGraphQLComposer();