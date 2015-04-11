ClixrIo.Mixins.MenuUtils = {
  colorPicker: function (slideFunctionCreator) {
    var $redSlider = $('.color-picker .red .slider');
    var $greenSlider = $('.color-picker .green .slider');
    var $blueSlider = $('.color-picker .blue .slider');
    var slideFunction = slideFunctionCreator($redSlider, $greenSlider, $blueSlider);
    $('.color-picker .red .slider, .color-picker .green .slider, .color-picker .blue .slider').slider({
      slide: slideFunction,
      min: 0,
      max: 256
    });
  },

  setupSubmenus: function (context, toggles) {
    for (var source in toggles) {
      var target = context.find(toggles[source]);
      (function (target) {
        context.find(source).click(function () {
          if (target.css('opacity') == 1) {
            target.css('opacity', 0);
            setTimeout(function() {
              target.css('display', 'none');
            }, parseFloat(target.css('transition').split(" ")[1])*1000);
          } else {
            setTimeout(function () {
              target.css('opacity', 1);
            }, 0);
            target.css('display', 'block');
          }
        });
      })(target);
      target.draggable();
    }
  }
};
