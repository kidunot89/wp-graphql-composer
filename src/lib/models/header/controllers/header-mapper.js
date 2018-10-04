import { get } from 'lodash';

export default ({ data, ...rest }) => {
  const title = get(data, 'allSettings.generalSettingsTitle');
  const description = get(data, 'allSettings.generalSettingsDescription');
  const url = get(data, 'allSettings.homeUrl');
  const logo = get(data, 'themeMods.customLogo');
  
  return { title, url, description, logo, ...rest };
}