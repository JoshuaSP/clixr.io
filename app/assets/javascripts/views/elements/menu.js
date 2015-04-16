ClixrIo.Views.Menu = ClixrIo.Views.Element.extend({
  tagName: 'ul',
  template: JST['elements/menu'],
  iconTemplate: JST['elements/menu_icon'],
  editMenu: ClixrIo.Views.MenuEditMenu,

  initialize: function (options) {
    ClixrIo.Views.Element.prototype.initialize.call(this, options);
    this.listenTo(this.collection, "add remove", this.render);
  },

  render: function () {
    var content = this.template({ pages: this.collection });
    this.$el.html(content);
    return this;
  },

  icon: function () {
    var origWidth = parseInt(this.$el.css('width'));
    var origHeight = parseInt(this.$el.css('height'));
    var maxDim = Math.max(origWidth, origHeight);
    var $icon = $('<ul>');
    $icon.css({
      'width': 15,
      'height': 15,
      'background-color': this.$el.css('background-color'),
      'fontSize': (15 / this.collection.length) + 'px',
      'overflow': 'hidden'
    });
    var content = this.iconTemplate({ pages: this.collection }).replace(/ /, "&nbsp;");
    $icon.html(content);
    var style = this.$el.attr('class').match(/user\S*style-\d+/)[0];
    $icon.addClass(style);
    $icon.addClass('element-icon');
    return $icon.clone().wrap('<div/>').parent().html();
  },
});
