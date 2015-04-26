ClixrIo.Mixins.EditElementMenu = {
  className: 'edit-menu',
  commonButtons: JST['editor/menus/common_buttons'],

  events: {
    'click .site-page-toggle': 'sitePageToggle',
    'click .delete-button': 'deleteElement',
    'click .fa-close': 'close'
  },

  sitePageToggle: function () {
    var site = this.siteView;
    if (this.global()) {
      this.model.collection.remove(this.model);
      site.currentPage().elements().add(this.model);
      site.moveSubview('.user-site-elements', site.currentPageSelector(), this.model.view);
      this.model.set({
        'placeable_id': site.currentPage().id,
        'placeable_type': 'Page'
      });
      this.$('.site-page-toggle i').removeClass('fa-check-square-o').addClass('fa-square-o');
    } else {
      this.model.collection.remove(this.model);
      site.model.elements().add(this.model);
      this.model.set({
        'placeable_id': site.model.id,
        'placeable_type': 'Site'
      });
      site.moveSubview(site.currentPageSelector(), '.user-site-elements', this.model.view);
      this.$('.site-page-toggle i').addClass('fa-check-square-o').removeClass('fa-square-o');
    }
  },

  overlappingItems: function () {
    if (this.intersectingModels().length < 2) {
      this.$('.overlapping-button').hide();
    }
    this.overlappingItemsMenu = new ClixrIo.Views.OverlappingItemsMenu({
      collection: new ClixrIo.Collections.Elements(this.intersectingModels()),
      siteView: this.siteView
    });
    this.$el.append(this.overlappingItemsMenu.render().$el);
    this.overlapListen();
  },

  overlapListen: function () {
    this.$targetEl.styleListener({
      styles: ['width', 'height', 'background-color'],
      changed: function () {
        this.overlappingItemsMenu.render();
      }.bind(this)
    });
    this.listenForIntersects();
  },

  listenForIntersects: function () {
    this.$targetEl.on("drag resize", function () {
      var intersectingModels = this.intersectingModels();
      if (intersectingModels.length > 1) this.$('.overlapping-button').show();
      this.overlappingItemsMenu.collection.reset(this.intersectingModels());
    }.bind(this));
  },

  remove: function () {
    if (this.overlappingItemsMenu) this.overlappingItemsMenu.remove();
    Backbone.View.prototype.remove.apply(this);
  }
};
