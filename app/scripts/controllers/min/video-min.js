"use strict";angular.module("deltekApp").controller("ConsultancyVideoCtrl",function(e,a){a.layout="consultancy",a.pageType="video"}).controller("AgencyVideoCtrl",function(e,a){a.layout="agency",a.pageType="video"}).controller("ArchitectVideoCtrl",function(e,a){a.layout="architect",a.pageType="video"}).controller("VideoTestCtrl",function(e,a,t,n,d,i){t(function(){$('.video a[target="_blank"]').each(function(){var e=$(this),a=e.attr("href"),t=a.lastIndexOf(".")+1,n=a.substr(t);"pdf"==n||"jpg"==n||"png"==n||"gif"==n?e.click(function(){ga("send","event","Download","click",a)}):e.click(function(){ga("send","event","External","click",a)})})},1500),e.videos=[],e.videoClick=function(e,a,t){var n=$("#video-container-"+e),d=$(".vidyard-"+e),i=new Vidyard.player(a);i.play(),ga("send","event","video","watch",t),n.fadeOut(650,function(){d.fadeIn(650)})},a.get("data/"+i.layout+"-videos.json").then(function(a){e.videodata=a.data;var d=[],i=[],o=[],s=[],r=[],c=[],l=0;for(var u in a.data)"object"==typeof a.data[u]&&a.data[u].hasOwnProperty("url")&&(d.push(a.data[u]),c.push(a.data[u].url),"undefined"!=typeof a.data[u].experts&&(r.push(a.data[u].experts.length),s.push(a.data[u].experts)),"undefined"!=typeof a.data[u].assets&&i.push(a.data[u].assets));e.videos=d.chunk(3),e.assets=i,e.experts=s,e.expertsLengths=r;var f=_.size(a.data);3>=f?e.dataCount=!1:f>=4&&(e.dataCount=!0);for(var p in c)if(n.name===c[p]){t(function(){e.init=function(){$(".carousel-video-"+p).trigger("click"),$(".video-"+p).addClass("animated fadeInUp"),e.selected=p},e.init()},800),l++;break}0===l&&t(function(){e.init=function(){$(".carousel-video-0").trigger("click"),$(".video-0").addClass("animated fadeInUp"),e.selected=0,$(".expert-0").addClass("animated fadeIn")},e.init()},800)}),e.videoSwap=function(a,n,o){var n=$(".selected").data("video"),s=$(".expert-col").data("expert-col"),r="video-"+a,c=$("#video-container-"+a),l=$(".vidyard-"+a),u=$(".selected").data("video-code");switch(i.layout){case"consultancy":d.path("/what-if/consultancy/driving-change-within-the-organisation/"+o,!1);break;case"agency":d.path("/what-if/marcomms/maximising-the-margins/"+o,!1);break;case"architect":d.path("/what-if/architect-and-engineer/multi-video/"+o,!1)}c.show(),l.hide(),n!=r&&($("."+s).removeClass("fadeIn fadeOut animated").addClass("animated fadeOut"),$("."+n).stop().removeClass("fadeInUp fadeOutUp animated").addClass("animated fadeOutUp"),t(function(){e.selected=a;var t=new Vidyard.player(u);t.pause(),$(".expert-"+a).stop().removeClass("fadeIn fadeOut animated").addClass("animated fadeIn"),$(".video-"+a).stop().removeClass("fadeInUp fadeOutUp animated").addClass("animated fadeInUp")},800))}}),Array.prototype.chunk=function(e){for(var a=[],t=0;t<this.length;t+=e)a.push(this.slice(t,t+e));return a};