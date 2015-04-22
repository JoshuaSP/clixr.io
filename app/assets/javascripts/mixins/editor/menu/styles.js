ClixrIo.Mixins.Styles = {
  styleMenu: function () {
    var view = this;
    this.$el.find('.style-menu li').each(function(index) {
      var style = view.styles[index];
      $(this).click( function () {
        var currentStyle = view.$targetEl.attr('class').match(/user-\w+-style-\d+/)[0];
        view.$targetEl.removeClass(currentStyle);
        view.$targetEl.addClass(style);
      });
    });
  }
};
