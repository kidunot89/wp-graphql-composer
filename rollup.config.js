// rollup.config.js
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import json from 'rollup-plugin-json';

const env = 'development';
process.env.NODE_ENV = env;
process.env.BABEL_ENV = env;

export default {
    external: [
        'apollo-boost',
        'apollo-client',
        'apollo-link',
        'apollo-cache-inmemory',
        'graphql',
        'lodash',
        'moment',
        'node-fetch',
        'react',
        'react-apollo',
        'react-dom',
        'react-html-parser',
        'react-router-dom',
        'recompose',
        'uuid/v3',
    ],
    context: 'global',
    input: 'src/index.js',
    output: [
        {
            name: 'WPGraphQLComposer',
            file: 'dist/index.js',
            format: 'umd',
            sourcemap: true,
            globals: {
                'apollo-boost': 'apollo-boost',
                'apollo-client': 'apollo-client',
                'apollo-link': 'apollo-link',
                'apollo-cache-inmemory': 'apollo-cache-inmemory',
                'graphql': 'graphql',
                'lodash': '_',
                'moment': 'moment',
                'node-fetch': 'fetch',
                'react': 'React',
                'react-apollo': 'react-apollo',
                'react-dom': 'ReactDOM',
                'react-html-parser': 'react-html-parser',
                'react-router-dom': 'react-router-dom',
                'recompose': 'recompose',
                'uuid/v3': 'v3',
            },
            exports: 'named',
        },
        {
            file: 'dist/index.module.js',
            format: 'es',
            sourcemap: true,
            globals: {
                'apollo-boost': 'apollo-boost',
                'apollo-client': 'apollo-client',
                'apollo-link': 'apollo-link',
                'apollo-cache-inmemory': 'apollo-cache-inmemory',
                'graphql': 'graphql',
                'lodash': '_',
                'moment': 'moment',
                'node-fetch': 'fetch',
                'react': 'React',
                'react-apollo': 'react-apollo',
                'react-dom': 'ReactDOM',
                'react-html-parser': 'ReactHtmlParser',
                'react-router-dom': 'react-router-dom',
                'recompose': 'recompose',
                'uuid/v3': 'v3',
            },
            exports: 'named',
        },
    ],
    plugins: [
        postcss({ modules: true }),
        babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
        replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
        resolve({ extensions: [ '.mjs', '.js', '.jsx', '.json' ] }),
        commonjs({
            namedExports: {
                'node_modules/lodash/lodash.js': [
                    'each',
                    'get',
                    'filter',
                    'find',
                    'findIndex',
                    'isEmpty',
                    'isNull',
                    'map',
                    'omit',
                    'sortBy',
                ]
            }
        }),
        json(),
    ],
};