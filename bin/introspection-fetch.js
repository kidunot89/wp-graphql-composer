#!/usr/bin/env node
/**
 * Uses node-fetch to retrieves schema fragment data and it to a file for use
 */

'use strict';
const chalk = require( 'chalk' );
const fs = require( 'fs' );
const fetch = require( 'node-fetch' );
const path = require( 'path' );

/**
 * Retrieves schema fragment data and saves it to a json file 
 * 
 * @param endpoint - WPGraphQL endpoint
 * @param output - output path
 * 
 * @returns { void }
 */
const introspectionFetch = (endpoint, output) => {
  fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      variables: {},
      operationName: '',
      query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `,
    }),
  })
  .then(result => result.json())
  .then(result => {
    // here we're filtering out any type information unrelated to unions or interfaces
    const filteredData = result.data.__schema.types.filter(
      type => type.possibleTypes !== null,
    );
    result.data.__schema.types = filteredData;
    const outputFile = output.endsWith('.json') ? output : path.resolve(output, 'fragments.json');
    fs.writeFile(outputFile, JSON.stringify(result.data), err => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  });
};

try {
  // Throw if path to WP installation provided 
  if ( !process.argv[2] ) {
      throw new Error( chalk.red( 'no WPGraphQL endpoint provided' ) );
  }

  const endpoint = process.argv[2]
  const output = process.argv[3] || path.resolve(process.cwd());

  introspectionFetch(endpoint, output);

} catch ( error ) {
  console.error( error );
}
