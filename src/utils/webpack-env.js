export const contextRequire = import.meta.webpackContext('..', {
  recursive: true,
  regExp: /.tsx/,
  mode: 'sync',
})
