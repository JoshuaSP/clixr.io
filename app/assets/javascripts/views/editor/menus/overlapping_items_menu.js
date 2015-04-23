ClixrIo.Views.OverlappingItemsMenu = Backbone.View.extend({
  events: {
    'sortstart': 'sortStart',
    'sortupdate': 'update',
    'click': 'select'
  },

  template: JST['editor/menus/overlapping_items_menu'],
  className: "overlapping-items",

  initialize: function (options) {
    this.siteView = options.siteView;
    this.render();
    this.$el.sortable({
      axis: 'y'
    });
  },

  render: function() {
    var content = this.template({ items: this.collection });
    this.$el.html(content);
    return this;
  },

  sortStart: function(event, ui) {
    this.oldPos = ui.item.index();
  },

  select: function(event) {
    if ($(event.target).closest('li').length) {
      var selectedView = this.collection.at($(event.target).closest('li').index()).view;
      this.siteView.selectView(selectedView);
      selectedView.$el.addClass('bring-to-front');
    }
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
