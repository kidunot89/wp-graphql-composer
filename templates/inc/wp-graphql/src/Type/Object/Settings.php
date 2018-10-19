<?php
	use GraphQLRelay\Relay;
  use \WPGraphQL\Data\DataSource;

  $fields = [
    /** 
     * Defines the page_on_front setting
     */
    'pageOnFront' => [
      'type' => 'ID',
      'description' => __( 'The page that should be displayed on the front page' ),
      'resolve' => function() {
        $id = get_option( 'page_on_front', null );

        return ! empty( $id ) ? Relay::toGlobalId( 'page', $id ) : null;
      },
    ],

    /** 
     * Defines the page_for_posts setting
     */
    'pageForPosts' => [
      'type' => 'String',
      'description' => __( 'The page that displays posts' ),
      'resolve' => function() {
        $id = get_option( 'page_for_posts' );

        return ! empty( $id ) ? DataSource::resolve_post_object( $id, 'page' )->post_name : null;
      },
    ],

    /** 
     * Defines the show_avatar setting
     */
    'showAvatars' => [
      'type' => 'Boolean',
      'description' => __( 'Avatar Display' ),
      'resolve' => function() {
        return get_option( 'show_avatars', false );
      },
    ],

    /** 
     * Defines the users_can_register setting
     */
    'usersCanRegister' => [
      'type' => 'Boolean',
      'description' => __( 'Anyone can register' ),
      'resolve' => function() {
        return get_option( 'users_can_register', false );
      },
    ],

    /** 
     * Defines the permalink_structure setting
     */
    'permalinkStructure' => [
      'type' => 'String',
      'description' => __( 'The structure of the blog\'s permalinks.' ),
      'resolve' => function() {
        return get_option( 'permalink_structure' );
      },
    ],

    /** 
     * Defines the home_url setting
     */
    'homeUrl' => [
      'type' => 'String',
      'description' => __( 'The url to current site. Use this if site is a multisite' ),
      'resolve' => function() {
        return home_url();
      },
    ],
  ];

  register_graphql_fields( 'Settings', $fields );