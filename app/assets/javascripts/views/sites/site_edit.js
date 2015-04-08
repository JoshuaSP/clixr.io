ClixrIo.Views.SiteEdit = Backbone.View.extend({
  template: JST['sites/edit'],

  currentMenu: null,

  events: {
    "click .page-menu-button": "pageMenu",
    "click .add-element-button": "addElementMenu"
  },

  render: function () {
    var content = this.template({site: this.model});
    this.$el.html(content);
    return this;
  },

  pageMenu: function () {

  },

  addElementMenu: function () {
    this._swapMenu(new ClixrIo.Views.AddElementMenu());
  },

  _swapMenu: function (newMenu) {
    if (this.currentMenu) {
      this.currentMenu.remove();
    }
    this.currentMenu = newMenu;
    this.$el.append(newMenu.render().$el);
  }

});
