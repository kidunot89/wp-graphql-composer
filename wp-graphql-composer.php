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
      add_action( 'init', array( &$this, 'init' ) );
      add_action( 'admin_init', array( &$this, 'admin_init' ) );

      // Add GraphQL Secret
      add_filter( 'graphql_jwt_auth_secret_key', function() {
        return '2Q|-Sr}}O,2_DpnW?sw4w3)UMMK g8!:)l9F$K&vbAEO{INY&K@<zW8_ (+rLk.@';
      });
    }

    /**
     * Run this on every page load
     */
    public function init() {
      add_rewrite_rule(
        'composer/?$',
        'index.php?composer=true',
        'top'
      );
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