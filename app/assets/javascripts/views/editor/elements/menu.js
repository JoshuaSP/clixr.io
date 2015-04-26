ClixrIo.Views.Menu = ClixrIo.Views.Element.extend({
  tagName: 'ul',
  template: JST['editor/elements/menu'],
  iconTemplate: JST['editor/elements/menu_icon'],
  editMenu: ClixrIo.Views.MenuEditMenu,
  class: 'noselect',

  initialize: function (options) {
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    this.listenTo(this.collection, "add remove change", this.render);
  },

  render: function () {
    var content = this.template({ pages: this.collection });
    this.$el.html(content);
    return this;
  },

  icon: function (dim) {
    var origWidth = parseInt(this.$el.css('width'));
    var origHeight = parseInt(this.$el.css('height'));
    var maxDim = Math.max(origWidth, origHeight);
    var $icon = $('<ul>');
    $icon.css({
      'width': dim,
      'height': dim,
      'background-color': this.$el.css('background-color'),
      'fontSize': (dim / this.collection.length) + 'px',
      'overflow': 'hidden'
    });
    var content = this.iconTemplate({ pages: this.collection });
    $icon.html(content);
    var style = this.$el.attr('class').match(/user\S*style-\d+/)[0];
    $icon.addClass(style + ' element-icon');
    return $icon.clone().wrap('<div/>').parent().html();
  },
});
