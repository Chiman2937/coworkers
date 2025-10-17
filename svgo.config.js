// svgo -f . -r --config svgo.config.js
const config = {
  multipass: true,
  plugins: [
    "preset-default",
    "removeDimensions"
  ]
};

export default config;