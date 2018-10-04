/**
 * Functions for data mocking and local storage simulation
 */

import Casual from 'casual';

export const getHeaderResult = () => ({
  data: {
    allSettings: {
      generalSettingsTitle: Casual.title,
      generalSettingsDescription: Casual.description,
      homeUrl: Casual.url
    },
    themeMods: {
      customLogo: Casual.integer(100, 999)
    }
  }
});

export const getMainResult = () => {
  
}

export const getMenuResult = (variables = {}) => {
  
}

export const getMenusResult = (variables = {}) => {
  
}

export const getAttachmentResult = (variables = {}) => {
  
}

export const getAttachmentsResult = (variables = {}) => {
  
}

export const getPageResult = (variables = {}) => {
  
}

export const getPagesResult = (variables = {}) => {
  
}

export const getPostResult = (variables = {}) => {
  
}

export const getPostsResult = (variables = {}) => {
  
}

export const getLoginResult = (variables = {}) => {
  
}

export const getUserResult = (variables = {}) => {
  
}

export const getUsersResult = (variables = {}) => {
  
}
