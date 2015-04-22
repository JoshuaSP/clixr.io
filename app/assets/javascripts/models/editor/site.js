ClixrIo.Models.Site = Backbone.Model.extend({
  urlRoot: "/api/sites/",

  imageCoverCSSProperties: [
    'background-color',
    'opacity'
  ],

  userSiteCSSProperties: [
    'background-size',
    'background-image'
  ],

  parse: function (response) {
    if (response.elements) {
      this.elements().set(response.elements);
    }
    if (response.pages) {
      this.pages().set(response.pages, {parse: true});
    }
    delete response.elements;
    delete response.pages;
    return response;
  },

  ensurePage: function () {
    if (this.pages().length === 0) {
      this.pages().add(new ClixrIo.Models.Page({
        title: "untitled",
        ord: 0,
        address: "untitled"
      }));
    }
  },

  elements: function() {
    return this._elements || (this._elements = new ClixrIo.Collections.Elements());
  },

  pages: function() {
    return this._pages || (this._pages = new ClixrIo.Collections.Pages());
  },

  save: function() {
    this.pages().forEach(function(page){
      page.save();
    });
    this.elements().forEach(function(element){
      element.save();
    });
    var userSiteCSS = {};
    this.userSiteCSSProperties.forEach(function(property) {
      if ($('.user-site').css(property)) {
        userSiteCSS[property] = $('user-site').css(property);
      }
    }.bind(this));
    this.imageCoverCSSProperties.forEach(function(property) {
      if ($('.user-site').css(property)) {
        userSiteCSS[property] = $('user-site').css(property);
      }
    }.bind(this));
    this.set('background_css', JSON.stringify(userSiteCSS));
    this.set('image_cover_css', JSON.stringify(imageCoverCSS));
    Backbone.Model.prototype.save.apply(this);
  }
});
