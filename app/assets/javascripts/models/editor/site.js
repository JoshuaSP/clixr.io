ClixrIo.Models.Site = Backbone.Model.extend({
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

  ensurePage: function () {
    if (this.pages().length === 0) {
      this.pages().add(new ClixrIo.Models.Page({title: "untitled", ord: 0}));
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
    Backbone.Model.prototype.save.apply(this);
  }
});
