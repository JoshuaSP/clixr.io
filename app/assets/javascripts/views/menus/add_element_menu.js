ClixrIo.Views.AddElementMenu = Backbone.View.extend (
  _.extend({}, ClixrIo.Mixins.MenuItems, {
    menuItems: [
      { glyph: "square", name: "Button" }, //could use entypo-doc-landscape
      { glyph: "stop", name: "Box" },
      { glyph: "font", name: "Text" },
      { glyph: "image", name: "Image" },
      { glyph: "align-justify", name: "Menu" },
      { glyph: "minus", name: "Horizontal Line" }
    ],

    className: "add-element-button",

    render: function () {
      var content = this.template({
        menuItems: this.menuItems,
        mainIcon: "plus-circle",
        title: "Add"
      });
      this.$el.html(content);
      return this;
    },

    template: JST['menus/function_buttons'],

    initialize: function (options) {
      this.parent = options.parent;
      this.setupMenuItems();
      this.parent.append(this.render().$el);
      this.parentView = options.parentView;
    },

    closeMenu: function (event) {
      setTimeout(function () {
        this.openable = true;
      }.bind(this), 0);
      this.$el.removeClass("expanded-menu");
    },

    button: function () {

    },

    box: function () {
      var div = new ClixrIo.Models.Element({ type: 'div' });
      var divView = new ClixrIo.Views.Div({ model: div });
      this._placeCenter(divView);
      divView.setCss('width', '200px');
      divView.setCss('height', '200px');
      divView.setCss('background-color', '#7093ae');
      this.parentView.addSubview('.user-page', divView);
    },

    text: function () {

    },

    image: function () {

    },

    menu: function () {

    },

    horizontalLine: function () {

    },

    _placeCenter: function (view) {
      view.setCss("left", "490px");
      view.setCss("top", "200px");
    }
  })
);
