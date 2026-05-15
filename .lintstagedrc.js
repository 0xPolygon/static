// This exists as a js file because .lintstagedrc w/ large #s of impacted files fails, but lintstagedrc.js works :)

export default {
  '*.{ts,cts,mts,tsx,js,cjs,mjs}': (files) => {
    return files.length > 0
      ? [`eslint --fix ${files.join(' ')}`, `prettier --write ${files.join(' ')}`]
      : [];
  },
  '*.{json,yaml,yml}': (files) => {
    return files.length > 0 ? `prettier --write ${files.join(' ')}` : [];
  },
  '*.md': (files) => {
    return files.length > 0 ? `markdownlint-cli2 --fix ${files.join(' ')}` : [];
  }
};
