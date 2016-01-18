/* jslint node: true */
'use strict';

/**
 * @ngdoc function
 * @name deltekApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the deltekApp
 */
angular.module('deltekApp')
  .controller('MainCtrl', function ($scope, $rootScope) {
    // Set $rootScope.layout empty - this sets class to body
    $rootScope.layout = 'home';
    $scope.pageType = 'page-home';
  })
  .controller('navCtrl', function($scope) {
    $scope.routeChange = function() {
      if($('.overlay-cornershaoe.open')) {
        $('.overlay-close').trigger('click');
      }
    };
  })
  .controller('isotopeData', function($scope, $http, $location, $timeout) {

    $http.get('data/isotope.json').then(function(res) {

      // Passing json data to scope
      $scope.isodata = res.data;

      // Add view query string to url & initialise
      $timeout(function() {
        $scope.init = function() {
          var isoTab = $location.search().v;
          $('.btn-'+isoTab).trigger('click');
        };
        $scope.init();
      });

      // Isotope query param
			
			$timeout(function() {
				// Passing isotope options to scope
				$scope.$emit('iso-option', {
					layoutMode: 'masonry',
					itemSelector: '.kindling',
					masonry: {
						columnWidth: 1,
						gutter: 15
					}
				});
			}, 1000);
			
      $scope.isoTab = function(category) {
        if(category.length === 0) {
          $location.search('v', null);
        } else {
          $location.search('v', category);
        }
      };

      // Shuffle function
			$scope.isoShuffle = function() {
				$scope.$emit('iso-method', {
					name: 'shuffle',
					params: null
				});
			};

    });
  });
