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

  setAddress: function() {
    var address = this.get('title').replace(/[^A-Za-z0-9]+/g, "_").toLowerCase();
    if (this.collection.where({ address: address }).length) {
      var i = 1;
      while (this.collection.where({ address: address + i }).length) i++;
      address += i;
    }
    this.set({
      'address': address
    });
  }
});
