ClixrIo.Views.MenuView = Backbone.View.extend ({
  template: 'menus/menu',

  initialize () {
    this.addMenuItems();
  },

  events: {},

  menuItems: [],

  name: "",

  render: function () {
    var content = this.template({
      menuItems: this.menuItems,
      name: this.name
    });
    this.$el.html(content);
    return this;
  },

  // menuItems is an array of glyph, name, and optionally, function

  _addMenuItems: function(menuItems) {
    this.menuItems.forEach(function(menuItem) {
      menuItem.func = this._functionize(menuItem.name);
      menuItem.function = menuItem.function || menuItem.func;
      this.events["click ." + menuItem.func + "-button"] = menuItem.function;
    });
  },

  _functionize: function(name) {
    var newname = name.slice();
    newname.splice(0, 1, newname.slice(0,1).toLowerCase());
    return newname.replace(" ", "");
  }
});
