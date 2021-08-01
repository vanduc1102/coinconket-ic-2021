const nrwlConfig = require("@nrwl/react/plugins/webpack.js");

module.exports = (config, context) => {
  nrwlConfig(config);
  return {
    ...config,
    node: {
      Buffer: true
    },
    plugins: [
      ...config.plugins
    ]
  };
};
