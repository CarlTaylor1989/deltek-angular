'use strict';

/**
 * @ngdoc function
 * @name deltekApp.controller:TestCtrl
 * @description
 * # ConsultancyConversationCtrl
 * Controller of the deltekApp
 */
angular.module('deltekApp')
	.controller('ConsultancyVideoCtrl', function ($scope, $rootScope) {
    // Set $rootScope.layout to conversation class - this sets class to body
    $rootScope.layout = 'consultancy';
		$rootScope.pageType = 'video';
  })
	.controller('AgencyVideoCtrl', function ($scope, $rootScope) {
    // Set $rootScope.layout to conversation class - this sets class to body
    $rootScope.layout = 'agency';
		$rootScope.pageType = 'video';
  })
	.controller('ArchitectVideoCtrl', function ($scope, $rootScope) {
    // Set $rootScope.layout to conversation class - this sets class to body
    $rootScope.layout = 'architect';
		$rootScope.pageType = 'video';
  })
	.controller('VideoTestCtrl', function ($scope, $http, $timeout, $routeParams, $location, $rootScope) {
	
		$timeout(function() {
			$('.video a[target="_blank"]').each(function() {
				var it = $(this);
				var href = it.attr('href');
				var lastHref = href.lastIndexOf('.') + 1;
				var fileType = href.substr(lastHref);
				
				if(fileType == 'pdf' || fileType == 'jpg' || fileType == 'png' || fileType == 'gif') {
					it.click(function() {
						ga('send', 'event', 'Download', 'click', href);
					});
				} else {
					it.click(function() {
						ga('send', 'event', 'External', 'click', href);
					});
				}
			});
		}, 1500);

    $scope.videos = [];

    // When clicking on video image, hide image and show video
    $scope.videoClick = function(index, vidId, title) {
      var containerElem = $('#video-container-'+index);
      var videoElem = $('.vidyard-'+index);
      var video = new Vidyard.player(vidId);
			
      video.play();
			ga('send', 'event', 'video', 'watch', title);

      containerElem.fadeOut(650, function() {
        videoElem.fadeIn(650);
      });
    };

	setTimeout(function() {
		var heights = $(".download-content").map(function () {
				return $(this).height();
			}).get(),
	
			maxHeight = Math.max.apply(null, heights);
	
		$(".download-content").height(maxHeight);
	}, 1500);

    // Getting video json data
    $http.get('data/'+$rootScope.layout+'-videos.json').then(function(res) {

      $scope.videodata = res.data;

      // Looping through data and pushing into new array
      var data_array = [],
					asset_array = [],
					expert_names = [],
					experts = [],
					expertsLengths = [],
					urls = [],
					count = 0;

      for(var i in res.data) {
        if (typeof res.data[i] === 'object' && res.data[i].hasOwnProperty('url')){
          data_array.push(res.data[i]);
					urls.push(res.data[i].url);
					if (typeof res.data[i].experts !== 'undefined'){
						expertsLengths.push(res.data[i].experts.length);
						experts.push(res.data[i].experts);
					}
					if (typeof res.data[i].assets !== 'undefined'){
						asset_array.push(res.data[i].assets);
					}
        }
      }

      // Passing 3 videos per row to scope
      $scope.videos = data_array.chunk(3);
      $scope.assets = asset_array;
			$scope.experts = experts;
			$scope.expertsLengths = expertsLengths;

      var dataCount = _.size(res.data);
      if(dataCount <= 3) {
        $scope.dataCount = false;
      } else if(dataCount >= 4) {
        $scope.dataCount = true;
      }

      for(var t in urls) {
        if($routeParams.name === urls[t]) {
          // Delayed timeout to allow time for videos to load
          $timeout(function() {
            $scope.init = function() {
              $('.carousel-video-'+t).trigger('click');
              $('.video-'+t).addClass('animated fadeInUp');
              $scope.selected = t;
            };
            $scope.init();
          }, 800);
          count++;
          break;
        }
      }

      if(count === 0) {
        $timeout(function() {
          $scope.init = function() {
            $('.carousel-video-0').trigger('click');
            $('.video-0').addClass('animated fadeInUp');
            $scope.selected = 0;
						$('.expert-0').addClass('animated fadeIn');
          };
          $scope.init();
        }, 800);
      }

    });

    // Swap out previous video with the new video
    $scope.videoSwap = function(index, videoId, url) {
      var videoId = $('.selected').data('video');
			var expertCol = $('.expert-col').data('expert-col');
      var videoData = 'video-'+index;
      var containerElem = $('#video-container-'+index);
      var videoElem = $('.vidyard-'+index);
      var videoCode = $('.selected').data('video-code');
			
			switch($rootScope.layout) {
				case 'consultancy':
					$location.path('/what-if/consultancy/driving-change-within-the-organisation/' + url, false);
					break;
				case 'agency':
					$location.path('/what-if/marcomms/maximising-the-margins/' + url, false);
					break;
				case 'architect':
					$location.path('/what-if/architect-and-engineer/multi-video/' + url, false);
					break;
			}

      containerElem.show();
      videoElem.hide();

      if(videoId != videoData) {
				$('.'+expertCol).removeClass('fadeIn fadeOut animated').addClass('animated fadeOut');
        $('.'+videoId).stop().removeClass('fadeInUp fadeOutUp animated').addClass('animated fadeOutUp');
        $timeout(function () {
          $scope.selected = index;
          var video = new Vidyard.player(videoCode);
          video.pause();
					$('.expert-'+index).stop().removeClass('fadeIn fadeOut animated').addClass('animated fadeIn');
          $('.video-'+index).stop().removeClass('fadeInUp fadeOutUp animated').addClass('animated fadeInUp');
        }, 800);
      }
    };

  });

// Function to count each array key
Array.prototype.chunk = function(chunkSize) {
  var R = [];
  for (var i = 0; i < this.length; i+=chunkSize) {
    R.push(this.slice(i, i+chunkSize));
  }
  return R;
};