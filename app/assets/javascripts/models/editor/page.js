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

  name: function(newName) {
    var address = newName.replace(/[^A-Za-z0-9]/g, "_").toLowerCase();
    if (this.collection.where({ address: address }).length) {
      var i = 1;
      while (this.collection.where({ address: address + i }).length) i++;
      address += i;
    }
    this.set({
      'address': address,
      'title': newName
    });
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
