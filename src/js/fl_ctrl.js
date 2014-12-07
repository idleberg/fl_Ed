var debug = true;

var default_x = 100,
    default_y = 100,
    default_w = 800,
    default_h = 600,
    default_input  = '',
    default_checks = false;

var use_storage = function() {
	try {
	  return 'localStorage' in window && window.localStorage !== null;
	} catch (e) {
	  return false;
	}
};

var set_defaults = function() {
	localStorage.setItem("editor.x", default_x);
	localStorage.setItem("editor.y", default_y);
	localStorage.setItem("editor.w", default_w);
	localStorage.setItem("editor.h", default_h);
	localStorage.setItem("editor.input", default_input);
	localStorage.setItem("editor.fullscreen", false);
	localStorage.setItem("editor.check1", default_checks);
	localStorage.setItem("editor.check2", default_checks);
};

var update_pos = function(editor, position, message) {

	position.text(editor.width()+'✕'+editor.height()+' — '+editor.offset().left+'x '+editor.offset().top+'y');

	if (use_storage()) {
	  localStorage.setItem("editor.x", editor.offset().left);
	  localStorage.setItem("editor.y", editor.offset().top);
	  localStorage.setItem("editor.w", editor.width());
	  localStorage.setItem("editor.h", editor.height());
	}
	
	if(message && debug) console.info(message);
};

$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results) return results[1] || 0;
};

// var flApp = angular.module("flApp", ['ngStorage']);
// flApp.controller("flEditor", function($scope, $localStorage, $sessionStorage /*, $http*/) {
//     // $http.get(localStorage).then(function(res) {
//     //     $scope.feeds = res.data
//     // })
//     $scope.$storage = $localStorage;
// });