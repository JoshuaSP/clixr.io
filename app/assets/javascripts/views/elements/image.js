ClixrIo.Views.Image = ClixrIo.Views.Element.extend({
  tagName: 'div',
  editMenu: ClixrIo.Views.ImageEditMenu,
  template: JST['elements/image'],

  handles: {
    "ne": { right: "-5px", top: "-5px"},
    "se": { right: "-5px", bottom: "-5px"},
    "nw": { left: "-5px", top: "-5px"},
    "sw": { left: "-5px", bottom: "-5px"}
  },

  intialize: function () {
    this.render();
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);
    return this;
  }
});
