var use_storage = function(name) {
	try {
	  return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
	  return false;
	}
}

$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results) return results[1] || 0;
} 
