ClixrIo.Views.SiteEdit = Backbone.CompositeView.extend({
  template: JST['sites/edit'],

  currentMenu: null,

  events: {
    "click .page-menu-button": "showPageMenu",
    "click .add-element-button": "showAddElementMenu",
    "click .user-page .user-element": "selectElement"
  },

  initialize: function () {
    this.render();
    this.addElementMenu = new ClixrIo.Views.AddElementMenu({
      parent: this.$('.function-buttons'),
      parentView: this
    });
    this.currentPage = this.model.pages().where({ord: 0});
    this.$userPage = this.$('.user-page');
  },

  collapseMenus: function () {
    // iterate and collapse each menu
  },

  selectElement: function(event) {
    if (this.selectedView) {
      this.selectedView.deselectElement();
    }
    var newView = _(this.subviews('.user-page')).find(function(subview) {
      return subview.$el.is($(event.currentTarget));
    });
    newView.selectElement();
    this.selectedView = newView;
  },

  render: function () {
    var content = this.template({site: this.model});
    this.$el.html(content);
    // this.onRender();
    return this;
  },

  showPageMenu: function (event) {
    if (this.pageMenu.openable) {
      this.pageMenu.$el.addClass("expanded-menu");
    }
  },

  showAddElementMenu: function (event) {
    if(!$(event.target).hasClass("fa-close")) {
      this.addElementMenu.$el.addClass("expanded-menu");
    }
  },

  _swapMenu: function (newMenu) {
    if (this.currentMenu) {
      this.currentMenu.remove();
    }
    this.currentMenu = newMenu;
  }
});
