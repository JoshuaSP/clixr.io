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

  initialize: function (options) {
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    this.render();
    if (options.width) {
      this.$el.css('width', options.width);
      var img = this.$('img')[0];
      var scale = options.width / img.naturalWidth;
      this.$el.css('height', img.naturalHeight * scale);
    }
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);
    return this;
  },

  resizable: function () {
		var $handles = this._addResizeHandles();
    this.$el.resizable({
      aspectRatio: true,
      handles: $handles
    });
  }
});
