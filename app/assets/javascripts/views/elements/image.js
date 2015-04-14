ClixrIo.Views.Image = ClixrIo.Views.Element.extend({
  tagName: 'div',
  editMenu: ClixrIo.Views.ImageEditMenu,
  template: JST['elements/image'],

  // handles: {
  //   "ne": { right: "-5px", top: "-5px"},
  //   "se": { right: "-5px", bottom: "-5px"},
  //   "nw": { left: "-5px", top: "-5px"},
  //   "sw": { left: "-5px", bottom: "-5px"}
  // },

  initialize: function (options) {
    this.render();
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    if (options.width) this.$el.css('width', options.width);
    // this.$('img').load(function() {
    // }.bind(this))
  },

  render: function () {
    var content = this.template({ image: this.model });
    this.$el.html(content);
    return this;
  },

  resizable: function () {
    var $handles;
    if (this.model.get('resize_property') === 'scale') {
  		$handles = this._addResizeHandles();
      this.$el.resizable({
        aspectRatio: true,
        handles: $handles
      });
    } else {
      $handles = this._addResizeHandles(ClixrIo.Views.Element.prototype.handles);
      var img = this.$('img');
      debugger
      img.css({
        width: this.$el.css('width'),
        height: this.$el.css('height')
      });
      this.$el.resizable({
        handles: $handles,
        resize: function (event, ui) {
          img.css({
            left: ui.originalPosition.left - ui.position.left,
            top: ui.originalPosition.top - ui.position.top,
          });
        },
        maxHeight: parseInt(this.$el.css('height')),
        maxWidth: parseInt(this.$el.css('width'))
      });  /// okay I'm going to stop dealing with this for now.
    }
  }
});
