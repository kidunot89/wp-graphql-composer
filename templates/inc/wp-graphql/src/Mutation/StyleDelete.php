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
 * Class StyleDelete
 *
 * @package WPGraphQL\Type\Style\Mutation
 */
class StyleDelete {

	/**
	 * Holds the mutation field definition
	 *
	 * @var array $mutation
	 */
	private static $mutation = [];

	/**
	 * Defines the delete mutation for Style
	 *
	 * @return array|mixed
	 */
	public static function mutate() {
		if ( empty( self::$mutation ) ) {
      $mutation_name  = 'DeleteStyle';
			self::$mutation = Relay::mutationWithClientMutationId( [
        'name'                => $mutation_name,
				'description'         => __( 'Delete theme styles', 'wp-graphql' ),
				'inputFields'         => WPInputObjectType::prepare_fields( StyleMutation::input_fields(), $mutation_name ),
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
}