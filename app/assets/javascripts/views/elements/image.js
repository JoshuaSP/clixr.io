ClixrIo.Views.Image = ClixrIo.Views.Element.extend({
  tagName: 'div',
  editMenu: ClixrIo.Views.ImageEditMenu,
  template: JST['elements/image'],

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
    }
  }
});
