ClixrIo.Views.Image = ClixrIo.Views.Element.extend({
  tagName: 'div',
  editMenu: ClixrIo.Views.ImageEditMenu,
  template: JST['editor/elements/image'],

  initialize: function (options) {
    this.render();
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    if (options.width) this.$el.css('width', options.width);
  },

  fadeIn: function (event) {
    $(event.target).fadeIn(500, function () {
      $(event.target).css('display', 'block');
    });
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
      handles: this._addResizeHandles(),
      resize: function () {
        this.ghostCopy(this.$el, this.$ghost);
      }.bind(this)
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
    return $icon.clone().wrap('<div/>').parent().html();
  }
});
