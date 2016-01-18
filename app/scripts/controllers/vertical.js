'use strict';

/**
 * @ngdoc function
 * @name deltekApp.controller:ConsultancyVerticalCtrl
 * @description
 * # ConsultancyVerticalCtrl
 * Controller of the deltekApp
 */
angular.module('deltekApp')
  .controller('ConsultancyVerticalCtrl', function($scope, $rootScope) {
    // Set $rootScope.layout to conversation class - this sets class to body
    $rootScope.layout = 'consultancy vertical-page';

    // Dynamic tracking for Consultancy vertical
    var dimensionValue = 'Consultancy';
    ga('set', 'dimension2', dimensionValue);
  })
  .controller('AgencyVerticalCtrl', function($scope, $rootScope) {
    // Set $rootScope.layout to conversation class - this sets class to body
    $rootScope.layout = 'agency vertical-page';

    // Dynamic tracking for Agency vertical
    var dimensionValue = 'Agency';
    ga('set', 'dimension2', dimensionValue);
  })
  .controller('ArchitectVerticalCtrl', function($scope, $rootScope) {
    // Set $rootScope.layout to conversation class - this sets class to body
    $rootScope.layout = 'architect vertical-page';

    // Dynamic tracking for Agency vertical
    var dimensionValue = 'Architect';
    ga('set', 'dimension2', dimensionValue);
  });
