ClixrIo.Views.OverlappingItemsMenu = Backbone.View.extend({
  events: {
    'sortstart': 'sortStart',
    'sortupdate': 'update'
  },

  template: 'menus/overlapping_items_menu',
  tagName: "ul",

  initialize: function () {
    this.render();
    this.$el.sortable({
      axis: 'y'
    });
  },

  render: function() {
    var content = this.template({ items: this.collection });
  },

  sortStart: function(event, ui) {
    this.oldPos = ui.item.index();
  },

  update: function(event, ui) {
    var els = this.collection.models;
    var newPos = ui.item.index();
    var movedView = els.get(this.oldPos).view;
    els.splice(newPos, 0, els.splice(this.oldPos, 1)[0]);
    if (newPos < this.oldPos ) {
      movedView.moveBehind(els[newPos + 1].view);
    } else {
      movedView.moveInFrontOf(els[newPos - 1].view);
    }
  }
});

// overlappingItems: function () {
//   var iVs = this.intersectingViews
//   this.$('overlapping-items').sortable({
//     axis: "y",
//     update: function (event, ui) {
//       var movedView = this.siteView.findView(ui.item); // fuck, this line won't work
//       var oldPos = iVs.indexOf(movedView);
//       var newPos = ui.item.index();
//       if (newPos < oldPos ) {
//         movedView.moveBehind(iVs[newPos]);
//       } else {
//         movedView.moveInFrontOf(iVs[newPos - 1]);
//         iVs.splice(oldPos, 1);
//         iVs.splice(newPos - 1, 0, movedView);
//       }
//       iVs.splice(newPos, 0, iVs.splice(oldPos,1)[0]);
//     }.bind(this)
//   })
// },
