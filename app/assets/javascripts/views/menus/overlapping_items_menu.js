ClixrIo.Views.OverlappingItemsMenu = Backbone.View.extend({
  events: {
    'sortstart': 'sortStart',
    'sortupdate': 'update'
  },

  template: JST['menus/overlapping_items_menu'],
  className: "overlapping-items",

  initialize: function () {
    this.render();
    this.$el.sortable({
      axis: 'y'
    });
  },

  render: function() {
    var content = this.template({ items: this.collection });
    this.$el.html(content);
    return this;
  }.bind(this),

  sortStart: function(event, ui) {
    this.oldPos = ui.item.index();
  },

  update: function(event, ui) {
    var els = this.collection.models;
    var newPos = ui.item.index();
    var movedView = els[this.oldPos].view;
    els.splice(newPos, 0, els.splice(this.oldPos, 1)[0]);
    if (newPos < this.oldPos ) {
      movedView.moveInFrontOf(els[newPos + 1].view);
    } else {
      movedView.moveBehind(els[newPos - 1].view);
    }
  }
});
