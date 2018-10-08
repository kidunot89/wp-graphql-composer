import { find, get } from 'lodash';

const monthNames = [
  '', 'January', 'February', 'March', 
  'April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November',
  'December'
]

const thisYear = new Date().getFullYear();

const getAuthorName = (userId, results) =>
{
  const post = find(results, ({ author }) => author.userId === userId);
  return post.author.nicename;
}

function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Return archive header based on query variables
 * @param {object} where  
 * @param {number} resultCount 
 */
const getHeader = ({ category, tag, month, year, author, search }, results) => {
  switch(true) {
    case results.length === 0:
      return 'No posts found';

    case !!category:
      return `Posts categorized in ${category}`;
    
    case !!tag:
      return `Posts tagged in ${jsUcfirst(tag)}`;

    case !!year && !!month:
      return `Posts made ${monthNames[month]} ${year}`;

    case !!year:
      return (thisYear === year) ? 
        'Posts made this year' : 
        (thisYear - 1 === year) ? 
          'Posts made last year' :
          `Posts made in ${year}`;

    case !!author:
      return `Posts made by ${getAuthorName(author, results)}`;

    case !!search:
      return `Searching ${search}`;

    default:
      return 'Recent Posts';
  }
}

export const archiveMapper = ({ data, ...rest }) => {
  const resultsData = get(data, 'posts.nodes');
  const header = getHeader(data.variables, resultsData);  

  return { header, resultsData, ...rest };
}