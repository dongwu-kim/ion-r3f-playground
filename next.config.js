const { withPlugins } = require('next-composed-plugins');

module.exports = withPlugins(
  {
    reactStrictMode: true,
    compiler: {
      emotion: true,
    },
  },
  [],
);
