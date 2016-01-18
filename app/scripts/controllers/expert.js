'use strict';

/**
 * @ngdoc function
 * @name deltekApp.controller:ConsultancyExpertCtrl
 * @description
 * # ConsultancyExpertCtrl
 * Controller of the deltekApp
 */
angular.module('deltekApp')
  .controller('ConsultancyExpertCtrl', function($scope, $rootScope) {
    $rootScope.layout = 'consultancy expert';
	
	setTimeout(function() {
		var heights = $(".download-content").map(function () {
				return $(this).height();
			}).get(),
	
			maxHeight = Math.max.apply(null, heights);
	
		$(".download-content").height(maxHeight);
	}, 1500);	
  })
  .controller('AgencyExpertCtrl', function($scope, $rootScope) {
    $rootScope.layout = 'agency expert';
	
	setTimeout(function() {
		var heights = $(".download-content").map(function () {
				return $(this).height();
			}).get(),
	
			maxHeight = Math.max.apply(null, heights);
	
		$(".download-content").height(maxHeight);
	}, 1500);	
  })
  .controller('ArchitectExpertCtrl', function($scope, $rootScope) {
    $rootScope.layout = 'architect expert';
	
	setTimeout(function() {
		var heights = $(".download-content").map(function () {
				return $(this).height();
			}).get(),
	
			maxHeight = Math.max.apply(null, heights);
	
		$(".download-content").height(maxHeight);
	}, 1500);	
  })
