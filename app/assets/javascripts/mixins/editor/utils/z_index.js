ClixrIo.Mixins.ZIndex = {
  _zIndexes: [],

  register: function (view, viewZ) {
    var zIndex = this;
    var zis = this._zIndexes;
    if (viewZ) {
      while (zis[viewZ - 1]) {  // subtracting 1 here so that later we can increment, so can start z-indexes from 1
          viewZ++;
        }
      zis[viewZ - 1] = view;   // put view in the closest available z-index at or above its listed z-index
    } else {
      zis.push(view);
    }

    view.moveInFrontOf = function (otherView) {
      var myIndex = zis.indexOf(view);
      var otherIndex = zis.indexOf(otherView);
      if (myIndex < otherIndex) {
        zis.splice(myIndex, 1);
        zis.splice(otherIndex, 0, view);
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
      defaultRemove.apply(view);
      zis.splice(zis.indexOf(view), 1);
      zIndex.refresh();
    };

    return zis.indexOf(view);
  },

  refresh: function() {
    this._zIndexes.forEach(function(view, index) {
      var oldZIndex = view.$el.css('z-index');
      view.$el.css('z-index', index + 1);
      if (oldZIndex !== index + 1) view.model.save();
    });
  }
};
