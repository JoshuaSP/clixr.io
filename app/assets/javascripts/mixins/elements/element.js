ClixrIo.Views.Element = Backbone.View.extend({
  initialize: function () {
    this.className = this.model.get('class'),
    this.model.css = $.parseJSON(this.model.get('css'));
    this.model.css.position = "absolute"
    this.$el.css(this.model.css);
  },

  css: function (property, value) {
    this.$el.css(property, value);
    this.model.css.property = value;
  }
});
