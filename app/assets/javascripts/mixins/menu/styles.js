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
  },

  setupColorPicker: function () {
    var $el = this.$targetEl
    var slideFunctionCreator = function ($redSlider, $greenSlider, $blueSlider) {
      return function (event, ui) {
        $el.css(
          "background-color",
          "rgb(" + $redSlider.slider("value") + "," +
          $greenSlider.slider("value") + "," +
          $blueSlider.slider("value") + ")"
        );
      };
    };
    this.colorPicker(slideFunctionCreator, $el.css('background-color'));
  }
}
