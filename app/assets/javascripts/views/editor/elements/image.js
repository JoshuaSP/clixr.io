ClixrIo.Views.Image = ClixrIo.Views.Element.extend({
  tagName: 'div',
  editMenu: ClixrIo.Views.ImageEditMenu,
  template: JST['editor/elements/image'],

  initialize: function (options) {
    this.render();
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    if (options.width) this.$el.css('width', options.width);
  },

  render: function () {
    var content = this.template({
      image: this.model
    });
    this.$el.html(content);
    return this;
  },

  resizable: function () {
    this.$el.resizable({
      aspectRatio: true,
      handles: this._addResizeHandles()
    });
  },

  overlapListen: function () {
  },

  icon: function (dim) {
    var origWidth = parseInt(this.$el.css('width'));
    var origHeight = parseInt(this.$el.css('height'));
    var maxDim = Math.max(origWidth, origHeight);
    var $icon = $('<img>');
    $icon.css({
      'width': dim * origWidth / maxDim,
      'height': dim * origHeight / maxDim,
    });
    $icon.attr('src', this.model.get('url'));
    $icon.addClass('element-icon');
    var style = this.$el.attr('class').match(/user\S*style-\d+/)[0];
    $icon.addClass(style);
    return $icon.clone().wrap('<div/>').parent().html();
  }
});
