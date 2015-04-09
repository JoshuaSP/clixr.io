ClixrIo.Views.SiteEdit = Backbone.View.extend({
  template: JST['sites/edit'],

  currentMenu: null,

  events: {
    "click .page-menu-button": "showPageMenu",
    "click .add-element-button": "showAddElementMenu"
  },

  initialize: function () {
    this.render();
    this.addElementMenu = new ClixrIo.Views.AddElementMenu({
      parent: this.$('.function-buttons')
    });
    this.currentPage = this.model.pages().where({ord: 0});
  },

  collapseMenus: function () {
    // iterate and collapse each menu
  },

  render: function () {
    var content = this.template({site: this.model});
    this.$el.html(content);
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
