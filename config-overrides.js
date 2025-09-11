const webpack = require('webpack');

  module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: require.resolve('path-browserify'),
      http: require.resolve('stream-http'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url/'),
      buffer: require.resolve('buffer/'),
      util: require.resolve('util/'),
      querystring: require.resolve('querystring-es3'),
      net: false,
      zlib: require.resolve('browserify-zlib'),
    };

    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ];

    return config;
  };