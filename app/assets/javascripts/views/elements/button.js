ClixrIo.Views.Button = ClixrIo.Views.Element.extend({
  tagName: 'div',
  template: JST['elements/button'],
  editMenu: ClixrIo.Views.ButtonEditMenu,

  initialize: function (options) {
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    this.render();
  },

  render: function () {
    var content = this.template({ button: this.model })
    this.$el.html(content)
    return this;
  }

});
