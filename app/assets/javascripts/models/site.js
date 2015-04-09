ClixrIo.Models.Site = Backbone.Model.extend({
  urlRoot: "api/sites/",

  parse: function (response) {
    if (response.elements) {
      this.elements().set(response.elements);
    }
    if (response.pages) {
      this.pages().set(response.pages);
    }
    delete response.elements;
    delete response.pages;
    return response;
  },

  initialize: function () {
    if (this.pages().length === 0) {
      this.pages().add(new ClixrIo.Models.Page({title: "untitled", ord: 0}));
    }
  },

  elements: function() {
    return this._elements || (this._elements = new ClixrIo.Collections.Elements());
  },

  pages: function() {
    return this._pages || (this._pages = new ClixrIo.Collections.Elements());
  },
});
