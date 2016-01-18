// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-04-09 using
// generator-karma 0.9.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'app/components/jquery/dist/jquery.js',
      'app/components/angular/angular.js',
      'app/components/bootstrap/dist/js/bootstrap.js',
      'app/components/angular-animate/angular-animate.js',
      'app/components/angular-cookies/angular-cookies.js',
      'app/components/angular-resource/angular-resource.js',
      'app/components/angular-route/angular-route.js',
      'app/components/angular-sanitize/angular-sanitize.js',
      'app/components/angular-touch/angular-touch.js',
      'app/components/get-style-property/get-style-property.js',
      'app/components/get-size/get-size.js',
      'app/components/matches-selector/matches-selector.js',
      'app/components/eventie/eventie.js',
      'app/components/doc-ready/doc-ready.js',
      'app/components/eventEmitter/EventEmitter.js',
      'app/components/outlayer/item.js',
      'app/components/outlayer/outlayer.js',
      'app/components/masonry/masonry.js',
      'app/components/isotope/js/item.js',
      'app/components/isotope/js/layout-mode.js',
      'app/components/isotope/js/isotope.js',
      'app/components/isotope/js/layout-modes/vertical.js',
      'app/components/isotope/js/layout-modes/fit-rows.js',
      'app/components/isotope/js/layout-modes/masonry.js',
      'app/components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
