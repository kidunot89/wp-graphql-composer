<?php
namespace WPGraphQL\Type;

use WPGraphQL\Data\ExtraSource;

$locations = ExtraSource::get_registered_nav_menu_locations();
$fields = [];
if ( ! empty( $locations ) ) {
  foreach( $locations as $location ) {
    $fields[ $location ] = [
      'type' => 'Int',
      'description' => __( 'The WP ID of the nav menu to be assigned to %s', 'wp-graphql', $location ),
    ];
  }
}

register_graphql_input_type( 'NavMenuLocationsInput', [
  'description' => __( 'Nav menu location values' ),
  'fields' => $fields,
] );