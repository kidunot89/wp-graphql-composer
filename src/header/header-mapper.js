// header-mapper.js
/**
 * External dependencies
 */
import { get } from 'lodash';

/**
 * Header component mapper function
 * 
 * @param {object} props
 * 
 * @returns {object}
 */
export const headerMapper = ({ data, ...rest }) => {
  const title = get(data, 'allSettings.generalSettingsTitle');
  const description = get(data, 'allSettings.generalSettingsDescription');
  const url = get(data, 'allSettings.homeUrl');
  const logo = get(data, 'themeMods.customLogo');
  
  return { title, url, description, logo, ...rest };
}