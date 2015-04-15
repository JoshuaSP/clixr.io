ClixrIo.Views.Button = ClixrIo.Views.Element.extend({
  tagName: 'div',
  template: button_element.jst.ejs,
  editMenu: ClixrIo.Views.ButtonEditMenu,

  initialize: function (options) {
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    this.$el.html(this.model.escape('content'));
    this.$el.attr('href', "#");
  }
});
