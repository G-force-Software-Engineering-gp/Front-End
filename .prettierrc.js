module.exports = {
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
  tailwindFunctions: ['clsx', 'tw', 'clsx', 'cva', 'cx'],

  //   tailwindConfig: './styles/tailwind.config.js',

  //   importOrder: ['^@core/(.*)$', '', '^@server/(.*)$', '', '^@ui/(.*)$', '', '^[./]'],
  //     importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  //     importOrderTypeScriptVersion: '5.0.0',
  // "importOrder": ["^react$", "<THIRD_PARTY_MODULES>", "^[.]"]
  // "importOrder": ["<THIRD_PARTY_MODULES>", "^(?!.*[.]css$)[./].*$", ".css$"]
  // "importOrder": ["<BUILT_IN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^[.]"]
  // "importOrder": [
  //     "<THIRD_PARTY_MODULES>",
  //     "^(@api|@assets|@ui)(/.*)$",
  //     "^[.]"]
  //     "importOrder": ["<TYPES>", "<TYPES>^[.]", "<THIRD_PARTY_MODULES>", "^[.]"]
  //     "importOrder": ["<BUILT_IN_MODULES>", "", "<THIRD_PARTY_MODULES>", "", "^[.]"]

  printWidth: 120, // max 120 chars in line, code is easy to read
  useTabs: false, // use spaces instead of tabs
  tabWidth: 2, // "visual width" of of the "tab"
  trailingComma: 'es5', // add trailing commas in objects, arrays, etc.
  semi: true, // add ; when needed
  singleQuote: true, // '' for stings instead of ""
  bracketSpacing: true, // import { some } ... instead of import {some} ...
  arrowParens: 'always', // braces even for single param in arrow functions (a) => { }
  jsxSingleQuote: false, // "" for react props, like in html
  bracketSameLine: false, // pretty JSX
  endOfLine: 'lf', // 'lf' for linux, 'crlf' for windows, we need to use 'lf' for git
};

// module.exports = {
//     arrowParens: "avoid",
//     bracketSameLine: true,
//     bracketSpacing: false,
//     singleQuote: false,
//     trailingComma: "all",
//     tabWidth: 2,
//     useTabs: false,
//     semi: true,
//     printWidth: 80,
//   };

// {
//     "semi": true,
//     "tabWidth": 4,
//     "printWidth": 100,
//     "singleQuote": true,
//     "trailingComma": "all",
//     "jsxSingleQuote": true,
//     "bracketSpacing": true
// }
