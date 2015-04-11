ClixrIo.Mixins.ColorPicker = function (slideFunctionCreator) {
  var $redSlider = $('.color-picker .red .slider');
  var $greenSlider = $('.color-picker .green .slider');
  var $blueSlider = $('.color-picker .blue .slider');
  var slideFunction = slideFunctionCreator($redSlider, $greenSlider, $blueSlider);
  $('.color-picker .red .slider, .color-picker .green .slider, .color-picker .blue .slider').slider({
    slide: slideFunction,
    min: 0,
    max: 256
  });
};
