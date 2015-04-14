ClixrIo.Mixins.EditElementMenu = {

  events: {
    'click .site-page-toggle': 'sitePageToggle',
    'click .delete-button': 'deleteElement',
    'click .fa-close': 'close'
  },

  intersectingViews: [],

  sitePageToggle: function () {
    if (this.global()) {
      this.model.collection.remove(this.model);
      this.siteView.currentPage.elements().add(this.model);
      this.$('.site-page-toggle i').removeClass('fa-check-square-o').addClass('fa-square-o');
    } else {
      this.model.collection.remove(this.model);
      this.siteView.model.elements().add(this.model);
      this.$('.site-page-toggle i').addClass('fa-check-square-o').removeClass('fa-square-o');
    }
  },

  overlappingItems: function () {
    if (this.intersectingViews.length < 2) {
      this.$('.overlapping-button').remove();
      return;
    }
    this.overlappingItemsMenu = new ClixrIo.Views.OverlappingItemsMenu({
      collection: new ClixrIo.Collections.Elements(
        this.intersectingViews.map(function(view) {
            return view.model;
          })
      )
    });
    this.$el.append(this.overlappingItemsMenu.render().$el);
    this.$('.overlapping-button').click(function() {
      this.overlappingItemsMenu.render();
    }.bind(this));
  },

  remove: function () {
    if (this.overlappingItemsMenu) this.overlappingItemsMenu.remove();
    Backbone.View.prototype.remove.apply(this);
  }
};

// glyphs - reorder for overlapping items
//   (or database?)
// square-o to check-square-o for putonevery page
// sitemap for putoneverypage
// external-link choose link
// image for choose image
// font for change text
// square for choose color (but inherit color)
