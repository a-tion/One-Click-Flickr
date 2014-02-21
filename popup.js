var flickrGenerator = {
  /**
   * Flickr URL that will give us lots and lots of whatever we're looking for.
   *
   * See http://www.flickr.com/services/api/flickr.photos.search.html for
   * details about the construction of this URL.
   *
   * @type {string}
   * @private
   */
  /**
   * Sends an XHR GET request to grab photos. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestFlickrs: function(QUERY) {
    var url = 'https://secure.flickr.com/services/rest/?' +
      'method=flickr.photos.search&' +
      'api_key=90485e931f687a9b9c2a66bf58a3861a&' +
      'text=' + encodeURIComponent(QUERY) + '&' +
      'safe_search=1&' +
      'content_type=1&' +
      'sort=interestingness-desc&' +
      'per_page=20'
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our XHR request, generated in
   * 'requestFlickrs', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  showPhotos_: function (e) {
    var flickrs = e.target.responseXML.querySelectorAll('photo');
    for (var i = 0; i < flickrs.length; i++) {
      var img = document.createElement('img');
      img.src = this.constructFlickrURL_(flickrs[i]);
      img.setAttribute('alt', flickrs[i].getAttribute('title'));
      var replacedChild = document.body.childNodes[i+4];
      if(replacedChild)
        document.body.replaceChild(img, replacedChild);
      else 
        document.body.appendChild(img);
    }
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/
   *
   * @param {DOMElement}
   * @return {string} The URL.
   * @private
   */
  constructFlickrURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
  }
};

// Run our script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("searchButton").addEventListener('click', getSearchResult);
});


function getSearchResult() {
  var query = document.getElementById("searchText").value;
  flickrGenerator.requestFlickrs(query);
}
