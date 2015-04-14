ClixrIo.Mixins.MenuUtils = {
  colorPicker: function (slideFunctionCreator, startColor) {
    var $redSlider = $('.color-picker .red .slider');
    var $greenSlider = $('.color-picker .green .slider');
    var $blueSlider = $('.color-picker .blue .slider');
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

  setupSubmenus: function (mainMenu, toggles) {
    for (var source in toggles) {
      var target = $(toggles[source]);
      (function (target) {
        mainMenu.find(source).click(function () {
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
