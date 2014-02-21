var headlineGenerator = {
	url: 'http://dailybruin.com/',
	getHeadlines_: function() {
		var xhr = new XMLHttpRequest();
	   	xhr.open("GET", this.url, true);
	    xhr.onload = this.showHeadlines_.bind(this);
	    xhr.send(null);
	},
	showHeadlines_: function(e) {
		//var elems = e.target.responseXML.getElementsByClassName('headline-a');
		var elems = document.getElementsByClassName('headline-a');
		//console.log(container, container.getElementsByClassName('content'));
    	for(var i = 0; i < 10; i++) {
    		var headline = document.createElement('p');
    		
    		headline.innerHTML = elems.innerHTML;
    		document.body.appendChild(headline);
    	}
	}
};

document.addEventListener('DOMContentLoaded', function () {
  headlineGenerator.getHeadlines_();
});

