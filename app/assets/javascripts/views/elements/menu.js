ClixrIo.Views.Menu = ClixrIo.Views.Element.extend({
  tagName: 'ul',
  template: JST['elements/menu'],

  initialize: function () {
    ClixrIo.Views.Element.prototype.initialize.apply(this);
    if (this.model.get('class').indexOf("user-menu-style") === -1) {
      this.$el.addClass('user-menu-style-1');
    }
    this.listenTo(this.collection, "add remove", this.render);
  },

  render: function () {
    var content = this.template({ pages: this.collection });
    this.$el.html(content);
    return this;
  }
});
