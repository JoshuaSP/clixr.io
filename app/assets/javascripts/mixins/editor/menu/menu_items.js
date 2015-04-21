ClixrIo.Mixins.MenuItems = {
  template: JST['editor/menus/menu'],

  setupMenuItems: function () {
    this._addMenuItems();
    this._addClose();
    this.delegateEvents();
  },

  events: {},
  menuItems: [],

  render: function () {
    var content = this.template({
      menuItems: this.menuItems,
    });
    this.$el.html(content);
    return this;
  },

  closeMenu: function () {
    this.remove();
  },

  // menuItems is an array of glyph, name, and optionally, function

  _addMenuItems: function(menuItems) {
    this.menuItems.forEach(function(menuItem) {
      menuItem.func = this._functionize(menuItem.name);
      menuItem.function = menuItem.function || menuItem.func;
      this.events["click ." + menuItem.func + "-button"] = menuItem.function;
    }.bind(this));
  },

  _addClose: function () {
    this.events["click .fa-close"] = "closeMenu";
  },

  _functionize: function(name) {
    var newname = name.slice(0,1).toLowerCase() + name.slice(1);
    return newname.replace(/ |&nbsp;/, "");
  }
}
