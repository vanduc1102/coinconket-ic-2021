const WorkerPlugin = require('worker-plugin');
const nrwlConfig = require('@nrwl/react/plugins/webpack.js');

module.exports = (config, context) => {
  nrwlConfig(config);
  return {
    ...config,
    node: {
      Buffer: true,
      module: 'empty',
    },
    plugins: [new WorkerPlugin(), ...config.plugins],
  };
};
