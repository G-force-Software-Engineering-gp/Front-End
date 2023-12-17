/* craco.config.js */
import path from 'path';

const cracoConfig = {
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
    configure: {
      verbose: true,
      preset: 'ts-jest',
      moduleNameMapper: {
        '\\.(png|jpg|jpeg)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1',
        '/axios/': 'axios/dist/node/axios.cjs',
      },
      watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
      transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest',
      },
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    },
  },
};
export default cracoConfig;

// /* craco.config.js */
// const path = require(`path`);
// const { pathsToModuleNameMapper } = require('ts-jest');
// const { compilerOptions } = require('./tsconfig');
// module.exports = {
//   // babel: {
//   //   plugins: [
//   //     [
//   //       'module-resolver',
//   //       {
//   //         root: ['./src'],
//   //         alias: {
//   //           '@': './src',
//   //         },
//   //       },
//   //     ],
//   //   ],
//   // },
//   webpack: {
//     alias: {
//       '@': path.resolve(__dirname, 'src/'),
//     },
//   },
//   jest: {
//     babel: {
//       plugins: [
//         [
//           'module-resolver',
//           {
//             root: ['./src'],
//             alias: {
//               '@': './src',
//             },
//           },
//         ],
//       ],
//     },
//     // configure: ,
//     configure: (jestConfig, { env, paths, resolve, rootDir }) => {
//       return {
//         verbose: false,
//         preset: 'ts-jest',

//         moduleNameMapper:
//           // pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
//           {
//             ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
//             //       "baseUrl": ".",
//             // "paths": {
//             //   "@/*": [
//             //     "./src/*"
//             //   ]
//             // }
//             '\\.(png|jpg|jpeg)$': 'identity-obj-proxy',
//             // '^@/(.*)$': '<rootDir>/src/$1',
//             // axios: 'axios/dist/node/axios.cjs',
//           },
//         watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
//         transform: {
//           // '^.+\\.jsx?$': 'babel-jest',
//           '^.+\\.tsx?$': 'ts-jest',
//         },
//         roots: [rootDir],
//         modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
//         setupFilesAfterEnv: [rootDir + '/jest.setup.ts'],
//       };
//     },
//   },
// };
