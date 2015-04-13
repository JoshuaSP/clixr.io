ClixrIo.Views.Div = ClixrIo.Views.Element.extend({
  tagName: 'div',
  editMenu: ClixrIo.Views.DivEditMenu,

  icon: function (dim) {
    var origWidth = parseInt(this.$el.css('width'));
    var origHeight = parseInt(this.$el.css('height'));
    var maxDim = Math.max(origWidth, origHeight);
    var $icon = $('<div>');
    $icon.css({
      'width': dim * origWidth / maxDim,
      'height': dim * origHeight / maxDim,
      'background-color': this.$el.css('background-color')
    });
    $icon.addClass('element-icon');
    var style = this.$el.attr('class').match(/user\S*style-\d+/)[0];
    $icon.addClass(style);
    return $icon.clone().wrap('<div/>').parent().html();
  }
});
