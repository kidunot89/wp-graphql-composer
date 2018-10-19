<?php

namespace WPGraphQL\Type\Style\Mutation;

use GraphQL\Error\UserError;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQLRelay\Relay;
use TwentyFifteen\Stylist;
use WPGraphQL\AppContext;
use WPGraphQL\Data\DataSource;
use WPGraphQL\Type\WPInputObjectType;
use WPGraphQL\Types;

/**
 * Class StyleSelect
 *
 * @package WPGraphQL\Type\Style\Mutation
 */
class StyleSelect {

	/**
	 * Holds the mutation field definition
	 *
	 * @var array $mutation
	 */
	private static $mutation = [];

	/**
	 * Defines the select mutation for Style
	 *
	 * @return array|mixed
	 */
	public static function mutate() {
		if ( empty( self::$mutation ) ) {
      $mutation_name  = 'SelectStyle';
			self::$mutation = Relay::mutationWithClientMutationId( [
        'name'                => $mutation_name,
				'description'         => __( 'Select theme styles', THEME_NAME ),
				'inputFields'         => WPInputObjectType::prepare_fields( StyleMutation::input_fields(), $mutation_name ),
				'outputFields'        => [
					'style' => [
						'type'    => Types::list_of( Types::style() ),
						'resolve' => function ( $payload ) {
              return Stylist::style();
						},
					],
        ],
        'mutateAndGetPayload' => function ( $input, AppContext $context, ResolveInfo $info ) {
          if ( ! empty( $input['name'] ) ) {

            $styles = get_theme_mod('theme-styles');
            // Confirm styles
            if ( false === $style ) {
              throw new UserError( __( 'No styles found', THEME_NAME ) );
            }

            // Throw if style doesn't exist
            if ( ! array_key_exists( $input['name'], $styles ) ) {
              throw new UserError( __( '%s style not found', THEME_NAME, $input['name'] ) );
            }

            // Set selected style
            set_theme_mod( 'current-theme-style', $styles[ $input['name'] ] );
            
            return [
              'namespace' => $styles[ $input['name'] ]
            ];
          }
        },
      ] );
    }
    
    return ( ! empty( self::$mutation ) ) ? self::$mutation : null;
  }
}