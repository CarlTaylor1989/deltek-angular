'use strict';

/**
 * @ngdoc function
 * @name deltekApp.controller:ConsultancyConversationCtrl
 * @description
 * # ConsultancyConversationCtrl
 * Controller of the deltekApp
 */

angular.module('deltekApp')
  .controller('ConsultancyConversationCtrl', function ($scope, $rootScope) {
    // Set $rootScope.layout to conversation class - this sets class to body
    $rootScope.layout = 'consultancy';
  })
  .controller('AgencyConversationCtrl', function ($scope, $rootScope) {
    // Set $rootScope.layout to conversation class - this sets class to body
    $rootScope.layout = 'agency';
  })
  .controller('ArchitectEngineerConversationCtrl', function ($scope, $rootScope) {
    // Set $rootScope.layout to conversation class - this sets class to body
    $rootScope.layout = 'architect-engineer';
  })
  .controller('VideoCtrl', function ($scope, $http, $timeout, $routeParams) {

    $scope.videos = [];

    // When clicking on video image, hide image and show video
    $scope.videoClick = function(index, vidId) {
      var containerElem = $('#video-container-'+index);
      var videoElem = $('.vidyard-'+index);

      var video = new Vidyard.player(vidId);
      video.play();

      containerElem.fadeOut(650, function() {
        videoElem.fadeIn(650);
      });

    };

    // States for google tracking
    // $scope.$on('youtube.player.paused', function ($event, player) {
    //   var elmnt = document.getElementById(player.id);
    //   var attr = elmnt.getAttributeNode('video-title').value;
    //   ga('send', 'event', 'video', 'paused', attr);
    // });

    // Getting video json data
    $http.get('data/conversation-videos.json').then(function(res) {

      $scope.videodata = res.data;

      // Looping through data and pushing into new array
      var data_array = [],
					asset_array = [],
					expert_names = [],
					count = 0;

      for(var i in res.data) {
        if (typeof res.data[i] === 'object' && res.data[i].hasOwnProperty('title')){
          data_array.push(res.data[i]);
          expert_names.push([res.data[i].expert_details.first_name.toLowerCase(), res.data[i].expert_details.last_name.toLowerCase()]);
        }
      }

      for(var o in res.data) {
        if (typeof res.data[o].asset_content !== 'undefined'){
          asset_array.push(res.data[o].asset_content);
        }
      }

      // Passing 3 videos per row to scope
      $scope.videos = data_array.chunk(3);
      $scope.assets = asset_array.chunk(3);

      var dataCount = _.size(res.data);
      if(dataCount <= 3) {
        $scope.dataCount = false;
      } else if(dataCount >= 4) {
        $scope.dataCount = true;
      }

      for(var t in expert_names) {
        var fn = expert_names[t][0];
        var ln = expert_names[t][1];
        var bn = fn+'-'+ln;
        if($routeParams.name === bn) {
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
          };
          $scope.init();
        }, 800);
      }

    });

    // Swap out previous video with the new video
    $scope.videoSwap = function(index) {
      var videoId = $('.selected').data('video');
      var videoData = 'video-'+index;
      var containerElem = $('#video-container-'+index);
      var videoElem = $('.vidyard-'+index);
      var videoCode = $('.selected').data('video-code');

      containerElem.show();
      videoElem.hide();

      if(videoId != videoData) {
        $('.'+videoId).stop().removeClass('fadeInUp fadeOutUp animated').addClass('animated fadeOutUp');
        $timeout(function () {
          $scope.selected = index;
          var video = new Vidyard.player(videoCode);

          video.pause();
          $('.video-'+index).stop().removeClass('fadeInUp fadeOutUp animated').addClass('animated fadeInUp');
        }, 700);
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
