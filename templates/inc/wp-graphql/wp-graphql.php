<?php
	/**
	 * loads custom types and fields added to the WPGraphQL schema
	 *
	 * @package wp-graphql-composer
	 */

	class WPGraphQLPatches {
		function __construct() {
			$this->load();
		}

		private function load() {
			// Resolvers
			require_once 'src/Data/SidebarConnectionResolver.php';
			require_once 'src/Data/WidgetConnectionResolver.php';

			// DataSource
			require_once 'src/Data/DataSource.php';

			// Mutation Resolvers
			// require_once 'src/Data/StyleMutation.php';
			require_once 'src/Data/ThemeModsMutation.php';

			// Enumeration Types
			require_once 'src/Type/Enum/ArchiveGroupEnum.php';
			require_once 'src/Type/Enum/ImageSizeEnum.php';
			require_once 'src/Type/Enum/LinkToEnum.php';
			require_once 'src/Type/Enum/PreloadEnum.php';
			require_once 'src/Type/Enum/SortByEnum.php';
			require_once 'src/Type/Enum/TagCloudEnum.php';

			// Input Types
			require_once 'src/Type/Input/CustomBackgroundInput.php';
			require_once 'src/Type/Input/CustomHeaderInput.php';
			require_once 'src/Type/Input/NavMenuLocationsInput.php';

			// Object Types
			require_once 'src/Type/Object/PostObject.php';
			require_once 'src/Type/Object/Settings.php';
			require_once 'src/Type/Object/Sidebar.php';
			require_once 'src/Type/Object/Style.php';
			require_once 'src/Type/Object/ThemeMods.php';
			require_once 'src/Type/Object/Widget.php';

			// Union Types
			require_once 'src/Type/Union/Widget.php';

			// Connections
			require_once 'src/Connection/Sidebars.php';
			require_once 'src/Connection/Widgets.php';

			//Mutations
			// require_once 'src/Mutation/StyleDelete.php';
			// require_once 'src/Mutation/StyleSelect.php';
			// require_once 'src/Mutation/StyleUpdate.php';
			require_once 'src/Mutation/ThemeModsUpdate.php';
		}
	}

	new WPGraphQLPatches();

	