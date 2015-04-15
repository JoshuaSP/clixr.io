ClixrIo.Views.Button = ClixrIo.Views.Element.extend({
  tagName: 'a',
  editMenu: ClixrIo.Views.ButtonEditMenu,

  initialize: function (options) {
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    this.$el.html(this.model.escape('content'));
    this.$el.attr('href', "#");
  },

  
});
