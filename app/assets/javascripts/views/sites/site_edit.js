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
  },

  collapseMenus: function () {
    // iterate and collapse each menu
  },

  render: function () {
    var content = this.template({site: this.model});
    this.$el.html(content);
    return this;
  },

  pageMenu: function () {

  },

  showAddElementMenu: function () {
    this.addElementMenu.$el.addClass("expanded-menu")
  },

  _swapMenu: function (newMenu) {
    if (this.currentMenu) {
      this.currentMenu.remove();
    }
    this.currentMenu = newMenu;
  }

});
