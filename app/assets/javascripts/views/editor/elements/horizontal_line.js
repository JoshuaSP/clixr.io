ClixrIo.Views.HorizontalLine = ClixrIo.Views.Element.extend({
  tagName: 'div',
  editMenu: ClixrIo.Views.DivEditMenu,

  handles: {
    "e": { right: "-5px", top: "-5px"},
    "w": { left: "-5px", top: "-5px"}
  },

  positionEditMenu: function () {
    this.editMenuView.$el.position({
      my: "center",
      at: "center bottom-120px",
      of: this.$el
    });
    this.editMenuView.$el.find('.style-menu, .style-button').remove();
    this.editMenuView.$el.find('.color-button').css('border', 'none');
  },

  icon: function (dim) {
    var $icon = $('<div>');
    $icon.css({
      'width': dim,
      'height': '1px',
      'background-color': this.$el.css('background-color'),
      'margin-top': '6px'
    });
    $icon.addClass('element-icon');
    return $icon.clone().wrap('<div/>').parent().html();
  }
});
