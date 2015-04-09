ClixrIo.Models.Element = Backbone.Model.extend ({
  save: function () {
    this.set('css', JSON.stringify(this.css));

  }
});
