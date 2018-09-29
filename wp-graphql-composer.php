<?php
  /*
    Plugin Name: WPGraphQL-Composer Demo
    Version: 0.0.1
    Description: Stages WPGraphQL-Composer Demo at "/composer"
    Author: Geoff Taylor
    Author URI: https://axistaylor.com
    Plugin URI: https://axistaylor.com
    Text Domain: wp-graphql-composer
  */

  new WPGraphQLComposerDemo();
  class WPGraphQLComposerDemo {

    public function __construct() {
      $this->constants();

      register_activation_hook( __FILE__, array( &$this, 'activate' ) );
      register_deactivation_hook( __FILE__, array( &$this, 'deactivate' ) );
      $this->actions_and_filters();
    }

    private function constants() {
      if( ! defined('WPGC_VERSION') ) {
        define('WPGC_VERSION', '0.0.1');
      }

      if( ! defined('WPGC_PATH') ) {
        define( 'WPGC_PATH', plugin_dir_path(__FILE__) );
      }
    }

    /**
     * Adds actions and filters in one place
     */
    private function actions_and_filters() {
      add_action( 'init', array( &$this, 'composer_init' ) );
      add_action( 'admin_init', array( &$this, 'admin_init' ) );
      add_action( 'parse_request', array( &$this, 'load_demo') );

      // Add GraphQL Secret
      add_filter( 'graphql_jwt_auth_secret_key', function() {
        return '2Q|-Sr}}O,2_DpnW?sw4w3)UMMK g8!:)l9F$K&vbAEO{INY&K@<zW8_ (+rLk.@';
      });
    }

    /**
     * Run this on every page load
     */
    public function composer_init() {
      $route = apply_filters('wp-graphql-composer-route', 'composer');
      add_rewrite_tag( '%'.$route.'%', '[^/]' );
      add_rewrite_rule('^'.$route.'/?$', 'index.php?'.$route.'=true', 'top');
    }

    public function load_demo() {
      /**
       * Access the $wp_query object
       */
      global $wp_query;
    
      $route = apply_filters('wp-graphql-composer-route', 'composer');
      /**
       * Ensure we're on the registered route for graphql route
       */
      if ( empty( $GLOBALS['wp']->query_vars ) || ! is_array( $GLOBALS['wp']->query_vars ) || ! array_key_exists( $route, $GLOBALS['wp']->query_vars ) ) {
        return;
      }
      /**
       * Set is_home to false
       */
      $wp_query->is_home = false;

      /**
       * Whether it's a GraphQL HTTP Request
       *
       * @since 0.0.5
       */
      if ( ! defined( 'WPGC_REQUEST' ) ) {
        define( 'WPGC_REQUEST', true );
      }
      $assets = json_decode( file_get_contents( plugin_dir_path(__FILE__) . '/demo/asset-manifest.json' ), true );

      $endpoint = apply_filters( 'graphql_endpoint', 'graphql' );
      $public_path = plugin_dir_url(__FILE__) . 'demo/';
      $css_path = $public_path .$assets['main.css'];
      $js_path = $public_path .$assets['main.js'];

      require_once plugin_dir_path(__FILE__) . 'demo/index.php';

      if ( wp_doing_ajax() ) {
       	wp_die( '', '', array(
          'response' => null,
        ) );
      } else {
        die;
      }
      
      return;
    }

    /**
     * do stuff when the admin interface is loaded…
     */
    public function admin_init() {

    }

    /**
     * Stuff to do when this plugin is activated
     */
    public function activate() {
      $this->composer_init();
      flush_rewrite_rules();
			update_option( 'wpgc_version', WPGC_VERSION, 'no' );
    }

    /**
     * Stuff to do when this plugin is deactivated (cleanup and leave it as you found it)
     */
    public function deactivate() {
      flush_rewrite_rules();
			delete_option( 'wpgc_version' );
    }
  }
?>