ClixrIoLive.Models.Site = Backbone.Model.extend({
  urlRoot: "/api/sites/",

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

  elements: function() {
    return this._elements || (this._elements = new ClixrIoLive.Collections.Elements());
  },

  pages: function() {
    return this._pages || (this._pages = new ClixrIoLive.Collections.Pages());
  }
});
