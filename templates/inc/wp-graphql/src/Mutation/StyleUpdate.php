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
 * Class StyleUpdate
 *
 * @package WPGraphQL\Type\Style\Mutation
 */
class StyleUpdate {

	/**
	 * Holds the mutation field definition
	 *
	 * @var array $mutation
	 */
	private static $mutation = [];

	/**
	 * Defines the update mutation for Style
	 *
	 * @return array|mixed
	 */
	public static function mutate() {
		if ( empty( self::$mutation ) ) {
      $mutation_name  = 'UpdateStyle';
			self::$mutation = Relay::mutationWithClientMutationId( [
        'name'                => $mutation_name,
				'description'         => __( 'Update theme styles', 'wp-graphql' ),
				'inputFields'         => WPInputObjectType::prepare_fields( self::input_fields(), $mutation_name ),
				'outputFields'        => [
					'style' => [
						'type'    => Types::list_of( Types::style() ),
						'resolve' => function ( $payload ) {
              
						},
					],
        ],
        'mutateAndGetPayload' => function ( $input, AppContext $context, ResolveInfo $info ) {

        },
      ] );
    }
    
    return ( ! empty( self::$mutation ) ) ? self::$mutation : null;
  }

  /**
	 * @return array
	 */
  private static function input_fields() {
    return array_merge(
      StyleMutation::input_fields(),
      [
        'catalog' => [
          'type'        => Types::string(),
          'description' => __( 'String representation of style settings' ),
        ]
      ]
    );
  }
}