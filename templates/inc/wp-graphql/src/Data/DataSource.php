<?php

  namespace WPGraphQL\Data;

  use GraphQL\Error\UserError;
  use GraphQLRelay\Relay;

  /*
    Class ExtraSource
    Meant to serve an a extension of WPGraphQL\Data\DataSource

    @package twentyfifteen
  */
  class ExtraSource {
    /**
     * Retrieves and formats theme modification data
     *
     * @param array|null $theme_mods - array of raw theme modification data
     * @return array|null
     */
    public static function resolve_theme_mods_data() {
      /**
       * Output array
       */
      $theme_mod_data = [];

      /**
       * Loop through raw active theme mods array and format theme mod data
       */

      $theme_mods = get_theme_mods();
      foreach( $theme_mods as $mod_name => $mod_data ){
        if( gettype($mod_name) === 'integer' ) continue;
        switch( $mod_name ) {

          /**
           * Custom CSS Post Id
           */
          case 'custom_css_post_id':
            $theme_mod_data[ $mod_name ] = absint($mod_data);
            break;
          
          /**
           * Background
           */
          case 'background_preset':
          case 'background_size':
          case 'background_repeat':
          case 'background_attachment':
            $key = str_replace('background_', '', $mod_name );
            $theme_mod_data[ 'background' ][ $key ] = $mod_data;
            break;
          case 'background_image':
            $theme_mod_data[ 'background' ]['id'] = attachment_url_to_postid( (string) $mod_data );
            break;
          case 'background_color':
            $theme_mod_data[ $mod_name ] =  (string) $mod_data;
            break;
          /**
           * Custom Logo
           */
          case 'custom_logo':
            $theme_mod_data[ $mod_name ] = absint( $mod_data );
            break;
          /**
           * Header Image
           */
          case 'header_image_data':
            $theme_mod_data[ 'header_image' ] += get_object_vars( $mod_data );
            break;
          case 'header_image':
            $theme_mod_data[ 'header_image' ]['id'] = attachment_url_to_postid( (string) $mod_data );
            break;
          /**
           * Nav Menu Locations and Custom Mods
           */
          default:
            $theme_mod_data[ $mod_name ] = $mod_data;
        }

      }
      return $theme_mod_data;
    }

    /**
     * Returns an array of nav menu location names
     */
    public static function get_registered_nav_menu_locations() {
      global $_wp_registered_nav_menus;
      return array_keys( $_wp_registered_nav_menus );
    }

    /**
     * Returns an array of data about the sidebar you are requesting
     *
     * @param string $name Name of the sidebar you want info for
     *
     * @return null|array
     * @throws \Exception
     * @since  0.0.31
     * @access public
     */
    public static function resolve_sidebar( $sidebar_id, $index = null ) {
      global $wp_registered_sidebars;

      if ( empty( $wp_registered_sidebars ) ) {
        throw new UserError( sprintf( __( 'No sidebars are registered', 'wp-graphql' ), $index ) );
      }

      /**
       * Get registered sidebar data
       */
      $sidebar = null;
      if ( ! is_null( $index ) ) {

        foreach( $wp_registered_sidebars as $registered_sidebar ) {
          if( $registered_sidebar[ $index ] === $sidebar_id ) {
            $sidebar = $registered_sidebar;
            break;
          }
        }
        if( ! $sidebar ) {
          throw new UserError( sprintf( __( 'No sidebar was found with that %s', 'wp-graphql' ), $index ) );
        }

      } else {
        
        /**
         * Throw if requested sidebar not found
         */
        if( ! array_key_exists( $sidebar_id, $wp_registered_sidebars ) ) {
          throw new UserError( sprintf( __( 'No sidebar was found with that sidebar_id', 'wp-graphql' ) ) );
        }
        $sidebar = $wp_registered_sidebars[ $sidebar_id ];

      }
      
      /**
       * for nodeDefinitions
       */
      $sidebar[ 'is_sidebar' ] = true;

      /**
       * Return requested sidebar array
       */
      return $sidebar;

    }

    /**
     * Wrapper for SidebarConnectionResolver::resolve
     *
     * @param array    		$source  sidebar object
     * @param array       $args    Array of arguments to pass to reolve method
     * @param AppContext  $context AppContext object passed down
     * @param ResolveInfo $info    The ResolveInfo object
     *
     * @return array
     * @since  0.0.31
     * @access public
     */
    public static function resolve_sidebars_connection( $source, array $args, $context, $info ) {
      return SidebarConnectionResolver::resolve( $source, $args, $context, $info );
    }

    /**
     * Returns an array of data about the widget you are requesting
     *
     * @param string $name Name of the sidebar you want info for
     *
     * @return null|array
     * @throws \Exception
     * @since  0.0.31
     * @access public
     */
    public static function resolve_widget( $widget_id, $index = null ) {
      global $wp_registered_widgets;

      $id = null;
      if ( ! is_null( $index ) ) {

        /**
         * Loop through registered widget and compare index value
         */
        foreach( $wp_registered_widgets as $key => $registered_widget ) {
          if( $registered_widget[ $index ] === $widget_id ) {
            $id = $key;
            break;
          }
        }

        /**
         * Throw if requested widget not found
         */
        if( ! $id ) {
          throw new UserError( sprintf( __( 'No widget was found with that %s' ), $index ) );
        }

      } else {
        /**
         * Throw if requested widget not found
         */
        if( ! array_key_exists( $widget_id, $wp_registered_widgets ) ) {
          throw new UserError( sprintf( __( 'No widget was found with the that ID' ) ) );
        }

        $id = $widget_id;

      }

      /**
       * Return requested widget data object
       */
      return self::create_widget_data_object( $wp_registered_widgets[ $id ] );
    }

    /**
     * Wrapper for WidgetConnectionResolver::resolve
     *
     * @param array    		$source  sidebar object
     * @param array       $args    Array of arguments to pass to reolve method
     * @param AppContext  $context AppContext object passed down
     * @param ResolveInfo $info    The ResolveInfo object
     *
     * @return array
     * @since  0.0.31
     * @access public
     */
    public static function resolve_widgets_connection( $source, array $args, $context, $info ) {
      return WidgetConnectionResolver::resolve( $source, $args, $context, $info );
    }

    /**
     * Create widget data 
     *
     * @since 0.0.31
     * @param array $widget
     * @return array
     */
    public static function create_widget_data_object( $widget ) {
      $widget_data = [
        'id' => $widget['id'],
        'name' => $widget['name'],
        'widget_description' => ( ! empty( $widget['description'] ) ) ? $widget['description'] : '',
        'type' => $widget['callback'][0]->id_base,
        'is_widget' => true,
      ];

      /**
       * The name of the option in the database is the name of the widget class.
       */
      $option_name = $widget['callback'][0]->option_name;

      /**
       * Widget data is stored as an associative array. To get the right data we need to get the right key
       * which is stored in $wp_registered_widgets
       */
      $key = $widget['params'][0]['number'];
      
      /**
       * Retrieve widget data if exist
       */
      if( $key > -1 ) {
        $widget_data += get_option( $option_name )[ $key ];
      }

      return $widget_data;
    }
  
    /**
     * Return an array of data for all active widget types
     *
     * @return array
     */
    public static function get_active_widget_types() {
      global $wp_registered_widgets;

      /**
       * Holds the query data to return
       */
      $types = [];

      /**
       * Loop through registered widgets
       */
      foreach( $wp_registered_widgets as $widget ) {
        $widget_data = self::create_widget_data_object( $widget );
        $type = $widget_data['type'];
        if( ! empty( $types[$type] ) ) continue;
        unset( $widget_data['id'] );
        unset( $widget_data['name'] );
        unset( $widget_data['type'] );
        unset( $widget_data['is_widget'] );
        
        $types[$type] = $widget_data;
      }

      return $types;
    }

    /**
     * Returns an array of archive urls base of type 
     *
     * @param string $type - grouping style
     * @param bool $full - returns full url if true
     * @return array
     */
    public static function resolve_archive_urls( $type = 'monthly', $full = false ) {

      /** 
       * Get raw archives output
       */
      $args = array(
        'type'            => $type,
        'limit'           => '',
        'format'          => 'option', 
        'before'          => '',
        'after'           => '',
        'show_post_count' => false,
        'echo'            => false,
        'order'           => 'DESC',
        'post_type'     	=> 'post'
      );
      $raw_html_output = wp_get_archives( $args );

      /**
       * Strip site url if $full === true
       */
      $homeUrl = ( false === $full ) ? preg_quote( home_url() . '/', '/' ) : '';

      preg_match_all("/<option value=(?:\"|\')(?:{$homeUrl})(.*)(?:\"|\')>.*<\/option>/", $raw_html_output, $urls);

      return $urls[1];
    }

    /**
     * Return array of term - Relay global ids 
     *
     * @param string $taxonomy
     * @param string $orderby
     * @return array
     */
    public static function resolve_tag_cloud( $taxonomy = 'post_tag', $orderby_name ) {
      $args = array(
        'orderby'                   => $orderby_name ? 'name' : 'count', 
        'order'                     => 'ASC',
        'taxonomy'                  => $taxonomy, 
        'echo'                      => false,
        'child_of'                  => null, // see Note!
      );

      $raw_html_output = wp_tag_cloud($args);

      $homeUrl = preg_quote( home_url() . '/tag/', '/' );

      preg_match_all("/tag-link-([0-9]+) /", $raw_html_output, $ids);

      $term_ids = [];
      foreach( $ids[1] as $id ) {
        $term_ids[] = (int) $id;
      }
      
      return $term_ids;
    }

    /**
     * Registers sidebar and widget node
     *
     * @param null $node - null for returning node
     * @param string $id - The id of the node, from the global ID
     * @param string $type - The type of node to resolve, from the global ID
     * @return array|null
     */
    public static function resolve_node( $node, $id, $type ) {
      switch($type) {
        case 'sidebar':
          $node = self::resolve_sidebar( $id );
          break;
  
        case 'widget':
          $node = self::resolve_widget( $id );
          break;
      }
  
      return $node;
    }

    /**
     * Registers sidebar and widget node types
     *
     * @param mixed|object|array $type The type definition the node should resolve to.
     * @param mixed|object|array $node The $node that is being resolved
     * @return array|null
     */
    function resolve_node_type( $type, $node ) {
      if ( is_array( $node ) ) {

        switch ( $node ) {
          case array_key_exists( 'is_sidebar', $node ):
            return 'Sidebar';
            break;
          case array_key_exists( 'is_widget', $node ):
            return 'Widget';
            break;
          default:
            return $type;
        }

      }

      return $type;
    }

  }
  add_filter( 'graphql_resolve_node', 'ExtraSource::resolve_node', 10, 3 );
  add_filter( 'graphql_resolve_node_type', 'ExtraSource::resolve_node_type', 10, 2 );