goog.provide('webfont.modules.google.FontApiUrlBuilder');

/**
 * @constructor
 */
webfont.modules.google.FontApiUrlBuilder = function(apiUrl, text) {
  if (apiUrl) {
    this.apiUrl_ = apiUrl;
  } else {
    this.apiUrl_ = webfont.modules.google.FontApiUrlBuilder.DEFAULT_API_URL;
  }
  this.fontFamilies_ = [];
  this.subsets_ = [];
  this.text_ = text || '';
  this.display_ = [];
};


webfont.modules.google.FontApiUrlBuilder.DEFAULT_API_URL = 'https://fonts.googleapis.com/css';

goog.scope(function () {
  var FontApiUrlBuilder = webfont.modules.google.FontApiUrlBuilder;

  FontApiUrlBuilder.prototype.setFontFamilies = function(fontFamilies) {
    this.parseFontFamilies_(fontFamilies);
  };


  FontApiUrlBuilder.prototype.parseFontFamilies_ =
      function(fontFamilies) {
    var length = fontFamilies.length;

    for (var i = 0; i < length; i++) {
      var elements = fontFamilies[i].split(':');

      if (elements.length == 4) {
        console.log(`4 - ${elements[3]}`);
        this.display_.push(elements.pop());
      }
      if (elements.length == 3) {
        console.log(`3 - ${elements[2]}`);
        this.subsets_.push(elements.pop());
      }
      var joinCharacter = '';
      if (elements.length == 2 && elements[1] != ''){
        console.log(`2 - ${elements[1]}`);
        joinCharacter = ':';
      }
      console.log(`1 - ${elements[0]}`);
      this.fontFamilies_.push(elements.join(joinCharacter));
    }
  };


  FontApiUrlBuilder.prototype.webSafe = function(string) {
    return string.replace(/ /g, '+');
  };


  FontApiUrlBuilder.prototype.build = function() {
    if (this.fontFamilies_.length == 0) {
      throw new Error('No fonts to load!');
    }
    if (this.apiUrl_.indexOf("kit=") != -1) {
      return this.apiUrl_;
    }
    var length = this.fontFamilies_.length;
    var sb = [];

    for (var i = 0; i < length; i++) {
      sb.push(this.webSafe(this.fontFamilies_[i]));
    }
    var url = this.apiUrl_ + '?family=' + sb.join('%7C'); // '|' escaped.

    if (this.subsets_.length > 0) {
      url += '&subset=' + this.subsets_.join(',');
    }

    if (this.text_.length > 0) {
      url += '&text=' + encodeURIComponent(this.text_);
    }
    
    if (this.display.length > 0) {
      url += '&display=' + encodeURIComponent(this.display_);
    }

    console.log(`URL - ${url}`);
    return url;
  };
});
