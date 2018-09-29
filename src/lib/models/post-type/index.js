/**
 * Default Post-type Template Exporter
 */
export { default as Attachment, attachment, ATTACHMENT_QUERY } from './attachment';
export { default as Page, page, PAGE_QUERY } from './page';
export { default as Post, post, POST_QUERY } from './post';
export { default as author } from './parts/author';
export * from './parts/comments';