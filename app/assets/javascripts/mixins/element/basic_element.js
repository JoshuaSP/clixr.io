ClixrIo.Mixins.BasicElement = {
  className: this.model.class,

  initialize: function () {
    this.model.css = $.parseJSON(this.model.get('css'));
    this.$el.css(this.attrs);
  },

  save: function () {

  },

  css: function (property, value) {
    this.$el.css(property, value);
    this.model.css.property = value;
  }
};
