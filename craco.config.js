/* craco.config.js */
const path = require(`path`);

module.exports = {
  babel: {
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
  jest: {
    verbose: false,
    moduleNameMapper: {
      '\\.(png|jpg|jpeg)$': 'identity-obj-proxy',
      '^@/(.*)$': '<rootDir>/src/$1',
      axios: 'axios/dist/node/axios.cjs',
    },
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
      '^.+\\.tsx?$': 'ts-jest',
    },
    // configure: {
    //   /* ... */
    // },
    // configure: (jestConfig, { env, paths, resolve, rootDir }) => {
    //   return jestConfig;
    // },
  },
};
