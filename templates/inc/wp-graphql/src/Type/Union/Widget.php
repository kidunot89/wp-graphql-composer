<?php
namespace WPGraphQL\Type;

use WPGraphQL\TypeRegistry;

$types = [
  '_base'           => TypeRegistry::get_type( 'BaseWidget' ),
  'archives'        => TypeRegistry::get_type( 'ArchivesWidget' ),
  'media_audio'     => TypeRegistry::get_type( 'AudioWidget' ),
  'calendar'        => TypeRegistry::get_type( 'CalendarWidget' ),
  'categories'      => TypeRegistry::get_type( 'CategoriesWidget' ),
  'custom_html'     => TypeRegistry::get_type( 'CustomHTMLWidget' ),
  'media_gallery'   => TypeRegistry::get_type( 'GalleryWidget' ),
  'media_image'     => TypeRegistry::get_type( 'ImageWidget' ),
  'meta'            => TypeRegistry::get_type( 'MetaWidget' ),
  'nav_menu'        => TypeRegistry::get_type( 'NavMenuWidget' ),
  'pages'           => TypeRegistry::get_type( 'PagesWidget' ),
  'recent-comments' => TypeRegistry::get_type( 'RecentCommentsWidget' ),
  'recent-posts'    => TypeRegistry::get_type( 'RecentPostsWidget' ),
  'rss'             => TypeRegistry::get_type( 'RSSWidget' ),
  'search'          => TypeRegistry::get_type( 'SearchWidget' ),
  'tag_cloud'       => TypeRegistry::get_type( 'TagCloudWidget' ),
  'text'            => TypeRegistry::get_type( 'TextWidget' ),
  'media_video'     => TypeRegistry::get_type( 'VideoWidget' ),
];

$typeNames = [
  'ArchivesWidget', 'AudioWidget', 'CalendarWidget', 'CategoriesWidget',
  'CustomHTMLWidget', 'GalleryWidget', 'ImageWidget', 'MetaWidget',
  'NavMenuWidget', 'PagesWidget', 'RecentCommentsWidget', 'RecentPostsWidget',
  'RSSWidget', 'SearchWidget', 'TagCloudWidget', 'TextWidget',
  'VideoWidget',
];

register_graphql_union_type( 'WidgetUnion', [
	'typeNames'   => $typeNames,
	'resolveType' => function ( $source ) use ( $types ) {
    if( ! empty( $types[ $source['type'] ] ) ) {
      return $types[ $source['type'] ];
    } else {  
      $type = apply_filter( 'graphql_widget_union_types', $type['_base'] );
      return $type;
    }

	},
] );