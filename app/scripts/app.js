'use strict';

/**
 * @ngdoc overview
 * @name deltekApp
 * @description
 * # deltekApp
 *
 * Main module of the application.
 */
angular
  .module('deltekApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'iso.directives'
  ])
	.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
			if (reload === false) {
				var lastRoute = $route.current;
				var un = $rootScope.$on('$locationChangeSuccess', function () {
					$route.current = lastRoute;
					un();
				});
			}
			return original.apply($location, [path]);
    };
	}])
  .config(function ($routeProvider, $sceProvider, $sceDelegateProvider, $locationProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['**']);

    $routeProvider
      .when('/what-if/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        reloadOnSearch: false
      })
			.when('/what-if/consultancy/driving-change-within-the-organisation/', {
        templateUrl: 'views/consultancy/consultancy-conversation-multi-video.html',
        controller: 'ConsultancyVideoCtrl'
      })
			.when('/what-if/consultancy/driving-change-within-the-organisation/:name', {
        templateUrl: 'views/consultancy/consultancy-conversation-multi-video.html',
        controller: 'ConsultancyVideoCtrl'
      })
      .when('/consultancy-conversation-video/', {
        templateUrl: 'views/consultancy/consultancy-conversation-video.html',
        controller: 'ConsultancyConversationCtrl'
      })
      .when('/consultancy-conversation-copy/', {
				templateUrl: 'views/consultancy/consultancy-conversation-copy.html',
        controller: 'ConsultancyConversationCtrl'
      })
      .when('/consultancy-conversation-webinar/', {
				templateUrl: 'views/consultancy/consultancy-conversation-webinar.html',
        controller: 'ConsultancyConversationCtrl'
      })
      .when('/what-if/marcomms/maximising-the-margins/', {
        templateUrl: 'views/agency/agency-conversation-multi-video.html',
        controller: 'AgencyVideoCtrl'
      })
			.when('/what-if/marcomms/maximising-the-margins/:name', {
        templateUrl: 'views/agency/agency-conversation-multi-video.html',
        controller: 'AgencyVideoCtrl'
      })
      .when('/agency-conversation-video/', {
        templateUrl: 'views/agency/agency-conversation-video.html',
        controller: 'AgencyConversationCtrl'
      })
      .when('/agency-conversation-copy/', {
				templateUrl: 'views/agency/agency-conversation-copy.html',
        controller: 'AgencyConversationCtrl'
      })
      .when('/agency-conversation-webinar/', {
				templateUrl: 'views/agency/agency-conversation-webinar.html',
        controller: 'AgencyConversationCtrl'
      })
      .when('/what-if/architect-and-engineer/multi-video/', {
        templateUrl: 'views/architect-engineer/architect-engineer-conversation-multi-video.html',
        controller: 'ArchitectVideoCtrl'
      })
			.when('/what-if/architect-and-engineer/multi-video/:name', {
        templateUrl: 'views/architect-engineer/architect-engineer-conversation-multi-video.html',
        controller: 'ArchitectVideoCtrl'
      })
      .when('/architect-engineer-conversation-video/', {
        templateUrl: 'views/architect-engineer/architect-engineer-conversation-video.html',
        controller: 'ArchitectEngineerConversationCtrl'
      })
      .when('/architect-engineer-conversation-copy/', {
				templateUrl: 'views/architect-engineer/architect-engineer-conversation-copy.html',
        controller: 'ArchitectEngineerConversationCtrl'
      })
      .when('/architect-engineer-conversation-webinar/', {
				templateUrl: 'views/architect-engineer/architect-engineer-conversation-webinar.html',
        controller: 'ArchitectEngineerConversationCtrl'
      })
			.when('/what-if/our-experts/simon-montague/', {
        templateUrl: 'views/experts/simon-montague.html',
        controller: 'ConsultancyExpertCtrl'
      })
	  .when('/what-if/our-experts/paul-connolly/', {
        templateUrl: 'views/experts/paul-connolly.html',
        controller: 'ConsultancyExpertCtrl'
      })
	  .when('/what-if/our-experts/russell-clark/', {
        templateUrl: 'views/experts/russell-clark.html',
        controller: 'ConsultancyExpertCtrl'
      })	  
      .when('/what-if/our-experts/paula-da-silva/', {
        templateUrl: 'views/experts/paula-da-silva.html',
        controller: 'AgencyExpertCtrl'
      })
			.when('/what-if/our-experts/ray-kieser/', {
        templateUrl: 'views/experts/ray-kieser.html',
        controller: 'AgencyExpertCtrl'
      })
			.when('/what-if/our-experts/melanie-lawn/', {
        templateUrl: 'views/experts/melanie-lawn.html',
        controller: 'AgencyExpertCtrl'
      })
			.when('/what-if/our-experts/chris-duddridge/', {
        templateUrl: 'views/experts/chris-duddridge.html',
        controller: 'AgencyExpertCtrl'
      })
			.when('/what-if/our-experts/esther-carder/', {
        templateUrl: 'views/experts/esther-carder.html',
        controller: 'AgencyExpertCtrl'
      })
      .when('/architect-engineer-expert/ben-kendrick/', {
        templateUrl: 'views/architect-engineer/architect-engineer-expert.html',
        controller: 'ArchitectExpertCtrl'
      })
      .when('/what-if/consultancy/', {
				templateUrl: 'views/consultancy/consultancy-vertical.html',
        controller: 'ConsultancyVerticalCtrl'
      })
      .when('/what-if/marcomms/', {
				templateUrl: 'views/agency/agency-vertical.html',
        controller: 'AgencyVerticalCtrl'
      })
      .when('/architect-engineer-vertical/', {
				templateUrl: 'views/architect-engineer/architect-engineer-vertical.html',
        controller: 'ArchitectVerticalCtrl'
      })
      .otherwise({
        redirectTo: '/what-if/'
      });
  })
  .directive('vidyard', function($sce) {
    return {
      scope: {
        id: '=?',
        videoId: '=?'
      },
      template: '<iframe style="width: 100%; height: 491px;" id="vidyard_iframe_{{id}}" class="vidyard_iframe" src="{{url}}" scrolling="no" frameborder="0" allowtransparency="true"></iframe>',
      link: function(scope) {
        scope.$watch('id', function(newVal) {
          if (newVal) {
            scope.url = $sce.trustAsResourceUrl("//play.vidyard.com/"+newVal+".html?v=3.1");
          }
        });
      }
    };
  })
	.directive('scrollOnClick', function() {
		return {
			restrict: 'A',
			scope: {
				scrollTo: '@'
			},
			link: function(scope, $elem) {
				$elem.on('click', function() {
					$('html, body').stop().animate({scrollTop: $(scope.scrollTo).offset().top}, 1200);
				});
			}
		};
	});