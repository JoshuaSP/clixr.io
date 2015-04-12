ClixrIo.Views.Menu = ClixrIo.Views.Element.extend({
  tagName: 'ul',
  template: JST['elements/menu'],
  className: "user-menu-style-1",

  initialize: function () {
    ClixrIo.Views.Element.prototype.initialize.apply(this);
    this.listenTo(this.collection, "add remove", this.render);
  },

  render: function () {
    var content = this.template({ pages: this.collection });
    this.$el.html(content);
    return this;
  }
});
