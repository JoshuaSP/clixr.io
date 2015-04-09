ClixrIo.Models.Page = Backbone.Model.extend({
  parse: function (response) {
    if (response.elements) {
      this.elements().set(response.elements);
    }
    delete response.elements;
    return response;
  },

  elements: function() {
    return this._elements || (this._elements = new ClixrIo.Collections.Elements());
  }
});
