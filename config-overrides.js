module.exports = function override(config, env) {
  config = rewireProvidePlugin(config, env, {
    'window.Quill': ['react-quill', 'Quill']
  })
  return config;
}