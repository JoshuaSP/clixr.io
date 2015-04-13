ClixrIo.Mixins.ZIndex = {
  _zIndexes: [],

  register: function (view, viewZ) {
    var zIndex = this;
    var zis = this._zIndexes;
    if (viewZ) {
      while (zis[viewZ]) {
          viewZ++;
        }
      zis[viewZ] = view;   // put view in the closest available z-index at or above its listed z-index
    } else {
      zis.push(view);
    }

    view.moveInFrontOf = function (otherView) {
      var myIndex = zis.indexOf(view);
      var otherIndex = zis.indexOf(otherView);
      if (myIndex < otherIndex) {
        zis.splice(myIndex, 1);
        zis.splice(otherIndex + 1, 0, view);
      }
      zIndex.refresh();
    };

    view.moveBehind = function (otherView) {
      var myIndex = zis.indexOf(view);
      var otherIndex = zis.indexOf(otherView);
      if (myIndex > otherIndex) {
        zis.splice(myIndex, 1);
        zis.splice(otherIndex, 0, view);
      }
      zIndex.refresh();
    };

    var defaultRemove = view.remove;

    view.remove = function () {
      defaultRemove().apply(view);
      zis.splice(zis.indexOf(view), 1);
      zIndex.refresh();
    };

    return zis.indexOf(view);
  },

  refresh: function() {
    this._zIndexes.forEach(function(view, index) {
      view.$el.css('z-index', index);
    });
  }
};
