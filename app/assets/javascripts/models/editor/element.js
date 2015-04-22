ClixrIo.Models.Element = Backbone.Model.extend ({
  urlRoot: '/api/elements',

  cssProperties: [
    'width',
    'height',
    'z-index',
    'top',
    'left',
    'background-color'
  ],

  // set: function (property, value) {
  //   Backbone.Model.prototype.set.call(this, property, value);
  //   this.save();
  // },

  save: function () {
    var css = {};
    this.cssProperties.forEach(function(property) {
      if (this.$el.css(property)) {
        css[property] = this.$el.css(property);
      }
    }.bind(this));
    this.set('css', JSON.stringify(css));
    this.set('element_class', _(this.$el.attr('class').split(" ")).without(
      "user-element",
      "noselect",
      "selected-element",
      "ui-draggable",
      "ui-draggable-handle",
      "ui-resizable"
    ).join(" "));
    this.set('content', this.$el.find('.text-content').html());
    Backbone.Model.prototype.save.apply(this);
  }
});
