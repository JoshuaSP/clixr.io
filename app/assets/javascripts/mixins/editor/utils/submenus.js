ClixrIo.Mixins.Submenus = {
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
}
