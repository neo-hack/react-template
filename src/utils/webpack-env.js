// refs: https://webpack.js.org/api/module-variables/#importmetawebpackcontext
export const contextRequire = import.meta.webpackContext('..', {
  recursive: true,
  regExp: /.tsx/,
  mode: 'sync',
})
