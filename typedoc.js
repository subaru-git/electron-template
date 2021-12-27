/* eslint-disable @typescript-eslint/no-var-requires */
var { sync } = require('glob');
const { resolve } = require('path');

module.exports = {
  entryPoints: sync(resolve('src/**/*{.ts,.tsx}')),
  externalPattern: ['src/**/stories{.tsx,.mdx}'],
  excludeExternals: true,
  out: 'docs/',
  categorizeByGroup: true,
  mergeModulesMergeMode: 'module',
};
