import { get, map, find } from 'lodash';

const monthNames = [
  '', 'January', 'February', 'March', 
  'April', 'May', 'June', 'July', 
  'August', 'September', 'October', 'November',
  'December'
]

const thisYear = new Date().getFullYear();

const getTermName = (term_slug, results, taxonomy = 'tags') => {
  const allTerms = get(results, `[0].meta.${taxonomy}`);
  const term = find(allTerms, ({ slug }) => slug === term_slug);
  return term.name;
}

/**
 * Return archive header based on query variables
 * @param {object} where  
 * @param {number} resultCount 
 */
const getHeader = ({ category, tag, day, month, year, author, search }, results) => {
  switch(true) {
    case results.length === 0:
      return 'No posts found';

    case !!category:
      return `Posts categorized in ${getTermName(category, results, 'categories')}`;
    
    case !!tag:
      return `Posts tagged in ${getTermName(tag, results)}`;

    case !!year && !!month && !!day:
      return `Posts made ${monthNames[month]} ${day}, ${year}`;

    case !!year && !!month:
      return `Posts made ${monthNames[month]} ${year}`;

    case !!year:
      return (thisYear === year) ? 
        'Posts made this year' : 
        (thisYear - 1 === year) ? 
          'Posts made last year' :
          `Posts made in ${year}`;

    case !!author:
      return `Posts made by ${author}`;

    case !!search:
      return `Searching "${search}"`;

    default:
      return 'Recent Posts';
  }
}

export const archiveMapper = ({ data, first, ...rest }) => {
  const rawResults = get(data, 'posts.nodes');
  const resultsData = map(rawResults, ({ 
    author, categories, tags, date,
    modified, __typename, ...rest
  }) => 
  ({
    ...rest,
    meta: {
      author,
      categories: get(categories, 'nodes'),
      tags: get(tags, 'nodes'),
      date,
      modified,
    },
  })
  );
  const header = getHeader(data.variables, resultsData);  

  return { header, resultsData, ...rest };
}