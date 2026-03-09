const JavaScriptObfuscator = require('webpack-obfuscator');

module.exports = {
  plugins: [
    new JavaScriptObfuscator(
      {
        rotateStringArray: true,
        stringArray: true,
        stringArrayThreshold: 0.75,
      },
      ['vendor.js'],
    ),
  ],
};
