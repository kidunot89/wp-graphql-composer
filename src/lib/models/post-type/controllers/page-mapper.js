/**
 * Page props mapper
 */
export default ({ data: { page, pageBy }, ...rest }) => ({ ...page, ...pageBy, ...rest });