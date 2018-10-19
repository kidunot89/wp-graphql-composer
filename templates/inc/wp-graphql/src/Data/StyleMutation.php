<?php

namespace WPGraphQL\Type\Style\Mutation;

use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQLRelay\Relay;
use WPGraphQL\AppContext;
use WPGraphQL\Data\DataSource;
use WPGraphQL\Type\WPInputObjectType;
use WPGraphQL\Type\ThemeMods\ThemeModsFields;
use WPGraphQL\Types;

/**
 * Class StyleMutation
 *
 * @package WPGraphQL\Type\Style\Mutation
 */
class StyleMutation {

	/**
	 * Holds the input_fields configuration
	 *
	 * @var array
	 */
  private static $input_fields = [];

  /**
	 * @return mixed|array|null $input_fields
	 */
	public static function input_fields() {
    if ( empty( self::$input_fields ) ) {
			$input_fields = [
        'name'  => [
					'type'        => Types::string(),
					'description' => __( 'Name of style', 'wp-graphql' ),
        ],
      ];

      /**
			 * Filters the mutation input fields for the object type
			 *
			 * @param array $input_fields The array of input fields
			 */
			self::$input_fields = apply_filters( 'graphql_style_input_fields', $input_fields );
    }
  }

}