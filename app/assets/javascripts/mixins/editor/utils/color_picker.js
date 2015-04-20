ClixrIo.Mixins.Colorpicker = {
  colorPicker: function (slideFunctionCreator, startColor, ctxt) {
    var context = ctxt || $(document)
    var $redSlider = context.find('.color-picker .red .slider');
    var $greenSlider = context.find('.color-picker .green .slider');
    var $blueSlider = context.find('.color-picker .blue .slider');
    var slideFunction = slideFunctionCreator($redSlider, $greenSlider, $blueSlider);
    $('.color-picker .red .slider, .color-picker .green .slider, .color-picker .blue .slider').slider({
      slide: slideFunction,
      min: 0,
      max: 256
    });
    if (startColor) {
      $redSlider.slider('value', parseInt(startColor.match(/\d+/g)[0]));
      $blueSlider.slider('value', parseInt(startColor.match(/\d+/g)[1]));
      $greenSlider.slider('value', parseInt(startColor.match(/\d+/g)[2]));
    }
  },

  setupColorPicker: function () {
    var $el = this.$targetEl;
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
