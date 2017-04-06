// An example configuration file.
exports.config = {

  seleniumPort: 4444,
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the current working directly when
  // protractor is called.
  specs: ['example_spec.js']
};
