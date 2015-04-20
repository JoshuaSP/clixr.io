ClixrIo.Models.Page = Backbone.Model.extend({
  urlRoot: '/api/pages',

  parse: function (response) {
    if (response.elements) {
      this.elements().set(response.elements);
    }
    delete response.elements;
    return response;
  },

  elements: function() {
    return this._elements || (this._elements = new ClixrIo.Collections.Elements());
  },

  save: function() {
    Backbone.Model.prototype.save.apply(this, {
      success: function () {
        this.elements().forEach(function(element) {
          element.set('placeable_id', this.id);
          element.save();
        });
      }.bind(this)
    });
  }
});
